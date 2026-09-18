---
title: "The Great Gatsby vs Hugo for static site generation"
date: 2020-06-18
tags: [article, gatsby]
---
Well that didn't take long. I've been thinking about the tools that power this site since my [last post](/n/articles/getting-javascript-y-with-apis-even-if-its-hard-to-secure-the-keys/) because I couldn't insert or embed [my demo JavaScript app in it](https://java-script-seven.now.sh/). 

After doing a good week's worth of research, it seems that while Hugo, the SSG tool that generates the site pages, is great, it's not capable of what I want. For static blog content, Hugo would fit the bill. For additional functionality I'd like to tinker with and display, not so much.

## Enter the Great Gatsby

So after researching SSG options, it appears that Gatsby will better suit my needs. And it shouldn't require too much work to migrate that part of the stack over to Gatsby. I can still use GitHub to be my content repository. I don't need a database or webserver. And I can continue [deploying / hosting the site at Netlify](https://www.gatsbyjs.org/docs/deploying-to-netlify/) and use the [Netlify CMS that I implemented previously](https://www.kctofel.com/post/2020-05-30-test-post/), although I'll have a little configuration work to do.

Although I don't want to replicate the WordPress plug-in world (and the challenges it can bring), [there are more than 2,000 Gatsby plugins](https://www.gatsbyjs.org/plugins/). That's appealing to me as an option.

So [if I'm understanding this correctly](https://www.gatsbyjs.org/docs/adding-app-and-website-functionality/), my site will be part static and part dynamic (as I add JavaScript apps and functions), or what Gatsby calls a hybrid site:

![Gatsby Simply Hybrid Site](../Images/simple-hybrid-site.png)

Of course, I won't know if Gatsby will do the trick for sure until I try it, which is easy enough. I could have dove right in, created a new Netlify test site and GitHub repo, but instead, I'm taking my time and [running through the Gatsby tutorial](https://www.gatsbyjs.org/tutorial/) to get started. 

Stay tuned!
