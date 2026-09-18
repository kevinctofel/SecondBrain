---
title: "I'm tired of managing contacts. You do it!"
date: 2023-02-11
tags: [article]
---
I﻿'ve been tinkering with an idea lately in terms of big tech and contact management. This is mainly for two reasons.

O﻿ne: My contacts are basically "held" by big tech. I have them with Apple, Facebook (although I'm not a regular user of that service), and Google. Outside of "big tech", I also manage them in [Proton Mail](https://proton.me), which [I switched to a few years ago from Gmail](/n/articles/living-a-mobile-life-without-apple-or-google-part-2-apps-email-cloud-storage/). 

T﻿wo: I'm tired of managing contacts. Meaning: I want to manage my ***own*** contact information and have any updates flow out to all of my contacts. I also want to receive contact updates from my contacts automatically. And, I want to have more control over my contact information. 

I might want one person to have only my email address while another person is OK to have that, plus my phone number, my Mastodon handle and perhaps, if they're a close friend, my home address.

## What does this look like?

S﻿o, I'm envisioning both a two-way flow of contact information and some gatekeeping at the client level as to who gets what, based on my personal preferences. I'll approve you as a connected contact and I'll say what contact information of mine that you can have.

F﻿or reason one above, I think this has to be some sort of open source solution. While I can ***export*** my current contacts from Apple and Google, I can't put in place the solution I want through Apple or Google.

In regards to reason two, I'm wondering if there's a potential solution as part of the [Fediverse](https://en.wikipedia.org/wiki/Fediverse). This world already has push-pull types of action through [ActivityPub](https://www.w3.org/TR/activitypub/), for example. 

Of course being a n00b developer-in-training, I don't know if the ActivityPub spec can be used for contact information, although I suspect it can be used for any type of data. And I do know that we have standards for contact data though: CardDAV and LDAP come to mind. 

## Obstacles today

G﻿iven that users would want their contact data encrypted, there's already a potential roadblock: ActivityPub doesn't appear to support encryption. However, [there has been some communication and thought on adding it](https://github.com/w3c/activitypub/issues/225#issuecomment-304938193). That would have to happen for a service like this to work.

A﻿nother problem: Where is the contact data hosted? There has to be a central place, or many central places, i.e.: decentralized servers, to hold contact information. 

I'm fine with trusting my Mastodon information with someone I don't know that runs a server, [Kris Nova](https://hachyderm.io/@nova) rocks BTW, but would I feel the same with my contact data? That issue won't be easy to overcome.

G﻿etting that contact information to phone and email apps might be a challenge although I think it could be a minor one. Client apps to make calls or send emails typically support CardDAV at the very least, if not LDAP as well. I'm certainly no expert but I'm thinking I could "subscribe to" or access contacts on my server through client apps.

## W﻿hat's the point or end result?

I﻿n today's world of all internet data being indexed and easily searchable, it's generally easy to find someone's contact information. **Even if you don't want them to have it.** 

D﻿on't get me wrong. I like people. I enjoy engagement. But I'm tired of random email pitches and other communication silliness. If I want to talk to you on the phone, I want to make that decision **before** I give you my number. And while my door is always open to chat over coffee at home, I'll invite you by providing the address. 

T﻿o be fair, LinkedIn (owned by Microsoft) does a reasonably good job here. You can't just instantly message someone, for example. The person you want to connect with in that forum has to approve your connection request first. 

And if some of my LinkedIn contacts have a new email address because of a change in employment, they don't shoot out an email to hundreds of people saying "here's my new address, go update your contacts!" They simply update their email address in their LinkedIn profile, assuming it was there in the first place.

T﻿hat's what I want. Not to manage all of my contacts, just to manage and control my ***own*** contact information. And in way that pushes the updated information to the contacts I've truly connected with. **Sorry, but I don't want to manage your contact information.** Don't take it personally. ;)

## C﻿razy or a good idea? 

You tell me.

O﻿f course since I haven't gotten around to [creating an open source comment system here](/n/articles/added-to-the-to-do-list-a-jamstack-blog-commenting-system/) you can't answer that question on the blog. I refuse to use Disqus or any other system that can use or sell your information. 

F﻿or now, you can [reach out to me on Mastodon](https://hachyderm.io/@kevinctofel) where I do allow anyone to follow me. I'd love to hear some feedback from people smarter than me. Which is probably most of you!

