---
title: "AI broke my blog, and then fixed it"
description: With 6 years of posts across 3 sites, I decided to let AI consolidate all posts into one site. The migration was a good learning test, both for me and AI.
date: 2026-09-20
tags: [article, AI]
---
Like many others, I've been tinkering with AI. More specifically, I'm leaning heavily on local LLMs that I can run on my desktop and laptop. I've been doing that on two new-ish devices. I bought a Framework Desktop with 64 GB of unified memory as well as an ASUS ROG Strix gaming laptop that has an Nvidia RTX 5080 mobile GPU with 16 GB of VRAM.

I'll share more on models, agent harnesses and the like in the future. For now, I wanted to share my experience with a practical use for my setup: Migrating 6 years of blog posts between two old sites and this current one. 

The project was migrating years of older posts from two previous versions of my personal blog into the current version of kctofel.com. The content was spread across three Git repositories. Posts used different directory structures, front matter, image conventions, shortcodes and URL schemes. There were also duplicate posts, test content, missing images and internal links pointing at URLs that no longer matched the current site.

Rather than writing the migration myself, I gave the entire job to [Hermes Agent](https://hermes-agent.nousresearch.com/), running local language models on my laptop.

I used [llama.cpp](https://llama.app/) to serve multiple models locally and Hermes as the agentic harness that could inspect files, execute commands, write code and test its work. I tested the migration multiple times in three models: Qwen3.8 27B, Qwen Coder 30B, and Devstral Small 2 24B. Qwen3.8 27B turned out to be the most effective for this task. 

The AI wasn't simply asked to copy Markdown files. I wanted it to behave more like someone responsible for an actual migration.

It had to inspect the repositories, understand their different structures, identify legitimate posts, detect duplicates, preserve metadata and tags, migrate images, rewrite internal links and conform everything to the conventions of the current site.

It also had to write a reusable migration script supporting --dry-run and --apply, protect the source repositories from modification, validate its work and build the resulting website before declaring success.

My first round of tests deliberately didn't tell the models which repositories were the old sites and which was the current one. That turned out to test repository inference as much as coding ability. Some models made fundamental mistakes about which site was the destination.

For the second round, I removed that ambiguity: Gatsby and excellent_stream were the legacy sources; SecondBrain was the current kctofel.com destination.

One particularly interesting run used a local Qwen3.8 27B model.

With the repository roles explicitly provided, Qwen immediately began examining the actual site rather than spending time determining its topology. It inspected source posts, destination conventions, front matter, images, internal links and even the live site's URL structure.

It then wrote the migration software and—importantly—tested it against disposable copies before touching the real repository.

That caught several bugs. For example, date-prefixed filenames initially produced incorrect slugs. Some Markdown image formats escaped its regular expressions. Mixed-case legacy URLs needed additional handling. Journal URLs had different path behavior from Articles.

The model found and corrected these problems itself.

At around 4 million tokens, Qwen declared the migration complete. But I then gave it a neutral audit instruction: essentially, don't trust anything you previously concluded; independently verify everything from scratch.

That was where the experiment became particularly interesting. Qwen discovered that its supposedly completed migration wasn't actually production-ready.

Its independent audit found two legitimate posts that had silently disappeared. More seriously, an actual Eleventy build exposed 56 image-related errors, leaving 23 migrated posts without generated HTML. Nested Journal entries needed different relative image paths, one unusual source path had escaped conversion, and several old shortcodes would have appeared literally on the website.

Instead of telling the model what was wrong, I let it diagnose the failures itself.

It established a clean pre-migration build baseline, traced the failures to specific migration behavior and devised a recovery plan. I then allowed it to attempt the repairs. Again, it tested those repairs in a throwaway copy first.

The first repair still produced one error. Qwen investigated and corrected it. Further rendered-output inspection uncovered additional shortcodes it had missed. It corrected those too and rebuilt again. Only after the disposable copy passed did it apply the fixes to the real repository. The final Eleventy build completed with zero errors and 139 generated pages. Its validation reported 202 rendered image references with no missing files and no remaining legacy shortcodes in the generated HTML.

The entire process consumed roughly 10 million model tokens, generated locally at around 30–35 tokens per second. I made a note of that because I'm not using an API, and therefore paying, for those tokens. 

What interested me most wasn't that AI could write a migration script. That's increasingly unsurprising. What mattered was watching an AI agent make mistakes, test its assumptions, discover failures, revise its own code and eventually recover.

The first “Task Completed” message wasn't the end of the experiment. In fact, some of the most valuable work happened afterward.

That's probably the biggest lesson from this project: for substantial real-world AI work, the question isn't simply “Can the model do the task?”

A better question may be: Can it prove that it did the task correctly—and what happens when that proof shows that it didn't?

So all in all, an interesting experiment and tangible output. All of my old posts from 2020 onward are now here on my main site, which is where I'll continue to write going forward. 
