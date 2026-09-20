---
title: "It's been a... week"
description: What a long, busy week. I mentioned on Monday that I'm beginning to prep for my first JavaScript assessment…
date: 2022-12-04
tags: [article]
---
W﻿hat a long, busy week. I mentioned on Monday that I'm beginning to prep for my first JavaScript assessment. And I put a good 15 hours in on that effort. I also wrote five blog posts about Chromebooks, recorded an IoT podcast, and wrote the news for an IoT-related newsletter. Oh, and my own newsletter was written and published this morning.

A﻿side from that, we've been taking care of Norm, our Bichon. He took a tumble and landed awkwardly early in the week. The vet thinks he tore his ACL, so we're carrying him around the house from spot to spot. And to top it all off, I decided to participate in this year's [Advent of Code](https://www.adventofcode.com). 

## T﻿he inefficient elves of this year's Advent of Code

I﻿f you're not familiar with the AoC, it's a scored series of 25 daily coding challenges. The top scorers all tackle the challenge as soon as it goes live at midnight. Yeah, I'm not doing that. Instead, I get to the daily challenge when I get to it. 

And unlike most of the participants, solving these problems takes me longer. Like, a lot longer because I've only finished my first, basic JavaScript course at [Launch School](https://www.launchschool.com). I don't have the experience to plow through these coding problems in five minutes using advanced coding techniques.

I﻿'m generally OK with that. But thanks to the super inefficient elves that Santa hired -- all of the challenges so far revolve around them -- I've seen up to 2,500 lines of data used to test my solution. 

H﻿ere's an example showing the reason Santa needs a better hiring manager.

<iframe src="https://hachyderm.io/@kevinctofel/109449719901265504/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://hachyderm.io/embed.js" async="async"></script>

It's a little intimidating, but I'm learning a ton. And I realized after the first few days to focus my solution on a small subset of the input data. Once I "crack the code" so to speak, I can easily scale my solution up to the full data set. Regardless, these challenges have taken between 2 to 4 hours of each day.

## A﻿ solution to finding exactly what I'm searching for in my notes

E﻿arlier in the week, I also mentioned that I had 20,000 words of notes in Notion that I took during my JavaScript class. Notion is an excellent tool. However, I didn't use it in a way that makes my notes easily searchable. Instead of really long page of notes with section toggles for my class, I probably should have created individual pages for each concept.

B﻿ut I didn't. So searching in Notion generally returns large numbers of results that I have to manually sift through. I decided to research alternatives and came across [Dendron](https://www.dendron.so). 

I﻿t's a VS Code extension that supports Markdown notes. And it's meant to organize your notes in a way that makes them quickly searchable. By creating each note using a programming-like "dot" notation you can use the autocomplete function of VS Code to find exactly what you need in an instant. Check the Dendron site for an overview and demo in VS Code.

O﻿ne of the nice features is that Dendron can gather up all those Markdown files, which I sync to GitHub. Using those files and a Next.js template, it converts the Markdown notes to HTML pages that you can publish. 

I have my own little MDN docs site started now! Here's a brief look at the web output running locally on my Chromebook after taking just a few notes. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/RLnwbqEB1-k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

A﻿gain, Notion is fantastic. Had I organized my thoughts in a particular way from the get-go, I'd be using Notion for my JavaScript assessment preparations. Lesson learned!

## H﻿ello, RSS feed!

O﻿ne last update that's long overdue. Since I was on a roll with my coding this week, I added an RSS feed to this site. I write my posts using Markdown in a GitHub repo and whenever that repo is updated, Netlify creates and publishes the output using Gatsby. I did some research and found a Gatsby plug-in to create the RSS feed and once I successfully tested it on my local device, I pushed the change. 

S﻿o for the three of you that asked for an RSS feed: This one's for you! I haven't yet added an RSS button to the site but you can add https://www.kctofel.com/rss.xml to your favorite feedr eader to follow along, going forward. I still have comments and other features to implement but they'll have to wait. Santa's elves are borking things up again and I have to write some code now to address that problem!
