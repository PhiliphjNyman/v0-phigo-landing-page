'use client'

import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { GuideQuestionStep } from '@/components/guide/guide-question-step'
import { GuideOutcomeStep } from '@/components/guide/guide-outcome-step'
import {
  NUMBERED_QUESTIONS,
  clearOrphanedAnswers,
  presentOutcome,
  stepLabel,
  visibleQuestions,
  type GuideAnswers,
} from '@/lib/guide'

/**
 * Guidens tillståndsmaskin. Allt regelverk bor i lib/guide.ts; det här är bara
 * navigering, fokus och rytm.
 *
 * stepIndex pekar in i den HÄRLEDDA listan av synliga frågor, inte i QUESTIONS.
 * Ligger index bortom listan visas utfallet. Tillbaka rör aldrig svaren, och
 * clearOrphanedAnswers ser till att ett q6-svar inte överlever att fråga 3 byts
 * till "svarar nästan alltid".
 */
export function GuideFlow() {
  const [answers, setAnswers] = useState<GuideAnswers>({})
  const [stepIndex, setStepIndex] = useState(0)

  const visible = visibleQuestions(answers)
  const atOutcome = stepIndex >= visible.length
  const question = atOutcome ? null : visible[stepIndex]
  const outcome = atOutcome ? presentOutcome(answers) : null

  /* Fokus flyttas vid stegbyte så skärmläsaren läser upp det nya steget, men
     ALDRIG vid första renderingen: då skulle fokus ryckas hit så fort sidan
     laddas. En callback-ref träffar rätt nod även med AnimatePresence
     mode="wait", där den nya noden monteras först efter utgångsanimationen.
     preventScroll eftersom kortet redan är i vy efter klicket. */
  const isFirstStep = useRef(true)
  const focusOnMount = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    if (isFirstStep.current) {
      isFirstStep.current = false
      return
    }
    node.focus({ preventScroll: true })
  }, [])

  function handleSelect(optionId: string) {
    if (!question) return
    setAnswers((current) => clearOrphanedAnswers({ ...current, [question.id]: optionId }))
    setStepIndex((index) => index + 1)
  }

  function handleBack() {
    setStepIndex((index) => Math.max(0, index - 1))
  }

  /* Fråga 6 ligger utanför räkningen ("Sista frågan"), så stapeln toppar där. */
  const progress = atOutcome
    ? 1
    : Math.min((stepIndex + 1) / NUMBERED_QUESTIONS, 1)

  return (
    <div className="mt-10 text-left">
      <div className="flex min-h-9 items-center justify-between gap-4">
        {question ? (
          <p id="guide-progress" className="text-sm font-medium text-muted-foreground">
            {stepLabel(question.id)}
          </p>
        ) : (
          <span />
        )}

        {stepIndex > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Tillbaka
          </button>
        )}
      </div>

      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
        <motion.div
          className="h-full w-full origin-left rounded-full bg-primary"
          animate={{ scaleX: progress }}
          initial={false}
          transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </div>

      {/* Golvet håller höjden konstant genom frågefasen, så ett byte mellan ett
          steg med tre och ett med fem alternativ inte flyttar en enda pixel.
          Utfallet är en egen fas och får sin naturliga höjd. */}
      <div className={atOutcome ? 'mt-8' : 'guide-step-shell mt-8'}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={atOutcome ? 'utfall' : question!.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {question ? (
              <div
                ref={focusOnMount}
                tabIndex={-1}
                role="group"
                aria-labelledby="guide-step-heading"
                aria-describedby="guide-progress"
                className="outline-none"
              >
                <h3
                  id="guide-step-heading"
                  className="text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl"
                >
                  {question.prompt}
                </h3>
                <GuideQuestionStep
                  question={question}
                  selected={answers[question.id]}
                  onSelect={handleSelect}
                />
              </div>
            ) : (
              <div
                ref={focusOnMount}
                tabIndex={-1}
                role="group"
                aria-labelledby="guide-outcome-heading"
                className="outline-none"
              >
                <h3
                  id="guide-outcome-heading"
                  className="text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl"
                >
                  {outcome!.heading}
                </h3>
                <GuideOutcomeStep outcome={outcome!} answers={answers} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
