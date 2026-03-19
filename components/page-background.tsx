export function PageBackground() {
    return (
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
            {/* Blur blobs hidden on mobile — expensive GPU compositing on small devices */}
            <div className="hidden md:block absolute top-1/4 -left-1/4 size-[800px] rounded-full bg-primary/10 blur-[120px] opacity-40" />
            <div className="hidden md:block absolute bottom-1/4 -right-1/4 size-[600px] rounded-full bg-emerald-500/5 blur-[100px]" />
            <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 size-[400px] rounded-full bg-primary/10 blur-[150px] opacity-30" />
        </div>
    )
}
