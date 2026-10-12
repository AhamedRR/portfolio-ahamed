/**
 * Generates a clean, single-page CV PDF entirely in the browser (no dependencies)
 * and triggers a download. Byte offsets for the xref table are computed
 * programmatically, so the output is always a valid PDF.
 *
 * All text content intentionally stays ASCII-safe (standard PDF/Helvetica encoding).
 */

const FILE_NAME = "Rallydeen_Roshan_Ahamed_CV.pdf";

const COLORS = {
  heading: "0.05 0.55 0.70", // deep cyan
  dark: "0.09 0.14 0.22",
  body: "0.20 0.27 0.36",
  muted: "0.45 0.50 0.58",
} as const;

type Font = "F1" | "F2"; // F1 = Helvetica-Bold, F2 = Helvetica

function escapePdfText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

export function downloadCv(): void {
  const ops: string[] = [];
  const X = 56;
  const WIDTH = 500;

  const text = (
    value: string,
    options: { font: Font; size: number; color: string; y: number; charSpacing?: number }
  ) => {
    const { font, size, color, y, charSpacing = 0 } = options;
    ops.push(
      `BT /${font} ${size} Tf ${color} rg ${charSpacing} Tc ${X} ${y} Td (${escapePdfText(value)}) Tj ET`
    );
  };

  const rule = (y: number, color = COLORS.heading) => {
    ops.push(`${color} rg ${X} ${y} ${WIDTH} 0.8 re f`);
  };

  /* -------------------------------------------------------------- header */
  let y = 746;
  text("RALLYDEEN ROSHAN AHAMED", { font: "F1", size: 18, color: COLORS.dark, y });
  y -= 18;
  text("SOC Analyst | Cybersecurity Professional", { font: "F2", size: 11, color: COLORS.heading, y });
  y -= 10;
  rule(y);
  y -= 14;

  const contactLines = [
    "Email: ahamedroshan426@gmail.com",
    "Phone: +94 76 784 4747",
    "LinkedIn: linkedin.com/in/ahmed-roshan-426-rr",
    "Location: Dubai, UAE",
  ];
  for (const line of contactLines) {
    text(line, { font: "F2", size: 9.5, color: COLORS.body, y });
    y -= 13;
  }

  /* ---------------------------------------------------------- primitives */
  const section = (title: string) => {
    y -= 18;
    text(title, { font: "F1", size: 10.5, color: COLORS.heading, y, charSpacing: 1.4 });
    y -= 15;
  };

  const body = (line: string) => {
    text(line, { font: "F2", size: 9.5, color: COLORS.body, y });
    y -= 14;
  };

  const role = (line: string) => {
    text(line, { font: "F1", size: 9.5, color: COLORS.dark, y });
    y -= 14;
  };

  /* ------------------------------------------------------------- profile */
  section("PROFILE");
  body("Cybersecurity professional with 3+ years of experience, including 2+ years in live 24/7 SOC");
  body("operations across managed SOC environments - threat detection, incident response, endpoint");
  body("security, and client escalations for 10+ organizations.");

  /* ---------------------------------------------------------- experience */
  section("EXPERIENCE");
  role("SOC Analyst - Delta Spike (Private) Limited  |  Jul 2025 - Sep 2026");
  body("Managed SOC operations supporting 10+ clients; client escalations and shift coordination;");
  body("assisting junior analysts with complex investigations across CrowdStrike Falcon, Cortex");
  body("XDR, Cortex XSIAM, Microsoft Defender XDR, and Stellar Cyber; Microsoft Entra ID");
  body("investigations; KQL/XQL queries; endpoint isolation and remote remediation; suspicious");
  body("email and file analysis in isolated VMs; structured incident reporting.");
  y -= 2;
  role("Associate SOC Analyst - Flix 11 (Private) Limited  |  Jan 2025 - Jul 2025");
  body("Escalated alert investigations using CrowdStrike Falcon EDR and IBM QRadar; SIEM");
  body("dashboards and detection rules; mentored junior analysts; ISO-related SOC audit");
  body("participation; customer meetings; incident reporting.");
  y -= 2;
  role("Junior SOC Analyst - Flix 11 (Private) Limited  |  Jun 2024 - Dec 2024");
  body("24/7 security monitoring and alert triage; incident escalation and response playbooks;");
  body("threat intelligence enrichment; daily and monthly reports.");
  y -= 2;
  role("Tutelr Infinity Internship - Tutelr Infosec Pvt Ltd, India (Remote)  |  Jul 2023 - Mar 2024");
  body("Foundational training in cloud security; digital forensics and incident response (DFIR);");
  body("vulnerability assessment and penetration testing (VAPT); Blue Team operations.");

  /* ------------------------------------------------------------ education */
  section("EDUCATION");
  role("BSc (Hons) in Information Technology - Cyber Security");
  body("Sri Lanka Institute of Information Technology  |  Jun 2020 - Jun 2024");
  y -= 2;
  role("G.C.E. Advanced Level - Physical Science");

  /* ------------------------------------------------------- certifications */
  section("CERTIFICATIONS");
  body("Foundation Level Threat Intelligence Analyst - arcX");
  body("Foundations of Operationalizing MITRE ATT&CK - AttackIQ");
  body("Advanced Incident Response and Threat Hunting - Tutelr Infosec Pvt Ltd");
  body("Website Hacking Techniques - EC-Council");
  body("Microsoft SC-200 Security Operations Analyst - In Progress");

  /* --------------------------------------------------------------- skills */
  section("SKILLS");
  body("EDR/XDR: CrowdStrike Falcon, Cortex XDR, Cortex XSIAM, Microsoft Defender XDR, Stellar");
  body("Cyber  -  SIEM/SOAR: IBM QRadar, Cortex XSOAR  -  Query languages: KQL, XQL");
  body("Threat Intel: VirusTotal, AbuseIPDB, AlienVault OTX, IPinfo, IBM X-Force, GreyNoise");
  body("Networking/OS: TCP/IP, DNS, DHCP, IPsec, SSL/TLS, VPN, Windows, Linux, OWASP Top 10");

  /* --------------------------------------------------------------- footer */
  rule(52, COLORS.heading);
  text("ahamedroshan426@gmail.com  -  +94 76 784 4747  -  Dubai, UAE", {
    font: "F2",
    size: 8,
    color: COLORS.muted,
    y: 40,
  });

  /* ------------------------------------------------------------- assemble */
  const content = ops.join("\n") + "\n";

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${content.length} >>\nstream\n${content}endstream`,
  ];

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
