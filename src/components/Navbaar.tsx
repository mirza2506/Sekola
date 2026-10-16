import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Network, X } from "lucide-react";
import { btnLight } from "../ui";

const links = [
    { label: "Beranda", href: "#home" },
    { label: "Tentang", href: "#about" },
    { label: "Struktur", href: "#struktur" },
    { label: "Kontak", href: "#kontak" },
];

export default function Navbaar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("#home");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(`#${e.target.id}`);
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );
        links.forEach((l) => {
            const el = document.getElementById(l.href.slice(1));
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <header className="fixed inset-x-0 top-3.5 z-50 flex flex-col items-center px-4">
            <nav
                aria-label="Navigasi utama"
                className={`flex w-full items-center justify-between gap-6 rounded-full border py-2.5 pr-3.5 pl-[18px] transition-all duration-500 ${scrolled
                        ? "max-w-[760px] border-white/20 bg-neutral-950/70 backdrop-blur-xl"
                        : "max-w-[1160px] border-transparent"
                    }`}
            >
                <a href="#home" className="flex items-center gap-2.5 font-display font-semibold">
                    <span className="grid size-7 place-items-center rounded-[9px] bg-white/10 text-white">
                        <Network size={16} />
                    </span>
                    TJKT 1
                </a>

                <ul className="hidden gap-1 md:flex">
                    {links.map((l) => (
                        <li key={l.href}>
                            <a
                                href={l.href}
                                className={`relative block px-[15px] py-[7px] text-[0.9rem] transition-colors ${active === l.href ? "text-white" : "text-neutral-400 hover:text-white"
                                    }`}
                            >
                                {active === l.href && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute inset-0 rounded-full bg-white/10"
                                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                                    />
                                )}
                                <span className="relative">{l.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                <a href="#struktur" className={`${btnLight} hidden md:inline-flex`}>
                    Lihat pengurus
                </a>

                <button
                    onClick={() => setOpen((o) => !o)}
                    aria-label={open ? "Tutup menu" : "Buka menu"}
                    aria-expanded={open}
                    className="grid size-[38px] place-items-center rounded-full border border-white/20 md:hidden"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 w-full max-w-[1160px] rounded-[20px] border border-white/20 bg-neutral-950/95 p-2.5 backdrop-blur-xl md:hidden"
                    >
                        {links.map((l) => (
                            <li key={l.href}>
                                <a
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-xl px-3.5 py-3 hover:bg-white/5"
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </header>
    );
}