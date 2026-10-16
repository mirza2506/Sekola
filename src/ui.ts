// Kumpulan class Tailwind

export const container = "mx-auto w-[min(1160px,calc(100%-40px))]";
export const section = "relative py-[90px] md:py-[120px]";

export const badge =
  "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 py-1.5 pr-3.5 pl-2.5 text-[0.82rem] text-neutral-400";
export const badgeDot = "size-[7px] rounded-full bg-white shadow-[0_0_10px_#fff]";

export const secTitle =
  "mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.1] font-semibold tracking-[-0.03em] bg-linear-to-b from-white from-30% to-white/35 bg-clip-text text-transparent";
export const secLead = "mt-4 max-w-[56ch] text-neutral-400";

const btnBase =
  "inline-flex items-center gap-2 rounded-full px-5 py-[11px] text-[0.92rem] font-medium transition duration-200 hover:-translate-y-0.5";
export const btnLight = `${btnBase} bg-neutral-100 text-black shadow-[0_6px_24px_rgba(255,255,255,0.12)]`;
export const btnGhost = `${btnBase} border border-white/20 bg-white/5 hover:border-white`;

export const card =
  "relative rounded-[22px] border border-white/10 bg-linear-to-br from-surface-2 to-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]";

export const tabBtn = (on: boolean) =>
  `relative rounded-full border px-3.5 py-2 text-[0.86rem] transition-colors ${
    on ? "border-transparent text-black" : "border-white/10 text-neutral-400 hover:text-white"
  }`;
export const tabPill = "absolute inset-0 rounded-full bg-neutral-100";
export const tabLabel = "relative z-10 inline-flex items-center gap-[7px]";

// Efek spotlight mengikuti kursor (butuh handler yang set --mx dan --my)
export const spot =
  "relative overflow-hidden *:relative before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(260px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.12),transparent_70%)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100";