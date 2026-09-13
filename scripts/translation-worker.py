#!/usr/bin/env python3
import json
import logging
import os
import re
import sys

MODEL_ID = os.environ.get("M2M100_MODEL", "facebook/m2m100_418M")
REVISION = os.environ.get("M2M100_REVISION", "55c2e61bbf05dfb8d7abccdc3fae6fc8512fd636")
CACHE_DIR = (
    os.environ.get("HF_HOME")
    or os.environ.get("HF_HUB_CACHE")
    or os.environ.get("TRANSFORMERS_CACHE")
    or None
)
LANG_MAP = {
    "fr": "fr",
    "en": "en",
    "es": "es",
    "de": "de",
    "pt-br": "pt",
    "it": "it",
    "ja": "ja",
    "zh-cn": "zh",
}
SOURCE_LOCALE = "fr"
MODEL_HARD_LIMIT = 1024
SAFE_INPUT_TOKENS = int(os.environ.get("M2M100_SAFE_TOKENS", "200"))
BATCH_SIZE = int(os.environ.get("M2M100_BATCH", "4"))
NUM_BEAMS = 5
NO_REPEAT_NGRAM = 3
UNKNOWN_TOKEN = "<unk>"


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


class Engine:
    def __init__(self):
        import torch
        from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer

        threads = os.environ.get("M2M100_THREADS")
        if threads:
            torch.set_num_threads(max(1, int(threads)))
        logging.getLogger("transformers.tokenization_utils_base").addFilter(
            _LengthWarningFilter()
        )
        log({"event": "load", "model": MODEL_ID, "revision": REVISION})
        self.torch = torch
        self.tokenizer = M2M100Tokenizer.from_pretrained(
            MODEL_ID, revision=REVISION, cache_dir=CACHE_DIR
        )
        self.model = M2M100ForConditionalGeneration.from_pretrained(
            MODEL_ID, revision=REVISION, cache_dir=CACHE_DIR
        )
        self.model.eval()
        missing = [
            code
            for code in sorted(set(LANG_MAP.values()))
            if code not in self.tokenizer.lang_code_to_id
        ]
        if missing:
            raise TranslationError(f"tokenizer lacks language codes: {missing}")
        log(
            {
                "event": "ready",
                "model": MODEL_ID,
                "revision": REVISION,
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

    def generate_batch(self, texts, src, tgt):
        torch = self.torch
        self.tokenizer.src_lang = src
        bos = self.tokenizer.get_lang_id(tgt)
        eos = self.tokenizer.eos_token_id
        inputs = self.tokenizer(
            texts, return_tensors="pt", padding=True, truncation=False
        )
        input_lengths = inputs["attention_mask"].sum(dim=1).tolist()
        if any(length > SAFE_INPUT_TOKENS for length in input_lengths):
            raise TranslationError(
                f"input exceeded safe token limit: max={max(input_lengths)} "
                f"limit={SAFE_INPUT_TOKENS}"
            )
        with torch.no_grad():
            generated = self.model.generate(
                **inputs,
                forced_bos_token_id=bos,
                num_beams=NUM_BEAMS,
                max_length=MODEL_HARD_LIMIT,
                length_penalty=1.0,
                no_repeat_ngram_size=NO_REPEAT_NGRAM,
            )
        outputs = self.tokenizer.batch_decode(generated, skip_special_tokens=True)
        truncated = [int(eos not in row.tolist()) for row in generated]
        return outputs, truncated

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
        order = sorted(range(len(chunks)), key=lambda i: -len(" ".join(chunks[i])))
        results = [None] * len(chunks)
        truncated_flags = [0] * len(chunks)
        for start in range(0, len(order), BATCH_SIZE):
            batch_idx = order[start : start + BATCH_SIZE]
            texts = [" ".join(chunks[i]) for i in batch_idx]
            outputs, truncated = self.generate_batch(texts, src, tgt)
            for rank, chunk_index in enumerate(batch_idx):
                results[chunk_index] = outputs[rank]
                truncated_flags[chunk_index] = truncated[rank]
        for chunk_index, text in enumerate(results):
            if truncated_flags[chunk_index]:
                reason = f"model output hit the {MODEL_HARD_LIMIT}-token ceiling"
            elif not text.strip():
                reason = "model returned empty output"
            elif UNKNOWN_TOKEN in text:
                reason = "model kept unknown words untranslated"
            elif is_degenerate(text):
                reason = "model output degenerates into repetition"
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
        sentences = split_sentences(core) or [core]
        chunks = []
        for sentence in sentences:
            if self.count_tokens(sentence, src) <= SAFE_INPUT_TOKENS:
                chunks.append([sentence])
            else:
                chunks.extend(self.chunk_sentences([sentence], src))
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
        src = LANG_MAP[source]
        tgt = LANG_MAP[target]
        translations, stats = self.translate_segments(segments, src, tgt)
        for position, (segment, translated) in enumerate(zip(segments, translations)):
            if segment.strip() and not translated.strip():
                raise TranslationError(
                    f"segment {position}: model returned empty output "
                    f"({source}->{target})"
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
    engine = Engine()
    respond(
        {
            "ready": True,
            "model": MODEL_ID,
            "revision": REVISION,
            "safeInputTokens": SAFE_INPUT_TOKENS,
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
    from transformers import M2M100Tokenizer

    failures = []

    def check(name, condition, detail=""):
        print(f"[{'ok' if condition else 'FAIL'}] {name} {detail}".rstrip())
        if not condition:
            failures.append(name)

    try:
        tokenizer = M2M100Tokenizer.from_pretrained(
            MODEL_ID, revision=REVISION, cache_dir=CACHE_DIR
        )
    except Exception as error:
        print(f"[FAIL] load tokenizer: {error}")
        return 1
    missing = [
        code
        for code in sorted(set(LANG_MAP.values()))
        if code not in tokenizer.lang_code_to_id
    ]
    check("language codes", not missing, f"missing={missing}")
    try:
        ids = {locale: tokenizer.get_lang_id(code) for locale, code in LANG_MAP.items()}
        check(
            "bos ids",
            len(set(ids.values())) == len(ids),
            f"ids={sorted(set(ids.values()))}",
        )
    except Exception as error:
        check("bos ids", False, str(error))
    tokenizer.src_lang = "fr"
    sample = "La dynamique des fluides modélise l'encre et l'eau avec rigueur."
    tokens = tokenizer.encode(sample, add_special_tokens=True)
    check("tokenize", len(tokens) > 0, f"tokens={len(tokens)}")
    hard = tokenizer.model_max_length
    check("model limit", hard >= MODEL_HARD_LIMIT, f"model_max_length={hard}")

    sentences = split_sentences(
        "Première phrase. M. Dupont écrit etc. puis continue! Vraiment? Oui… Voilà."
    )
    check("sentences", len(sentences) == 5, f"got={sentences}")
    clauses = split_clauses(
        "Une très longue phrase; avec plusieurs clauses: il faut la découper proprement."
    )
    check("clauses", len(clauses) >= 3, f"got={clauses}")

    long_text = " ".join(
        f"Ceci est la phrase numéro {n} d'un long paragraphe de validation."
        for n in range(120)
    )
    long_sentences = split_sentences(long_text)
    fake_counts = [len(s.split()) * 2 for s in long_sentences]
    groups, current, budget = [], [], 0
    for sentence, cost in zip(long_sentences, fake_counts):
        if current and budget + cost > SAFE_INPUT_TOKENS:
            groups.append(current)
            current, budget = [], 0
        current.append(sentence)
        budget += cost
    if current:
        groups.append(current)
    rejoined = " ".join(" ".join(group) for group in groups)
    check(
        "chunking",
        len(groups) > 1 and rejoined == long_text,
        f"groups={len(groups)} sentences={len(long_sentences)}",
    )

    probe = Engine.__new__(Engine)
    probe.tokenizer = tokenizer
    real_chunks = probe.chunk_sentences(long_sentences, "fr")
    real_counts = [
        len(tokenizer.encode(" ".join(chunk), add_special_tokens=True))
        for chunk in real_chunks
    ]
    covered = [s for chunk in real_chunks for s in chunk]
    check(
        "real chunks",
        len(real_chunks) > 1
        and all(count <= SAFE_INPUT_TOKENS + 2 for count in real_counts)
        and covered == long_sentences,
        f"chunks={len(real_chunks)} max={max(real_counts) if real_counts else 0}",
    )
    multi = probe.refine_units(["a", "b", "c"], "fr")
    check("refine multi", multi == [["a"], ["b", "c"]], f"got={multi}")
    single = probe.refine_units(["Première partie; seconde partie: fin."], "fr")
    check(
        "refine clauses",
        single is not None and len(single) >= 1,
        f"got={single}",
    )
    wordy = probe.refine_units(["mot"], "fr")
    check("refine irreducible", wordy is None, f"got={wordy}")
    check(
        "degenerate",
        is_degenerate("mot " * 6 + "fin")
        and is_degenerate("ok " + "点" * 8)
        and is_degenerate(" ".join(["alpha"] * 8 + ["beta"] * 8))
        and not is_degenerate("Une phrase normale et variée sans répétition abusive."),
    )
    print("SELF-TEST " + ("OK" if not failures else f"FAILED: {failures}"))
    return 0 if not failures else 1


if __name__ == "__main__":
    if "--self-test" in sys.argv:
        sys.exit(self_test())
    serve()
