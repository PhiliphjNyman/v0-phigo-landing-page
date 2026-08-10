'use client'

import { Check } from 'lucide-react'
import type { GuideQuestion } from '@/lib/guide'

interface GuideQuestionStepProps {
  question: GuideQuestion
  /** Tidigare val, satt när besökaren backat tillbaka hit. */
  selected?: string
  onSelect: (optionId: string) => void
}

/**
 * Ett frågesteg. Alternativen är riktiga knappar som väljer OCH går vidare i
 * samma klick, vilket är vad "fem snabba frågor, under en minut" förutsätter.
 * Tab flyttar mellan dem och fokusring-golvet i globals.css ger dem ringen.
 * Ett tidigare val markeras med aria-pressed så den som backar hör var hen var.
 */
export function GuideQuestionStep({ question, selected, onSelect }: GuideQuestionStepProps) {
  return (
    <div className="mt-8 flex flex-col gap-3">
      {question.options.map((option) => {
        const isSelected = option.id === selected

        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(option.id)}
            className={`group flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left text-base font-medium transition-[transform,background-color,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] ${
              isSelected
                ? 'border-primary/60 bg-primary/10 text-foreground shadow-md shadow-primary/10'
                : 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent/40'
            }`}
          >
            <span className="text-pretty">{option.label}</span>
            <span
              aria-hidden="true"
              className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                isSelected
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-transparent group-hover:border-primary/50'
              }`}
            >
              <Check className="size-3.5" />
            </span>
          </button>
        )
      })}
    </div>
  )
}
