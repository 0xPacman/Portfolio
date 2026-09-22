---
title: "Active Directory فالسكيل الكبير: التدريع ديال نواة الـ Tier-0 (وعلاش بنيت الأداة ديالي)"
description: "العمود الفقري للهوية فـ Enterprise، علاش الإدارة ديالو باقة كتحس بيها واصلة فـ 2003، وشنو كيحتاج فعلياً باش تدير Hardening، تكبر السكيل (Scale)، وتعصرن العمليات ديال Active Directory."
date: "2026-08-24"
tags: ["active-directory", "security", "identity", "windows"]
---

*العمود الفقري للهوية فـ Enterprise، علاش الإدارة ديالو باقة كتحس بيها واصلة فـ 2003، وشنو كيحتاج فعلياً باش تدير Hardening، تكبر السكيل (Scale)، وتعصرن العمليات ديال Active Directory.*

تا واحد مابقا كيتحمس لـ Active Directory دابا. الـ Hype cycle كولشي لاهي مع كلوسترات Kubernetes، الـ Multi-cloud control planes، الـ Zero-trust edge proxies، وأي حاجة فيها Serverless.

ولكن دخل لتقريباً أي Enterprise متوسطة، شركة من Fortune 500، ولا Datacenter عندو متطلبات أمنية عالية، وغادي تلقى نفس الحقيقة: **AD باقة هي النبض ديال الـ Authentication فالشركات.** الـ Hypervisors، أنظمة التخزين (Storage arrays)، الـ VPN concentrators، التطبيقات الداخلية القديمة (Legacy line-of-business apps)، وحتى مزودي الهوية العصريين بحال Entra ID أو Okta لي فالمفروض جاو يعوضوها، كولهم كيرجع الـ Root of trust ديالهم لـ Domain Controllers خدامين فشي قاعة د السيرفورات.

هاد المركزية هي بالضبط لي كتخلي AD هي أصل الـ Tier-0 assets. يلا تقاس الـ Domain، راك قستي البنية التحتية كاملة.

## 1. ثقل الهوية: علاش AD هو أهم Tier-0 Asset

التفكير ديال الـ Cloud-native كيركز على بنية تحتية مؤقتة وقابلة للتبديل (Ephemeral). الـ Active Directory هو العكس تماماً: Stateful، مبني ومتراكم عبر سنين (وأحياناً عقود)، ومربوط فكل صغيرة وكبيرة فالشبكة.

![Active Directory كأصل الـ Tier-0 root of trust](/media/blog/ad-tier0-trust.svg)

ملي الـ Attacker كيدخل للشبكة، سواء عبر Credential تصيد بالـ Phishing، أو Appliance طرفي ما مباتشيش، الـ Playbook ديالو كيكون تقريباً ديما هو نيتو:

1. كيدير Dump للـ Credentials المحليين (LSASS / SAM).
2. كيرسم خريطة لهيكلة الـ Domain عبر LDAP queries.
3. كيتبع مسار الـ Privilege escalation حتى كيوصل لـ Domain Admin أو Enterprise Admin.

وملي كيقدر شي حد يتحكم فالـ Domain Controllers، راه ما بقاش غير حاكم سيرفورات Windows، راه كيحكم معاه كلوسترات الـ Hypervisors، الـ Storage shares، الـ Certificate Authorities، وأي SSO pipeline مربوط بالـ Hybrid cloud.

## 2. المعمارية، المتانة (Resiliency) والـ High Availability

الـ High Availability فـ AD ماشي هي "لونسي جوج Domain Controllers وراك ساليتي". المتانة الحقيقية كتعني تفهم ميكانيزمات الـ Replication، تصميم الـ Topology، والتوزيع الصحيح للأدوار (Role placement).

**أدوار الـ FSMO (FSMO roles):** الـ AD كيدير Replication بنظام Multi-master لأغلب الـ Objects ديال الـ Directory، ولكن باقين 5 ديال العمليات الحساسة خاص ضروري يتحكم فيهم Master واحد:

| الدور (Role) | النطاق (Scope) | فين خاصك تحطو |
| --- | --- | --- |
| **Schema Master** | Forest-wide | فالـ Forest root PDC؛ مع تقييد صارم لصلاحيات الـ Write |
| **Domain Naming Master** | Forest-wide | كيكون فـ Global Catalog فنفس السيرفور مع Schema Master |
| **PDC Emulator** | Domain-wide | هاردوير موثوق، مع مزامنة NTP مخصصة ودقيقة |
| **RID Master** | Domain-wide | فغالباً كيكون مع الـ PDC Emulator فنفس السيرفور |
| **Infrastructure Master** | Domain-wide | مرن فالتوزيع يلا كانو كاع الـ DCs شغالين كـ Global Catalogs (لي هو المعيار دابا) |

