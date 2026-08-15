---
title: "Demystifying OpenStack: Architecture, Economics, and the Post-VMware Reality"
description: "A practitioner's guide to deploying, scaling, and evaluating OpenStack, written from real deployments, not vendor decks."
date: "2026-08-15"
tags: ["openstack", "private-cloud", "infrastructure", "vmware"]
---

*A practitioner's guide to deploying, scaling, and evaluating OpenStack, written from real deployments, not vendor decks.*

## 1. The Private Cloud Is Back

For years, the story was simple: everything moves to the hyperscalers. Then the egress bills arrived, data sovereignty laws got teeth, and AI teams started asking for dedicated GPU clusters. Suddenly private cloud is interesting again, and OpenStack is right in the middle of that conversation.

The project used to have a rough reputation, and honestly, it earned it. But it has grown up. OpenStack now runs behind global telcos, research facilities like CERN, sovereign clouds, and far more enterprise data centers than most people realize. And with Broadcom's acquisition of VMware shaking up licensing across the industry, a lot of infrastructure teams are quietly asking the same question:

**Is OpenStack a realistic path forward, or is it still too complex for a normal enterprise?**

This post is my attempt at a straight answer. We'll go through the architecture, the release model, who's behind it, what it actually costs, and what it's like to deploy the thing for real.

## 2. What OpenStack Actually Is (and Who Builds It)

OpenStack isn't a hypervisor, and it isn't a single product. It's a collection of services, mostly Python, that together give you Infrastructure-as-a-Service: compute, storage, and networking pooled across bare-metal hardware and exposed through APIs. It's governed by the OpenInfra Foundation under what they call the "Four Opens": open source, open design, open development, open community.

![OpenStack core services architecture](/media/blog/openstack-architecture.svg)

The contributor list reads like a who's who of infrastructure: Red Hat, Canonical, Mirantis, NVIDIA, Ericsson, Intel, SAP, Rackspace, and thousands of individual engineers.

**Releases and SLURP.** OpenStack ships on a six-month cadence with alphabetical release names, Caracal (2024.1), Dalmatian (2024.2), Epoxy (2025.1), Flamingo (2025.2). If upgrading twice a year sounds painful, there's SLURP (Skip Level Upgrade Release Process): every second release is a SLURP release, and you can jump directly from one SLURP to the next without database or API breakage.

## 3. So, How Hard Is It Really?

The horror stories come from the 2012–2017 era, when deploying OpenStack meant hand-editing hundreds of `.conf` files across Python virtualenvs. Nobody does that anymore. Today you deploy through a framework:

- **OpenStack-Ansible (OSA)**, Ansible playbooks that deploy services into isolated LXC containers on your hosts. Clean, modular, easy to reason about.
- **Kolla-Ansible**, same idea, but services run as Docker/OCI containers.
- **Red Hat OpenStack Platform Director (TripleO)**, an "undercloud" OpenStack instance deploys and manages the production "overcloud" (RHOSP 18+ moves this to OpenShift operators).
- **Canonical Charmed OpenStack / Sunbeam**, Juju charms on MicroK8s handling lifecycle management.

The hard part was never clicking around Horizon. The hard part is Day 2:

- **Neutron / OVN networking.** Geneve and VXLAN overlays, distributed routing, OpenFlow pipelines, MTU fragmentation between hypervisors and top-of-rack switches. This is where most production incidents live.
- **State and messaging.** RabbitMQ carries RPC traffic between services; MariaDB Galera holds the state. If the queue backs up or Galera loses quorum, your APIs hang, and everything looks "fine" right up until it isn't.
- **Storage integration.** Getting Cinder drivers to behave with your Ceph RBD pools, or with that enterprise SAN your procurement team loved.

## 4. Design First: HLD and LLD

The fastest way to fail at OpenStack is to start deploying before you've finished thinking. Measure three times, deploy once.

![HLD, LLD, and deployment phases](/media/blog/openstack-design-phases.svg)

The **High-Level Design** is the architectural vision. Where does the control plane live, dedicated bare metal or hyperconverged? What's the storage strategy, Ceph, NetApp, local NVMe? How do you segment availability zones and failure domains?

