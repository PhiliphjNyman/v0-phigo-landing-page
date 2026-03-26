'use client'

import { motion, type Variants } from "framer-motion";
import { Card } from "@/components/ui/card";

const metrics = [
  {
    label: "Fast pris",
    value: "8 000",
    delta: "kr",
    description: "Engångsbelopp utan dolda kostnader",
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
    description: "Drift, säkerhet och löpande ändringar",
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
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.08 }}
      className="grid grid-cols-2 gap-3 w-full"
    >
      {metrics.map((metric) => (
        <motion.div key={metric.label} variants={fadeUp}>
          <Card className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background/45 p-5 backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-1">
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
              <p className="text-xs leading-relaxed text-muted-foreground">
                {metric.description}
              </p>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
