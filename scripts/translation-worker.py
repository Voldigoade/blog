#!/usr/bin/env python3
import atexit
import hashlib
import json
import logging
import os
import re
import socket
import subprocess
import sys
import tarfile
import time
import urllib.request
import zipfile
import jinja2

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

ENGINE_TYPE = os.environ.get("TRANSLATION_ENGINE", "translategemma").lower()

CANONICAL_MODEL_ID = "google/translategemma-4b-it"
CANONICAL_REVISION = "10042cb0e6e7fdce748996a71dc3dc432a4e0c89"

GGUF_REPO = "SandLogicTechnologies/translategemma-4b-it-GGUF"
GGUF_REVISION = "cd39c30302f20fb8b788234d86a0a35a0d050619"
GGUF_FILENAME = "translategemma-4b_Q4_K_M.gguf"
GGUF_SHA256 = "526747309109c016db547c6fc1c7b0c9c286b5e7a7556827b5419fd9543a09cd"
GGUF_SIZE_BYTES = 2489909312
GGUF_DOWNLOAD_URL = f"https://huggingface.co/{GGUF_REPO}/resolve/{GGUF_REVISION}/{GGUF_FILENAME}"

LLAMA_RELEASE_TAG = "b10948"
LLAMA_LINUX_URL = f"https://github.com/ggerganov/llama.cpp/releases/download/{LLAMA_RELEASE_TAG}/llama-{LLAMA_RELEASE_TAG}-bin-ubuntu-x64.tar.gz"
LLAMA_LINUX_SHA256 = "bcbf6a304f85dd5acceee4afde432d4d183120a32dccad9ca8dcb05687575d40"

LLAMA_WIN_URL = f"https://github.com/ggerganov/llama.cpp/releases/download/{LLAMA_RELEASE_TAG}/llama-{LLAMA_RELEASE_TAG}-bin-win-cpu-x64.zip"
LLAMA_WIN_SHA256 = "b6924454c00942f6c97e464fd1cc459e8c88fcc75cbf5b7fdb92ee2d6c7ced79"

M2M100_MODEL_ID = os.environ.get("M2M100_MODEL", "facebook/m2m100_418M")
M2M100_REVISION = os.environ.get("M2M100_REVISION", "55c2e61bbf05dfb8d7abccdc3fae6fc8512fd636")
CACHE_DIR = (
    os.environ.get("HF_HOME")
    or os.environ.get("HF_HUB_CACHE")
    or os.environ.get("TRANSFORMERS_CACHE")
    or None
)

SOURCE_LOCALE = "fr"
TRANSLATEGEMMA_CONTEXT_LIMIT = 2048
TRANSLATEGEMMA_SAFE_INPUT_TOKENS = int(os.environ.get("TRANSLATEGEMMA_SAFE_TOKENS", "500"))

LANG_MAP = {
    "fr": ("French", "fr"),
    "en": ("English", "en"),
    "es": ("Spanish", "es"),
    "de": ("German", "de"),
    "pt-br": ("Portuguese", "pt-BR"),
    "it": ("Italian", "it"),
    "ja": ("Japanese", "ja"),
    "zh-cn": ("Chinese", "zh-Hans"),
}

M2M100_LANG_MAP = {
    "fr": "fr",
    "en": "en",
    "es": "es",
    "de": "de",
    "pt-br": "pt",
    "it": "it",
    "ja": "ja",
    "zh-cn": "zh",
}

MODEL_HARD_LIMIT = 1024
SAFE_INPUT_TOKENS = int(os.environ.get("M2M100_SAFE_TOKENS", "200"))
BATCH_SIZE = int(os.environ.get("M2M100_BATCH", "4"))
NUM_BEAMS = 5
NO_REPEAT_NGRAM = 3
UNKNOWN_TOKEN = "<unk>"

CANONICAL_JINJA_TEMPLATE = r"""{%- set languages = {
    "de": "German",
    "en": "English",
    "es": "Spanish",
    "fr": "French",
    "it": "Italian",
    "ja": "Japanese",
    "pt": "Portuguese",
    "pt-BR": "Portuguese",
    "zh": "Chinese",
    "zh-Hans": "Chinese",
}
-%}
{{ bos_token }}
{%- if (messages[0]['role'] != 'user') -%}
    {{ raise_exception("Conversations must start with a user prompt.") }}
{%- endif -%}
{%- for message in messages -%}
    {%- if (message['role'] == 'user') != (loop.index0 % 2 == 0) -%}
        {{ raise_exception("Conversation roles must alternate user/assistant/user/assistant/...") }}
    {%- endif -%}
    {%- if (message['role'] == 'assistant') -%}
        {%- if message['content'] is none or message['content'] is not string -%}
            {{ raise_exception("Assistant role must provide content as a string") }}
        {%- endif -%}
        {{ '<start_of_turn>model\n'}}
        {{ message["content"] | trim }}
    {%- elif (message['role'] == 'user') -%}
        {%- if message['content'] is none or message['content'] is not iterable or message['content'] | length != 1 -%}
            {{ raise_exception("User role must provide `content` as an iterable with exactly one item.") }}
        {%- endif -%}
        {%- set content = message["content"][0] -%}
        {%- set source_lang_code = content["source_lang_code"] | replace("_", "-") -%}
        {%- set source_lang = languages[source_lang_code] -%}
        {%- set target_lang_code = content["target_lang_code"] | replace("_", "-") -%}
        {%- set target_lang = languages[target_lang_code] -%}
        {{ '<start_of_turn>user\nYou are a professional ' + source_lang + ' (' + source_lang_code + ') to ' +
           target_lang + ' (' + target_lang_code + ') translator. Your goal is to accurately convey the meaning and '
           'nuances of the original ' + source_lang + ' text while adhering to ' + target_lang + ' grammar, '
           'vocabulary, and cultural sensitivities.\n'
        }}
        {%- if content["type"] == 'text' -%}
            {{
                'Produce only the ' + target_lang + ' translation, without any additional explanations or ' +
                'commentary. Please translate the following ' + source_lang + ' text into ' + target_lang + ':\n\n\n' +
                content["text"] | trim
            }}
        {%- else -%}
            {{ raise_exception("Unsupported content type") }}
        {%- endif -%}
    {%- else -%}
        {{ raise_exception("Conversations must only contain user or assistant roles.") }}
    {%- endif -%}
    {{ '<end_of_turn>\n' }}
{%- endfor -%}
{%- if add_generation_prompt -%}
    {{'<start_of_turn>model\n'}}
{%- endif -%}"""

