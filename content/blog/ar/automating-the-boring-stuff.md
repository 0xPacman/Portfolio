---
title: "أوتوماتيزي المهام الروتينية: تحويل الـ Runbooks اليدوية لأنظمة Repeatable وموثوقة"
description: "الـ Toil يدوي ومكرر وكيتزاد مع حجم الـ Fleet ديالك. ها كيفاش كنحول الـ Runbooks من توثيق كيقراه بنادم لأنظمة كينفذها السوفتوير بـ Ansible، Python، و AI agents مؤطرين بحواجز أمان واضحة."
date: "2026-09-11"
tags: ["automation", "sre", "ansible", "python"]
---

*الـ Runbooks هي البلاصة فين كتموت المعرفة التشغيلية وكتولي متجاوزة مع الوقت. ها كيفاش كنحولهم لأنظمة حتمية وقابلة للتنفيذ (Deterministic Executable Systems) باستعمال Ansible، Python، و AI agents مؤطرين بحواجز أمان واضحة.*

يلا كنتي خدام فـ SRE ولا إدارة الأنظمة (SysAdmin)، خدمتك التشغيلية كتقسم لجوج د الأقسام: الخدمة ديال الـ Engineering (تصميم الأنظمة، تحسين الـ Scalability والـ Reliability) والـ Toil. الـ Toil هو المصطلح الرسمي لي جا فكتاب Google SRE باش يوصف المهام اليدوية، المكررة، القابلة للأوتوماسيون، لي ذات طابع تكتيكي وكتزاد طردياً مع حجم الـ Fleet ديالك. أي مهندس كيعرف هاد المهام بمجرد ما توصفها ليه.

الحاوية التقليدية لهاد الـ Toil هي الـ Manual Runbook: وثيقة كتقول للمهندس شنو يطابي فـ Terminal ملي كيتفركع شي Alert. وهنا فين كاين المشكل بالضبط. الـ Runbook كيوثق الخطوات، ولكن الاعتماد على بنادم باش ينفذهم كيدخل معاه نقاط فشل متوقعة:

1. **Documentation entropy (تراجع جودة التوثيق):** الـ Stacks، والـ APIs، والـ CLI flags كيطورو ويتبدلو أسرع من التوثيق. الصفحات الثابتة (Static pages) كتهرب على واقع الـ Production، ومكتكتشف هاد الفجوة حتى كتكون وسط Incident والبروسيدير مبقاتش خدامة.
2. **Cognitive load under fire (الضغط الذهني وقت الأزمات):** حوادث الـ High-severity كيكون معاها ستريس وعيا كبير. فهاد اللحظة بالذات، المهندس كيقدر يغفل خطوات التحقق الضرورية، يغلط فكتابة الأوامر، ويدير Config drift فالسيرفور.
3. **Non-deterministic execution (تنفيذ غير متطابق):** جوج مهندسين متبعين نفس النص ديال Runbook غادي يمشيو بسرعات مختلفة، كيفسرو خطوات التحقق المبهمة بطرق مختلفة، وغيوصلو لنتائج مختلفة فالنهاية.
4. **Zero continuous verification (انعدام التحقق المستمر):** ما عندكش كيفاش تدير صفحة فـ Wiki وسط CI pipeline. النتيجة هي أنك مكتعرف بلي الـ Runbook ما بقاتش خدامة حتى كيكون الـ Production ديجا طاح ولا تضرر.

الحل كيبدا بتغيير طريقة التفكير: ما نتعاملوش مع الـ Runbooks كتوثيق كيقراه بنادم، وإنما كـ **State Machines كينفذها السوفتوير**. بأدوات Deterministic بحال Ansible و Python، زايد عليهم AI reasoning agents مضبوطين مزيان، هاد الإجراءات اليدوية كتحول لأنظمة ذاتية الإصلاح (Self-healing) وقابلة للتدقيق (Auditable).

## 1. الفلسفة المعمارية: الـ Configuration مقابل الـ Orchestration مقابل الـ Reasoning

