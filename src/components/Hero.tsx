import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Globe, Monitor, Network, Router, Server, Wifi } from "lucide-react";
import { badge, badgeDot, btnGhost, btnLight, container } from "../ui";

type NodeItem = {
    id: string;
    x: number;
    y: number;
    title: string;
    desc: string;
    icon: ReactNode;
};

const nodes: NodeItem[] = [
    { id: "internet", x: 50, y: 10, title: "Internet", desc: "Pintu keluar ke dunia luar.", icon: <Globe size={20} /> },
    { id: "router", x: 50, y: 44, title: "Router", desc: "Mengatur rute dan lalu lintas antar jaringan.", icon: <Router size={22} /> },
    { id: "ap", x: 86, y: 26, title: "Access Point", desc: "Menyebarkan sinyal WiFi ke seluruh lab.", icon: <Wifi size={20} /> },
    { id: "server", x: 82, y: 70, title: "Server", desc: "Tempat layanan seperti web, DNS, dan DHCP berjalan.", icon: <Server size={20} /> },
    { id: "switch", x: 24, y: 68, title: "Switch", desc: "Menghubungkan banyak perangkat dalam satu LAN.", icon: <Network size={20} /> },
    { id: "pc", x: 20, y: 92, title: "Komputer Klien", desc: "Perangkat siswa yang terhubung ke jaringan.", icon: <Monitor size={18} /> },
];

const edges: [string, string][] = [
    ["internet", "router"],
    ["router", "ap"],
    ["router", "server"],
    ["router", "switch"],
    ["switch", "pc"],
];

const tools = ["Cisco Packet Tracer", "MikroTik", "Linux", "Wireshark", "Fiber Optik", "Ubiquiti", "Proxmox", "Docker"];

const byId = (id: string) => nodes.find((n) => n.id === id) ?? nodes[0];

function Topology() {
    const [selected, setSelected] = useState("router");
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 120, damping: 18 });
    const sy = useSpring(my, { stiffness: 120, damping: 18 });
    const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
    const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);

    const current = byId(selected);

    return (
        <div
            className="topo-wrap mx-auto w-[min(460px,100%)] [perspective:900px]"
            onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                mx.set((e.clientX - r.left) / r.width - 0.5);
                my.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onMouseLeave={() => {
                mx.set(0);
                my.set(0);
            }}
        >
            <motion.div
                style={{ rotateX, rotateY }}
                className="relative aspect-square transform-3d rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.08),transparent_60%),linear-gradient(160deg,#161616,#0c0c0c)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_80px_rgba(0,0,0,0.6)]"
            >
                <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 size-full">
                    {edges.map(([a, b]) => {
                        const A = byId(a);
                        const B = byId(b);
                        const on = a === selected || b === selected;
                        const d = `M ${A.x} ${A.y} L ${B.x} ${B.y}`;
                        return (
                            <g key={`${a}-${b}`}>
                                <path
                                    d={d}
                                    className={`fill-none stroke-[0.45] transition-colors duration-300 [stroke-dasharray:1.5_1.5] ${on ? "stroke-white" : "stroke-white/15"
                                        }`}
                                />
                                <circle r="1.1" className="fill-white [filter:drop-shadow(0_0_2px_#fff)]">
                                    <animateMotion dur={`${2.4 + (A.x % 5) * 0.3}s`} repeatCount="indefinite" path={d} />
                                </circle>
                            </g>
                        );
                    })}
                </svg>

                {nodes.map((n) => (
                    <button
                        key={n.id}
                        aria-label={n.title}
                        onClick={() => setSelected(n.id)}
                        onMouseEnter={() => setSelected(n.id)}
                        style={{ left: `${n.x}%`, top: `${n.y}%` }}
                        className={`absolute grid size-[46px] -translate-x-1/2 -translate-y-1/2 translate-z-8 place-items-center rounded-[15px] border bg-linear-to-br from-[#222] to-[#0e0e0e] shadow-[0_8px_20px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] transition duration-300 ${selected === n.id
                                ? "scale-115 border-white text-white shadow-[0_0_28px_rgba(255,255,255,0.3)]"
                                : "border-white/20 text-neutral-400"
                            }`}
                    >
                        {n.icon}
                    </button>
                ))}
            </motion.div>

            <div aria-live="polite" className="mt-[18px] flex min-h-[54px] flex-col text-center text-[0.88rem] text-neutral-400">
                <strong className="font-display text-white">{current.title}</strong>
                <span>{current.desc}</span>
            </div>
        </div>
    );
}

export default function Hero() {
    const root = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();

    useLayoutEffect(() => {
        if (reduce) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
            tl.from(".hero-line > span", { yPercent: 110, duration: 1.1, stagger: 0.12 })
                .from(".hero-fade", { opacity: 0, y: 16, duration: 0.8, stagger: 0.1 }, "-=0.6")
                .from(".topo-wrap", { opacity: 0, scale: 0.94, duration: 1.2 }, "-=1");
        }, root);
        return () => ctx.revert();
    }, [reduce]);

    return (
        <section id="home" ref={root} className="flex min-h-svh flex-col justify-between pt-[150px]">
            <div className={`${container} grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]`}>
                <div>
                    <span className={`${badge} hero-fade`}>
                        <i className={badgeDot} /> Tahun ajaran 2026/2027
                    </span>

                    <h1 className="mt-[22px] font-display text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[1.06] font-semibold tracking-[-0.035em]">
                        <span className="hero-line block overflow-hidden pb-[0.08em]">
                            <span className="block">XII TJKT 1</span>
                        </span>
                        <span className="hero-line block overflow-hidden pb-[0.08em]">
                            <span className="block bg-linear-to-b from-white from-20% to-white/40 bg-clip-text text-transparent">
                                terhubung dan bertumbuh.
                            </span>
                        </span>
                    </h1>

                    <p className="hero-fade mt-[22px] max-w-[48ch] text-[1.05rem] text-neutral-400">
                        Kami siswa Teknik Jaringan Komputer dan Telekomunikasi. Belajar membangun jaringan, dan sama
                        seriusnya membangun kebersamaan.
                    </p>

                    <div className="hero-fade mt-8 flex flex-wrap gap-3">
                        <a href="#about" className={btnLight}>Kenali kelas kami</a>
                        <a href="#struktur" className={btnGhost}>Struktur kelas</a>
                    </div>
                </div>

                <Topology />
            </div>

            <div
                aria-label="Tools yang kami pelajari"
                className="mt-[70px] overflow-hidden border-y border-white/10 py-[22px] [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
            >
                <div className="flex w-max animate-marquee motion-reduce:animate-none">
                    {[...tools, ...tools].map((t, i) => (
                        <span key={i} className="px-[34px] font-display font-medium whitespace-nowrap text-white/45">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}