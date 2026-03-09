export function PageBackground() {
    return (
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
            {/* Primary shape */}
            <div className="absolute top-1/4 -left-1/4 size-[800px] rounded-full bg-primary/10 blur-[120px] opacity-40" />

            {/* Secondary shape */}
            <div className="absolute bottom-1/4 -right-1/4 size-[600px] rounded-full bg-emerald-500/5 blur-[100px]" />

            {/* Central accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[400px] rounded-full bg-primary/10 blur-[150px] opacity-30" />
        </div>
    )
}
