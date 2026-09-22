---
title: "فتح لغز OpenStack: المعمارية، الاقتصاد، والواقع ما بعد VMware"
description: "دليل عملي لنشر، توسيع، وتقييم OpenStack، مكتوب من واقع بيئات إنتاج حقيقية وماشي من عروض البيع ديال الشركات (Vendor decks)."
date: "2026-08-15"
tags: ["openstack", "private-cloud", "infrastructure", "vmware"]
---

*دليل عملي لنشر، توسيع، وتقييم OpenStack، مكتوب من واقع بيئات إنتاج حقيقية وماشي من عروض البيع ديال الشركات (Vendor decks).*

## 1. عودة الـ Private Cloud للواجهة

لسنوات كانت الفكرة السائدة ساهلة وباينة: كولشي غادي يتحول للـ Hyperscalers (بحال AWS، Azure، و GCP). ولكن مع الوقت، جاو الفواتير القاصحة ديال الـ Egress، القوانين ديال سيادة البيانات (Data sovereignty) ولات صارمة، والفرق ديال الذكاء الاصطناعي (AI) بداو كيطالبو بـ GPU clusters مخصصين. فجأة، ولا الـ Private Cloud موضوع مهم ومطلوب من جديد، و OpenStack جا فقلب هاد النقاش.

المشروع كانت عندو سمعة صعيبة شحال هادي، والصراحة راه كان كيستحقها. ولكن دابا نضج وتطور بزاف. OpenStack اليوم خدام ورا كبريات شركات الاتصالات العالمية (Telcos)، مراكز الأبحاث بحال CERN، السحب السيادية (Sovereign clouds)، وفمراكز بيانات ديال شركات كثر بزاف ملي كيتخيل أغلب الناس. ومع الاستحواذ ديال Broadcom على VMware لي خربق نظام التراخيص فالصناعة كاملة، بزاف ديال فرق البنية التحتية ولاو كيطرحو نفس السؤال:

**واش OpenStack خيار واقعي ومسار ممكن، ولا باقي معقد بزاف على شركة عادية؟**

هاد المقال هو محاولة باش نعطي جواب مباشر وصريح. غادي ندوزو على المعمارية، نظام الإصدارات، شكون لي كيطورو، التكلفة الحقيقية ديالو، وكيفاش داير فالتطبيق والتشغيل الفعلي.

## 2. شنو هو OpenStack فعلياً (وشكون لي كيبنيه)

OpenStack ماشي Hypervisor، وماشي منتوج واحد. هو تجميعة ديال خدمات، أغلبيتها مكتوبة بـ Python، لي مع بعضياتها كتعطيك بنية تحتية كخدمة (Infrastructure-as-a-Service): الـ Compute، والـ Storage، والـ Networking مجمعين وموزعين على Bare-metal hardware ومتاحين عبر APIs. كتديرو مؤسسة OpenInfra Foundation تحت المبادئ الربيعة لي كيسميوهم "Four Opens": كود مفتوح (Open source)، تصميم مفتوح (Open design)، تطوير مفتوح (Open development)، ومجتمع مفتوح (Open community).

![معمارية خدمات OpenStack الأساسية](/media/blog/openstack-architecture.svg)

لائحة المساهمين كتجمع كبار الأسماء فمجال البنية التحتية: Red Hat، Canonical، Mirantis، NVIDIA، Ericsson، Intel، SAP، Rackspace، وزايد عليهم آلاف المهندسين.

**الإصدارات ونظام SLURP:**

OpenStack كيخرج إصدار جديد كل ستة أشهر بأسماء كتبدا بالحروف الأبجدية: Caracal (2024.1)، Dalmatian (2024.2)، Epoxy (2025.1)، Flamingo (2025.2). ويلا كان كيبان ليك الـ Upgrade جوج مرات فالعام صعيب ومتعب، راه كاين نظام SLURP (Skip Level Upgrade Release Process): كل إصدار ثاني كيتعتبر SLURP release، وتقدر تنقز ديريكت من إصدار SLURP للـ SLURP لي موراه بلا ما تهرس قاعدة البيانات ولا الـ APIs.

## 3. إذن، شحال صعيب فالواقع؟

