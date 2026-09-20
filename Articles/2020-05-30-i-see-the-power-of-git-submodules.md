---
title: "Git sub-modules: I finally see the power"
description: As I noted in my last post, I'm still a n00b developer…
date: 2020-05-30
tags: [article, git]
---
As I noted in my last post, I'm still a n00b developer. So that's my defense in not knowing about [Git sub-modules](https://git-scm.com/book/en/v2/Git-Tools-Submodules), which have been around for years. 

## What's a Git submodule?

Essentially, as I understand it so far, Git sub-modules are linked external repos. So that allows me to add someone else's code repository in my own, but with a catch: Their repo is linked from my repo.

![Git Submodules](../Images/git-submodules.png)

## So what makes them powerful?

When I took my first year of Java classes in 2018, I remember using external packages, such as [Apache Commons](https://commons.apache.org/), for my code to gain additional functionality without my needing to write the code for it. 

Instead of writing code to caclulate complex numbers, I could just import [org.apache.commons.math3.complex](http://commons.apache.org/proper/commons-math/javadocs/api-3.6.1/index.html) and use the contstuctors and methods already written for complex numbers. 

I recall having doing a two step process:

1. Download the Apache Commons library into my Java project.
2. Enable it with an import statement at the top of my code.

I view Git sub-modules in roughly the same way, only there's nothing for me to download. Instead, I run a "git submodule add" command followed by the URL of the repo that has code I want to use in my repo.

## I used a submodule this blog theme

My eyes opened to this functionality when creating this site because I wanted to use a customizable design theme but I didn't want to build it myself. So I found the one I wanted on GitHub and added [its repo](https://github.com/MunifTanjim/minimo/tree/5ba20e1c26abb3c199ce72e7b3224f48775945ad) via a submodule into mine. 

Remember, all of the data on this site is actually stored in a Github repo, which is accessed by [Netlify](https;//www.Netlify.com); each time the repo changes, Netlify sees the change and uses [Hugo](https://goHugo.io) to create static page files, which are then served up by Netlify. There's no PHP, no database and no webserver for me to deal with.

As I continue to read more about sub-modules, I see that not everyone loves them. 

![Someone's not happy with submodules](../Images/dont-use-submodules.jpeg)

It seems there are potential pitfalls such as external repos getting updated and my repo not knowing about the changes. Or after an update, a change from the external repo could break something in my repo. I'll have to keep digging. 

Indeed, there's a [good article from Andrew Hoog about using themes with Github submodules](https://www.andrewhoog.com/post/git-submodule-for-hugo-themes/) that I'll have to go over with a fine tooth comb to see what those are and how best to deal with my theme as a submodule.

So far, however, using a Git submodule made it super simple to add theme functionality to my site. And I can see the potential power of adding external libraries of code with them. 

Now I just need to finish my theme customizations: So much to code, so little time!
