---
title: "Automating the Boring Stuff: Turning Manual Runbooks into Repeatable Systems"
description: "Toil is manual, repetitive, and scales with your fleet. How I turn runbooks from documents humans read into state machines software executes, with Ansible, Python, and guardrailed AI agents."
date: "2026-09-11"
tags: ["automation", "sre", "ansible", "python"]
---

*Runbooks are where operational knowledge goes to rot. Here is how I turn them into deterministic, executable systems with Ansible, Python, and carefully fenced AI agents.*

If you work in SRE or systems administration, your operational work splits into two buckets: engineering work (designing systems, improving scalability and reliability) and toil. Toil is the official Google SRE book term for tasks that are manual, repetitive, automatable, tactical, and scale linearly with your fleet. Everyone recognizes it the moment they describe it.

The traditional container for toil is the manual runbook: a document that tells a human what to type when an alert fires. And that's exactly the problem. A runbook documents the steps, but relying on humans to execute them introduces predictable failure modes:

1. **Documentation entropy.** Stacks, APIs, and CLI flags evolve faster than documentation. Static pages drift from production reality, and you discover the drift mid-incident, when the procedure no longer works.
2. **Cognitive load under fire.** High-severity outages come with stress and fatigue. That is precisely when operators skip prerequisite checks, mistype commands, and introduce config drift.
3. **Non-deterministic execution.** Two engineers following the same prose runbook will move at different speeds, interpret ambiguous validation steps differently, and land in different end states.
4. **Zero continuous verification.** You cannot put a wiki page into CI. You find out a runbook is broken only when production is already degraded.

The fix is a mindset shift: treat runbooks not as documentation for humans to read, but as **state machines for software to execute**. With deterministic tools like Ansible and Python, plus AI reasoning agents kept on a short leash, manual procedures become self-healing and auditable.

## 1. Architectural Philosophy: Configuration vs. Orchestration vs. Reasoning

Automation efforts usually fail in one of two ways: everything becomes one monolithic script, or someone forces a tool far past its intended design. The reliable pattern is to split responsibilities across three tiers:

![The three automation layers, reasoning decides, Python coordinates, Ansible enforces](/media/blog/automation-layers.svg)

* **The Reasoning Layer** ingests alerts, normalizes telemetry, assesses blast radius, and decides *which* deterministic workflow to invoke.
* **The Orchestration Layer (Python)** talks to dynamic APIs (cloud providers, hypervisors, metric endpoints), evaluates conditional logic, and schedules execution.
* **The Configuration Layer (Ansible)** enforces declarative state on targets over plain SSH/WinRM, which makes every operation idempotent.

The layering matters because each tier fails differently. Reasoning can be wrong and you retry safely. Python glue can throw and you get a clean stack trace. Configuration either converges or it doesn't. Entangle them, and one bad webhook takes down your patching pipeline.

## 2. Tooling Matrix: Capabilities, Boundaries, and References

Knowing where each tool's engineering limits sit prevents bottlenecks from ever reaching production:

