import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import { Cable, Radio, Server, Shield } from "lucide-react";
import { badge, badgeDot, card, container, secLead, secTitle, section, tabBtn, tabLabel, tabPill } from "../ui";

/* ---------- Terminal ---------- */
const script = [
    { cmd: "ping tjkt1.local", out: ["Reply from 192.168.12.1: time=1ms", "Reply from 192.168.12.1: time=1ms"] },
    { cmd: "show ip interface brief", out: ["Gi0/1   192.168.12.1   up", "Gi0/2   192.168.12.2   up"] },
    { cmd: "whoami", out: ["siswa-tjkt-1"] },
];

function Terminal() {
    const [i, setI] = useState(0);
    const [typed, setTyped] = useState(0);
    const [showOut, setShowOut] = useState(false);

    useEffect(() => {
        const s = script[i];
        let seconds: number;
        let next: () => void;

        if (typed < s.cmd.length) {
            seconds = 0.055;
            next = () => setTyped((t) => t + 1);
        } else if (!showOut) {
            seconds = 0.35;
            next = () => setShowOut(true);
        } else {
            seconds = 2.2;
            next = () => {
                setI((n) => (n + 1) % script.length);
                setTyped(0);
                setShowOut(false);
            };
        }

        // animate dipakai sebagai timer
        const timer = animate(0, 1, { duration: seconds, onComplete: next });
        return () => timer.stop();
    }, [i, typed, showOut]);

    const s = script[i];
    return (
        <div
            aria-hidden="true"
            className="mt-6 min-h-[132px] rounded-[14px] border border-white/10 bg-black p-4 pt-3.5 font-mono text-[0.78rem] leading-[1.7]"
        >
            <div className="mb-2.5 flex gap-1.5">
                <i className="size-2 rounded-full bg-white/15" />
                <i className="size-2 rounded-full bg-white/15" />
                <i className="size-2 rounded-full bg-white/15" />
            </div>
            <p>
                <span className="text-white">tjkt1@lab:~$</span> <span className="text-neutral-300">{s.cmd.slice(0, typed)}</span>
                <b className="ml-0.5 inline-block h-3.5 w-[7px] animate-blink bg-white align-[-2px]" />
            </p>
            {showOut && s.out.map((o, k) => <p key={k} className="text-neutral-500">{o}</p>)}
        </div>
    );
}

/* ---------- Count up ---------- */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const [val, setVal] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, to, {
            duration: 1.6,
            ease: "easeOut",
            onUpdate: (v) => setVal(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, to]);

    return (
        <span ref={ref}>
            {val}
            {suffix}
        </span>
    );
}

/* ---------- Kompetensi (tabs) ---------- */
type Skill = { id: string; label: string; icon: ReactNode; title: string; desc: string; tags: string[] };

const skills: Skill[] = [
    { id: "jaringan", label: "Jaringan", icon: <Cable size={16} />, title: "Jaringan Komputer", desc: "Merancang topologi, subnetting, routing, VLAN, dan konfigurasi perangkat jaringan.", tags: ["Subnetting", "VLAN", "Routing", "Cisco", "MikroTik"] },
    { id: "server", label: "Server", icon: <Server size={16} />, title: "Administrasi Server", desc: "Membangun layanan di Linux: web server, DNS, DHCP, dan virtualisasi.", tags: ["Linux", "Debian", "Apache", "DNS", "Proxmox"] },
    { id: "telko", label: "Telekomunikasi", icon: <Radio size={16} />, title: "Telekomunikasi", desc: "Memahami fiber optik, jaringan nirkabel, dan instalasi kabel terstruktur.", tags: ["Fiber Optik", "Wireless", "Splicing", "UTP"] },
    { id: "keamanan", label: "Keamanan", icon: <Shield size={16} />, title: "Keamanan Jaringan", desc: "Mengamankan jaringan dengan firewall, hak akses, dan pemantauan trafik.", tags: ["Firewall", "NAT", "Wireshark", "VPN"] },
];

function Skills() {
    const [active, setActive] = useState(skills[0].id);
    const cur = skills.find((s) => s.id === active) ?? skills[0];

    return (
        <div className={`${card} col-span-12 flex flex-col gap-[18px] p-7 lg:col-span-7`}>
            <h3 className="font-display text-[1.15rem] font-semibold tracking-[-0.01em]">Yang kami pelajari</h3>

            <div role="tablist" className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                    <button
                        key={s.id}
                        role="tab"
                        aria-selected={active === s.id}
                        onClick={() => setActive(s.id)}
                        className={tabBtn(active === s.id)}
                    >
                        {active === s.id && (
                            <motion.span
                                layoutId="tab-pill"
                                className={tabPill}
                                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                            />
                        )}
                        <span className={tabLabel}>{s.icon}{s.label}</span>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={cur.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                >
                    <h4 className="font-display text-2xl font-semibold tracking-[-0.02em]">{cur.title}</h4>
                    <p className="mt-2 max-w-[52ch] text-neutral-400">{cur.desc}</p>
                    <div className="mt-[18px] flex flex-wrap gap-2">
                        {cur.tags.map((t) => (
                            <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-[0.8rem] text-neutral-200">{t}</span>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

/* ---------- About ---------- */
// Ganti angka di bawah sesuai data kelas kamu
const stats = [
    { n: 36, suffix: "", label: "Siswa" },
    { n: 4, suffix: "", label: "Bidang kompetensi" },
    { n: 3, suffix: "", label: "Tahun bersama" },
    { n: 100, suffix: "%", label: "Semangat kompak" },
];

export default function About() {
    return (
        <section id="about" className={section}>
            <div className={container}>
                <span className={badge}><i className={badgeDot} /> Tentang kami</span>
                <h2 className={secTitle}>
                    Satu kelas,<br />banyak jaringan.
                </h2>
                <p className={secLead}>
                    XII TJKT 1 adalah tempat kami belajar teknologi jaringan dari praktik langsung di laboratorium,
                    sambil saling bantu sampai semua terhubung.
                </p>

                <div className="mt-14 grid grid-cols-12 gap-4">
                    <motion.div
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.2 }}
                        className={`${card} col-span-12 p-7 lg:col-span-5`}
                    >
                        <h3 className="font-display text-[1.15rem] font-semibold tracking-[-0.01em]">Dari kabel ke kebersamaan</h3>
                        <p className="mt-2.5 max-w-[46ch] text-neutral-400">
                            Kami mulai dari crimping kabel UTP, kini mengelola server dan jaringan sekolah. Di kelas ini,
                            tidak ada yang dibiarkan offline.
                        </p>
                        <Terminal />
                    </motion.div>

                    <Skills />

                    {stats.map((s) => (
                        <motion.div
                            key={s.label}
                            whileHover={{ y: -3 }}
                            transition={{ duration: 0.2 }}
                            className={`${card} col-span-6 flex flex-col gap-1 px-7 py-6 lg:col-span-3`}
                        >
                            <strong className="font-display text-[clamp(2rem,4vw,2.8rem)] font-semibold tracking-[-0.03em]">
                                <CountUp to={s.n} suffix={s.suffix} />
                            </strong>
                            <span className="text-[0.9rem] text-neutral-400">{s.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}