class TranslationError(Exception):
    pass

class _LengthWarningFilter(logging.Filter):
    def filter(self, record):
        return (
            "longer than the specified maximum sequence length"
            not in record.getMessage()
        )

def log(event):
    sys.stderr.write(json.dumps(event, ensure_ascii=True) + "\n")
    sys.stderr.flush()

_ABBREVIATIONS = frozenset(
    "m mm mr mre mme mlle dr pr prof st ste sr sce etc ex cf vs p pp pg vol chap "
    "fig tab n no nos art al av apr janv fevr fév mars avr mai juin juil aout août "
    "sept oct nov dec déc ed eds dir adj adm min max env approx tel fax st".split()
)

_SENTENCE_END = re.compile(
    r"([.!?…]+[»”’'\"]?)(\s+)(?=[«“\"'\(\[¿¡A-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇŒÆÑ0-9])"
)
_CLAUSE_SPLIT = re.compile(r"(?<=[;:])\s+|\s+[—–-]\s+|(?<=[.!?…][»”’'\"])\s+")
_COMMA_CONJUNCTION = re.compile(
    r"(?<=,)\s+(?=(?:et|ou|mais|car|donc|or|ni|qui|que|quoi|dont|o\u00f9|comme|"
    r"parce|puisque|lorsque|lorsqu|alors|tandis|si|quand|afin|ainsi|"
    r"cependant|toutefois|n\u00e9anmoins|pourtant|d\u00e8s|avant|apr\u00e8s|sans|avec|"
    r"dans|sur|pour)\b)",
    re.IGNORECASE,
)

_REPEAT_TOKEN = re.compile(r"(\S+)(?:\s+\1){5,}")
_REPEAT_CHAR = re.compile(r"([^\W\d_])\1{7,}")

def is_degenerate(text):
    if _REPEAT_TOKEN.search(text) or _REPEAT_CHAR.search(text):
        return True
    words = text.split()
    if len(words) >= 16:
        seen = set()
        for index in range(len(words) - 7):
            gram = " ".join(words[index : index + 8])
            if gram in seen:
                return True
            seen.add(gram)
    return False

def split_sentences(text):
    sentences = []
    start = 0
    for match in _SENTENCE_END.finditer(text):
        preceding = text[start : match.start(1)]
        word = re.search(r"([A-Za-zÀ-ÿ]+)\.?$", preceding)
        if word and word.group(1).lower() in _ABBREVIATIONS:
            continue
        piece = text[start : match.start(2)].strip()
        if piece:
            sentences.append(piece)
        start = match.end(2)
    tail = text[start:].strip()
    if tail:
        sentences.append(tail)
    return sentences

def split_clauses(sentence):
    parts = [sentence]
    for pattern in (_CLAUSE_SPLIT, _COMMA_CONJUNCTION):
        refined = []
        for part in parts:
            refined.extend(p for p in pattern.split(part) if p.strip())
        parts = refined or parts
    return [p.strip() for p in parts if p.strip()]

def verify_file_sha256(filepath, expected_sha256):
    if not os.path.exists(filepath):
        return False
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(1024 * 1024 * 8):
            h.update(chunk)
    return h.hexdigest().lower() == expected_sha256.lower()

def download_verified_file(url, target_path, expected_sha256, auth_token=None):
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    tmp_path = target_path + ".tmp"
    headers = {"User-Agent": "openblogvoldi-translator"}
    if auth_token:
        headers["Authorization"] = f"Bearer {auth_token}"
    req = urllib.request.Request(url, headers=headers)
    log({"event": "download_start", "target": os.path.basename(target_path)})
    h = hashlib.sha256()
    with urllib.request.urlopen(req) as resp, open(tmp_path, "wb") as out:
        while True:
            chunk = resp.read(1024 * 1024 * 4)
            if not chunk:
                break
            out.write(chunk)
            h.update(chunk)
    digest = h.hexdigest().lower()
    if digest != expected_sha256.lower():
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
        raise TranslationError(
            f"checksum mismatch for {os.path.basename(target_path)}: "
            f"expected {expected_sha256}, got {digest}"
        )
    os.replace(tmp_path, target_path)
    log({"event": "download_complete", "target": os.path.basename(target_path)})

def get_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]