محاولات الأوتوماسيون غالباً كتفشل بوحدة من جوج: يا إما كولشي كيتجمع فـ Monolithic Script واحد، ولا كاين لي كيضغط على شي أداة ويخدمها فشي حاجة بعيدة على الغرض لي تصاوبات على قبلو. النموذج المضمون هو تقسيم المسؤوليات على 3 د الطبقات:

![طبقات الأوتوماسيون الثلاثة، الـ Reasoning كيقرر، Python كينسق، Ansible كينفذ](/media/blog/automation-layers.svg)

* **طبقة التحليل والقرار (Reasoning Layer):** كتقبل الـ Alerts، كتقاد التيليميتري (Telemetry normalization)، كتقيم الـ Blast radius (نطاق التأثير)، وكتحدد *أشمن* Deterministic Workflow خاصو يتحرك.
* **طبقة التنسيق (Orchestration Layer - Python):** كتهضر مع الـ Dynamic APIs (الـ Cloud Providers، الـ Hypervisors، ونقاط قياس الـ Metrics)، كتحسب الـ Conditional Logic، وكتجدول الـ Execution.
* **طبقة الإعداد (Configuration Layer - Ansible):** كتفرض الـ Declarative State على السيرفورات عبر SSH/WinRM، وهادشي لي كيخلي أي عملية Idempotent.

هاد التقسيم مهم حيت كل طبقة عندها نمط فشل مختلف. الـ Reasoning يلا غلط تقدر تعاود المحاولة بأمان. الـ Glue code فـ Python يلا وقع فيه Error كيعطيك Stack trace واضحة ومحددة. والـ Configuration يا إما كتوصل للـ State المطلوبة يا إما لا. يلا خلطتيهم كاملين، راه غير Webhook واحد فيه مشكل يقدر يوقف ليك الـ Patching pipeline كاملة.

## 2. مصفوفة الأدوات: الإمكانيات، الحدود، والمراجع

فاش كتكون عارف الحدود الهندسية ديال كل أداة، كتمنع الـ Bottlenecks قبل ما يوصلو للـ Production:

