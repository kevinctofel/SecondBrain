#!/usr/bin/env python3
"""
Add missing front-matter descriptions to migrated blog posts.

For each .md file in Articles/ and Journal/ that has front matter with a
`title` but no `description`, generate a brief description from the first
meaningful paragraph of the body and insert it into the front matter.

Usage:
  python3 add_descriptions.py --dry-run    # preview changes
  python3 add_descriptions.py --apply      # write changes
"""

import os
import re
import sys

BASE = os.path.dirname(os.path.abspath(__file__))
FOLDERS = ["Articles", "Journal"]


def parse_front_matter(text):
    """Return (fm_lines, body, has_fm). fm_lines is list of raw YAML lines."""
    if not text.startswith("---"):
        return None, text, False
    end = text.find("---", 3)
    if end < 0:
        return None, text, False
    fm_block = text[3:end]
    body = text[end + 3:]
    fm_lines = fm_block.strip().split("\n")
    return fm_lines, body, True


def extract_first_paragraph(body):
    """Extract the first meaningful paragraph from the markdown body."""
    lines = body.strip().split("\n")
    paragraph = []
    in_html_block = False
    for line in lines:
        stripped = line.strip()
        # Track HTML block state
        if stripped.startswith("<script") or stripped.startswith("<iframe") or \
           stripped.startswith("<style") or stripped.startswith("<div") or \
           stripped.startswith("<table") or stripped.startswith("<pre"):
            in_html_block = True
            continue
        if in_html_block:
            if "</" in stripped:
                in_html_block = False
            continue
        # Skip empty lines, headings, images, horizontal rules
        if not stripped:
            if paragraph:
                break
            continue
        if stripped.startswith("#") or stripped.startswith("![") or \
           stripped.startswith("---") or stripped.startswith("```") or \
           stripped.startswith("%%"):
            if paragraph:
                break
            continue
        paragraph.append(stripped)
    if not paragraph:
        return ""
    return " ".join(paragraph)


def strip_markdown(text):
    """Remove markdown formatting for a clean plain-text summary."""
    # Remove links: [text](url) -> text
    text = re.sub(r"\[([^\]]*)\]\([^)]+\)", r"\1", text)
    # Remove wikilinks: [[text]] -> text
    text = re.sub(r"\[\[([^\]]*)\]\]", r"\1", text)
    # Remove bold/italic markers
    text = re.sub(r"(\*{1,3}|_{1,3})([^*_$]+)\1", r"\2", text)
    # Remove inline code
    text = re.sub(r"`([^`]+)`", r"\1", text)
    # Remove HTML tags
    text = re.sub(r"<[^>]+>", "", text)
    # Clean up whitespace
    text = re.sub(r"\s+", " ", text).strip()
    # Remove zero-width characters
    text = text.replace("\ufeff", "").replace("\u200b", "")
    return text


def make_description(body):
    """Create a brief description from the first paragraph."""
    raw = extract_first_paragraph(body)
    if not raw:
        return ""
    clean = strip_markdown(raw)
    # Trim to a sensible length (existing descs are ~40-100 chars)
    if len(clean) > 120:
        # Try to cut at a sentence boundary
        cut = clean[:120]
        # Find last period or comma
        for sep in [".", ",", " "]:
            idx = cut.rfind(sep)
            if idx > 40:
                cut = cut[:idx]
                break
        clean = cut.rstrip(", ") + "…"
    return clean


def process_file(path, dry_run=True):
    """Add description to a single file. Returns (action, description) or None."""
    with open(path) as f:
        text = f.read()

    fm_lines, body, has_fm = parse_front_matter(text)
    if not has_fm:
        return None  # skip files without front matter

    # Check if description already exists
    has_desc = any(line.strip().startswith("description:") for line in fm_lines)
    if has_desc:
        return None

    # Must have a title
    has_title = any(line.strip().startswith("title:") for line in fm_lines)
    if not has_title:
        return None

    desc = make_description(body)
    if not desc:
        return None

    # Insert description after the title line
    new_fm_lines = []
    for line in fm_lines:
        new_fm_lines.append(line)
        if line.strip().startswith("title:"):
            new_fm_lines.append(f'description: {desc}')

    # Rebuild file
    new_text = "---\n" + "\n".join(new_fm_lines) + "\n---" + body

    rel = os.path.relpath(path, BASE)
    if dry_run:
        print(f"  {rel}")
        print(f"    + description: {desc}")
    else:
        with open(path, "w") as f:
            f.write(new_text)
        print(f"  ✅ {rel}")
        print(f"     description: {desc}")

    return ("added", desc)


def main():
    dry_run = "--dry-run" in sys.argv
    apply_mode = "--apply" in sys.argv

    if dry_run == apply_mode:
        print("Usage: python3 add_descriptions.py --dry-run | --apply")
        sys.exit(1)

    # Collect all md files
    md_files = []
    for folder in FOLDERS:
        folder_path = os.path.join(BASE, folder)
        for root, _, files in os.walk(folder_path):
            for f in sorted(files):
                if f.endswith(".md"):
                    md_files.append(os.path.join(root, f))

    mode = "DRY RUN" if dry_run else "APPLY"
    print(f"=== Add Descriptions ({mode}) ===")
    print(f"Scanning {len(md_files)} markdown files...\n")

    added = 0
    skipped = 0
    for path in sorted(md_files):
        result = process_file(path, dry_run=dry_run)
        if result:
            added += 1
        else:
            skipped += 1

    print(f"\n{'=' * 50}")
    print(f"Mode:   {mode}")
    print(f"Added:  {added}")
    print(f"Skipped: {skipped}")
    if dry_run:
        print("Re-run with --apply to write changes.")


if __name__ == "__main__":
    main()
