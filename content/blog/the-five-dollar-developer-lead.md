---
title: "The $5 Developer Lead: When a Job Offer Becomes an Attack Surface"
description: "A WhatsApp recruitment message led me to investigate a matching GitHub solicitation and a malicious npm advisory. Here is what I could verify, what remains uncertain, and how developers can protect themselves."
date: "2026-11-10"
tags: ["security", "osint", "supply-chain", "social-engineering"]
---

*An unexpected WhatsApp message offered me a software collaboration. A short conversation later, the sender claimed to be paid $5 for each lead. Following the public clues led to a GitHub solicitation and a malicious npm package advisory. The connection to that package is a lead, not a proven attribution. The wider threat, however, is very real.*

## 1. The message

On November 9, 2026, I received an unsolicited WhatsApp message from someone calling themselves Goodluck. They said they had heard I was a skilled software developer and wanted to connect me with someone looking for collaborators.

The message asked me to share my portfolio and contact another person through WhatsApp, Telegram, or email. It also asked me to say I had been referred by Goodluck. There was no company name, job description, project specification, or explanation of how they obtained my number.

![Screenshot of the WhatsApp developer collaboration message](/media/blog/whatsapp-developer-recruitment-message.png)

*The original message I received on WhatsApp.*

A cold message is not automatically a scam. Recruiters and freelancers use direct messages all the time. But an unknown intermediary moving me toward a separate contact without any verifiable details gave me enough reason to slow down and ask questions.

## 2. Turning the questions around

I asked where my contact information came from. The sender said they were a “scouter,” worked with many people, and did not know exactly who had supplied my number. They kept asking me to contact the person in the original message and mention the referral.

I then social engineered the conversation: I suggested I could pay more for developer leads and asked how their process worked. The sender claimed that the other party paid **$5 per lead** and later said they had more than 12,000 contacts. When I asked whether they used a Google Sheet and paid in USDT, they agreed. They also sent a screenshot showing a read-only spreadsheet of apparent developer contact information.

Those are **the sender's claims**, not facts I independently verified. In particular, I introduced the Google Sheet and USDT possibilities in my question, so their agreement is not independent proof of either. The screenshot does not prove the size or origin of the contact list, that my number appeared in it, or who controlled it. I'm not publishing the screenshot because it contains other people's contact information.

The $5 figure is still revealing as a claim: if accurate, it describes a low-cost way to find developers and pass interested people to another contact. It does not prove this person knew of any malicious intent or was paid by a criminal operation. I ended the interaction and blocked the contact.

## 3. Following the public trail

