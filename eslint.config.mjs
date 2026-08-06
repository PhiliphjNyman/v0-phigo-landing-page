// eslint-config-next 16 ships native flat configs, so no FlatCompat wrapper.
import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'next-env.d.ts',
      // Vendored shadcn/ui primitives — CLAUDE.md says do not touch these.
      'components/ui/**',
      // ...except our own components that happen to live in that folder.
      '!components/ui/phigo-metrics-block.tsx',
      '!components/ui/counter.tsx',
      '!components/ui/swipe-dots.tsx',
    ],
  },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // The project uses a leading underscore to mark deliberately unused
      // bindings (see the next/font instance in app/layout.tsx).
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
      // Advisory perf rule. Our three hits are the deliberate mounted-gate
      // pattern that fixes the next-themes hydration mismatch (theme-toggle,
      // documented in the implementation plan §2), the matchMedia hook, and the
      // dev-only orb toggle. Downgraded to a warning rather than silenced, so a
      // genuinely new cascading-render effect still shows up in the output.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
]

export default eslintConfig
