"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { CartDrawer } from '@/components/Cart/CartDrawer';
import { WhatsAppButton } from '@/components/WhatsApp/WhatsAppButton';
import { ScrollToTop } from '@/components/Layout/ScrollToTop';
import { ErrorBoundary } from '@/components/UI/ErrorBoundary';
import { SplashTransition } from '@/components/Auth/SplashTransition';
import { useAuth } from '@/components/Auth/AuthContext';
import dynamic from 'next/dynamic';
const AIStylist = dynamic(() => import('@/components/AI/AIStylist').then(mod => mod.AIStylist), { ssr: false });

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const [isAIStylistOpen, setIsAIStylistOpen] = useState(false);
    const pathname = usePathname();
    const hideChrome = pathname?.startsWith('/admin') || pathname === '/auth';
    const { showSplash, dismissSplash, user } = useAuth();

    useEffect(() => {
        // Initialize Microsoft Clarity
        const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
        if (clarityId && typeof window !== 'undefined') {
            import('@microsoft/clarity').then(({ default: Clarity }) => {
                Clarity.init(clarityId);
            }).catch(() => {});
        }

        // Initialize Sentry
        const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
        if (sentryDsn) {
            import('@sentry/react').then(Sentry => {
                Sentry.init({ dsn: sentryDsn, tracesSampleRate: 0.1 });
            }).catch(() => {});
        }
    }, []);

    return (
        <ErrorBoundary>
            {showSplash && (
                <SplashTransition
                    userName={user?.name || 'Guest'}
                    onComplete={dismissSplash}
                />
            )}
            <ScrollToTop />
            {!hideChrome && <Navbar onOpenStylist={() => setIsAIStylistOpen(true)} />}
            <main>{children}</main>
            {!hideChrome && <Footer />}
            {!hideChrome && <CartDrawer />}
            {!hideChrome && <WhatsAppButton />}
            {!hideChrome && isAIStylistOpen && <AIStylist onClose={() => setIsAIStylistOpen(false)} />}
        </ErrorBoundary>
    );
}
