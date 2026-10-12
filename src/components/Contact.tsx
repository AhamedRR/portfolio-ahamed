import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";
import { LinkedinIcon } from "./icons/LinkedinIcon";
import { profile } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

/** Web3Forms access key — provided via Vite env var (see .env.example). */
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;
type SubmissionState = "idle" | "sending" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.subject.trim().length < 3) errors.subject = "Please add a short subject (3+ characters).";
  if (values.message.trim().length < 10) errors.message = "Please write a message of at least 10 characters.";
  return errors;
}

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phoneDisplay,
    href: profile.phoneHref,
    external: false,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: profile.linkedinDisplay,
    href: profile.linkedin,
    external: true,
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
  },
];

const inputClasses =
  "w-full rounded-lg border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 transition-colors focus:border-cyan-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 aria-[invalid=true]:border-rose-400/60";

export function Contact() {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [feedback, setFeedback] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear the field error (and stale banner) as the user fixes the input
    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return; // Prevent duplicate submissions

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      setFeedback(
        "The contact form is not configured yet — the VITE_WEB3FORMS_ACCESS_KEY environment variable is missing. Please reach out via email or LinkedIn instead."
      );
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: "Portfolio Contact Form",
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
          botcheck: false,
        }),
      });

      const data: { success?: boolean; message?: string } = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFeedback("Message sent successfully. Thank you for reaching out — I will get back to you as soon as possible.");
        setValues({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
        setFeedback(data.message || "The message could not be sent. Please try again, or contact me directly via email.");
      }
    } catch {
      setStatus("error");
      setFeedback("A network error prevented your message from being sent. Please check your connection and try again.");
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="contact"
          title="Get In Touch"
          description="Open to SOC Analyst and cybersecurity opportunities. Reach out through the form or any of the channels below."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          {/* Direct channels */}
          <Reveal delay={80}>
            <ul className="space-y-4" aria-label="Direct contact channels">
              {contactMethods.map((method) => {
                const content = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition-colors group-hover:border-cyan-400/40">
                      <method.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                        {method.label}
                      </span>
                      <span className={cn("mt-1 block truncate text-sm font-medium", method.href ? "text-slate-100 group-hover:text-cyan-300" : "text-slate-100")}>
                        {method.value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li key={method.label}>
                    {method.href ? (
                      <a
                        href={method.href}
                        {...(method.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-4 transition-all duration-300 hover:border-cyan-400/35 hover:bg-slate-900/80"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-4">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 flex items-start gap-3 rounded-xl border border-slate-800/70 bg-slate-950/60 px-5 py-4 text-sm leading-relaxed text-slate-500">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-cyan-300/70" aria-hidden="true" />
              Messages sent through this form are delivered straight to my inbox via Web3Forms — no data is stored on
              this site.
            </p>
          </Reveal>

          {/* Form */}
          <Reveal delay={160}>
            <form
              onSubmit={onSubmit}
              noValidate
              aria-label="Contact form"
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8"
            >
              {/* Feedback banner */}
              {status === "success" && (
                <div role="status" className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3.5 text-sm text-emerald-200">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {feedback}
                </div>
              )}
              {status === "error" && (
                <div role="alert" className="mb-6 flex items-start gap-3 rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-3.5 text-sm text-rose-200">
                  <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {feedback}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-slate-400">
                    Full Name <span aria-hidden="true" className="text-cyan-300">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    value={values.name}
                    onChange={onChange}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={inputClasses}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-1.5 text-xs text-rose-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-slate-400">
                    Email Address <span aria-hidden="true" className="text-cyan-300">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    value={values.email}
                    onChange={onChange}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={inputClasses}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-1.5 text-xs text-rose-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-subject" className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-slate-400">
                  Subject <span aria-hidden="true" className="text-cyan-300">*</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="SOC Analyst opportunity"
                  value={values.subject}
                  onChange={onChange}
                  aria-invalid={errors.subject ? true : undefined}
                  aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                  className={inputClasses}
                />
                {errors.subject && (
                  <p id="contact-subject-error" className="mt-1.5 text-xs text-rose-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-slate-400">
                  Message <span aria-hidden="true" className="text-cyan-300">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about the role, project, or question you have in mind…"
                  value={values.message}
                  onChange={onChange}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={cn(inputClasses, "resize-y")}
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-1.5 text-xs text-rose-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 text-sm font-semibold text-slate-950 transition-all duration-200 hover:bg-cyan-300 hover:glow-cyan disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-cyan-400 disabled:hover:shadow-none sm:w-auto sm:px-8"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="size-4" aria-hidden="true" />
                    Submit Message
                  </>
                )}
              </button>

              <p className="mt-4 text-xs leading-relaxed text-slate-600">
                Required fields are marked with <span aria-hidden="true" className="text-cyan-300">*</span>. Only your name,
                email, and message are sent — nothing else is collected.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