def extract_quantities(text, locale="fr"):
    quantities = []
    if locale in ("ja", "zh-cn", "zh-Hans"):
        comp_matches = re.finditer(r'(\d+(?:\.\d+)?)\s*[亿億]\s*(?:(\d+(?:\.\d+)?)\s*万)?', text)
        matched_spans = []
        for m in comp_matches:
            matched_spans.append(m.span())
            yi = float(m.group(1)) * 1e8
            wan = float(m.group(2)) * 1e4 if m.group(2) else 0.0
            quantities.append(yi + wan)

        wan_matches = re.finditer(r'(\d+(?:\.\d+)?)\s*万', text)
        for m in wan_matches:
            if any(s[0] <= m.start() and m.end() <= s[1] for s in matched_spans):
                continue
            quantities.append(float(m.group(1)) * 1e4)
            matched_spans.append(m.span())

    scale_map = {
        "million": 1e6, "millions": 1e6, "millionen": 1e6, "milhões": 1e6, "milhoes": 1e6, "milioni": 1e6,
        "milliard": 1e9, "milliards": 1e9, "billion": 1e9, "billions": 1e9, "milliarden": 1e9, "bilhões": 1e9, "miliardi": 1e9,
        "mille": 1e3, "thousand": 1e3, "tausend": 1e3, "mila": 1e3, "mil": 1e3,
    }

    num_pat = re.compile(
        r'(?<![A-Za-z0-9_])'
        r'(\d+(?:[,\. \xa0\u202f]\d{3})*(?:[,\.]\d+)?)'
        r'(?:\s*([A-Za-zÀ-ÿ]+))?'
    )

    for m in num_pat.finditer(text):
        raw_num = re.sub(r'[\s\xa0\u202f]', '', m.group(1))
        vals = []
        try:
            if "," in raw_num and "." in raw_num:
                if raw_num.rfind(",") > raw_num.rfind("."):
                    vals.append(float(raw_num.replace(".", "").replace(",", ".")))
                else:
                    vals.append(float(raw_num.replace(",", "")))
            elif "," in raw_num:
                parts = raw_num.split(",")
                if locale in ("en", "ja", "zh-cn", "zh-Hans") and len(parts) > 1 and parts[0] != "0" and all(len(p) == 3 for p in parts[1:]):
                    vals.append(float(raw_num.replace(",", "")))
                    if len(parts) == 2:
                        try:
                            vals.append(float(raw_num.replace(",", ".")))
                        except ValueError:
                            pass
                else:
                    vals.append(float(raw_num.replace(",", ".")))
            elif "." in raw_num:
                parts = raw_num.split(".")
                if len(parts) > 1 and parts[0] != "0" and all(len(p) == 3 for p in parts[1:]):
                    vals.append(float(raw_num.replace(".", "")))
                    if len(parts) == 2:
                        try:
                            vals.append(float(raw_num))
                        except ValueError:
                            pass
                else:
                    vals.append(float(raw_num))
            else:
                vals.append(float(raw_num))
        except ValueError:
            continue

        word = (m.group(2) or "").lower()
        scale = 1.0
        for kw, factor in scale_map.items():
            if word.startswith(kw):
                scale = factor
                break
        for v in vals:
            quantities.append(v * scale)

    return quantities

def fix_asian_numeric_hallucinations(src_text, tgt_text, locale):
    if locale not in ("ja", "zh-cn", "zh-Hans"):
        return tgt_text

    fixed = tgt_text
    src_380k = re.findall(r'(\d+)\s+000\b', src_text)
    for n in src_380k:
        expected_val = int(n) * 1000
        wrong_pattern = re.compile(rf'(?<!\d){n}\s*万')
        if wrong_pattern.search(fixed):
            correct_wan = expected_val / 10000
            correct_wan_str = f"{int(correct_wan)}万" if correct_wan == int(correct_wan) else f"{correct_wan:g}万"
            fixed = wrong_pattern.sub(correct_wan_str, fixed)

    src_millions = re.findall(r'(\d+(?:[.,]\d+)?)\s+millions?\b', src_text, re.IGNORECASE)
    for m in src_millions:
        val = float(m.replace(',', '.')) * 1000000
        correct_wan = val / 10000
        correct_wan_str = f"{int(correct_wan) if correct_wan == int(correct_wan) else correct_wan:g}万"
        wrong_wan = f"{int(correct_wan * 10)}万"
        if wrong_wan in fixed:
            fixed = fixed.replace(wrong_wan, correct_wan_str)

    return fixed

def check_numeric_fidelity(src, tgt, locale):
    src_q = sorted(extract_quantities(src, "fr"))
    tgt_q = sorted(extract_quantities(tgt, locale))
    for val in src_q:
        matched = False
        for t_val in tgt_q:
            if abs(val - t_val) / max(val, 1e-6) < 0.01:
                matched = True
                break
        if not matched:
            return False, f"Source number {val} not found in {locale} output (found: {tgt_q})"
    return True, "OK"

