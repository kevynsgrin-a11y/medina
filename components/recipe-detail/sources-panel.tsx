import { BookOpen, Globe, ShieldCheck } from 'lucide-react'
import { resolveSources } from '@/lib/bibliography'

const ICONS = {
  book: BookOpen,
  site: Globe,
  'food-safety': ShieldCheck,
} as const

export function SourcesPanel({ crossRefCodes }: { crossRefCodes: string[] }) {
  const sources = resolveSources(crossRefCodes)
  if (sources.length === 0) return null

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-primary">Cross-checked against</p>
      <ul className="mt-4 space-y-2">
        {sources.map((s) => {
          const Icon = ICONS[s.kind]
          return (
            <li key={s.code}>
              <a
                href={s.url}
                target="_blank"
                rel={s.kind === 'book' ? 'sponsored noopener nofollow' : 'noopener noreferrer'}
                className="group flex items-start gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="text-pretty">{s.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
