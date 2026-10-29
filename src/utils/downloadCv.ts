/**
 * Generates a clean, multi-page CV PDF entirely in the browser (no dependencies)
 * and triggers a download. Byte offsets for the xref table are computed
 * programmatically, so the output is always a valid PDF.
 *
 * Text is word-wrapped automatically using real Helvetica glyph widths, and a
 * new page is started whenever content reaches the bottom margin.
 * All text intentionally stays ASCII-safe (standard PDF/Helvetica encoding).
 */

const FILE_NAME = "Rallydeen_Roshan_Ahamed_CV.pdf";

const COLORS = {
  heading: "0.05 0.30 0.70", // blue section headings
  accent: "0.20 0.65 0.95", // light blue job title
  dark: "0.09 0.14 0.22",
  body: "0.20 0.27 0.36",
  muted: "0.45 0.50 0.58",
} as const;

type Font = "F1" | "F2"; // F1 = Helvetica-Bold, F2 = Helvetica

/* Helvetica glyph widths (1/1000 em) for ASCII 32..126 */
const W_REGULAR = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
  1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778,
  667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
  333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556,
  556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584,
];
const W_BOLD = [
  278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611,
  975, 722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778,
  667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556,
  333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611,
  611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389, 584,
];

function textWidth(value: string, font: Font, size: number, charSpacing = 0): number {
  const table = font === "F1" ? W_BOLD : W_REGULAR;
  let total = 0;
  for (const ch of value) {
    const code = ch.charCodeAt(0);
    total += (code >= 32 && code <= 126 ? table[code - 32] : 556) * size / 1000;
    total += charSpacing;
  }
  return total;
}