**الـ Sites، الـ Subnets، والـ Replication:** الـ Knowledge Consistency Checker كيحسب أوتوماتيكياً الـ Topology ديال الـ Replication بأقل Cost، ولكن راه الذكاء ديالو كيبقى محدود بالدقة باش معرف الـ Sites:

* اربط **أي VLAN داخلي** بـ AD site محدد. الـ Subnets لي كيبقاو بلا Mapping كيخليو الـ Clients يختارو DCs عشوائيين، هادشي لي كيدير Latency غير متوقعة بين الـ Datacenters.
* بالنسبة للـ Multi-datacenter أو الامتدادات الهجينة (Hybrid)، قاد الـ Site links بـ Costs وجداول زمنية واقعية باش تتجنب الـ Replication storms لي تقدر تخنق ليك الـ WAN.

**الارتباط الوثيق: AD و DNS:** تقريباً 90% من المشاكل لي كيبانو كأنهم "مشاكل فالـ Active Directory" كيكونو فالحقيقة غير أخطاء فـ Configuration ديال الـ DNS:

* استعمل Active Directory-integrated DNS zones باش تستافد من Secure dynamic updates ومن Multi-master replication لسجلات الـ DNS أوتوماتيكياً.
* ما توجهش الـ Primary DNS ديال الـ DC لـ `127.0.0.1` بوحدو نهائياً. الـ Primary كيمشي لـ DC شريك فنفس الـ Site، والـ Secondary كيكون Loopback، وإلا راك كتوجد راسك لـ Replication deadlocks وقت الـ Boot.

## 3. التدريع (Hardening) والتدقيق الأمني الحديث

تأمين الـ AD ماشي هو مجرد كوشي خانات فشي جدول ديال الـ Compliance. المسألة هي تقضي على مسارات الهجوم المحددة (Deterministic attack paths).

![نموذج الـ Tiering فالشركات، الـ Credentials عمروا ما كينزلول لتحت](/media/blog/ad-tiering-model.svg)

**الـ Tiering Model:** القاعدة واضحة ومباشرة: ما تكونيكطاش لطبقة هابطة باستعمال كونط ديال طبقة أعلى منها. اللحظة لي كيدخل فيها أدمين من Tier-0 لشي Workstation مخترقة، الـ Credentials ديالو كيطيحو فـ LSASS memory، كيتسناو غير لي يجرهم، وتما الـ Attacker كيدير Pivot فالبلاصة من مجرد لابتوب عادي لـ Domain Admin.

* **Tier 0:** سيرفورات الـ Domain controllers، الـ PKI/ADCS، ومزامنات الهوية (Identity synchronizers).
* **Tier 1:** سيرفورات الـ Enterprise، الـ Hypervisors، وحدات التخزين، وقواعد البيانات.
* **Tier 2:** لابتوبات المستخدمين، الـ Workstations، والـ Printers.

**نواقل الهجوم لي خاصك تدير عليها حماية فعلية:**

* **Kerberoasting:** الـ Attackers كيطلبو Tickets ديال SPN لحسابات الخدمة (Service accounts) وكيخدمو على الكراك ديالهم Offline. الحل: حول الـ Service accounts القدام لـ Group Managed Service Accounts (gMSA) بـ Passwords كيدورو أوتوماتيكياً وفيهم 128 خانة.
* **AS-REP roasting:** الحسابات لي مفعل فيهم خيار "Do not require Kerberos preauthentication" كيعطيو للـ Attacker واحد TGT مشفر بمجرد الطلب. الحل: دير Audit ومسح الفلاك `DONT_REQ_PREAUTH` من كاع الحسابات.
* **DCSync:** أي كونط عندو صلاحيات Replicating Directory Changes يقدر ينتحل هوية DC ويجر قاعدة البيانات `NTDS.dit` كاملة عبر الشبكة. الحل: صلاحيات الـ Replication خاصها تكون محصورة فقط فـ Computer objects الرسميين ديال الـ DCs.

**الأحداث لي خاصك تصيفط لـ SIEM** (الـ Event IDs المهمين لي يستاهلو دير عليهم Alerts):

| الـ Event ID | شنو كيعنيك |
| --- | --- |
| **4624 / 4625** | تسجيلات الدخول الناجحة والفاشلة، خصوصاً الـ Type 3 (Network logons) |
| **4720** | إنشاء حساب مستخدم جديد |
| **4728 / 4732** | إضافة عضو لشي Privileged security group |
| **4738** | تعديل حساب، إضافة SPN، أو تعطيل الـ Pre-auth |
| **4662** | عمليات على الـ Objects، وتتبع محاولات DCSync عبر GUIDs ديال الـ Replication |
| **4768 / 4769** | حركات غير طبيعية فـ Kerberos TGT/TGS، ومحاولات الـ Downgrade لـ RC4 |