The **Low-Level Design** turns that into actual configuration: which NICs bond together and how (LACP 802.3ad vs active-backup), which VLANs carry management vs storage vs tenant overlay vs provider traffic, and MTU sizing end to end. If your switches run jumbo frames at 9000, your encapsulated tenant traffic at 8950 won't fragment. Miss that detail and you'll spend a week chasing "random" packet loss.

Then reality shows up. No deployment plan survives first contact with physical hardware, a firmware bug on a 25G SFP28 NIC, a kernel module conflict, an MTU mismatch that only drops packets between two specific hypervisors. You'll hit something the diagrams didn't predict, so treat your HLD and LLD as living documents. If distributed routing adds too much complexity to your leaf-spine fabric, centralized routing with L3 HA is a proven alternative. If containerized Ceph daemons fight you, run Ceph on bare metal and wire it in through the RBD backend. There's almost always more than one way to reach the same architecture, and root-cause analysis beats blind adherence to a diagram every time.

## 5. From Vagrant to Bare Metal: What I Actually Deployed

Theory is cheap, so here's what I've actually run.

**Project 1, OpenStack-Ansible, from PoC to 5-node bare metal.** At 1337 Coding School, my team deployed OpenStack from scratch with openstack-ansible. We started in Vagrant and VirtualBox, a multi-VM testbed where we could break inventory variables and Ansible roles without consequences. Then we moved to physical metal: three controllers, two computes, and all the things VMs hide from you. Raw Linux bridges, bond interfaces, VLAN trunks, LXC provisioning across the controllers, and one memorable lesson: if NTP drifts by even a couple of seconds, Keystone token validation falls over immediately.

![5-node OpenStack-Ansible bare metal lab](/media/blog/openstack-5node-lab.svg)

**Project 2, Red Hat OpenStack Platform 17 at Atlas Cloud Services.** During my internship we worked about a lab that showed me the other side: what vendor engineering actually buys you. RHOSP 17 had already moved fully to OVN as the default ML2 driver, a real performance win over the legacy OVS agents, and Director automated the highly available control plane with Pacemaker/Corosync plus integrated Ceph provisioning.

## 6. What It Costs

The source code is free. Running it in production is not, you either pay a vendor or you pay engineers.

| | Vendor distribution | DIY model |
|---|---|---|
| **Software** | Annual subscriptions | $0 license |
| **Support** | Enterprise SLA & patches | Your team, at 3 AM |
| **Deployment** | Day-1 consulting available | Your own automation |
| **Hardware** | Certified drivers | Whatever you make work |

**Support subscriptions (per node per year, from official price lists):**

| Vendor | Cost | Notes |
|---|---|---|
| Canonical (Charmed OpenStack) | $1,500 support / $5,475 fully-managed | Per machine, no socket/core penalties; Ubuntu Pro 24/7 full support runs $3,400/server |
| Red Hat OpenStack Platform | $3,449 standard / $4,499 premium per socket-pair | Controller-node SKUs run lower (~$2,100–$2,800); often bundled with RHEL & Ceph |
| Mirantis (MOSK) | $1,125 – $2,250+ per node | Entry tiers from their public store; managed offerings price the control plane separately |

**Day-1 professional services.** Canonical's own datasheet lists design-and-delivery engagements at $85,000. Across vendors and partners, a production 20–50 node cluster with custom integrations (billing, firewalls, storage backends) typically lands between $50k and $200k+.

**The DIY reality check.** Licensing is $0, but you need at least 3–5 senior platform engineers comfortable across Linux, Ansible, Python, Ceph, and software-defined networking. That's not a hidden cost so much as a very visible one people forget to budget for.

## 7. The Honest Trade-offs

Where OpenStack wins:

- **No vendor lock-in.** Standard open APIs, your infrastructure destiny is yours.
- **Economics at scale.** Past ~100 hypervisor nodes, it beats per-core proprietary licensing by a wide margin.
- **Real multi-tenancy.** Projects, quotas, Keystone RBAC, self-service networking, built in, not bolted on.
- **Serious networking.** SR-IOV, DPDK, OVN, BGP dynamic routing. This is why telcos use it for NFV.