القصص الصعيبة لي كيعاودو الناس راها جاية من الفترة ما بين 2012 و 2017، فاش كان نشر OpenStack كيعني تعدل بيدك مئات الملفات ديال `.conf` عبر Python virtualenvs. حتى واحد ما بقا كيدير هادشي دابا. اليوم الـ Deployment كيدار باستعمال Frameworks مضبوطة:

* **OpenStack-Ansible (OSA):** Playbooks ديال Ansible كينشرو الخدمات وسط LXC containers معزولين فالسيرفورات ديالك. نقي، Modular، وسهل تفهم شنو واقع فيه.
* **Kolla-Ansible:** نفس الفكرة، ولكن الخدمات كيكونو شغالين كـ Docker/OCI containers.
* **Red Hat OpenStack Platform Director (TripleO):** بيئة OpenStack كتسمى "undercloud" هي لي كتنشر وتدير بيئة الإنتاج "overcloud" (ابتداءً من RHOSP 18 هادشي تحول لـ OpenShift operators).
* **Canonical Charmed OpenStack / Sunbeam:** كيعتمد على Juju charms فوق MicroK8s لإدارة دورة حياة النظام كاملة.

الصعوبة عمرها ما كانت فالتعامل مع واجهة Horizon. الصعوبة الحقيقية كتبدا فـ Day 2:

* **الشبكات بـ Neutron و OVN:** الـ Overlays ديال Geneve و VXLAN، التوجيه الموزع (Distributed routing)، الـ OpenFlow pipelines، ومشاكل الـ MTU fragmentation بين الـ Hypervisors وسويتشات الـ Top-of-rack. هنا فين كينوضو أغلب الـ Incidents فالـ Production.
* **الحالة والرسائل (State & Messaging):** RabbitMQ كيهز الـ RPC traffic بين مختلف الخدمات؛ و MariaDB Galera كتحافظ على الـ State. يلا تراكبات الـ Queue ولا فقدات Galera الـ Quorum، الـ APIs ديالك كيبلوكاو، وكولشي كيبان ليك عادي ومستقر حتى كيطيح فدقة وحدة.
* **الربط مع التخزين (Storage integration):** ضبط Cinder drivers باش يتوافقو مع Ceph RBD pools، ولا مع وحدات الـ SAN التجارية لي معتمدة فالشركة.

## 4. التصميم أولاً: الـ HLD والـ LLD

أسرع طريق باش تفشل فـ OpenStack هي تبدا الـ Deployment قبل ما تكمل التخطيط. قيس ثلاثة المرات، وانشر مرة وحدة.

![الـ HLD والـ LLD ومراحل الـ Deployment](/media/blog/openstack-design-phases.svg)

التصميم عالي المستوى (**High-Level Design - HLD**) كيمثل الرؤية المعمارية الشاملة: فين غادي يعيش الـ Control plane؟ واش على Bare metal مخصص ولا كبنية Hyperconverged؟ شنو هي استراتيجية الـ Storage: واش Ceph، NetApp، ولا وحدات NVMe محلية؟ وكيفاش غادي تقسم الـ Availability zones ونطاقات التعطل (Failure domains)؟

التصميم التفصيلي المنخفض المستوى (**Low-Level Design - LLD**) كيحول هاد الرؤية لإعدادات عملية: شمن كارتات ريزو (NICs) غادي تبلومبيهم (Bonding) وكيفاش (LACP 802.3ad مقابل active-backup)، شمن VLANs غيهزو ترافيك الـ Management، مقابل الـ Storage، وترافيك الـ Tenant overlay وترافيك الـ Provider، وتحديد حجم الـ MTU من البداية حتى النهاية. يلا كانو السويتشات خدامين بـ Jumbo frames بـ 9000، الترافيك ديال الـ Tenant المغلف بـ 8950 ما غاديش يوقع ليه Fragmentation. يلا فلتات هاد النقطة، غادي تدوز سيمانة ونت كتقلب على أسباب ضياع الحزمات (Packet loss) العشوائي.

