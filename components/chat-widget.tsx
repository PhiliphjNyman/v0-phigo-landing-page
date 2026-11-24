'use client'

import { useEffect } from 'react'

/* ElevenLabs "PHIGO Chatbot" agent (text-only chat). The agent ID is public by
   design: it ships in the page source on every site that embeds it. What makes
   that harmless is the allowlist, set on BOTH levels in the ElevenLabs account
   (agent Security tab + widget allow-domains): phigo.se, www.phigo.se and the
   branch preview host. A new preview host must be added there before the
   widget will initialise on it. See CHATBOT_V1_SPEC.md §3.3. */
export const CHAT_AGENT_ID = 'agent_2101kzr8vr0hex38m80b6dwmpexc'

/* Pinned, not @latest: a widget release must not change the live site (or its
   CSP surface) without a commit. Bump deliberately and re-run the §13 suite. */
const WIDGET_SRC = 'https://unpkg.com/@elevenlabs/convai-widget-embed@0.28.0'
const SCRIPT_ID = 'elevenlabs-convai-widget'

/* Loads the chat widget after the page is interactive so it never competes
   with LCP (fas 5 hard requirement, moment 8 numbers re-measured after). The
   custom element is created imperatively instead of rendered as JSX: it lives
   outside React's tree, so hydration never sees an unknown element and the
   bubble survives client-side navigation between routes. */
export function ChatWidget() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return

    const mount = () => {
      if (document.getElementById(SCRIPT_ID)) return
      const el = document.createElement('elevenlabs-convai')
      el.setAttribute('agent-id', CHAT_AGENT_ID)
      document.body.appendChild(el)

      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.src = WIDGET_SRC
      script.async = true
      script.type = 'text/javascript'
      document.body.appendChild(script)
    }

    const idle = (cb: () => void) => {
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(cb, { timeout: 4000 })
      } else {
        window.setTimeout(cb, 2500)
      }
    }

    const onLoad = () => idle(mount)
    if (document.readyState === 'complete') {
      idle(mount)
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return null
}

/* Opens the widget from an on-page CTA ("Testa chatten"). The widget renders
   its launcher as a button inside an open shadow root, so we click the same
   button a visitor would. If the widget has not loaded yet (or a new widget
   version changed its markup), fall back to scrolling toward the bubble's
   corner rather than doing nothing. */
export function openChatWidget() {
  const host = document.querySelector('elevenlabs-convai')
  const launcher = host?.shadowRoot?.querySelector<HTMLButtonElement>('button')
  if (launcher) {
    launcher.click()
    return true
  }
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  return false
}
