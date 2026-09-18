---
title: "Getting JavaScript-y with APIs, even if it's hard to secure the keys"
date: 2020-06-06
tags: [article, javascript]
---
## School's out for summer!

My spring semster ended about a month ago in a whimper as the pandemic hit smack dab in the middle of March. The college quickly shifted to online learning. My particular class, web development with HTML & CSS actually was already an online course, so my workflow wasn't affected. 

However, the workload itself diminished as many other students had to transition from both online and in-person classes to all online learning. Most professors I know lighted the load for everyone during the transition. Probably a good idea; one that I would have leaned towards had I been in their shoes. (This ***is*** a possibility in the future: stay tuned!)

I do miss being on campus though. Even during this past online semester, I made it a point to meet up with fellow students a few times a week for workgroups, study sessions and general mentoring.

Anyway, I decided to take this summer off from classes. The main reason? Last summer's 10-week session on Data Structures & Algorithms was a bear. I learned a ton, of course, but worked super hard. I could use a break, but....

## I'm not taking a break from learning

I'm utterly fascinated now by web apps. Ironically, I thought I'd leverage my 10-course Software Engineering Certificate from the college into some type of mobile development. Now? I'm thinking not.

![JavaScript Textbook](../Images/javascript-textbook.jpg)

So in the fall, I'll be taking my JavaScript course. And me being me, can't wait, so I've been tinkering on my own with simple JavaScript projects for the past few weeks.

Here's one of them that lets you pick one of the three main crypto-currencies for a real-time price check. The script uses a web API to return the pricing information: Click [here to test the web app I have hosted on GitHub](https://java-script-seven.now.sh/).[^1]

![JavaScript Crypto Pricing](../Images/javascript-crypto-pricing.png)

Again, it's a simple little project; I wanted to do something with an API since web apps are often powered by APIs.

Aside from learning how to write a script and use an API, I also learned something from a security standpoint for which I'm not sure there's a great answer. 

## One key to rule them all

Many APIs, including the one I'm using, requires the private API key in a request. That makes my private key easy to read by anyone using my app. 

In this particular instance, I don't really care because I set the API permission to read-only status. That's all I need and it's good practice not to "take" any extra permissions your app won't use or need. Even so, this seems be a fundamental security hole in JavaScript.

Sure, you can [hide the key on the backend if you want to use a JavaScript framework](https://medium.com/better-programming/how-to-hide-your-api-keys-c2b952bc07e6). Or you could create your own API plugin to call; [here's an example of doing so in WordPress](https://gomakethings.com/keeping-api-credentials-secret-with-vanilla-javascript/). Google's own API best practices suggest [limiting the API calls to a specified web page or domain](https://developers.google.com/maps/api-key-best-practices): That won't hide the keys but they'll be useless from any other domain. Unfortunately, the API I'm using doesn't offer me that option, else I'd use it.

Again, there are ways to hide the keys from the frontend user but all of the ones I've seen require some backend functionality. There seems to be no true way to do this in a basic web app solely using native JavaScript and that shocks me.

[^1]: I'm still researching how to embed a script in a blog post; with the pages written in Markdown and then converted to HTML, I don't yet see an easy way to add scripts since Markdown is generally ignoring them.