من بعد كيبان الواقع. ما كاين حتى مخطط كيبقى كما هو مع أول احتكاك بالهاردوير الحقيقي: Bug فـ Firmware ديال كارتة 25G SFP28، تعارض فـ Kernel module، أو عدم تطابق فـ MTU كيقطع الكونيكسيون غير بين جوج سيرفورات محددين. غادي تصطدم بحوايج ما كانوش متوقعين فالديغرامات، داكشي علاش خاص التعامل مع HLD و LLD كوثائق حية كتقبل التحيين. يلا كان التوجيه الموزع كيعقد الـ Leaf-spine fabric بزاف، التوجيه المركزي بـ L3 HA كيبقى بديل مجرب ومضمون. ويلا واجهتي مشاكل مع Ceph وسط الكونتينرات، نشرو على Bare metal ديريكت وربطو عبر RBD backend. ديما كاين أكثر من طريق باش توصل لنفس الهدف المعماري، والتحليل الدقيق للأسباب الجذرية (Root-cause analysis) كيربح ديما على التمسك الحرفي بالرسم الأولي.

## 5. من Vagrant حتى للـ Bare Metal: شنو طبقت فالواقع

النظري كيبقى ساهل، داكشي علاش ها شنو خدمت عليه ونشرتو فعلياً:

**المشروع الأول: OpenStack-Ansible، من PoC حتى لـ 5-node bare metal:**

فـ 1337 Coding School، الفريق ديالي نشر OpenStack من الصفر باستعمال `openstack-ansible`. بدينا فـ Vagrant و VirtualBox، بيئة تجريبية بـ Multi-VM قدرنا نتيستيو فيها ونبدلو فـ Inventory variables وأدوار Ansible بلا عواقب. ومن بعد انتقلنا للهاردوير الحقيقي (Physical metal): ثلاثة ديال الـ Controllers، وجوج د الـ Computes، ومعاهم كاع التفاصيل لي كيكونو مخبيين فالـ VMs: الـ Linux bridges الحقيقيين، الـ Bond interfaces، الـ VLAN trunks، توزيع كوندينرات LXC على الـ Controllers، وزايد درس مهم: يلا وقع انزياح فـ NTP غير بجوج ثواني، التحقق من توكنات Keystone كيطيح فالبلاصة.

![لاب OpenStack-Ansible على 5-node bare metal](/media/blog/openstack-5node-lab.svg)

**المشروع الثاني: Red Hat OpenStack Platform 17 فـ Atlas Cloud Services:**

خلال فترة التدريب ديالي، خدمنا على لاب وراني الجانب الآخر: شنو كتربح فعلياً ملي كتعتمد على حلول مدعومة من الشركات. RHOSP 17 كان ديجا تحول بالكامل لـ OVN كـ Driver افتراضي لـ ML2، وهادشي عطى تحسن حقيقي فالأداء مقارنة بـ OVS agents القدام، وزايد أداة Director لي كانت كتأوتوماتيزي الـ Highly available control plane بـ Pacemaker/Corosync مع توفير Ceph مدمج ومربوط أوتوماتيكياً.

## 6. شحال كيكلف هادشي؟

الكود المصدري فابور ومجاني، ولكن تشغيلو فالـ Production كيكلف؛ يا إما كتخلص شركة كتزودك بالحل (Vendor) ولا كتخلص مهندسين يشرفو عليه.

|  | التوزيعات التجارية (Vendors) | نموذج الـ DIY (بناء داخلي) |
| --- | --- | --- |
| **البرمجيات** | اشتراكات سنوية | 0 دولار للتراخيص |
| **الدعم الفني** | دعم ومتابعة رسمية (SLA) وتحديثات أمنية | الفريق ديالك، فوقت الطوارئ |
| **النشر والتثبيت** | استشارات وخدمات Day-1 متوفرة | الأوتوماسيون والأدوات ديالك |
| **الهاردوير** | مشغلات معتمدة (Certified drivers) | أي هاردوير كتقدر تضبطو يخدم |

**اشتراكات الدعم (لكل Node فالعام، حسب لوائح الأسعار الرسمية):**

| الشركة المزودة | التكلفة | ملاحظات |
| --- | --- | --- |
| **Canonical** (Charmed OpenStack) | 1,500$ للدعم / 5,475$ كإدارة كاملة | الحساب كيكون لكل ماشين، بلا قيود على الـ Sockets أو الـ Cores؛ دعم Ubuntu Pro الكامل 24/7 كيوصل لـ 3,400$ لكل سيرفور |
| **Red Hat** OpenStack Platform | 3,449$ standard / 4,499$ premium لكل Socket-pair | اشتراكات الـ Controller nodes كتكون أقل (~2,100$ حتى 2,800$)؛ غالباً كتجي مجمعة مع RHEL و Ceph |
| **Mirantis** (MOSK) | من 1,125$ حتى لـ 2,250$+ لكل Node | مستويات الدخول حسب متجرهم العام؛ العروض المدارة كتحسب تكلفة الـ Control plane بوحدها |