class TranslateGemmaEngine:
    def __init__(self):
        cache_dir = (
            os.environ.get("TRANSLATION_CACHE_DIR")
            or os.environ.get("HF_HOME")
            or os.path.join(os.getcwd(), ".translation-cache")
        )
        os.makedirs(cache_dir, exist_ok=True)
        self.cache_dir = cache_dir

        model_path = os.environ.get("TRANSLATEGEMMA_MODEL_PATH")
        if not model_path or not os.path.exists(model_path):
            default_model = os.path.join(cache_dir, GGUF_FILENAME)
            if not verify_file_sha256(default_model, GGUF_SHA256):
                token = os.environ.get("HF_TOKEN")
                download_verified_file(
                    GGUF_DOWNLOAD_URL, default_model, GGUF_SHA256, auth_token=token
                )
            model_path = default_model

        server_bin = os.environ.get("LLAMA_SERVER_BIN")
        if not server_bin or not os.path.exists(server_bin):
            if sys.platform == "win32":
                win_dir = os.path.join(cache_dir, f"llama-{LLAMA_RELEASE_TAG}-win")
                default_bin = os.path.join(win_dir, "llama-server.exe")
                if not os.path.exists(default_bin):
                    archive_path = os.path.join(cache_dir, f"llama-{LLAMA_RELEASE_TAG}-win.zip")
                    if not verify_file_sha256(archive_path, LLAMA_WIN_SHA256):
                        download_verified_file(LLAMA_WIN_URL, archive_path, LLAMA_WIN_SHA256)
                    with zipfile.ZipFile(archive_path) as z:
                        z.extractall(win_dir)
                server_bin = default_bin
            else:
                linux_dir = os.path.join(cache_dir, f"llama-{LLAMA_RELEASE_TAG}-linux")
                default_bin = os.path.join(linux_dir, f"llama-{LLAMA_RELEASE_TAG}", "llama-server")
                if not os.path.exists(default_bin):
                    archive_path = os.path.join(cache_dir, f"llama-{LLAMA_RELEASE_TAG}-linux.tar.gz")
                    if not verify_file_sha256(archive_path, LLAMA_LINUX_SHA256):
                        download_verified_file(LLAMA_LINUX_URL, archive_path, LLAMA_LINUX_SHA256)
                    with tarfile.open(archive_path, "r:gz") as t:
                        t.extractall(linux_dir)
                    os.chmod(default_bin, 0o755)
                server_bin = default_bin

        self.model_path = model_path
        self.server_bin = server_bin
        self.port = get_free_port()
        self.token_cache = {}

        self.jinja_env = jinja2.Environment()
        template_str = None
        if os.path.exists(self.model_path):
            try:
                with open(self.model_path, "rb") as f:
                    chunk = f.read(10 * 1024 * 1024)
                    bos_idx = chunk.find(b"{{ bos_token }}")
                    if bos_idx != -1:
                        start_idx = chunk.rfind(b"{%- set languages", 0, bos_idx)
                        end_idx = chunk.find(b"{%- if add_generation_prompt -%}", bos_idx)
                        if end_idx != -1:
                            end_idx = chunk.find(b"{%- endif -%}", end_idx) + len(b"{%- endif -%}")
                            template_str = chunk[start_idx:end_idx].decode("utf-8", errors="replace")
            except Exception:
                template_str = None
        if not template_str:
            template_str = CANONICAL_JINJA_TEMPLATE
        self.chat_template = self.jinja_env.from_string(template_str)

        threads = os.environ.get("TRANSLATEGEMMA_THREADS") or os.environ.get("M2M100_THREADS")
        if not threads:
            threads = str(max(1, min(4, os.cpu_count() or 2)))

        self.threads = threads
        log(
            {
                "event": "load",
                "engine": "translategemma",
                "model": CANONICAL_MODEL_ID,
                "revision": CANONICAL_REVISION,
                "quantization": "Q4_K_M",
                "artifact": GGUF_FILENAME,
                "threads": self.threads,
                "port": self.port,
            }
        )

        cmd = [
            self.server_bin,
            "-m",
            self.model_path,
            "--port",
            str(self.port),
            "--ctx-size",
            str(TRANSLATEGEMMA_CONTEXT_LIMIT),
            "--threads",
            str(self.threads),
            "--no-jinja",
        ]
        log_path = os.path.join(self.cache_dir, "llama-server.log")
        self.log_file = open(log_path, "w", encoding="utf-8")
        self.proc = subprocess.Popen(
            cmd,
            stdout=subprocess.DEVNULL,
            stderr=self.log_file,
        )
        atexit.register(self.close)

        ready = False
        health_url = f"http://127.0.0.1:{self.port}/health"
        for _ in range(60):
            if self.proc.poll() is not None:
                self.log_file.flush()
                err = ""
                try:
                    with open(log_path, "r", encoding="utf-8", errors="replace") as f:
                        err = f.read()
                except Exception:
                    pass
                raise TranslationError(f"llama-server exited prematurely: {err[-2000:]}")
            try:
                req = urllib.request.Request(health_url)
                with urllib.request.urlopen(req, timeout=1) as resp:
                    if resp.status == 200:
                        ready = True
                        break
            except Exception:
                time.sleep(0.5)

        if not ready:
            self.close()
            raise TranslationError("llama-server failed to initialize within timeout")

        log(
            {
                "event": "ready",
                "engine": "translategemma",
                "model": CANONICAL_MODEL_ID,
                "revision": CANONICAL_REVISION,
                "safeInputTokens": TRANSLATEGEMMA_SAFE_INPUT_TOKENS,
                "threads": self.threads,
            }
        )

    def close(self):
        if hasattr(self, "proc") and self.proc and self.proc.poll() is None:
            try:
                self.proc.terminate()
                self.proc.wait(timeout=5)
            except Exception:
                self.proc.kill()
        if hasattr(self, "log_file") and self.log_file and not self.log_file.closed:
            try:
                self.log_file.close()
            except Exception:
                pass

    def count_tokens(self, text, src=None):
        if text in self.token_cache:
            return self.token_cache[text]
        url = f"http://127.0.0.1:{self.port}/tokenize"
        req_data = json.dumps({"content": text}).encode("utf-8")
        req = urllib.request.Request(
            url, data=req_data, headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            count = len(data.get("tokens", []))
            if len(self.token_cache) < 5000:
                self.token_cache[text] = count
            return count

    def format_prompt(self, text, src_locale, tgt_locale):
        src_lang, src_code = LANG_MAP[src_locale]
        tgt_lang, tgt_code = LANG_MAP[tgt_locale]
        return self.chat_template.render(
            messages=[{
                "role": "user",
                "content": [{
                    "type": "text",
                    "source_lang_code": src_code,
                    "target_lang_code": tgt_code,
                    "text": text.strip(),
                }]
            }],
            bos_token="",
            add_generation_prompt=True,
        )

    def generate_single(self, text, src, tgt, temperature=0.0):
        prompt = self.format_prompt(text, src, tgt)
        url = f"http://127.0.0.1:{self.port}/completion"
        req_data = json.dumps(
            {
                "prompt": prompt,
                "temperature": temperature,
                "stop": ["<end_of_turn>", "<eos>", "<start_of_turn>"],
                "n_predict": 1024,
            }
        ).encode("utf-8")
        req = urllib.request.Request(
            url, data=req_data, headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=300) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            content = data.get("content", "").strip()
            truncated = int(data.get("truncated", False))
            content = fix_asian_numeric_hallucinations(text, content, tgt)
            return content, truncated

    def chunk_sentences(self, sentences, src):
        chunks = []
        current = []
        current_tokens = 0
        for sentence in sentences:
            tokens = self.count_tokens(sentence, src)
            if tokens > TRANSLATEGEMMA_SAFE_INPUT_TOKENS:
                if current:
                    chunks.append(current)
                    current = []
                    current_tokens = 0
                chunks.extend(self.chunk_sentences(self.subdivide(sentence, src), src))
                continue
            if current and current_tokens + 1 + tokens > TRANSLATEGEMMA_SAFE_INPUT_TOKENS:
                chunks.append(current)
                current = []
                current_tokens = 0
            current.append(sentence)
            current_tokens += 1 + tokens if current_tokens else tokens
        if current:
            chunks.append(current)
        return chunks

    def subdivide(self, sentence, src):
        clauses = split_clauses(sentence)
        if len(clauses) > 1 and all(
            self.count_tokens(clause, src) <= TRANSLATEGEMMA_SAFE_INPUT_TOKENS for clause in clauses
        ):
            return clauses
        words = sentence.split()
        hard = []
        piece = []
        piece_tokens = 0
        for word in words:
            tokens = self.count_tokens(word, src)
            if piece and piece_tokens + 1 + tokens > TRANSLATEGEMMA_SAFE_INPUT_TOKENS:
                hard.append(" ".join(piece))
                piece = []
                piece_tokens = 0
            piece.append(word)
            piece_tokens += 1 + tokens if piece_tokens else tokens
        if piece:
            hard.append(" ".join(piece))
        if len(hard) > 1:
            log({"event": "hard-split", "tokens": self.count_tokens(sentence, src)})
        return hard or [sentence]

    def refine_units(self, units, src):
        if len(units) > 1:
            half = len(units) // 2
            return [units[:half], units[half:]]
        clauses = split_clauses(units[0])
        if len(clauses) > 1:
            return self.chunk_sentences(clauses, src)
        words = units[0].split()
        if len(words) > 1:
            half = len(words) // 2
            return [[" ".join(words[:half])], [" ".join(words[half:])]]
        return None

    def translate_chunks(self, chunks, src, tgt, depth=0):
        results = [None] * len(chunks)
        truncated_flags = [0] * len(chunks)
        for index, chunk in enumerate(chunks):
            text = " ".join(chunk)
            output, truncated = self.generate_single(text, src, tgt)
            results[index] = output
            truncated_flags[index] = truncated

        for chunk_index, text in enumerate(results):
            source_chunk = " ".join(chunks[chunk_index])
            fidelity_ok, fidelity_msg = check_numeric_fidelity(source_chunk, text, tgt)
            if truncated_flags[chunk_index]:
                reason = "model output hit the context token ceiling"
            elif not text.strip():
                reason = "model returned empty output"
            elif is_degenerate(text):
                reason = "model output degenerates into repetition"
            elif "<start_of_turn>" in text or "You are a professional" in text:
                reason = "model leaked prompt template"
            elif not fidelity_ok:
                reason = f"numeric fidelity mismatch ({src}->{tgt}): {fidelity_msg}"
            else:
                continue

            if depth >= 4:
                raise TranslationError(
                    f"{reason} ({src}->{tgt}); "
                    "rephrase the source or translate manually"
                )
            finer = self.refine_units(chunks[chunk_index], src)
            if finer is None:
                raise TranslationError(
                    f"{reason} ({src}->{tgt}); "
                    "rephrase the source or translate manually"
                )
            results[chunk_index] = " ".join(
                self.translate_chunks(finer, src, tgt, depth + 1)
            )
        return results

    def prepare_chunks(self, core, src):
        if self.count_tokens(core, src) <= TRANSLATEGEMMA_SAFE_INPUT_TOKENS:
            return [[core]]
        sentences = split_sentences(core) or [core]
        chunks = self.chunk_sentences(sentences, src)
        reconstructed = " ".join(" ".join(chunk) for chunk in chunks)
        if " ".join(reconstructed.split()) != " ".join(core.split()):
            raise TranslationError("source coverage changed during token subdivision")
        return chunks

    def translate_segments(self, segments, src, tgt):
        plans = []
        chunks = []
        source_characters = 0
        subdivided_segments = 0
        for segment in segments:
            if not segment.strip():
                plans.append({"original": segment})
                continue
            leading = segment[: len(segment) - len(segment.lstrip())]
            trailing = segment[len(segment.rstrip()) :]
            core = segment.strip()
            prepared = self.prepare_chunks(core, src)
            start = len(chunks)
            chunks.extend(prepared)
            plans.append(
                {
                    "leading": leading,
                    "trailing": trailing,
                    "start": start,
                    "count": len(prepared),
                }
            )
            source_characters += len(core)
            if len(prepared) > 1:
                subdivided_segments += 1

        translated_chunks = self.translate_chunks(chunks, src, tgt) if chunks else []
        translations = []
        for plan in plans:
            if "original" in plan:
                translations.append(plan["original"])
                continue
            start = plan["start"]
            end = start + plan["count"]
            translated = " ".join(translated_chunks[start:end]).strip()
            translations.append(f"{plan['leading']}{translated}{plan['trailing']}")

        input_lengths = [self.count_tokens(" ".join(chunk), src) for chunk in chunks]
        stats = {
            "sourceCharacters": source_characters,
            "chunks": len(chunks),
            "subdividedSegments": subdivided_segments,
            "maxInputTokens": max(input_lengths) if input_lengths else 0,
        }
        return translations, stats

    def handle(self, request):
        if not isinstance(request, dict):
            raise TranslationError("request must be a JSON object")
        source = request.get("sourceLocale")
        target = request.get("targetLocale")
        segments = request.get("segments")
        if source != SOURCE_LOCALE:
            raise TranslationError(f"unsupported source locale {source!r}")
        if target not in LANG_MAP:
            raise TranslationError(f"unsupported target locale {target!r}")
        if not isinstance(segments, list) or any(
            not isinstance(item, str) for item in segments
        ):
            raise TranslationError("segments must be a list of strings")
        translations, stats = self.translate_segments(segments, source, target)
        for position, (segment, translated) in enumerate(zip(segments, translations)):
            if segment.strip() and not translated.strip():
                raise TranslationError(
                    f"segment {position}: model returned empty output ({source}->{target})"
                )
        log(
            {
                "event": "translated",
                "pair": f"{source}->{target}",
                "segments": len(segments),
                **stats,
            }
        )
        return translations, stats

class M2M100Engine:
    def __init__(self):
        import torch
        from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer

        threads = os.environ.get("M2M100_THREADS")
        if threads:
            torch.set_num_threads(max(1, int(threads)))
        logging.getLogger("transformers.tokenization_utils_base").addFilter(
            _LengthWarningFilter()
        )
        log({"event": "load", "model": M2M100_MODEL_ID, "revision": M2M100_REVISION})
        self.torch = torch
        self.tokenizer = M2M100Tokenizer.from_pretrained(
            M2M100_MODEL_ID, revision=M2M100_REVISION, cache_dir=CACHE_DIR
        )
        self.model = M2M100ForConditionalGeneration.from_pretrained(
            M2M100_MODEL_ID, revision=M2M100_REVISION, cache_dir=CACHE_DIR
        )
        self.model.eval()
        missing = [
            code
            for code in sorted(set(M2M100_LANG_MAP.values()))
            if code not in self.tokenizer.lang_code_to_id
        ]
        if missing:
            raise TranslationError(f"tokenizer lacks language codes: {missing}")
        log(
            {
                "event": "ready",
                "model": M2M100_MODEL_ID,
                "revision": M2M100_REVISION,
                "safeInputTokens": SAFE_INPUT_TOKENS,
                "batchSize": BATCH_SIZE,
                "threads": torch.get_num_threads(),
            }
        )

    def count_tokens(self, text, src):
        self.tokenizer.src_lang = src
        return len(self.tokenizer.encode(text, add_special_tokens=True))

    def chunk_sentences(self, sentences, src):
        chunks = []
        current = []
        current_tokens = 0
        for sentence in sentences:
            tokens = self.count_tokens(sentence, src)
            if tokens > SAFE_INPUT_TOKENS:
                if current:
                    chunks.append(current)
                    current = []
                    current_tokens = 0
                for clause in self.subdivide(sentence, src):
                    clause_tokens = self.count_tokens(clause, src)
                    if (
                        current
                        and current_tokens + 1 + clause_tokens > SAFE_INPUT_TOKENS
                    ):
                        chunks.append(current)
                        current = []
                        current_tokens = 0
                    current.append(clause)
                    current_tokens += (
                        1 + clause_tokens if current_tokens else clause_tokens
                    )
                continue
            if current and current_tokens + 1 + tokens > SAFE_INPUT_TOKENS:
                chunks.append(current)
                current = []
                current_tokens = 0
            current.append(sentence)
            current_tokens += 1 + tokens if current_tokens else tokens
        if current:
            chunks.append(current)
        return chunks

    def subdivide(self, sentence, src):
        clauses = split_clauses(sentence)
        if len(clauses) > 1 and all(
            self.count_tokens(clause, src) <= SAFE_INPUT_TOKENS for clause in clauses
        ):
            return clauses
        words = sentence.split()
        hard = []
        piece = []
        piece_tokens = 0
        for word in words:
            tokens = self.count_tokens(word, src)
            if piece and piece_tokens + 1 + tokens > SAFE_INPUT_TOKENS:
                hard.append(" ".join(piece))
                piece = []
                piece_tokens = 0
            piece.append(word)
            piece_tokens += 1 + tokens if piece_tokens else tokens
        if piece:
            hard.append(" ".join(piece))
        if len(hard) > 1:
            log({"event": "hard-split", "tokens": self.count_tokens(sentence, src)})
        return hard or [sentence]

    def refine_units(self, units, src):
        if len(units) > 1:
            half = len(units) // 2
            return [units[:half], units[half:]]
        clauses = split_clauses(units[0])
        if len(clauses) > 1:
            return self.chunk_sentences(clauses, src)
        words = units[0].split()
        if len(words) > 1:
            half = len(words) // 2
            return [[" ".join(words[:half])], [" ".join(words[half:])]]
        return None

    def generate_batch(self, batch, src, tgt):
        self.tokenizer.src_lang = M2M100_LANG_MAP[src]
        tgt_token_id = self.tokenizer.get_lang_id(M2M100_LANG_MAP[tgt])
        encoded = self.tokenizer(
            batch,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=MODEL_HARD_LIMIT,
        )
        with self.torch.no_grad():
            outputs = self.model.generate(
                **encoded,
                forced_bos_token_id=tgt_token_id,
                max_length=MODEL_HARD_LIMIT,
                num_beams=NUM_BEAMS,
                no_repeat_ngram_size=NO_REPEAT_NGRAM,
            )
        decoded = self.tokenizer.batch_decode(outputs, skip_special_tokens=True)
        return [text.strip() for text in decoded]

    def translate_chunks(self, chunks, src, tgt, depth=0):
        results = [None] * len(chunks)
        pending_indices = list(range(len(chunks)))
        for offset in range(0, len(pending_indices), BATCH_SIZE):
            batch_indices = pending_indices[offset : offset + BATCH_SIZE]
            batch_texts = [" ".join(chunks[index]) for index in batch_indices]
            batch_outputs = self.generate_batch(batch_texts, src, tgt)
            for index, output in zip(batch_indices, batch_outputs):
                results[index] = output

        for chunk_index, text in enumerate(results):
            if not text.strip():
                reason = "model returned empty output"
            elif is_degenerate(text):
                reason = "model output degenerates into repetition"
            elif UNKNOWN_TOKEN in text:
                reason = "model produced unrepresentable token"
            else:
                continue

            if depth >= 4:
                raise TranslationError(
                    f"{reason} ({src}->{tgt}); "
                    "rephrase the source or translate manually"
                )
            finer = self.refine_units(chunks[chunk_index], src)
            if finer is None:
                raise TranslationError(
                    f"{reason} ({src}->{tgt}); "
                    "rephrase the source or translate manually"
                )
            results[chunk_index] = " ".join(
                self.translate_chunks(finer, src, tgt, depth + 1)
            )
        return results

    def prepare_chunks(self, core, src):
        if self.count_tokens(core, src) <= SAFE_INPUT_TOKENS:
            return [[core]]
        sentences = split_sentences(core) or [core]
        chunks = self.chunk_sentences(sentences, src)
        reconstructed = " ".join(" ".join(chunk) for chunk in chunks)
        if " ".join(reconstructed.split()) != " ".join(core.split()):
            raise TranslationError("source coverage changed during token subdivision")
        return chunks

    def translate_segments(self, segments, src, tgt):
        plans = []
        chunks = []
        source_characters = 0
        subdivided_segments = 0
        for segment in segments:
            if not segment.strip():
                plans.append({"original": segment})
                continue
            leading = segment[: len(segment) - len(segment.lstrip())]
            trailing = segment[len(segment.rstrip()) :]
            core = segment.strip()
            prepared = self.prepare_chunks(core, src)
            start = len(chunks)
            chunks.extend(prepared)
            plans.append(
                {
                    "leading": leading,
                    "trailing": trailing,
                    "start": start,
                    "count": len(prepared),
                }
            )
            source_characters += len(core)
            if len(prepared) > 1:
                subdivided_segments += 1

        translated_chunks = self.translate_chunks(chunks, src, tgt) if chunks else []
        translations = []
        for plan in plans:
            if "original" in plan:
                translations.append(plan["original"])
                continue
            start = plan["start"]
            end = start + plan["count"]
            translated = " ".join(translated_chunks[start:end]).strip()
            translations.append(f"{plan['leading']}{translated}{plan['trailing']}")

        input_lengths = [self.count_tokens(" ".join(chunk), src) for chunk in chunks]
        stats = {
            "sourceCharacters": source_characters,
            "chunks": len(chunks),
            "subdividedSegments": subdivided_segments,
            "maxInputTokens": max(input_lengths) if input_lengths else 0,
        }
        return translations, stats

    def handle(self, request):
        if not isinstance(request, dict):
            raise TranslationError("request must be a JSON object")
        source = request.get("sourceLocale")
        target = request.get("targetLocale")
        segments = request.get("segments")
        if source != SOURCE_LOCALE:
            raise TranslationError(f"unsupported source locale {source!r}")
        if target not in LANG_MAP:
            raise TranslationError(f"unsupported target locale {target!r}")
        if not isinstance(segments, list) or any(
            not isinstance(item, str) for item in segments
        ):
            raise TranslationError("segments must be a list of strings")
        translations, stats = self.translate_segments(segments, source, target)
        for position, (segment, translated) in enumerate(zip(segments, translations)):
            if segment.strip() and not translated.strip():
                raise TranslationError(
                    f"segment {position}: model returned empty output ({source}->{target})"
                )
        log(
            {
                "event": "translated",
                "pair": f"{source}->{target}",
                "segments": len(segments),
                **stats,
            }
        )
        return translations, stats

def respond(payload):
    sys.stdout.write(json.dumps(payload, ensure_ascii=True) + "\n")
    sys.stdout.flush()

def serve():
    engine = M2M100Engine() if ENGINE_TYPE == "m2m100" else TranslateGemmaEngine()
    respond(
        {
            "ready": True,
            "engine": ENGINE_TYPE,
            "model": M2M100_MODEL_ID if ENGINE_TYPE == "m2m100" else CANONICAL_MODEL_ID,
            "revision": M2M100_REVISION if ENGINE_TYPE == "m2m100" else CANONICAL_REVISION,
            "safeInputTokens": getattr(engine, "safe_tokens", TRANSLATEGEMMA_SAFE_INPUT_TOKENS),
        }
    )
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            request = json.loads(line)
        except json.JSONDecodeError as error:
            respond({"id": None, "error": f"invalid JSON request: {error}"})
            continue
        request_id = request.get("id") if isinstance(request, dict) else None
        try:
            translations, stats = engine.handle(request)
        except TranslationError as error:
            respond({"id": request_id, "error": str(error)})
        except Exception as error:
            log({"event": "fatal", "error": f"{type(error).__name__}: {error}"})
            respond(
                {
                    "id": request_id,
                    "error": f"internal worker failure: {type(error).__name__}",
                }
            )
        else:
            respond({"id": request_id, "translations": translations, "stats": stats})
    log({"event": "shutdown"})

def self_test():
    failures = []

    def check(name, condition, detail=""):
        status_label = "ok" if condition else "FAIL"
        sys.stdout.write(f"[{status_label}] {name} {detail}\n".rstrip() + "\n")
        sys.stdout.flush()
        if not condition:
            failures.append(name)

    print("=== TRANSLATION WORKER SELF-TEST ===")
    print(f"Engine requested: {ENGINE_TYPE}")

    if ENGINE_TYPE == "m2m100":
        print("Testing M2M100 engine...")
        try:
            from transformers import M2M100Tokenizer
            tokenizer = M2M100Tokenizer.from_pretrained(
                M2M100_MODEL_ID, revision=M2M100_REVISION, cache_dir=CACHE_DIR
            )
        except Exception as error:
            print(f"[FAIL] load tokenizer: {error}")
            return 1
        missing = [
            code for code in sorted(set(M2M100_LANG_MAP.values())) if code not in tokenizer.lang_code_to_id
        ]
        check("language codes", not missing, f"missing={missing}")
        print("SELF-TEST " + ("OK" if not failures else f"FAILED: {failures}"))
        return 0 if not failures else 1

    try:
        engine = TranslateGemmaEngine()
        check("init TranslateGemmaEngine", True)
    except Exception as e:
        check("init TranslateGemmaEngine", False, str(e))
        return 1

    check(
        "all 7 locales supported",
        len(LANG_MAP) == 8 and all(k in LANG_MAP for k in ["en", "es", "de", "pt-br", "it", "ja", "zh-cn"]),
    )

    sample = "La dynamique des fluides modélise l'encre et l'eau avec rigueur."
    tokens = engine.count_tokens(sample, "fr")
    check("tokenize endpoint", tokens > 0, f"tokens={tokens}")

    # Quantitative fidelity validation sanity checks (instantaneous, no inference)
    check("numeric 0,003% fr->en", check_numeric_fidelity("0,003 %", "0.003%", "en")[0])
    check("numeric 380 000 fr->en", check_numeric_fidelity("380 000 ans", "380,000 years", "en")[0])
    check("numeric 380 000 fr->de", check_numeric_fidelity("380 000 ans", "380.000 Jahre", "de")[0])
    check("numeric 380 000 fr->ja", check_numeric_fidelity("380 000 ans", "38万年", "ja")[0])
    check("numeric 2,5M fr->zh", check_numeric_fidelity("2,5 millions", "250万", "zh-cn")[0])
    check("numeric 10,625 fr->en", check_numeric_fidelity("10,625/15", "10.625/15", "en")[0])

    # Fast single inference sanity check
    critical_source = "Il y a quelque chose de profondément trompeur dans le ciel."
    en_translation, _ = engine.generate_single(critical_source, "fr", "en")
    check("generate EN", bool(en_translation), f"out={en_translation}")
    check(
        "ciel translated as sky, not heaven",
        "sky" in en_translation.lower() and "heaven" not in en_translation.lower(),
        f"out={en_translation}",
    )

    print("SELF-TEST " + ("OK" if not failures else f"FAILED: {failures}"))
    engine.close()
    return 0 if not failures else 1

def quality_test():
    failures = []

    def check(name, condition, detail=""):
        status_label = "ok" if condition else "FAIL"
        sys.stdout.write(f"[{status_label}] {name} {detail}\n".rstrip() + "\n")
        sys.stdout.flush()
        if not condition:
            failures.append(name)

    print("=== TRANSLATION WORKER FULL QUALITY REGRESSION TEST ===")
    try:
        engine = TranslateGemmaEngine()
    except Exception as e:
        print(f"[FAIL] init TranslateGemmaEngine: {e}")
        return 1

    passages = [
        (
            "p1_moon",
            "La lumière de la Lune met environ **1,3 seconde** à nous atteindre. Celle du Soleil met environ **8 minutes et 20 secondes** pour parcourir les quelque 150 millions de kilomètres qui nous en séparent.",
            lambda loc, out: ("1.3" in out or "1,3" in out) and "**" in out and ("illuminates" not in out.lower())
        ),
        (
            "p2_lightspeed",
            "La lumière voyage dans le vide à environ **300 000 kilomètres par seconde**. C'est extraordinairement rapide, mais ce n'est pas instantané. À l'échelle de l'Univers, même cette vitesse devient terriblement lente.",
            lambda loc, out: ("300" in out or "30万" in out) and "**" in out and ("." in out or "。" in out)
        ),
        (
            "p3_eclipse",
            "Une éclipse solaire n'est pas un événement qui se déroule **sur le Soleil**. Elle résulte de la Lune qui se place entre nous et les photons solaires.",
            lambda loc, out: "**" in out and ("Soleil" not in out or loc in ("fr",))
        ),
        (
            "p4_andromeda",
            "Lorsque nous observons Andromède ce soir, nous la voyons donc telle qu'elle était à une époque où, sur Terre, les premiers représentants du genre *Homo* existaient déjà, mais où notre espèce était encore très loin d'apparaître.",
            lambda loc, out: ("*Homo*" in out or "*homo*" in out.lower() or "ヒト属" in out) and ("Androm" in out or "Andróm" in out or "Andrôm" in out or "アンドロメダ" in out or "安德罗" in out or "仙女" in out)
        ),
        (
            "p5_table_row",
            "| Fond diffus cosmologique | Univers âgé d'environ 380 000 ans |",
            lambda loc, out: ("universe" in out.lower() if loc == "en" else "university" not in out.lower()) and ("大学" not in out if loc in ("ja", "zh-cn") else True)
        ),
    ]

    locales = ["en", "es", "de", "pt-br", "it", "ja", "zh-cn"]

    for pid, text, validator in passages:
        print(f"\n--- Testing passage: {pid} ---")
        for loc in locales:
            try:
                out, _ = engine.generate_single(text, "fr", loc)
                passed = validator(loc, out)
                check(f"{pid} [{loc}]", passed, f"out={out[:80]}")
            except Exception as ex:
                check(f"{pid} [{loc}]", False, f"exception={ex}")

    engine.close()
    print("\nQUALITY TEST " + ("OK" if not failures else f"FAILED: {failures}"))
    return 0 if not failures else 1

if __name__ == "__main__":
    if "--quality-test" in sys.argv:
        sys.exit(quality_test())
    if "--self-test" in sys.argv:
        sys.exit(self_test())
    serve()
