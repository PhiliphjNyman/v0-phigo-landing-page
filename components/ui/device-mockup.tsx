import Image from 'next/image'

interface DeviceMockupProps {
    src: string
    alt: string
    accent: 'amber' | 'emerald' | 'cyan'
    priority?: boolean
    showPhone?: boolean
}

const accentGlow: Record<'amber' | 'emerald' | 'cyan', string> = {
    amber:   '0 24px 80px -12px rgba(245, 158, 11, 0.25)',
    emerald: '0 24px 80px -12px rgba(16, 185, 129, 0.25)',
    cyan:    '0 24px 80px -12px rgba(6, 182, 212, 0.25)',
}

export function DeviceMockup({
    src,
    alt,
    accent,
    priority = false,
    showPhone = true,
}: DeviceMockupProps) {
    return (
        <div
            className="relative w-full select-none"
            style={{ filter: `drop-shadow(${accentGlow[accent]})` }}
        >
            {/* Laptop */}
            <div className="w-full rounded-t-2xl bg-zinc-900">
                {/* Screen bezel */}
                <div className="rounded-t-xl bg-zinc-800 p-1.5 pt-2">
                    {/* Camera dot */}
                    <div className="flex h-4 items-center justify-center">
                        <span
                            className="size-1.5 rounded-full bg-zinc-600"
                            aria-hidden="true"
                        />
                    </div>
                    {/* Screen */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-md">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-cover object-top"
                            priority={priority}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </div>

                {/* Keyboard base */}
                <div className="h-7 rounded-b-[1.25rem] border-t border-zinc-800 bg-zinc-900">
                    <div className="mx-auto mt-2 h-3 w-14 rounded bg-zinc-800" aria-hidden="true" />
                </div>
            </div>

            {/* Phone overlay */}
            {showPhone && (
                <div
                    className="absolute bottom-[-12px] right-[-16px] z-10 w-[22%]"
                    aria-hidden="true"
                >
                    <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-900 shadow-xl ring-1 ring-white/5">
                        <div className="mx-auto mt-2 h-2 w-10 rounded-full bg-zinc-800" />
                        <div className="relative mx-1 mt-1 aspect-[9/19] overflow-hidden rounded-[1.125rem]">
                            <Image
                                src={src}
                                alt=""
                                fill
                                className="object-cover object-top"
                                sizes="15vw"
                            />
                        </div>
                        <div className="flex h-5 items-center justify-center">
                            <span className="block h-0.5 w-10 rounded-full bg-zinc-700" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