**الخدمات الاحترافية ليوم الإطلاق (Day-1 Services):**

الوثائق ديال Canonical كتحدد خدمات التصميم والتنفيذ ابتداءً من 85,000 دولار. ومع مختلف الشركات والشركاء، كلوستر ديال 20 حتى 50 نود فالـ Production مع ربط مخصص (أنظمة الفوترة، الفايروول، وأنظمة التخزين) كيكلف غالباً ما بين 50,000 و 200,000+ دولار.

**الحساب الواقعي لنموذج الـ DIY:**

التراخيص كتقام بـ 0 دولار، ولكن كتحتاج على الأقل من 3 حتى لـ 5 مهندسي منصات (Platform engineers) كبار عندهم كفاءة عالية فـ Linux، Ansible، Python، Ceph، والـ Software-defined networking. هادي ماشي تكلفة مخبية، بل تكلفة مباشرة لي بزاف ديال الناس كينساو يحطوها فالميزانية.

## 7. المقايضات الصريحة (Trade-offs)

**فين كيربح OpenStack:**

* **غياب الـ Vendor lock-in:** معايير و APIs مفتوحة، واستقلالية كاملة فإدارة بنيتك التحتية.
* **الجدوى الاقتصادية مع التوسع (Scale):** فاش كتفوت تقريباً 100 نود ديال الـ Hypervisors، كيتفوق اقتصادياً بفارق كبير على التراخيص الاحتكارية لي كتحسب بالـ Core.
* **Multi-tenancy حقيقي:** مشاريع، حصص (Quotas)، إدارة صلاحيات بـ Keystone RBAC، وشبكات بخدمة ذاتية، كولشي مدمج أصلياً ماشي كإضافات سطحية.
* **إمكانيات شبكية متقدمة:** دعم SR-IOV، DPDK، OVN، وتوجيه ديناميكي بـ BGP؛ وهادشي علاش شركات الاتصالات كتعتمد عليه فـ NFV.

**فين كيوجع وكيصعاب:**

* **العبء التشغيلي (Operational overhead):** كتحتاج كفاءات كتضبط مزيان Linux، Ansible، Python، Ceph، و SDN؛ وماشي غير وحدة فهادو، بل كولهم مجموعين.
* **الترقيات (Upgrades):** واخا نظام SLURP سهل بزاف، الانتقال بين إصدارات كبرى كيتطلب بيئات Staging وخطط تراجع (Rollback plans) مضبوطة.
* **الافتراضات ديال Cloud-native:** تصميم OpenStack مبني على منطق "Cattle, not pets" (سيرفورات مؤقتة كتعوض بسرعة). يلا كنتي مشغل VMs قديمة وضخمة ما كتقدرش تصبر على إعادة تشغيل الـ Hypervisor، غادي تضطر تبني وتصمم الـ High Availability على مستوى التخزين والـ Compute بيدك وبشكل مدروس.

## 8. شكون كيشغل هاد الأنظمة فعلياً؟

* **شركات الاتصالات:** بحال Orange، AT&T، Vodafone، و China Mobile كيشغلو شبكات الـ 5G core والوظائف الشبكية الافتراضية فوق OpenStack، أساساً بفضل سرعة ومعالجة البيانات العالية بـ DPDK و SR-IOV.
* **مراكز الأبحاث:** منظمة CERN كتدير كثر من 500,000 نواة معالج (Cores) فوق OpenStack باش تحلل بيانات التصادمات ديال مصادم الهادرونات الكبير (LHC).
* **التجارة والشركات الكبرى:** شركة Walmart كتدير منصات التجارة الإلكترونية ديالها عبر كلوسترات OpenStack ضخمة متعددة المناطق للتحكم فتكلفة العمليات فوقت الذروة.
* **السحب السيادية (Sovereign clouds):** المزودون الإقليميون والأوروبيون كيخدمو بيه لتقديم خدمات مطابقة لقوانين حماية المعطيات (GDPR) بلا تبعية للـ Hyperscalers الميريكانيين.

## 9. سؤال VMware البديهي

