import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function CasesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            {/* id + tabIndex: target of the header skip link (see header.tsx) */}
            <main id="innehall" tabIndex={-1}>{children}</main>
            <Footer />
        </>
    )
}
