---
title: Week in review - Dec. 29, 2024
description: Another look at de-Googled phones, considering AI hardware and a 250 year old autobiography
date: 2024-12-29
tags: article
---

## Low productivity challenges

I missed updating my daily journal several times this past week. All of the non-journal days were those I worked 8 hour shifts. I've just been too tired to sit and write.

Something has to change, so I've started some new efforts.

First, I'm trying to get to sleep a little earlier. I often get up at 3:45am or 4:45am, depending on my work shift. So I'm going to be a good 30 to 60 minutes earlier than I used to. 

Second, my lack of energy probably has much to do with a lack of true exercise. Sure, I walk 5 to 8 miles per shift and that's good. But I need to do some actual, specific exercise too. Today I put in a 2 mile mix of walking and running on the treadmill, for example. 

Finally, I have to update my locally hosted web app that interacts with the Markdown files in my journal / second brain. I haven't yet deployed it to a server I can reach from anywhere; once I do, I can journal a bit during my 30 minute break at work and other free times throughout the day.

![My web notes user interface](../Images/web_notes-1200w.jpg)

## Lots of reading this week

After stumbling on to the [entire 51 volume Harvard Classics for $1.99 in Kindle format](https://www.amazon.com/Complete-Harvard-Classics-Eireann-Press-ebook/dp/B076PKKZ22), I've been devouring Benjamin Franklin's autobiography. It happens to be the first book in the volumes and I've learned so much this week.

Aside from being very interesting in general, I'm already realizing how much of Franklin's early life led him to appreciate frugality. This isn't a massive revelation, of course. However, it ties in nicely to the minimalism approach I use in my life.

Also, I found that I spent around an hour reading over that single cup of coffee. This might be a smart reading strategy on days I'm not working the morning shift: Read over that first cup of coffee.

## A de-Googled phone (again)

About two years ago, I tried some secure, private de-Googled phones but I didn't break away from my iPhone at the time. This week, I decided to give this solution another look.

![CalyxOS on a Google Pixel 7](../Images/CalyxOS-1200w.jpg)

I have a Pixel 7 that's still running [CalyxOS](https://calyxos.org/), which doesn't have any of Google's proprietary software. Yet I can still install anything from the Google Play Store (anonymously) and all of the apps I need do work. 

That includes my banking apps as well as the Tesla app. 
 
What's kept me around on iOS is the Apple Watch. I'm not 100% sure I **need** the Apple Watch but if I keep it, I need an iPhone. Something for me to ponder in the coming weeks.

## AI on the homelab?

I watched this [great hands on video of the new $249 Nvidia Jetson Orin Nano Super](https://youtu.be/QHBr8hekCzg?si=SK6-gT6279FKt9mX) and I wonder if there's a place for this low-powered AI-centric hardware in my homelab.

![Jetson Nano](../Images/Jetson_Nano-1200w.jpg)

Currently, I run Ollama in Linux for any AI projects but... the only device powerful enough to do so is my Lenovo gaming laptop with its Nvidia RTX 4060 mobile GPU. For $249, the Nvidia solution could be accessed from my homelab for any AI apps or projects at any time. 🤔

A Raspberry Pi could work for this but it would only generate about one token per second. The Jetson returns around 21 tokens per second, which is more than fast enough for tinkering.

There are downsides though: With only 8 GB of memory, I'd likely be limited to models with around 2B parameters. I have more RAM in the Lenovo (both dedicated and VRAM). 

Still for the kinds of projects I'd do, this limitation would be acceptable. And the Jetson runs on 15W of power. The RTX 4060 in my Lenovo laptop can use up to 100W of power by itself, not including the rest of the components.

## Some interesting videos I watched this week

Don't ask why but I was on a personal flight vehicle kick.

[Flying to In-N-Out on my paramotor](https://youtu.be/mBXAGUE91hg?si=bf5gfE0p993HFnIm) Not only does this guy fly himself over the Arizona desert to a burger joint, but he EATS his meal while flying home! It would be neat to try one of these vehicles as they're not crazy expensive (you can get a decent one for around five grand). But I'd never have a meal up in the air.

[Flying around on my human drone](https://youtu.be/gOSt8Q2PvWM?si=0tx21IvbZ1RWhYWm) Another wild video with an impressive electric-powered drone for transportation. Unfortunately, this one will set you back around $50k. Still, I'm impressed with these early personal flying machines.

[Flying an eVTOL for the first time](https://youtu.be/ZVL2yYYFW7Y?si=QbPQJkCUFrtA0lhA) Now we're entering into semi-practical toys for the rich because this thing will cost you around $125k. But again, it's incredible to watch personal transportation above the ground. Would love to get in one of these although I'd probably want one of my own (even though I can't afford it, don't think it's practical and don't live in an area I could readily use it.)

## Ideas, projects and to-dos

- [ ] Work on Wishlist application
- [ ] Investigate the difference between notes and articles using Eleventy Notes to see if this can all be tied together.
- [ ] Draft out a simple web clipping service I can create and self host to save thoughts to this Github repo
- [ ] Modify web app for note capture to save notes in a central folder.
- [ ] Test Calibre on the home server