| Tool / Platform | Primary Purpose | Core Strengths | Operational Limitations | Documentation |
|---|---|---|---|---|
| **Ansible** | Host-level configuration, compliance, service state enforcement | Agentless, declarative state, rich idempotent module library | Inefficient at complex nested loops; YAML is a poor fit for advanced data structures and event streaming | [docs.ansible.com](https://docs.ansible.com/) |
| **Python** | API orchestration, data filtering, custom CLIs, runtime controllers | Native async (`asyncio`), strict validation (`pydantic`), universal API client support | Idempotency must be implemented manually; without strict standards, maintenance overhead compounds | [docs.python.org](https://docs.python.org/3/) |
| **AWX / Ansible Automation Platform** | Enterprise job scheduling, RBAC, credential masking, audit logging | Centralized execution, webhook-driven dispatch, full auditability | Heavy self-hosting footprint (Kubernetes operator); overkill for simple topologies | [AWX docs](https://ansible.readthedocs.io/projects/awx/en/latest/) |
| **Terraform / OpenTofu** | Declarative Day-0/Day-1 provisioning of core infrastructure | State management, dependency graphs, multi-provider modeling | Clumsy for Day-2 triage, host cleanup, or transient remediation | [OpenTofu docs](https://opentofu.org/docs/) |
| **VMware Aria Automation** | Enterprise multi-cloud provisioning, governed self-service catalogs, Day-2 orchestration | Cloud templates (YAML blueprints), approvals, quotas and leases, Service Broker catalog, Code Stream pipelines, vRO workflows | Heavy appliance footprint, steep learning curve, Broadcom-era licensing; demands a dedicated platform team | [Aria Automation docs](https://docs.vmware.com/en/VMware-Aria-Automation/index.html) |

My rule of thumb after years with this stack: Ansible owns the OS, Python owns the APIs, AWX owns the schedule and the audit log. The moment a playbook grows a `when` condition that spans three screens, the logic belongs in Python instead.

### The Enterprise Orchestrator: Where VMware Aria Automation Fits

AWX is what you run when your team *is* the platform. VMware Aria Automation is what you adopt when the whole company becomes your customer. It plays in the same three tiers as the diagram above: its cloud templates and Service Broker catalog handle reasoning-level governance, Code Stream and vRO cover orchestration, and SaltStack Config extends into the configuration layer.

The complexity stands in two places, and both are permanent residents:

* **Front-loaded setup.** You deploy and patch dedicated appliances, wire identity (vIDM/LDAP), model cloud zones, projects, and quotas, and learn a blueprint YAML dialect that is genuinely its own language. Anything custom ends up in vRO scripting or ABX actions, which is where the real learning curve lives.
* **Ongoing operations.** This is a platform you operate, not a tool you run: certificate rotation, upgrades, backup strategy, and someone on call when the orchestrator itself breaks. It wants a dedicated platform team, plus budget patience for Broadcom-era licensing.

So when is it perfect? When your estate is large, deeply vSphere-centric, and full of internal customers: dozens of teams requesting environments with approvals, quotas, lease policies, cost showback, and multi-cloud Day-2 tied into vROPs capacity data. If your VMware licensing already bundles Aria Automation Advanced (VCF and vSphere Foundation tiers do), the buy-vs-build math tilts further toward buy.

When is it overkill? Small and mid fleets, a single ops team, or a culture already committed to GitOps. Terraform/OpenTofu plus Ansible and AWX delivers the same outcome with a fraction of the surface area. My mental model: AWX is a forklift you drive. Aria is a freight train, enormous capacity, but you do not take it to the corner store.

## 3. Runbook Deconstruction: A Disk Remediation Case Study

To convert a runbook into software, dissect each step into its underlying function: **Verification**, **Isolation**, and **Remediation**. Take the most common alert in existence: disk pressure on a compute node.

**The manual runbook:**

1. SSH into the node.
2. Run diagnostics (`df -h`, `lsblk`) to find the exhausted mount point.
3. Clean old application logs, journal logs, and dangling container images.
4. If capacity is still critical, call the hypervisor or cloud API to expand the volume and grow the filesystem.
5. Post a confirmation in the ops channel.

**The automated model** splits dynamic API logic away from node-level mutations:

1. **Orchestration & validation (Python):**
   * Parses the alert webhook to extract instance identity and mount path.
   * Queries the hypervisor or cloud storage API to confirm the volume can expand without blowing team quotas.
   * Checks node tags (staging vs production) to pick permissible actions and downtime thresholds.
   * Validates every payload with strict schemas (`pydantic` models for alerts, `subprocess` only for the few things that must run locally).
2. **Host-level remediation (Ansible):**
   * Replaces manual shell commands with declarative modules.
   * Manages logical volumes and filesystems through the community storage collections instead of raw partitioning commands.
   * Truncates journal logs and purges dangling container resources with built-in systemd and container modules.

The playbook ends by writing back to the ops channel itself, so the audit trail and the humans live in the same place.

## 4. AI Agents in Operational Workflows

LLMs open the door to automating the *reasoning* step of incident management. They also open the door to chaos, so the architecture has to be strict.

### The Anti-Pattern: Unconstrained Shell Access

The most common mistake is handing an LLM agent a raw shell (`bash`, SSH) on production nodes:

* **Hallucinated commands.** Models invent CLI flags, run destructive commands with unexpected wildcards, and misread syntax on unfamiliar distributions.
* **Prompt injection.** If the agent reads corrupted logs, tracebacks, or external content containing adversarial text, it can be coerced into exfiltrating secrets or shutting down services.
* **No blast-radius boundary.** A raw shell has zero native checks against business constraints, like touching a production database during peak traffic.

```
DANGEROUS:  [ Raw Alert ] ──> [ LLM Agent ] ──> [ Direct SSH/Bash ] ──> [ Unpredictable Mutations ]
```

### The Production Pattern: Deterministic Tool Schemas

The resilient architecture uses the AI strictly as a **classifier, triage analyst, and tool dispatcher**, while Ansible and Python enforce hard execution boundaries:

![Safe AI triage pattern, the model picks the tool, policy gateways validate, deterministic engines execute](/media/blog/ai-triage-pattern.svg)

The guardrails that make it safe:

1. **Model as function caller.** No generic execution tool. Expose purpose-built tools with strongly typed schemas, like `remediate_disk_pressure` accepting only hostnames that match an inventory regex.
2. **Schema-level enforcement.** Every input the agent returns passes strict structural validation before the orchestration layer even sees it.
3. **Human-in-the-loop for high-risk actions.** Rebooting a database primary or touching firewall rules emits a confirmation prompt to Slack or Teams first.
4. **Keep execution purely programmatic.** The model digests messy error traces, correlates signals across monitoring tools, and picks the remedy. It never types the commands.

### Choosing the Reasoning Fabric: n8n, LangGraph, SDKs, or Agentic CLIs

The triage agent needs a runtime, and you have real options beyond building one from scratch:

* **[n8n](https://docs.n8n.io/)** is the low-code entry point: self-hostable, webhook-native, and its AI Agent nodes wrap the function-calling pattern in drag-and-drop. The surrounding canvas handles the plumbing for free, alert ingestion, Slack approvals, AWX API calls, execution logs, which makes it perfect when a small team wants a reasoning layer without building a service around it. The same rule as Ansible applies though: the moment the canvas branching spans three screens, graduate that logic to code.
* **[LangGraph](https://langchain-ai.github.io/langgraph/)** is the code-first counterpart: agent graphs with persistent state, human review gates, and full testability. The right choice when triage logic is complex enough to deserve version control and CI like any other software.
* **Agent SDKs (the harness layer).** A harness is the scaffolding that turns a raw model into an agent: the tool-execution loop, context management, and permission checks wrapped around the LLM. Purpose-built SDKs give you that scaffolding instead of hand-rolling it: [PydanticAI](https://ai.pydantic.dev/) is the natural fit for this stack, typed and validation-first, reusing the same `pydantic` models that guard the payloads; the [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/) ships handoffs, guardrails, and tracing; Google's [ADK](https://google.github.io/adk-docs/) models multi-agent hierarchies; and Anthropic's Claude Agent SDK is the harness that powers Claude Code, packaged as an embeddable library. Reach for one when the triage runtime is something you will maintain as a product; skip it when a single well-schematized function call would do.
* **Claude Code and Codex** (Anthropic's and OpenAI's agentic CLIs) are the shrink-wrapped version of that same harness, delivered as runtimes around a permissioned terminal. They earn their place in two roles: upstream, as the pair-programmer that authors and lints the playbooks, schemas, and glue code, the deterministic layer built faster; and in supervised sandboxed contexts as triage analysts, with their permission modes and MCP tool allowlists acting as the policy gateway. Neither should hold production mutation rights. They analyze and select; Ansible and Python execute.

Whichever fabric you pick, the pattern in the diagram above does not change: the agent classifies and dispatches, the policy gateway validates, and deterministic tools mutate.

Worth reading on this front: the [OpenAI function calling guide](https://platform.openai.com/docs/guides/function-calling) for deterministic model outputs, and the [Model Context Protocol](https://modelcontextprotocol.io/) for isolating LLMs behind explicit tool boundaries.

## 5. Engineering Principles for Runbook Modernization

When retiring manual procedures in favor of code, hold your systems to these standards:

* **Strict idempotency.** Every remediation must be re-runnable without side effects. If a cleanup playbook errors or mutates files on an already-healthy host, the implementation is incomplete.
* **Separation of concerns.** OS configuration lives in Ansible, API glue lives in Python, scheduling and authorization live in AWX. Resist the urge to blend them.
* **Treat operational code like application code.** Everything in Git, linted (`ansible-lint`, `ruff`, `mypy`), and tested against disposable staging instances in CI.
* **Confine AI to context and selection.** Language models analyze and choose. Deterministic tools mutate.

Operational maturity isn't measured by how deep your documentation wiki goes. It's measured by how systematically your team engineers toil out of existence, one runbook at a time.