| الأداة / المنصة | الهدف الأساسي | نقاط القوة الرئيسية | الحدود التشغيلية | التوثيق (Docs) |
| --- | --- | --- | --- | --- |
| **Ansible** | إعداد السيرفورات (Host configuration)، الـ Compliance، وفرض حالة الخدمات | Agentless، Declarative state، مكتبة غنية بالـ Idempotent modules | ضعيف فالتعامل مع الـ Nested loops المعقدة؛ والـ YAML ما مناسبش للـ Data structures المتقدمة أو الـ Event streaming | [docs.ansible.com](https://docs.ansible.com/) |
| **Python** | التنسيق مع الـ APIs، تصفية البيانات، بناء أدوات CLI مخصصة، ومتحكمات الـ Runtime | دعم أصيل للـ Async (`asyncio`)، فحص صارم للبيانات (`pydantic`)، وتوافق شامل مع مكتبات الـ APIs | الـ Idempotency خاصك تبنيها برمجياً بيدك؛ وبلا معايير واضحة كيتزاد عبء الصيانة | [docs.python.org](https://docs.python.org/3/) |
| **AWX / Ansible Automation Platform** | جدولة المهام للشركات، الـ RBAC، إخفاء الـ Credentials، وسجلات التدقيق (Audit logging) | تنفيذ ممركز، تشغيل مبني على الـ Webhooks، وتتبع ومراقبة كاملة | كيحتاج موارد كبيرة فـ Self-hosting (Kubernetes operator)؛ زايد على القياس للبنيات البسيطة | [AWX docs](https://ansible.readthedocs.io/projects/awx/en/latest/) |
| **Terraform / OpenTofu** | التجهيز الأولي للبنية التحتية التقريرية (Day-0/Day-1) | إدارة الـ State، بناء الـ Dependency graphs، ودعم مزودي سحاب متعددين | غير عملي لمهام الـ Day-2 بحال الـ Triage، تنقية السيرفورات، أو التدخلات المؤقتة | [OpenTofu docs](https://opentofu.org/docs/) |
| **VMware Aria Automation** | توفير موارد الـ Multi-cloud للشركات، كاطالوج الخدمة الذاتية المؤطر، و Day-2 Orchestration | Cloud templates (YAML)، إدارة الموافقات والـ Quotas والـ Leases، كاطالوج Service Broker، بايبلاينات Code Stream، و vRO Workflows | كياكل موارد كثيرة فـ Deployment (Appliances)، منحنى تعلم قاصح، ترخيص عهد Broadcom المكلف؛ وكيحتاج فريق مخصص للمنصة | [Aria Automation docs](https://docs.vmware.com/en/VMware-Aria-Automation/index.html) |

القاعدة العملية ديالي بعد سنوات فهاد المجال: Ansible كيتكلف بالـ OS، Python بالـ APIs، و AWX كيتكلف بالجدولة وسجلات التدقيق (Audit log). اللحظة لي كيبدا يبان فيها شي شرط ديال `when` فـ Playbook واصل لثلاثة د الشاشات، كتعرف أن داك المنطق مكانو فـ Python ماشي فـ Ansible.

### الأوركستريتور ديال الشركات الكبيرة: فين كيجي دور VMware Aria Automation

الـ AWX كتستعملو فاش كيكون الفريق ديالك هو المنصة براسها. أما VMware Aria Automation كتجيبو فاش كتولي الشركة كاملة بكل أقسامها هي الكليان ديالك. كيلعب فنفس الطبقات بثلاثة لي ذكرنا: الـ Cloud templates والكاطالوج ديال Service Broker شادين الحكامة فطبقة الـ Reasoning، والـ Code Stream و vRO مغطيين الـ Orchestration، والـ SaltStack Config كيوصل حتى لطبقة الـ Configuration.

التعقيد كاين فجوج جوانب مستمرة:

* **الإعداد الأولي (Front-loaded setup):** كتحتاج تديبلويي وتباتشي Appliances مخصصين، تربط الـ Identity (بحال vIDM/LDAP)، تموديلي الـ Cloud zones والمشاريع والـ Quotas، وتعلم صيغة YAML خاصة بالـ Blueprints لي كتعتبر لغة قائمة بذاتها. وأي حاجة Custom كتفرض عليك تدخل فـ Scripting ديال vRO أو ABX actions، وتما فين كاين منحنى التعلم الحقيقي.
* **العمليات المستمرة (Ongoing operations):** هادي منصة كتقابلها بالصيانة ماشي مجرد أداة كتخدمها وتسالي: تجديد الـ Certificates، التحديثات، استراتيجية الـ Backup، وضرورة وجود مهندس On-call فحالة تعطل الـ Orchestrator براسو. كتحتاج فريق منصة مخصص وميزانية كافية لنظام التراخيص الجديد ديال Broadcom.

وقتاش كيكون مناسب؟ فاش كتكون البنية التحتية كبيرة ومبنية أساساً على vSphere، مع وجود فرق داخلية متعددة كتطلب بيئات عمل بموافقات، حصص (Quotas)، مدد كراء (Lease policies)، واحتساب التكاليف (Showback)، زايد عمليات Day-2 متعددة السحب مربوطة ببيانات السعة من vROps. ويلا كان ترخيص VMware ديجا كيتضمن Aria Automation Advanced (بحال عروض VCF و vSphere Foundation)، فخيار الاعتماد عليه كيولي أرجح من بناء حل بديل من الصفر.

وقتاش كيكون زايد عن الحاجة؟ فـ Fleets صغار حتى لمتوسطين، فوجود فريق عمليات واحد، أو فثقافة كتركز على GitOps. فهاد الحالات، تجميعة Terraform/OpenTofu مع Ansible و AWX كتعطي نفس النتيجة بتعقيد ومساحة تشغيل أقل بكتير. النموذج الذهني ديالي: AWX بحال رافعة شوكية كتحكم فيها بسهولة، بينما Aria بحال قطار شحن بوزن وإمكانيات ضخمة، ولكن ما كتحركوش لمهمة خفيفة.

## 3. تفكيك الـ Runbook: دراسة حالة ديال معالجة امتلاء القرص (Disk Remediation)

باش تحول Runbook لسوفتوير، خاصك تقسم كل خطوة وتحدد الوظيفة الأساسية ديالها: **التحقق (Verification)**، **العزل (Isolation)**، و**المعالجة (Remediation)**. ناخدو أكثر Alert كيتعاود فالواقع: امتلاء مساحة القرص (Disk pressure) فشي Compute node.

**الـ Runbook اليدوي العادي:**

1. الدخول للسيرفور عبر SSH.
2. تشغيل أوامر التشخيص (`df -h`, `lsblk`) باش تحدد الـ Mount point لي عامرة.
3. مسح الـ Logs القديمة، وسجلات الـ Journal، وتنقية صور الـ Containers غير المستعملة (Dangling images).
4. يلا بقات المساحة فمستوى حرج، كتعيط للـ API ديال الـ Hypervisor ولا الـ Cloud باش تكبر الـ Volume وتزيد فمساحة الـ Filesystem.
5. إرسال تأكيد لـ Channel ديال العمليات.

**النموذج المؤتمت (Automated model)** كيفصل منطق الـ API الديناميكي على التعديلات المباشرة فالسيرفور:

1. **التنسيق والتحقق - Orchestration & Validation (Python):**
   * كيقرا الـ Alert webhook باش يحدد الـ Instance ومسار الـ Mount point بدقة.
   * كيتواصل مع الـ API ديال الـ Hypervisor أو التخزين السحابي باش يتأكد أن توسيع الـ Volume ممكن بلا ما يتجاوز الـ Quota المحددة للفريق.
   * كيتحقق من تصنيف السيرفور (Staging مقابل Production) باش يحدد الإجراءات المسموحة والحدود المقبولة للتوقف (Downtime).
   * كيفاليدي البيانات الواردة بـ Schemas صارمة (موديلات `pydantic` للـ Alerts، واستعمال `subprocess` محصور فقط فالحالات الضرورية محلياً).
2. **المعالجة على مستوى السيرفور - Host-level remediation (Ansible):**
   * كيعوض الأوامر اليدوية فـ Shell بموديولات Declarative وموثوقة.
   * كيدبر الـ Logical volumes والـ Filesystems عبر مجموعات الـ Storage الرسمية بلاصة أوامر التقسيم اليدوية.
   * كينقص حجم سجلات الـ Journal ويمسح موارد الـ Containers الزايدة باستعمال موديولات الـ Systemd والكونتينرات المدمجة.

الـ Playbook كيسالي بإرسال تقرير ديريكت لنفس القناة (Ops channel)، باش يبقى سجل التدقيق (Audit trail) واضح ومشارك مع الفريق فبلاصة وحدة.

## 4. الـ AI Agents فـ Workflows ديال التشغيل

الـ LLMs فتحو الباب لأتمتة مرحلة **التحليل واتخاذ القرار (Reasoning)** فإدارة الحوادث. ولكن فنفس الوقت كيدخلو مخاطر تشغيلية، داكشي علاش المعمارية خاصها تكون مضبوطة بحواجز واضحة.

### الـ Anti-Pattern: منح صلاحيات Shell مفتوحة للـ Agent

أكبر غلط كيدار هو إعطاء LLM agent إمكانية تنفيذ أوامر Shell مباشرة (`bash` أو SSH) فسيرفورات الـ Production:

* **أوامر غير دقيقة (Hallucinated commands):** الموديل يقدر يخترع CLI flags ما كايناش، ينفذ أوامر بـ Wildcards كتسبب فمسح بيانات بالخطأ، أو يغلط فالصيغة فتوزيعات ما مدربش عليها مزيان.
* **الـ Prompt injection:** يلا الـ Agent حلل سجلات أو نصوص جاية من برا فيها محتوى خبيث، كاين احتمال استدراجه باش يكشف على أسرار (Secrets) أو يوقف خدمات مهمة.
* **غياب حدود التأثير (No blast-radius boundary):** الـ Shell المباشر ما فيه حتى آلية تمنع الأخطاء الكارثية، بحال التعديل على قاعدة بيانات الإنتاج فوقت الذروة.

```
خطر:  [ Alert أولي ] ──> [ LLM Agent ] ──> [ SSH/Bash مباشر ] ──> [ تعديلات غير مضبوطة ]
```

### الـ Production Pattern: الـ Tool Schemas الحتمية والمضبوطة

المعمارية الآمنة كتعتمد على الـ AI حصرياً كـ **Classifier، محلل للترياج (Triage analyst)، وموزع للأدوات (Tool dispatcher)**، بينما كيتولى Ansible و Python فرض حدود التنفيذ الصارمة:

![نمط الترياج الآمن، الموديل كيختار الأداة، بوابات السياسة كيفاليديو، والمحركات الحتمية كتنفذ](/media/blog/ai-triage-pattern.svg)

حواجز الأمان لي كتضمن استقرار السيستيم:

1. **الموديل يشتغل كـ Function Caller فقط:** ما كنعطيوهش أداة تنفيذ عامة، وإنما أدوات مخصصة بـ Strongly typed schemas، بحال أداة `remediate_disk_pressure` لي كتقبل فقط أسماء سيرفورات كطابق Regex محدد فـ Inventory.
2. **التحقق الصارم على مستوى الـ Schema:** أي مدخلات كيرجعها الـ Agent كتدوز من فحص بنيوي دقيق قبل ما توصل لطبقة الـ Orchestration.
3. **التدخل البشري (Human-in-the-loop) فالعمليات الحساسة:** فاش كيتعلق الأمر بإعادة تشغيل قاعدة بيانات رئيسية أو تعديل قواعد الـ Firewall، السيستيم كيتوقف ويطلب موافقة مباشرة فـ Slack أو Teams قبل التنفيذ.
4. **التنفيذ كيبقى برمجياً بالكامل:** الموديل كيحلل مؤشرات الخطأ والـ Traces، كيربط البيانات من مختلف منصات الـ Monitoring، وكيختار مسار العلاج. ولكن ما كيطابيش الأوامر بيده أبداً.

### اختيار البيئة ديال الـ Reasoning: واش n8n، ولا LangGraph، ولا SDKs، ولا Agentic CLIs؟

الـ Triage agent محتاج بيئة عمل (Runtime)، والخيارات المتاحة متعددة بلا ما تحتاج تبني كلشي من الصفر:

* **[n8n](https://docs.n8n.io/):** خيار Low-code ممتاز: كيدعم الـ Self-hosting، متوافق مع الـ Webhooks، والنودات ديال الـ AI Agent لي فيه كتدعم الـ Function calling عبر واجهة مرئية. المنصة كتكفل بربط المكونات بسهولة: استقبال الـ Alerts، موافقات Slack، استدعاء الـ APIs ديال AWX، وسجلات التنفيذ؛ وهادشي كيخليه مناسب للفرق الصغيرة لي باغة طبقة Reasoning بلا تعقيدات تطوير خدمة جديدة. ولكن نفس القاعدة كتنطبق هنا: فاش كيبداو التفرعات فـ Canvas ياخدو مساحة مفرطة وكيعقدو الرؤية، كيكون الوقت باش تحول هاد المنطق للكود.
* **[LangGraph](https://langchain-ai.github.io/langgraph/):** المقابل ديالو فمنهجية Code-first: كيوفر Agent graphs مع إدارة الـ State، آليات المراجعة البشرية (Human review gates)، وإمكانية اختبار شاملة للأنظمة المعقدة لي كتستحق Version control و CI بحالها بحال أي سوفتوير.
* **Agent SDKs (طبقة الـ Harness):** الـ Harness هو الإطار لي كيحول الموديل اللغوي لـ Agent متكامل: كيدير إدارة دورة استدعاء الأدوات، تدبير الـ Context، والتحقق من الصلاحيات. كاينين مكتبات جاهزة كتوفر هاد الإطار بلا ما تعاود تبنيه: [PydanticAI](https://ai.pydantic.dev/) كيناسب بزاف هاد المعمارية حيت كيعتمد على التحقق الصارم باستعمال نفس موديلات `pydantic`؛ و [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/) كيوفر تتبع مدمج وحواجز أمان؛ و [ADK](https://google.github.io/adk-docs/) من Google لإدارة أنظمة الـ Multi-agents؛ بينما Claude Agent SDK من Anthropic كيقدم نفس الإطار المعتمد فـ Claude Code. كتختار واحد من هاد الـ SDKs يلا كان الـ Triage runtime منتوج غادي تطوروه وتصينوه داخلياً على المدى الطويل.
* **Claude Code و Codex:** هاد الـ Agentic CLIs كيجيو كبيئات تشغيل جاهزة مع تحكم فالصلاحيات عبر الـ Terminal. كينفعو فجوج أدوار رئيسية: أولاً فمرحلة التطوير كـ Pair-programmer كيعاون فكتابة ومراجعة الـ Playbooks والـ Schemas؛ وتانياً فبيئات معزولة (Sandboxed) كمحللين للترياج، مع تقييد الصلاحيات وأدوات الـ MCP لي كتخدم كـ Policy gateway. فهاد الحالات ما خاصهمش ياخدو صلاحيات التعديل المباشر فالـ Production؛ مهمتهم هي التحليل والاختيار، بينما كيتكلف Ansible و Python بالتنفيذ.

أياً كان الخيار المعتمد، القاعدة المعمارية كتبقى تابتة: الـ Agent كيصنف ويوجه، الـ Policy gateway كيتأكد ويفاليدي، والأدوات الحتمية (Deterministic tools) هي لي كتنفذ التغييرات.

مراجع كنزيد نوصي بقراءتها فهاد السياق: دليل [OpenAI function calling guide](https://platform.openai.com/docs/guides/function-calling) للحصول على مخرجات محددة ودقيقة، وتوتيق [Model Context Protocol](https://modelcontextprotocol.io/) لعزل نماذج الذكاء الاصطناعي وراء حدود استخدام واضحة للأدوات.

## 5. مبادئ هندسية لعصرنة الـ Runbooks

فاش تبغي تعوض الإجراءات اليدوية بالكود، حرص على تطبيق هاد المعايير:

* **Idempotency صارمة:** أي عملية معالجة خاص تكون قابلة لإعادة التشغيل بلا ما تخلف Side effects غير مرغوب فيها. يلا كان الـ Playbook ديال التنظيف كيعطي Error أو كيعدل ملفات فـ Node لي ديجا سليمة، فالخدمة باقية ما كملاتش.
* **فصل المسؤوليات (Separation of concerns):** إعداد الـ OS بلاصتو فـ Ansible، الربط بالـ APIs بلاصتو فـ Python، والجدولة وإدارة الصلاحيات بلاصتها فـ AWX. تجنب الخلط بيناتهم فطبقة وحدة.
* **معاملة كود العمليات كـ Codebase كاملة:** كولشي خاصو يكون فـ Git، كيدوز من الـ Linters (`ansible-lint`, `ruff`, `mypy`)، وكيتاستى على بيئات Staging مؤقتة فالـ CI pipeline.
* **حصر الذكاء الاصطناعي فالسياق والتحليل:** النماذج اللغوية كتحلل وتختار، والأدوات الحتمية والمضبوطة برمجياً هي لي كتنفذ التعديلات.

النضج التشغيلي (Operational maturity) مكيتقاسش بحجم التوثيق وصفحات الـ Wiki، وإنما بالطريقة الهندسية المنظمة لي كيقضي بيها الفريق على الـ Toil، Runbook تابع لاخر.
