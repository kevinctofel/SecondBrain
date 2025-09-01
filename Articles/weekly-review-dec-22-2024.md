---
title: Week in review - Dec. 22, 2024
description: An early baby, eBooks on a home server, Witcher 3 upgrades, and my first mechanical keyboard mod 
date: 2024-12-22
tags: article
---

## A wild week

To say this was a crazy, stressful week would be an understatement. Aside from working 36 hours, which kept my tinkering time to a minimum, we're dealing with a medical challenge. I found out back in June that I'd be a grandfather for the first time. My step-daughter Sydney is due in late February early March. Only nobody told the baby.

![Ultrasound picture](../Images/IMG_0012-1200w.jpg)

Sydney's been in the hospital since Monday with bad contractions. With the baby only around 31 or so weeks, it's obviously early. So the hospital is monitoring both mother and daughter in a room next door to the NIC unit. Everyone is trying to hold off on the delivery but Sydney will be in the hospital until she delivers. That could be in hours, days or weeks.

My wife has been traveling back and forth to the hospital every other day or so this week, staying over a few times. Meanwhile, I've been working my shifts, keeping up to date on the situation and taking care of the cat and dog. 

Needless to say, everyone's stress levels are relatively high. This is where my Stoic adoption comes in handy: Worrying only about what I can control. Right now, it's not much, so I'm just trying to keep everyone steady and positive.

## Another app for the homelab server

Today I found an **amazing** deal on [the 51 volume Harvard Classics series for $1.99 in Amazon Kindle format](https://www.amazon.com/Complete-Harvard-Classics-Eireann-Press-ebook/dp/B076PKKZ22). These books in hardcover cost nearly $1,400 and are some of the best titles ever written in the humanities. That led me to getting my e-Books on the homelab server.

A quick search told me that there's a Docker image for Calibre, the fantastic open-source e-book management software. With it, I should be able to store all of my e-books locally and pull them to any of my devices as needed. I've only just installed the Docker image and haven't used it yet, so stay tuned for more about using Calibre on a home server.

## Mods for The Witcher 3 and my mechanical keyboard

I did have time to manage two modifications this week. One is for software and one is for hardware.

I found [a nearly 12 GB set of modifications for The Witcher 3](https://www.nexusmods.com/witcher3/mods/9963) this week and after installing them, the game looks on par with any modern AAA title. There are updated textures throughout the game, improved NPC renders, better foliage rendering, lighting effects and much, much more.

![Witcher3](../Images/Witcher3-1200w.jpg)

I decided to reduce the sound of my mechanical keyboard using some thin, plastic packing foam layers this week too. It only took the removal of four screws to take my Ducky keyboard apart and remove the deck. Then it was just a matter of cutting three of the foam sheets and trimming a hole for the wirje connecting the PCB and keyboard deck. 

![Open keyboard](../Images/open_keyboard-1200w.jpg)

I haven't trimmed the pieces to fully fit within the keyboard yet, mainly because I may add another layer or two. While it doesn't look good, the keyboard sounds much better!

![Modified keyboard](../Images/modified_keyboard-1200w.jpg)
One other small project I tackled is also keyboard related. But not for the mechanical keyboard. I run Arch Linux (...BTW) on my Dell XPS 15 and it has a fingerprint scanner in the power button. That feature doesn't work out of the box with Arch though. By installing the _fprint_ package and modifying some configuration files I was able to get the sensor working for basic system authentication.

![fprint package](../Images/IMG_0244-570w.jpg)

I've enrolled a finger and can log in to Linux with a touch but I don't yet have it working system wide, such as for passwords. That will will take a little more effort, which I hope to put in this coming week.

## Some great video content I enjoyed this week:

Since I had some time to sit around in a quiet house this week, I did catch some good videos. Here's a sampling:

- [Why Saudi Arabia is building a $1T city in the desert](https://youtu.be/UGzI-ABpy6k?si=Pricl3Vq4LuBwbRM) The Neom project has been in development for a few years now, so it's interesting to see the progress. I didn't realize they work on this 7x24. Also good to see perspective from the local nomadic tribes.

- [Why I disappeared](https://youtu.be/elOvC989LD0?si=CcYlzzgUQR2qwu7k) I've always enjoyed Matt D'Avella's take on minimalism and productivity. Then the videos stopped earlier this year. Matt explains why and I can certainly sympathize with his reasons of burnout after writing nearly 10,000 blog posts in 7 years some time ago.

- [You need to quit these 14 habits in 2025 (from the Stoics)](https://youtu.be/2ecHnmIGPdU?si=WH0mLqtHKivRbX1h) Ryan Holiday is my go-to guy for learning about Stoicism. And this list of 14 habits to break is a good one. I'm already on track with some of them but I have plenty of room for improvement in 2025.

- [Sony's breakthrough color TV](https://youtu.be/TOh3jEJGynA?si=Aesj6R4hWyS7xKhQ) I can't not watch a good retro gadget or device video. So this detailed history of color TV development in general, and Sony's creation of the Trinitron was superb. There are days I wish I could find an old Trinitron in good shape at a reasonable price.

## Ideas, projects and to-dos
- [ ] Work on Wishlist application
- [ ] Investigate the difference between notes and articles using Eleventy Notes to see if this can all be tied together.
- [ ] Draft out a simple web clipping service I can create and self host to save thoughts to this Github repo
- [ ] Modify web app for note capture to save notes in a central folder.
- [ ] Test Calibre on the home server