## 4. الواقع التشغيلي: علاش إدارة الـ AD باقة معقدة

لحاجة بهاد الأهمية والحساسية، الأدوات اليومية لي متوفرة باقة ضعيفة بشكل غريب:

| المدخل / الأداة | العائق التشغيلي |
| --- | --- |
| **MMC / RSAT القديمة** | كود 32-bit من أواخر التسعينات، كولات RPC/LDAP متزامنة كتحبس الـ UI thread، ونوافذ داخلة فوحدة بشكل مبالغ فيه |
| **PowerShell** | أداة أساسية للأوتوماسيون، ولكن ثقيلة ومعكسة فالبحث السريع المباشر وسط شي Incident |
| **الحلول التجارية الكبيرة** | منصات Web ثقيلة، تضخم فـ JVM، كتحتاج سيرفورات مخصصة، واشتراكات متكررة لعمليات أساسية ديال دورة الحياة |

الـ MMC snap-ins (بحال `dsa.msc` والأخوات ديالها) كيبقاو يبلوكيو باستمرار عبر VPN أو خطوط WAN ثقيلة حيت أي تفاعل كيبلوكي الـ UI thread ديريكت. باش تتبع السبب ديال Lockout ولا تفكك التشعبات ديال Nested groups، كتلقى راسك كتدوز وسط درزن ديال النوافذ. والموديول ديال ActiveDirectory فـ PowerShell ممتاز فـ Script، ولكن ماشي عملي فاش كتحتاج غير تفحص الـ Flags ديال كونط واحد ونتوما وسط معمعة الـ Incident.

## 5. ملي مالقيتش الأداة المناسبة، بنيتها بيدي

هاد الاحتكاك والمعاناة اليومية هي لي خلاتني نصايب أداتي الخاصة: **[AD Manager](https://ad.0xpacman.com)**، تطبيق Desktop ناتيف مخصص لإدارة وتدقيق Active Directory.

![لوحة تحكم AD Manager، إحصائيات البيئة، الـ Lockouts، والدخول الفاشلة فنظرة واحدة](/media/blog/ad-manager-dashboard.webp)

المبادئ الهندسية لي تبنى عليها:

* **C++ و Qt أصيلين (Native):** Binary حقيقي للـ Desktop. بلا إطار Electron، بلا JVM خدام فالخلفية، وبلا ثقل فالـ UI.
* **محرك LDAP غير متزامن ومباشر (Asynchronous LDAP engine):** جميع اتصالات الشبكة كتخدم بعيد على الـ Main thread، باش يبقى البحث، التصفية (Filtering)، والتنقل فوري وسريع حتى عبر الشبكات لي فيها Latency عالية.
* **مصمم للمهندس والمشرف الأمني (Operator & Auditor):** فحص فوري لـ Flags ديال `userAccountControl`، عدادات الـ Bad passwords، توقيت آخر دخول، والـ SPNs فـ View وحدة نقية (باش تشوف الحسابات المعرضة لـ Kerberoasting فنظرة سريعة). حل تلقائي لـ Nested والـ Circular groups بلا ما تحتاج تكتب Recursive scripts. و Workflows لفك القفل (Unlock) وتغيير الـ Password مصممين للسرعة بلا كثرة كليكات خاوية.

> **كاينين ميزات جداد فالطريق.** هادي راها النسخة v3 والـ Roadmap باقة عامرة. يلا كنتي كتدبر بيئات AD وعندك ملاحظات أو اقتراحات، الفيدباك مرحب به بزاف: [contact@0xpacman.com](mailto:contact@0xpacman.com)

## 6. خلاصة

الـ Active Directory راه ما غادي لفين. هو الساس ديال الهوية فـ Production ديال الشركات، والتعامل معاه كبنية قديمة كتقادها وتنساها (Set-and-forget) هو بمثابة دعوة صريحة للمشاكل والـ Outages.

صمم من البداية على أساس المتانة (Resilience)، نظم الـ Sites ديالك، أمن الـ DNS، وحمي أدوار الـ FSMO. دير التدريع (Hardening) بشكل منظم، فرض الـ Tiering model، انتقل لـ gMSAs، وراقب أي تغييرات كتمس الـ Tier-0 بصرامة. وأهم حاجة، خدم بأدوات كتعاونك وما كتعكسكش، باش تركز وقتك وجهدك فالخدمة لي كدير الفرق بصح.