من نهار دارت Broadcom الاستحواذ، هاد السؤال ولى هو لي كلشي باغي يعرف جوابو: واش خاصنا نتحولو لـ OpenStack؟ الجواب كيبقى: "على حساب"، ولكن ها هي النسخة الصريحة والواقعية ديال "على حساب":

![واش OpenStack مناسب ليك؟ دليل القرار](/media/blog/openstack-decision-tree.svg)

OpenStack عندو معنى وكيستاهل فاش كيكونو عندك كثر من 50 سيرفور Bare metal وتكلفة تراخيص الـ Hypervisor بالـ Core ولات مبالغ فيها بشكل غير منطقي؛ فاش كيكون الفريق ديالك ديجا كيتعامل مع البنية التحتية ككود (IaC) باستعمال Ansible و Python؛ وفاش كتكون باغي منصة وحدة تجمع ليك الـ VMs والـ Bare metal (خدمة Ironic ممتازة فهاد الدور).

وما عندو حتى معنى فاش كتكون كتدير كلوستر صغير ديال 5 د السيرفورات مع أدمين واحد كيخدم غير بالـ GUI. الثقل التشغيلي ديال النظام غادي يرهق الفريق. فهاد الحالة، كاينين خيارات أنسب بحال Proxmox VE، Nutanix AHV، أو XCP-ng؛ حيت تبناو بالضبط لهاد الحجم ديال البيئات.

## 10. خلاصة

OpenStack ماشي مجرد منصة افتراضية (Virtualization platform)، بل هو نظام تشغيل سحابي كامل (Cloud OS)، وكيطلب تعاملو بهاد المنطق. كيحتاج انضباط هندسي، تصميم مدروس قبل التنفيذ، وتواضع تقني باش تعاود تراجع الحسابات ملي الهاردوير كيتعارض مع المخططات الأولية.

فالمقابل، كيعطيك ميزة ما كيوفرها حتى مزود احتكاري: استقلالية تامة، قدرة توسع حقيقية، وبنية تحتية كتمتلكها بشكل كامل.

## مراجع وروابط إضافية

**التوثيق وطرق النشر:**

* [OpenStack Documentation](https://docs.openstack.org/)، التوثيق الرسمي لجميع الخدمات والإصدارات.
* [OpenStack-Ansible Deployment Guide](https://docs.openstack.org/openstack-ansible/latest/)، الدليل المعتمد فبناء كلوستر الـ 5-node bare metal.
* [Kolla-Ansible](https://docs.openstack.org/kolla-ansible/latest/)، بديل للنشر باستعمال الكونتينرات.
* [OpenInfra Foundation](https://openinfra.dev/)، جدول الإصدارات، سياسة SLURP، والمجتمع المطور.

**أسعار الشركات المعتمدة فهاد المقال:**

* [أسعار دعم Canonical OpenStack](https://canonical.com/openstack/support)، نموذج الاشتراك لكل Node.
* [وثيقة مواصفات Charmed OpenStack](https://assets.ubuntu.com/v1/603aea18-Datasheet%20-%20Charmed%20OpenStack.pdf)، تفاصيل الدعم والخدمات المدارة والتنفيذ.
* [أسعار Ubuntu Pro](https://ubuntu.com/pricing/pro)، اشتراكات البنية التحتية والدعم الشامل.
* [دليل اشتراكات Red Hat](https://www.redhat.com/rhdc/managed-files/li-red-hat-enterprise-linux-subscription-guide-2562450pr-202511-en.pdf)، توضيح ترخيص Socket-pair.
* [لائحة أسعار Red Hat OpenStack Platform](https://www.redhat.com/en/blog/red-hat-announces-general-availability-of-new-infrastructure-solutions-red-hat-openstack-certification-update)، تسعير الاشتراكات القياسية والمتقدمة.
* [متجر Mirantis الإلكتروني](https://store.mirantis.com/)، مستويات الاشتراكات المتاحة.

**للتوسع والتعمق:**

* [إصدارات OpenStack ونظام SLURP](https://releases.openstack.org/)، تتبع كل إصدار، الجدول الزمني، وفترات الدعم.
* [OVN (Open Virtual Network)](https://www.ovn.org/en/)، المحرك الشبكي الأساسي خلف Neutron الحديث.
* [سحابة OpenStack الخاصة بـ CERN](https://openstack-in-production.blogspot.com/)، تفاصيل تشغيل أزيد من 500,000 نواة فالـ Production.
