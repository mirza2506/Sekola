import { useState } from "react";
import type { MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { badge, badgeDot, container, secLead, secTitle, section, spot, tabBtn, tabLabel, tabPill } from "../ui";

type Group = "inti" | "seksi";
type Person = { role: string; name: string; task: string; group: Group };

// Ganti "name" dengan nama asli teman-teman sekelas
const people: Person[] = [
    { role: "Ketua Kelas", name: "Nama Ketua", task: "Memimpin kelas dan jadi penghubung dengan wali kelas.", group: "inti" },
    { role: "Wakil Ketua", name: "Nama Wakil", task: "Membantu ketua dan menggantikan saat berhalangan.", group: "inti" },
    { role: "Sekretaris", name: "Nama Sekretaris", task: "Mencatat absensi, notulen, dan administrasi kelas.", group: "inti" },
    { role: "Bendahara", name: "Nama Bendahara", task: "Mengelola kas kelas secara transparan.", group: "inti" },
    { role: "Seksi Kebersihan", name: "Nama Siswa", task: "Menjaga kelas dan lab tetap rapi.", group: "seksi" },
    { role: "Seksi Keamanan", name: "Nama Siswa", task: "Memastikan perangkat dan barang kelas aman.", group: "seksi" },
    { role: "Seksi Perlengkapan", name: "Nama Siswa", task: "Mengurus alat praktik dan perlengkapan lab.", group: "seksi" },
    { role: "Seksi Dokumentasi", name: "Nama Siswa", task: "Mengabadikan momen dan kegiatan kelas.", group: "seksi" },
];

const filters: { id: "semua" | Group; label: string }[] = [
    { id: "semua", label: "Semua" },
    { id: "inti", label: "Pengurus inti" },
    { id: "seksi", label: "Seksi" },
];

const initials = (name: string) =>
    name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

const spotlight = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
};

const avatar =
    "grid shrink-0 place-items-center bg-white/10 font-display font-semibold text-white";

export default function ClassStructure() {
    const [filter, setFilter] = useState<"semua" | Group>("semua");
    const list = people.filter((p) => filter === "semua" || p.group === filter);

    return (
        <section id="struktur" className={section}>
            <div className={container}>
                <span className={badge}><i className={badgeDot} /> Struktur kelas</span>
                <h2 className={secTitle}>
                    Orang-orang di balik<br />kelas yang rapi.
                </h2>
                <p className={secLead}>Setiap peran punya tugas. Arahkan kursor ke kartu untuk melihat tanggung jawabnya.</p>

                {/* Wali kelas */}
                <div
                    onMouseMove={spotlight}
                    className={`${spot} mt-14 flex flex-col items-start gap-[22px] rounded-[22px] border border-white/20 bg-linear-to-br from-surface-2 to-surface p-7 sm:flex-row sm:items-center`}
                >
                    <div className={`${avatar} size-[72px] rounded-[20px] text-[1.3rem]`}>WK</div>
                    <div>
                        <span className="text-[0.82rem] text-neutral-400">Wali Kelas</span>
                        <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">Nama Wali Kelas, S.Kom.</h3>
                        <p className="text-neutral-400">Membimbing kami di dalam dan di luar kelas.</p>
                    </div>
                </div>

                {/* Filter */}
                <div role="tablist" className="mt-14 mb-7 flex flex-wrap justify-center gap-1.5">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            role="tab"
                            aria-selected={filter === f.id}
                            onClick={() => setFilter(f.id)}
                            className={tabBtn(filter === f.id)}
                        >
                            {filter === f.id && (
                                <motion.span
                                    layoutId="filter-pill"
                                    className={tabPill}
                                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                                />
                            )}
                            <span className={tabLabel}>{f.label}</span>
                        </button>
                    ))}
                </div>

                {/* Pengurus */}
                <motion.ul layout className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3.5">
                    <AnimatePresence mode="popLayout">
                        {list.map((p) => (
                            <motion.li
                                layout
                                key={p.role}
                                initial={{ opacity: 0, scale: 0.94 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.94 }}
                                transition={{ duration: 0.25 }}
                                onMouseMove={spotlight}
                                className={`${spot} group grid grid-cols-[auto_1fr] items-center gap-3.5 rounded-[18px] border border-white/10 bg-linear-to-br from-surface-2 to-surface p-5 transition-colors hover:border-white/25`}
                            >
                                <div className={`${avatar} size-[46px] rounded-[14px] text-[0.9rem]`}>{initials(p.name)}</div>
                                <div className="flex min-w-0 flex-col">
                                    <span className="text-[0.8rem] text-neutral-400">{p.role}</span>
                                    <strong className="font-display text-[0.98rem] font-semibold">{p.name}</strong>
                                </div>
                                <p className="col-span-2 max-h-0 overflow-hidden text-[0.86rem] text-neutral-400 opacity-0 transition-all duration-300 group-focus-within:max-h-24 group-focus-within:opacity-100 group-hover:max-h-24 group-hover:opacity-100 [@media(hover:none)]:max-h-24 [@media(hover:none)]:opacity-100">
                                    {p.task}
                                </p>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </motion.ul>
            </div>
        </section>
    );
}