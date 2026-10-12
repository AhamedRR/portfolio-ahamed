import {
  Activity,
  Award,
  BadgeCheck,
  BookOpen,
  Brain,
  CalendarClock,
  Clock,
  Crown,
  Crosshair,
  Eye,
  Fingerprint,
  Flame,
  GraduationCap,
  Handshake,
  MailSearch,
  MessagesSquare,
  Network,
  Puzzle,
  Scale,
  ShieldCheck,
  Siren,
  Terminal,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Rallydeen Roshan Ahamed",
  displayName: "Rallydeen Roshan",
  title: "SOC Analyst | Cybersecurity Professional",
  email: "ahamedroshan426@gmail.com",
  phoneDisplay: "+94 76 784 4747",
  phoneHref: "tel:+94767844747",
  linkedin: "https://www.linkedin.com/in/ahmed-roshan-426-rr",
  linkedinDisplay: "linkedin.com/in/ahmed-roshan-426-rr",
  location: "Dubai, United Arab Emirates",
  locationShort: "Dubai, UAE",
};

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Certifications", href: "#certifications", id: "certifications" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const;

export const sectionIds = navLinks.map((link) => link.id);

/* ------------------------------------------------------------------ */
/* Hero stats                                                          */
/* ------------------------------------------------------------------ */

export const heroStats = [
  { value: "3+", label: "Years in Cybersecurity" },
  { value: "2+", label: "Years in 24/7 SOC Ops" },
  { value: "10+", label: "Clients in Managed SOC" },
];

export const heroStackMarquee = [
  "CrowdStrike Falcon",
  "Cortex XDR",
  "Cortex XSIAM",
  "Microsoft Defender XDR",
  "Cortex XSOAR",
  "IBM QRadar",
  "Stellar Cyber",
  "Microsoft Entra ID",
  "KQL",
  "XQL",
  "VirusTotal",
  "AbuseIPDB",
  "AlienVault OTX",
  "GreyNoise",
  "IBM X-Force",
  "OWASP Top 10",
];

/* ------------------------------------------------------------------ */
/* Skills — Technical                                                  */
/* ------------------------------------------------------------------ */

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  items: string[];
}

