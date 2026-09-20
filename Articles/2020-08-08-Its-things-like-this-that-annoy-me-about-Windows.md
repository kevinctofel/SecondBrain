---
title: "It's things like this that annoy me about Windows"
description: I was all set to share an interesting tech tidbit here this morning and was stopped in my tracks.
date: 2020-08-08
tags: [article, windows]
---
## Why do things just... break?

I was all set to share an interesting tech tidbit here this morning and was stopped in my tracks. 

Instead of blogging from my Chromebook (using Linux with Gatsby in VS Code), I hopped on the PC I built, since there are other things I want to do on later. 

[I've previously mentioned WSL](/n/articles/interesting-developing-in-ubuntu-through-vs-code-running-in-wsl2-1/), the Windows Subsystem for Linux, which so far has been great. It basically replicates the Linux experience I have on my Chromebook, even if it's architected slightly different.

I went to fire up Ubuntu in a VM on Windows 10, as I've done time and time in the past, only to be greeted by this:

Ok, that's odd. So no VM platform means no VM to run Ubuntu. Just to be sure I still has WSL installed, I checked and that seems fine.

So what's the troubleshooting recommended by Microsoft? Check and make sure the Virtual Machine Platform feature is enabled. Obviously it was in the past, since I've used this feature, but maybe something trigged the feature to a disabled state.

Ok, I'll take a trip to Control Panel -> Programs and Features -> Turn Windows features on or off. Let's click the feature and get going.

Oh wait. This is what I see:

Yeah, it's already on. It's been on. And I leave it on. 

Sigh.

I did some digging online to see what might be the issue and how to rectify it but I stopped after 15 minutes. 

My time is too valuable to figure out what I didn't change on my system that caused this to happen. I have better things to do. So back to the Chromebook I go...