function escapePdfText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrap(value: string, font: Font, size: number, maxWidth: number): string[] {
  const words = value.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (current && textWidth(candidate, font, size) > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function downloadCv(): void {
  const PAGE_W = 595; // A4
  const PAGE_H = 842;
  const X = 50;
  const WIDTH = PAGE_W - X * 2;
  const TOP = PAGE_H - 50;
  const BOTTOM = 55;

  const pages: string[][] = [[]];
  let ops = pages[0];
  let y = TOP;

  const newPage = () => {
    ops = [];
    pages.push(ops);
    y = TOP;
  };

  /** Make sure `needed` points of vertical space remain, otherwise start a new page. */
  const ensure = (needed: number) => {
    if (y - needed < BOTTOM) newPage();
  };

  type TextOpts = { font: Font; size: number; color: string; x?: number; charSpacing?: number };

  const put = (value: string, atY: number, o: TextOpts) => {
    const { font, size, color, x = X, charSpacing = 0 } = o;
    ops.push(
      `BT /${font} ${size} Tf ${color} rg ${charSpacing} Tc ${x.toFixed(2)} ${atY.toFixed(2)} Td (${escapePdfText(value)}) Tj ET`
    );
  };

  const centered = (value: string, o: Omit<TextOpts, "x">) => {
    const w = textWidth(value, o.font, o.size, o.charSpacing ?? 0);
    put(value, y, { ...o, x: X + (WIDTH - w) / 2 });
  };

  const rule = (atY: number, color: string = COLORS.heading) => {
    ops.push(`${color} rg ${X} ${atY} ${WIDTH} 0.8 re f`);
  };

  /* ------------------------------------------------------------- header */
  centered("RALLYDEEN ROSHAN AHAMED", { font: "F1", size: 20, color: COLORS.dark, charSpacing: 2 });
  y -= 22;
  centered("SOC ANALYST", { font: "F1", size: 12, color: COLORS.accent });
  y -= 18;

  const contactLines = [
    "Email - ahamedroshan426@gmail.com",
    "Phone - +971-50-510-9646",
    "Address - Dubai, UAE",
    "Visa Type - Visit Visa",
    "Availability: Immediate",
    "LinkedIn - https://www.linkedin.com/in/ahamed-roshan-426-rr",
    "Website - https://portfolio-ahamedrr.vercel.app/",
  ];
  for (const line of contactLines) {
    centered(line, { font: "F1", size: 9, color: COLORS.dark });
    y -= 12.5;
  }
  y -= 2;
  rule(y);

  /* ---------------------------------------------------------- primitives */
  const section = (title: string) => {
    ensure(60);
    y -= 20;
    put(title, y, { font: "F1", size: 11.5, color: COLORS.heading });
    y -= 6;
  };

  const sectionRule = () => {
    y -= 8;
    rule(y);
  };

  const paragraph = (value: string) => {
    for (const line of wrap(value, "F2", 9.5, WIDTH)) {
      ensure(14);
      y -= 13;
      put(line, y, { font: "F2", size: 9.5, color: COLORS.body });
    }
  };

  const bullet = (value: string) => {
    const indent = 14;
    const lines = wrap(value, "F2", 9.5, WIDTH - indent);
    lines.forEach((line, i) => {
      ensure(14);
      y -= 13;
      if (i === 0) ops.push(`${COLORS.body} rg ${X + 4} ${(y + 3).toFixed(2)} 2.4 2.4 re f`);
      put(line, y, { font: "F2", size: 9.5, color: COLORS.body, x: X + indent });
    });
  };

  const role = (left: string, right?: string) => {
    ensure(40);
    y -= 17;
    put(left, y, { font: "F1", size: 10, color: COLORS.dark });
    if (right) {
      const w = textWidth(right, "F1", 10);
      put(right, y, { font: "F1", size: 10, color: COLORS.dark, x: X + WIDTH - w });
    }
    y -= 1;
  };

  /* ------------------------------------------------------------- summary */
  section("SUMMARY");
  paragraph(
    "SOC Analyst with 3+ years of experience in cybersecurity and 2+ years in live 24/7 SOC operations. " +
      "Most recently worked in a managed SOC service supporting 10+ clients, leading final client " +
      "escalations, supporting analysts on difficult cases and coordinating shift operations. " +
      "Experienced in investigating and containing threats with CrowdStrike Falcon, Cortex " +
      "XDR/XSIAM/XSOAR and Microsoft Defender XDR, and in investigating suspicious emails, files and " +
      "Microsoft Entra ID activity. BSc (Hons) in IT specializing in Cyber Security."
  );
  sectionRule();

  /* ---------------------------------------------------------- experience */
  section("WORK EXPERIENCE");

  role("SOC Analyst  |  Delta Spike (Private) Limited", "7/2025 - 9/2026");
  [
    "Worked in a managed SOC service supporting 10+ clients at the same time, adapting investigations and escalations to each client's environment and tools.",
    "Carried out shift leadership responsibilities alongside analyst duties: led final escalations to clients, coordinated shift operations and supported other analysts on difficult or complex cases.",
    "Investigated and responded to incidents using CrowdStrike Falcon, Cortex XDR, Cortex XSIAM, Microsoft Defender XDR and Stellar Cyber; isolated compromised endpoints and remediated remotely, including file removal and cleanup.",
    "Investigated user activity in Microsoft Entra ID using sign-in logs, audit logs, authentication events and managed-device details.",
    "Collaborated with the security engineering team to fine-tune detection rules using findings from daily monitoring and investigations, giving technical feedback and recommendations on detection logic to reduce false-positive alerts.",
    "Analyzed suspicious emails and files in isolated virtual machines and documented the findings.",
    "Used KQL and XQL for log investigation and filtering.",
    "Wrote structured investigation reports and monthly incident reports for clients, presenting findings and observations clearly.",
  ].forEach(bullet);

  y -= 4;
  role("Associate SOC Analyst  |  Flix 11 (Private) Limited", "1/2025 - 7/2025");
  [
    "Investigated and handled escalated alerts and complex incidents using CrowdStrike Falcon EDR.",
    "Performed log correlation and incident investigations in IBM QRadar SIEM.",
    "Configured and tuned SIEM dashboards and detection rules to improve visibility and alert accuracy.",
    "Mentored and supported junior SOC analysts.",
    "Took part in ISO-related SOC audit sessions, answering auditors' questions on SOC operations and processes.",
    "Presented weekly customer meetings on security posture and incident trends, and proposed process improvements to strengthen customer security and SOC efficiency.",
    "Prepared incident reports for quarterly Information Security meetings.",
  ].forEach(bullet);

  y -= 4;
  role("Junior SOC Analyst  |  Flix 11 (Private) Limited", "6/2024 - 12/2024");
  [
    "Monitored security events and alerts 24/7 using SIEM and EDR tools for real-time threat detection.",
    "Triaged alerts to validate them and assess severity and impact; escalated incidents and carried out response actions from SOC playbooks.",
    "Enriched investigations using VirusTotal, AbuseIPDB, AlienVault OTX, IPinfo, IBM X-Force Exchange and GreyNoise.",
    "Prepared daily and monthly reports and threat intelligence summaries.",
  ].forEach(bullet);

  y -= 4;
  role("Tutelr Infinity Internship  |  Tutelr Infosec Pvt Ltd  |  India (Remote)", "7/2023 - 3/2024");
  [
    "Completed a remote internship program covering cloud security, digital forensics and incident response (DFIR), vulnerability assessment and penetration testing (VAPT), and Blue Team operations.",
    "Built foundational skills in threat detection, incident handling and security best practices.",
  ].forEach(bullet);
  sectionRule();

  /* ----------------------------------------------------- technical skills */
  section("TECHNICAL SKILLS");
  [
    "EDR / XDR: CrowdStrike Falcon, Cortex XDR, Microsoft Defender XDR, Stellar Cyber",
    "SIEM and SOC Platforms: Cortex XSIAM, IBM QRadar",
    "Incident Response: Alert triage, endpoint isolation, remote remediation, escalation, client reporting",
    "Identity Investigation: Microsoft Entra ID (sign-in, audit and authentication logs; managed devices)",
    "Email and File Investigation: Suspicious email and file analysis in isolated VMs, evidence collection, investigation reporting",
    "Foundations: TCP/IP, DNS, DHCP, IPsec, SSL/TLS, VPN, OWASP Top 10, Windows, Linux",
    "Query Languages: KQL, XQL",
  ].forEach(bullet);
  sectionRule();

  /* ------------------------------------------------------------ education */
  section("EDUCATION");
  role("BSc (Hons) in Information Technology Specialising in Cyber Security", "Jun 2020 - Jun 2024");
  paragraph("SRI LANKA INSTITUTE OF INFORMATION TECHNOLOGY");
  y -= 4;
  role("G.C.E ADVANCED LEVEL - Physical Science");
  sectionRule();

  /* ------------------------------------------------------- certifications */
  section("CERTIFICATION");
  [
    "Foundation Level Threat Intelligence Analyst, arcX",
    "Foundations of Operationalizing MITRE ATT&CK, AttackIQ",
    "Advanced Incident Response and Threat Hunting, Tutelr Infosec Pvt Ltd",
    "Website Hacking Techniques, EC-Council",
    "Microsoft SC-200 Security Operations Analyst",
  ].forEach(bullet);
  sectionRule();

  /* ------------------------------------------------------------ languages */
  section("LANGUAGES");
  bullet("English - Professional");
  bullet("Tamil - Native");
  sectionRule();

  /* ----------------------------------------------------------- references */
  section("REFERENCES");
  bullet("Available on request.");

  /* --------------------------------------------------------------- footer */
  const footer = "ahamedroshan426@gmail.com  -  +971-50-510-9646  -  Dubai, UAE";
  pages.forEach((pageOps, i) => {
    pageOps.push(`${COLORS.heading} rg ${X} 40 ${WIDTH} 0.8 re f`);
    const w = textWidth(footer, "F2", 8);
    pageOps.push(
      `BT /F2 8 Tf ${COLORS.muted} rg 0 Tc ${(X + (WIDTH - w) / 2).toFixed(2)} 28 Td (${escapePdfText(footer)}) Tj ET`
    );
    const label = `${i + 1} / ${pages.length}`;
    const lw = textWidth(label, "F2", 8);
    pageOps.push(
      `BT /F2 8 Tf ${COLORS.muted} rg 0 Tc ${(X + WIDTH - lw).toFixed(2)} 28 Td (${label}) Tj ET`
    );
  });

  /* ------------------------------------------------------------- assemble */
  // Object layout: 1 Catalog, 2 Pages, 3 Helvetica-Bold, 4 Helvetica,
  // then for each page: a Page object followed by its Content stream.
  const pageObjNum = (i: number) => 5 + i * 2;
  const contentObjNum = (i: number) => 6 + i * 2;

  const objects: string[] = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    `<< /Type /Pages /Kids [${pages.map((_, i) => `${pageObjNum(i)} 0 R`).join(" ")}] /Count ${pages.length} >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  pages.forEach((pageOps, i) => {
    const content = pageOps.join("\n") + "\n";
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjNum(i)} 0 R >>`
    );
    objects.push(`<< /Length ${content.length} >>\nstream\n${content}endstream`);
  });

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((bodyText, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${bodyText}\nendobj\n`;
  });

  const xrefPosition = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPosition}\n%%EOF`;

  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = FILE_NAME;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 5000);
}