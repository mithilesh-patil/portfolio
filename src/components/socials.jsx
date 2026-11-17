import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn, FaGithub, FaWhatsapp } from "react-icons/fa";
import { profile } from "../data";

// Empty links (e.g. GitHub before you create it) are skipped automatically.
export const socials = [
  { key: "linkedin", label: "LinkedIn", icon: FaLinkedinIn, href: profile.linkedin, value: "mithilesh-patil28", external: true },
  { key: "github", label: "GitHub", icon: FaGithub, href: profile.github, value: profile.github.replace(/^https?:\/\/(www\.)?/, ""), external: true },
  { key: "whatsapp", label: "WhatsApp", icon: FaWhatsapp, href: profile.whatsapp, value: "Chat on WhatsApp", external: true },
  { key: "email", label: "Email", icon: FiMail, href: `mailto:${profile.email}`, value: profile.email },
  { key: "phone", label: "Phone", icon: FiPhone, href: `tel:${profile.phone.replace(/\s/g, "")}`, value: profile.phone },
  { key: "location", label: "Location", icon: FiMapPin, href: profile.mapUrl, value: profile.location, external: true },
].filter((s) => s.href);

export const linkProps = (s) => (s.external ? { target: "_blank", rel: "noopener noreferrer" } : {});