Where it hurts:

- **Operational overhead.** You need people who know Linux, Ansible, Python, Ceph, and SDN, not one of those, all of them.
- **Upgrades.** SLURP helps, but major version jumps still demand staging environments and rollback plans.
- **Cloud-native assumptions.** OpenStack was designed around "cattle, not pets." If you're running monolithic legacy VMs that can't survive a hypervisor reboot, you'll be engineering HA at the storage and compute layers deliberately.

## 8. Who Actually Runs This Stuff

- **Telcos**, Orange, AT&T, Vodafone, China Mobile run 5G core and virtualized network functions on OpenStack, largely because of the DPDK/SR-IOV throughput story.
- **Research**, CERN manages over 500,000 processor cores on OpenStack to analyze Large Hadron Collider collision data.
- **Retail & enterprise**, Walmart runs e-commerce across massive multi-region OpenStack clusters to control unit economics during peak seasons.
- **Sovereign clouds**, European and regional providers use it to deliver GDPR-compliant services without depending on US hyperscalers.

## 9. The VMware Question

Since the Broadcom acquisition, this is the question everyone actually wants answered. Should you move to OpenStack? It depends, but here's the honest version of "depends."

![Is OpenStack right for you? Decision guide](/media/blog/openstack-decision-tree.svg)

OpenStack makes sense when you have 50+ bare-metal hosts and the per-core hypervisor licensing has become offensive; when your team already treats infrastructure as code with Ansible and Python; and when you want one platform for both VMs and bare metal (Ironic is genuinely good at that).

It does not make sense when you're running a five-node cluster with one admin who lives in a GUI. The operational weight will bury you. Look at Proxmox VE, Nutanix AHV, or XCP-ng instead, they're built for exactly that world.

## 10. Closing Thoughts

OpenStack isn't a virtualization platform, it's a cloud operating system, and it expects to be treated like one. It demands engineering discipline, real design work up front, and the humility to iterate when the hardware disagrees with your diagrams.

In exchange, it gives you something no proprietary vendor can: complete independence, serious scale, and infrastructure you actually own.

## Resources

**Documentation & deployment**

- [OpenStack Documentation](https://docs.openstack.org/) — official docs for every service and release
- [OpenStack-Ansible Deployment Guide](https://docs.openstack.org/openstack-ansible/latest/) — the framework I used for the 5-node bare-metal build
- [Kolla-Ansible](https://docs.openstack.org/kolla-ansible/latest/) — containerized deployment alternative
- [OpenInfra Foundation](https://openinfra.dev/) — release schedule, SLURP policy, and community

**Vendor pricing referenced in this article**

- [Canonical OpenStack support pricing](https://canonical.com/openstack/support) — per-node subscription model
- [Charmed OpenStack datasheet](https://assets.ubuntu.com/v1/603aea18-Datasheet%20-%20Charmed%20OpenStack.pdf) — $1,500/machine support, $5,475 fully-managed, $85k design & delivery
- [Ubuntu Pro pricing](https://ubuntu.com/pricing/pro) — $1,775–$3,400/server for infra & full support tiers
- [Red Hat subscription model](https://www.redhat.com/rhdc/managed-files/li-red-hat-enterprise-linux-subscription-guide-2562450pr-202511-en.pdf) — socket-pair licensing explained
- [Red Hat OpenStack Platform list pricing](https://www.redhat.com/en/blog/red-hat-announces-general-availability-of-new-infrastructure-solutions-red-hat-openstack-certification-update) — $3,449 standard / $4,499 premium per socket-pair
- [Mirantis webstore](https://store.mirantis.com/) — per-node subscription tiers

**Going deeper**

- [OpenStack releases & SLURP](https://releases.openstack.org/) — every release, its schedule, and support phase
- [OVN (Open Virtual Network)](https://www.ovn.org/en/) — the networking backend behind modern Neutron
- [CERN's OpenStack cloud](https://openstack-in-production.blogspot.com/) — how they run 500k+ cores in production
