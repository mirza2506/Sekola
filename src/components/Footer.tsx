import { ArrowUp, Mail, MapPin, AtSign } from "lucide-react";
import { btnLight, container } from "../ui";

const menu = [
    { label: "Beranda", href: "#home" },
    { label: "Tentang", href: "#about" },
    { label: "Struktur", href: "#struktur" },
];

const linkCls = "inline-flex items-center gap-2 transition-colors hover:text-neutral-400";

export default function Footer() {
    return (
        <footer id="kontak" className="relative overflow-hidden border-t border-white/10 pt-[90px]">
            <div className={`${container} grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]`}>
                <div>
                    <h3 className="font-display text-[1.4rem] font-semibold">XII TJKT 1</h3>
                    <p className="mt-2.5 mb-[22px] max-w-[38ch] text-neutral-400">
                        Teknik Jaringan Komputer dan Telekomunikasi. Terhubung hari ini, bertumbuh bersama.
                    </p>
                    <a href="#home" className={btnLight}>
                        <ArrowUp size={16} /> Kembali ke atas
                    </a>
                </div>

                <div>
                    <h4 className="mb-3.5 text-[0.88rem] font-medium text-neutral-400">Menu</h4>
                    <ul className="space-y-2.5">
                        {menu.map((m) => (
                            <li key={m.href}>
                                <a href={m.href} className={linkCls}>{m.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="mb-3.5 text-[0.88rem] font-medium text-neutral-400">Kontak</h4>
                    <ul className="space-y-2.5">
                        <li><a href="mailto:tjkt1@example.com" className={linkCls}><Mail size={15} /> Email</a></li>
                        <li><a href="https://www.instagram.com/xii.tjktone__?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==" className={linkCls}><AtSign size={15} /> Instagram</a></li>
                        <li><span className="inline-flex items-center gap-2"><MapPin size={15} />SMK YADIKA 5, TANGERANG SELATAN</span></li>
                    </ul>
                </div>
            </div>

            <div
                aria-hidden="true"
                className="mt-[60px] text-center font-display text-[clamp(4rem,17vw,14rem)] leading-[0.85] font-bold tracking-[-0.05em] whitespace-nowrap bg-linear-to-b from-white/85 to-transparent to-85% bg-clip-text text-transparent select-none"
            >
                XII TJKT 1
            </div>

            <p className="px-5 pt-[18px] pb-[26px] text-center text-[0.82rem] text-neutral-400">
                © {new Date().getFullYear()} Kelas XII TJKT 1. Dibuat dengan kode dan kopi.
            </p>
        </footer>
    );
}