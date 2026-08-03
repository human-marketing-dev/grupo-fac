/**
 * Grupo FAC — Design System
 *
 * Ported from the claude.ai/design project "Grupo FAC Design System"
 * (id a805700b-2306-4667-be83-bbdd9dff8181). Tokens live in app/globals.css;
 * fonts are wired in app/layout.tsx.
 *
 * Components style themselves entirely from CSS custom properties — no Tailwind
 * classes — so restyling the system means editing the tokens, not the JSX.
 */

// core
export { Accordion, type AccordionItem, type AccordionProps } from "./core/Accordion";
export { Button, type ButtonProps } from "./core/Button";
export { Eyebrow, type EyebrowProps } from "./core/Eyebrow";
export { FeatureList, type FeatureListProps } from "./core/FeatureList";
export { GhostNumeral, type GhostNumeralProps } from "./core/GhostNumeral";
export { HatchDivider, type HatchDividerProps } from "./core/HatchDivider";
export { Marquee, type MarqueeProps } from "./core/Marquee";
export { NumberedFeature, type NumberedFeatureProps } from "./core/NumberedFeature";
export { ProcessStep, type ProcessStepProps } from "./core/ProcessStep";
export { SectionHeading, type SectionHeadingProps } from "./core/SectionHeading";
export { Stat, type StatProps } from "./core/Stat";
export { Tag, type TagProps } from "./core/Tag";

// cards
export { BlogCard, type BlogCardProps } from "./cards/BlogCard";
export { ClientLogo, type ClientLogoProps } from "./cards/ClientLogo";
export {
  MachineryCard,
  type MachineryCardProps,
  type MachinerySpec,
} from "./cards/MachineryCard";
export { ProjectCard, type ProjectCardProps } from "./cards/ProjectCard";
export { ServiceCard, type ServiceCardProps } from "./cards/ServiceCard";

// forms
export { Input, type InputProps } from "./forms/Input";
export { QuoteForm, type QuoteFormProps } from "./forms/QuoteForm";
export { Select, type SelectOption, type SelectProps } from "./forms/Select";
export { Textarea, type TextareaProps } from "./forms/Textarea";

// navigation
export {
  Footer,
  type FooterColumn,
  type FooterProps,
  type FooterSocial,
} from "./navigation/Footer";
export { Navbar, type NavItem, type NavbarProps } from "./navigation/Navbar";
