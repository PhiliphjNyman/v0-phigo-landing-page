'use client'

import { motion, type Variants } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const metrics = [
  {
    label: "Fast pris",
    value: "8 000",
    delta: "kr",
    description: "Engångsbelopp exkl. moms, utan dolda kostnader",
  },
  {
    label: "Leveranstid",
    value: "14",
    delta: "dagar",
    description: "Från brief till live sajt",
  },
  {
    label: "Hosting & support",
    value: "399",
    delta: "kr/mån",
    description: "Drift, säkerhet och löpande ändringar (exkl. moms)",
  },
  {
    label: "Laddningstid",
    value: "<1",
    delta: "sek",
    description: "Snabb på alla enheter, alltid",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function PhigoMetricsBlock() {
  return (
    <div className="w-full space-y-3">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.08 }}
        className="grid grid-cols-2 gap-3 w-full"
      >
        {metrics.map((metric) => (
          <motion.div key={metric.label} variants={fadeUp}>
            <Card className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-md transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary/60 dark:bg-card/66">
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent" />
              <div className="relative z-10 space-y-2">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {metric.label}
                </span>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-semibold tracking-tight text-foreground">
                    {metric.value}
                  </span>
                  <span className="mb-0.5 text-xs font-medium text-muted-foreground">
                    {metric.delta}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                  {metric.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust promise — split payment */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        className="flex items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-center"
      >
        <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden="true" />
        <span className="text-xs font-medium text-foreground">
          Betala hälften nu, resten först när du är nöjd
        </span>
      </motion.div>
    </div>
  );
}
