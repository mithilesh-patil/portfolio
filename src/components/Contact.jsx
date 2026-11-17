import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiArrowUpRight, FiCheck, FiLoader, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { profile } from "../data";
import { Reveal, SplitText } from "./ui";
import { linkProps, socials } from "./socials";

const MAX_MESSAGE = 1000;

const rules = {
  name: (v) => {
    const t = v.trim();
    if (!t) return "Please enter your name.";
    if (t.length < 2) return "Name looks too short.";
    if (t.length > 50) return "Name can be at most 50 characters.";
    if (!/^[\p{L} .'-]+$/u.test(t)) return "Name can only contain letters and spaces.";
    return "";
  },
  email: (v) => {
    const t = v.trim();
    if (!t) return "Please enter your email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t))
      return "Enter a valid email, e.g. name@company.com";
    return "";
  },
  message: (v) => {
    const t = v.trim();
    if (!t) return "Please write a message.";
    if (t.length < 10) {
      const left = 10 - t.length;
      return `A little more detail please — ${left} more character${left === 1 ? "" : "s"}.`;
    }
    if (t.length > MAX_MESSAGE) return `Message can be at most ${MAX_MESSAGE} characters.`;
    return "";
  },
};

const validate = (form) =>
  Object.fromEntries(Object.keys(rules).map((k) => [k, rules[k](form[k])]));

function Field({ as = "input", label, name, error, valid, hint, inputRef, shake, ...props }) {
  const Tag = as;
  const tone = error
    ? "border-red-400/70 bg-red-400/[0.04] focus:border-red-400"
    : valid
      ? "border-emerald-400/40 focus:border-emerald-400/70"
      : "border-white/10 focus:border-violet-400/70";
  return (
    <div>
      <motion.label
        key={`${name}-${shake}`}
        className="relative block"
        animate={error && shake ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Tag
          ref={inputRef}
          name={name}
          placeholder={label}
          aria-invalid={!!error}
          aria-describedby={`${name}-msg`}
          className={`peer w-full resize-none rounded-xl border bg-white/[0.03] px-4 pb-2.5 pr-10 pt-6 text-sm text-white outline-none transition-colors placeholder-transparent focus:bg-white/[0.05] ${tone}`}
          {...props}
        />
        <span
          className={`pointer-events-none absolute left-4 top-2 text-[11px] uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-widest ${
            error
              ? "text-red-300 peer-focus:text-red-300"
              : "text-white/40 peer-focus:text-violet-300"
          }`}
        >
          {label}
        </span>
        <span className="pointer-events-none absolute right-3.5 top-4 text-base">
          {error ? (
            <FiAlertCircle className="text-red-400" />
          ) : valid ? (
            <FiCheck className="text-emerald-400" />
          ) : null}
        </span>
      </motion.label>
      <div
        id={`${name}-msg`}
        className="flex min-h-[22px] items-start justify-between gap-3 px-1 pt-1.5 text-xs"
      >
        <AnimatePresence mode="wait">
          {error ? (
            <motion.span
              key={error}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-red-300"
            >
              {error}
            </motion.span>
          ) : (
            <span />
          )}
        </AnimatePresence>
        {hint}
      </div>
    </div>
  );
}

export default function Contact() {
  const empty = { name: "", email: "", message: "" };
  const [form, setForm] = useState(empty);
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  // bumps on every failed submit so invalid fields shake again
  const [shake, setShake] = useState(0);
  // idle | sending | sent | error
  const [status, setStatus] = useState("idle");
  const refs = { name: useRef(null), email: useRef(null), message: useRef(null) };

  const errors = validate(form);
  const shown = (k) => (touched[k] ? errors[k] : "");
  const isValid = (k) => touched[k] && !errors[k];

  const mailtoFallback = () => {
    const subject = `Portfolio enquiry from ${form.name}`;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (e.target.botcheck?.checked) return;
    setTouched({ name: true, email: true, message: true });
    const firstBad = Object.keys(rules).find((k) => errors[k]);
    if (firstBad) {
      setShake((n) => n + 1);
      refs[firstBad].current?.focus();
      return;
    }
    if (!profile.web3formsKey) {
      mailtoFallback();
      return;
    }
    setStatus("sending");
    const name = form.name.trim();
    const email = form.email.trim();
    try {
      // Plain FormData (no custom headers) keeps this a "simple" request, so the
      // browser skips the CORS preflight that Web3Forms' Cloudflare layer can reject.
      const body = new FormData();
      body.append("access_key", profile.web3formsKey);
      body.append("subject", `📩 New message from ${name} — Portfolio`);
      body.append("from_name", "Mithilesh Patil · Portfolio");
      body.append("replyto", email);
      body.append("Name", name);
      body.append("Email", email);
      body.append("Message", form.message.trim());
      body.append(
        "Sent On",
        new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "short",
        }) + " IST"
      );
      body.append("Source", "Contact form · Portfolio website");
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStatus("sent");
      setForm(empty);
      setTouched({ name: false, email: false, message: false });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (status === "error") setStatus("idle");
  };
  // Only flag a field on blur once something was typed, so tabbing through doesn't shout.
  const blur = (k) => () => setTouched((t) => (form[k] ? { ...t, [k]: true } : t));
  const list = socials.filter((s) => s.key !== "whatsapp");

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32">
      <div className="absolute left-1/2 top-1/4 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.3em] text-violet-300">
              08 — Contact
            </p>
          </Reveal>
          <h2 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
            <SplitText text="Let's build" />
            <br />
            <SplitText text="something great." className="text-gradient" delay={0.2} />
          </h2>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
              Have a project in mind or just want to connect? Drop a message — I usually reply
              within a day.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-panel/80 backdrop-blur-xl lg:grid-cols-[1fr_1.2fr]">
            {/* left: info */}
            <div className="relative overflow-hidden border-b border-white/10 p-8 md:p-10 lg:border-b-0 lg:border-r">
              <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-4">
                  <img
                    src={profile.photo}
                    alt={profile.fullName}
                    loading="lazy"
                    className="h-16 w-16 rounded-2xl object-cover object-[50%_20%] ring-2 ring-violet-400/40"
                  />
                  <div>
                    <p className="font-display text-xl font-semibold">{profile.name}</p>
                    <p className="text-sm text-white/50">Frontend Developer · ReactJS</p>
                  </div>
                </div>

                <ul className="mt-8 space-y-2">
                  {list.map((c, i) => (
                    <motion.li
                      key={c.key}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                    >
                      <a
                        href={c.href}
                        {...linkProps(c)}
                        className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-white/[0.05]"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-violet-300 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-cyan-400 group-hover:text-snow">
                          <c.icon />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[11px] uppercase tracking-widest text-white/40">
                            {c.label}
                          </span>
                          <span className="block truncate text-sm text-white/85">{c.value}</span>
                        </span>
                        <FiArrowUpRight className="shrink-0 text-white/25 transition-all duration-300 group-hover:rotate-45 group-hover:text-white" />
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={profile.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
                  >
                    <FaWhatsapp className="text-lg" /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* right: form */}
            <form onSubmit={submit} noValidate className="space-y-2 p-8 md:p-10">
              <p className="font-display text-2xl font-semibold">Send a message</p>
              <p className="mb-5 text-sm text-white/50">
                {profile.web3formsKey
                  ? "It lands straight in my inbox — I'll get back to you soon."
                  : "It opens your email app with everything filled in."}
              </p>
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              <div className="grid gap-x-4 sm:grid-cols-2">
                <Field
                  label="Your name"
                  name="name"
                  autoComplete="name"
                  inputRef={refs.name}
                  value={form.name}
                  onChange={set("name")}
                  onBlur={blur("name")}
                  error={shown("name")}
                  valid={isValid("name")}
                  shake={shake}
                />
                <Field
                  label="Your email"
                  name="email"
                  inputMode="email"
                  autoComplete="email"
                  inputRef={refs.email}
                  value={form.email}
                  onChange={set("email")}
                  onBlur={blur("email")}
                  error={shown("email")}
                  valid={isValid("email")}
                  shake={shake}
                />
              </div>
              <Field
                as="textarea"
                label="Your message"
                name="message"
                rows={6}
                inputRef={refs.message}
                value={form.message}
                onChange={set("message")}
                onBlur={blur("message")}
                error={shown("message")}
                valid={isValid("message")}
                shake={shake}
                hint={
                  <span
                    className={`shrink-0 tabular-nums ${
                      form.message.trim().length > MAX_MESSAGE ? "text-red-300" : "text-white/35"
                    }`}
                  >
                    {form.message.trim().length} / {MAX_MESSAGE}
                  </span>
                }
              />
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileTap={{ scale: 0.97 }}
                className="group relative mt-2 flex w-full disabled:cursor-wait disabled:opacity-70 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 py-4 font-semibold text-snow shadow-lg shadow-violet-500/25"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {status === "sending" ? (
                  <FiLoader className="animate-spin" />
                ) : status === "sent" ? (
                  <FiCheck />
                ) : (
                  <FiSend className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                )}
                {status === "sending"
                  ? "Sending…"
                  : status === "sent"
                    ? "Message sent!"
                    : "Send message"}
              </motion.button>
              <AnimatePresence>
                {status === "sent" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300"
                  >
                    <FiCheck /> Thanks! Your message reached me — I&apos;ll reply soon.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-red-400/10 px-4 py-3 text-sm text-red-300"
                  >
                    <FiAlertCircle className="shrink-0" />
                    <span>
                      Couldn&apos;t send right now.{" "}
                      <button
                        type="button"
                        onClick={mailtoFallback}
                        className="underline underline-offset-2 hover:text-red-200"
                      >
                        Send it by email instead
                      </button>{" "}
                      or write to {profile.email}
                    </span>
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