The WhatsApp message included the Telegram handle `@anhtran9405`, an email address and a WhatsApp number. Searching the handle led me to a [public GitHub issue](https://github.com/dybbuk-dev/dybbuk-dev/issues/2) posted on October 25, 2026, by an account using the name `goodluck-star001`.

The issue repeats the same Telegram handle, the Goodluck referral, and substantially the same recruitment wording. That makes the WhatsApp message and GitHub post strongly connected **as messages**. It does not, by itself, establish who owns the accounts or whether the same person wrote both: text and handles can be copied.

There is a detail worth keeping straight. The email in my WhatsApp message was **different** from the email in the GitHub issue. The issue used `redman89405@gmail.com`. That exact local part led to the npm package `@redman89405/my-module`, which has a [GitHub malware advisory](https://github.com/advisories/GHSA-vc53-jhh2-pwf3) and an [OSV record](https://api.osv.dev/v1/vulns/MAL-2026-17336).

This is an intriguing lead, not a verified chain of custody. Neither message I examined asks me to install that package. I have not verified that the WhatsApp sender, the GitHub issue author, the email account, and the original npm publisher are the same person or work together. I did not receive a project from the referred contact, and I cannot say this interaction delivered malware. A matching identifier warrants investigation; it is not proof of authorship.

## 4. What the npm advisory actually says

The malicious-package finding itself is public and documented. The OSV record includes an Amazon Inspector analysis describing a function called `imageToCode`: it reads encoded bytes from the first pixel row of an image and passes the decoded text to JavaScript's `Function` constructor. In other words, an image can carry code that runs when the function is called.

The distinction matters: the analysis says this particular code path uses browser APIs and requires a consumer application to call the function in a browser. It does **not** say that simply importing it in Node automatically triggers that path. The advisory's conservative response guidance still recommends treating machines where the package was installed or run as compromised. The historical package files were unavailable from the registry during my initial checks; the analysis above comes from the advisory, not from a payload I personally recovered or executed.

OSV identifies the advisory as **MAL-2026-17336**, with GitHub alias **GHSA-vc53-jhh2-pwf3**. These are advisory identifiers, not a CVE number. Avoid assuming the package was delivered through my conversation just because its scope resembles the issue's email.

## 5. Why the Binance case matters

This pattern is not hypothetical. In its [preliminary account of the October 2026 incident](https://www.binance.com/en/square/post/384314641614134), Binance described a multi-stage attack that included a fake recruitment process and a malicious coding assignment delivered to an engineer. The company also described other parts of the attack, including malicious software, compromised endpoints, internal AI tooling and transaction authorization. Its findings were preliminary and subject to further investigation.

That incident shows why a fake job interview can be a serious entry point. It does **not** establish that the WhatsApp contact in my case was involved in the Binance incident or belonged to the same group. Similar tactics do not prove common operators.

Microsoft has also documented [Contagious Interview](https://www.microsoft.com/en-us/security/blog/2026/03/11/contagious-interview-malware-delivered-through-fake-developer-job-interviews/), a campaign in which attackers pose as recruiters and persuade developers to execute malicious packages or commands during an assessment. This has become an established niche: the attack is tailored to what developers already do every day—clone projects, install dependencies, open an editor and make the application run.

## 6. A recent CVE—and why a patch is not the whole answer

Fake-job operations can also use software vulnerabilities. In August 2026, Check Point reported that a separate campaign attributed to Lazarus exploited the Windows privilege-escalation vulnerability [CVE-2026-68820](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-68820) after delivering malware through fake job offers. [Check Point's research](https://blog.checkpoint.com/research/state-sponsored-hackers-use-fake-job-offers-to-deliver-new-zero-day-exploit) says Microsoft released a fix before publication. This is an example of the wider threat, **not a vulnerability shown to have been used against me or in the Binance incident**.

Keep your operating system, Git, editor and development tools patched. But remember: a malicious project may not need a CVE at all. If you voluntarily run an attacker's install script with your own permissions, the attacker may already have what they need.

## 7. Don't clone and compile unknown code without a plan

**Do not clone and compile an unfamiliar project from an unsolicited contact on your main machine without analyzing it first.** Treat a coding assignment as untrusted input, even if the conversation feels like a normal interview.

Before engaging with a project:

- **Verify the opportunity independently.** Look up the company yourself and use contact details from its official site. A real company name in a message does not prove the sender represents it.
- **Inspect before execution.** Review the repository in a browser or other controlled environment. Look at the README, manifests, lockfiles, install and build scripts, submodules, editor tasks, and unexpected downloads or obfuscated code. A quick review cannot prove a project safe, and dependencies can hide behavior outside the visible source.
- **Remember that setup is execution.** `npm install` can run lifecycle scripts; builds, tests, dev servers and editor tasks can execute project-supplied code too. Don't paste “fix” commands from a stranger or disable security controls to make an assignment work.
- **Use a disposable, isolated environment when execution is necessary.** Keep it separate from your work machine and production network, with no real credentials, SSH keys, wallet, browser sessions, shared folders or access to internal systems. A VM or container is not a perfect security boundary; use a properly isolated environment and restrict network access where practical.
- **Protect credentials.** Prefer short-lived, least-privilege credentials and keep secrets out of ordinary development environments where possible. If you suspect you ran malicious code, disconnect the affected machine, preserve evidence, and rotate potentially exposed credentials from a separate trusted device. Involve your security team.

Even cloning is not an absolute guarantee of safety: Git has had vulnerabilities affecting untrusted repositories. Use a fully patched Git client, avoid recursive submodule operations on unknown projects, and follow [Git's security advisories](https://github.com/git/git/security/advisories/). The safest starting point is to view untrusted material without running it.

## 8. A note on attribution

I am sharing this for developer awareness, not accusing a named person of a crime. The GitHub solicitation and security advisory are publicly available; my WhatsApp transcript and the sender's statements are separate, user-provided evidence. Public leads, matching handles, and my own interpretation can be incomplete or mistaken. The malicious npm advisory is real, but a direct connection between that package and my WhatsApp conversation has **not** been verified. If better evidence changes that assessment, I will update the article.

If you receive an unexpected developer opportunity, take the time to verify it. A legitimate recruiter can wait while you protect your machine and your employer's systems.
