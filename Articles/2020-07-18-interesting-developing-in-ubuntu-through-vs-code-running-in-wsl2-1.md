---
title: "Interesting: Developing in Ubuntu through VS Code, running in WSL2"
date: 2020-07-18
tags: [article, vscode]
---
Late last month, I said I’d be looking into WSL, or the Windows Subsystem for Linux, which is still a work in progress and available for Windows 10.

If you’re not familiar with WSL, it’s an easy way to run just about any Linux distro in a VM within Windows. [Microsoft explains it better than I can](https://devblogs.microsoft.com/commandline/wsl-2-is-now-available-in-windows-insiders/).

The first version was a little slow due to the architecture, but now Microsoft has WSL2, which slips a very small but capable Linux kernel in the middle of the architecture, like so:

![](../Images/wsl-2-architecture.jpg)

This allows Windows 10 users to use Windows apps that interact quickly with Linux apps. For example, I installed and configured WSL2 and then grabbed Ubuntu from the Microsoft Store. (YES, the Microsoft Store is where you get the distros!)

I upgrade Ubuntu packages as needed and installed Node.js and Gatsby, which is what I’m using to experiment with an open source blog platform that generates super fast static sites: [More info here on what I’m doing](/n/articles/the-great-gatsby-vs-hugo-for-static-site-generation/).

I already had VSCode installed on the Windows side, by the way. And that’s important. Here’s why, in a general sense, per Microsoft:

> WSL 2 includes a huge architecture change using virtualization technology, and we are still working on improving the networking support. Since WSL 2 now runs in a virtual machine, you will need to use that VM’s IP address to access Linux networking applications from Windows, and vice versa you will need the Windows host’s IP address to access Windows networking applications from Linux

What this effectively means is that Windows apps can access the Linux filesystem, apps and such.

For example, here's a quick and dirty "Hello World" blog post/page I created on the Linux side using Node.js and Gatsby. But the page is displayed in Chrome on Windows 10.

![](../Images/gatsby-in-wsl2.jpg)

Notice that I'm using VSCode in Windows here. At the bottom left of VSCode, you can see that it's actually letting me work on the Linux instance. 

Whoa.

This reminds me of Google's Project Crostini, which debuted in 2018: It's a similar solution for Chromebooks. 

You enable Linux on a Chromebook and you get a Linux container within a VM. That Linux instance looks native to Chrome OS and can run full Linux GUI desktop apps. Microsoft's WSL2 can't do that yet, however, the company is working on that.

I've written extensively about using Linux for development on a Chromebook but the most recent useful article is this one: "[Can you learn to code in a college Computer Science program with a Chromebook?](https://www.aboutchromebooks.com/news/can-you-learn-to-code-in-a-college-computer-science-program-with-a-chromebook/)"

The answer is yes if the development tools, IDEs and such that your program requires are available for Linux. For me it's a yes.

![Linked Lists in Java on a Chromebook](../Images/linked-lists-in-java-on-a-chromebook.jpg)

If WSL is of interest, I can't recommend [this YouTube video enough from Scott Hanselman](https://youtu.be/j0PPcUUtHlw). It's 45 minutes long but I know I learned more than 45 things about WSL while watching it.