export const technicalSkillCategories: SkillCategory[] = [
  {
    title: "EDR / XDR Tools",
    icon: ShieldCheck,
    items: [
      "CrowdStrike Falcon",
      "Cortex XDR",
      "Cortex XSIAM",
      "Microsoft Defender XDR",
      "Stellar Cyber",
    ],
  },
  {
    title: "SIEM & SOC Platforms",
    icon: Activity,
    items: ["IBM QRadar", "Cortex XSOAR", "SIEM Dashboards", "Detection Rules", "Log Correlation"],
  },
  {
    title: "Incident Response",
    icon: Siren,
    items: [
      "Alert Triage",
      "Endpoint Isolation",
      "Remote Remediation",
      "Security Incident Investigation",
      "Evidence Collection",
      "Investigation Reporting",
      "Response Playbooks",
    ],
  },
  {
    title: "Identity Investigation",
    icon: Fingerprint,
    items: ["Microsoft Entra ID", "Identity Threat Investigation", "Sign-in & Audit Log Review"],
  },
  {
    title: "Email & File Investigation",
    icon: MailSearch,
    items: [
      "Suspicious Email Analysis",
      "File Analysis in Isolated VMs",
      "Phishing Investigation",
    ],
  },
  {
    title: "Query Languages",
    icon: Terminal,
    items: ["KQL (Microsoft)", "XQL (Cortex)"],
  },
  {
    title: "Threat Intelligence",
    icon: Crosshair,
    items: [
      "VirusTotal",
      "AbuseIPDB",
      "AlienVault OTX",
      "IPinfo",
      "IBM X-Force Exchange",
      "GreyNoise",
      "MITRE ATT&CK",
    ],
  },
  {
    title: "Networking & Operating Systems",
    icon: Network,
    items: [
      "TCP/IP",
      "DNS",
      "DHCP",
      "IPsec",
      "SSL/TLS",
      "VPN",
      "Windows",
      "Linux",
      "OWASP Top 10",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Skills — Soft                                                       */
/* ------------------------------------------------------------------ */

export interface SoftSkill {
  title: string;
  icon: LucideIcon;
  description: string;
}

export const softSkills: SoftSkill[] = [
  {
    title: "Leadership",
    icon: Crown,
    description: "Guiding SOC shifts and supporting team decisions during live security incidents.",
  },
  {
    title: "Teamwork & Collaboration",
    icon: UsersRound,
    description: "Working seamlessly with analysts, engineers, and client teams across time zones.",
  },
  {
    title: "Quick Learning & Adaptability",
    icon: Zap,
    description: "Ramping up fast on new EDR, SIEM, and investigation tooling as environments evolve.",
  },
  {
    title: "Analytical Thinking",
    icon: Brain,
    description: "Correlating logs, alerts, and threat intel to separate real threats from noise.",
  },
  {
    title: "Problem-Solving",
    icon: Puzzle,
    description: "Breaking down complex incidents into clear, actionable investigation steps.",
  },
  {
    title: "Communication",
    icon: MessagesSquare,
    description: "Delivering clear, structured incident reports and escalation summaries.",
  },
  {
    title: "Client Management",
    icon: Handshake,
    description: "Supporting 10+ managed clients with professional escalations and updates.",
  },
  {
    title: "Decision-Making",
    icon: Scale,
    description: "Making containment calls — like endpoint isolation — with confidence under SLA.",
  },
  {
    title: "Time Management",
    icon: Clock,
    description: "Prioritizing alerts and investigations across a busy 24/7 SOC queue.",
  },
  {
    title: "Mentoring Junior Analysts",
    icon: GraduationCap,
    description: "Coaching new analysts on triage workflows, tooling, and investigation quality.",
  },
  {
    title: "Attention to Detail",
    icon: Eye,
    description: "Catching the subtle indicators others miss — in logs, emails, and endpoints.",
  },
  {
    title: "Shift Coordination",
    icon: CalendarClock,
    description: "Running smooth handovers and coverage across follow-the-sun SOC rotations.",
  },
  {
    title: "Working Under Pressure",
    icon: Flame,
    description: "Staying composed and methodical during high-severity incident response.",
  },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  note?: string;
  current?: boolean;
  points: string[];
  stack: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "SOC Analyst",
    company: "Delta Spike (Private) Limited",
    period: "Jul 2025 — Sep 2026",
    current: true,
    points: [
      "Managed SOC operations supporting 10+ clients, handling client escalations and shift coordination across the team.",
      "Assist junior analysts and contribute to complex investigations across CrowdStrike Falcon, Cortex XDR, Cortex XSIAM, Microsoft Defender XDR, and Stellar Cyber.",
      "Conduct Microsoft Entra ID investigations and build KQL/XQL queries for threat detection and hunting.",
      "Perform endpoint isolation and remote remediation, and analyze suspicious emails and files in isolated virtual machines.",
      "Prepare structured investigation and incident reports for clients and internal stakeholders.",
    ],
    stack: ["CrowdStrike Falcon", "Cortex XDR", "Cortex XSIAM", "Defender XDR", "Stellar Cyber", "Entra ID", "KQL", "XQL"],
  },
  {
    role: "Associate SOC Analyst",
    company: "Flix 11 (Private) Limited",
    period: "Jan 2025 — Jul 2025",
    points: [
      "Investigated escalated alerts using CrowdStrike Falcon EDR and IBM QRadar.",
      "Worked with SIEM dashboards and contributed to detection rules to improve alert quality.",
      "Mentored junior analysts on triage workflows and investigation practices.",
      "Participated in ISO-related SOC audits, attended customer meetings, and produced incident reports.",
    ],
    stack: ["CrowdStrike Falcon", "IBM QRadar", "Detection Rules", "Incident Reporting"],
  },
  {
    role: "Junior SOC Analyst",
    company: "Flix 11 (Private) Limited",
    period: "Jun 2024 — Dec 2024",
    points: [
      "Delivered 24/7 security monitoring and alert triage across client environments.",
      "Escalated incidents and followed response playbooks for containment actions.",
      "Enriched indicators with threat intelligence to support faster, more accurate verdicts.",
      "Prepared daily and monthly security reports for clients.",
    ],
    stack: ["24/7 Monitoring", "Alert Triage", "Response Playbooks", "Threat Intelligence", "Reporting"],
  },
  {
    role: "Tutelr Infinity Internship",
    company: "Tutelr Infosec Pvt Ltd, India",
    period: "Jul 2023 — Mar 2024",
    note: "Remote",
    points: [
      "Completed foundational, hands-on training in cloud security.",
      "Studied digital forensics and incident response (DFIR) fundamentals.",
      "Learned vulnerability assessment and penetration testing (VAPT) methodologies.",
      "Built core Blue Team operations skills that underpin my SOC career.",
    ],
    stack: ["Cloud Security", "DFIR", "VAPT", "Blue Team"],
  },
];

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export interface EducationItem {
  degree: string;
  institution: string;
  period?: string;
  detail?: string;
  icon: LucideIcon;
}

export const education: EducationItem[] = [
  {
    degree: "BSc (Hons) in Information Technology",
    institution: "Sri Lanka Institute of Information Technology",
    period: "Jun 2020 — Jun 2024",
    detail: "Specialized in Cyber Security",
    icon: GraduationCap,
  },
  {
    degree: "G.C.E. Advanced Level",
    institution: "Physical Science Stream",
    detail: "Secondary education — Physical Science",
    icon: BookOpen,
  },
];

/* ------------------------------------------------------------------ */
/* Certifications                                                      */
/* ------------------------------------------------------------------ */

export interface CertificationItem {
  title: string;
  issuer: string;
  status: "Completed" | "In Progress";
  note?: string;
  icon: LucideIcon;
}

export const certifications: CertificationItem[] = [
  {
    title: "Foundation Level Threat Intelligence Analyst",
    issuer: "arcX",
    status: "Completed",
    icon: BadgeCheck,
  },
  {
    title: "Foundations of Operationalizing MITRE ATT&CK",
    issuer: "AttackIQ",
    status: "Completed",
    icon: BadgeCheck,
  },
  {
    title: "Advanced Incident Response and Threat Hunting",
    issuer: "Tutelr Infosec Pvt Ltd",
    status: "Completed",
    icon: BadgeCheck,
  },
  {
    title: "Website Hacking Techniques",
    issuer: "EC-Council",
    status: "Completed",
    icon: BadgeCheck,
  },
  {
    title: "Microsoft SC-200: Security Operations Analyst",
    issuer: "Microsoft",
    status: "In Progress",
    note: "Currently preparing for the SC-200 certification exam.",
    icon: Award,
  },
];
