'use client';

/**
 * Global Error Boundary — catches errors in the ROOT layout itself.
 * This is the last line of defense. It replaces the entire <html>,
 * so it must render its own <html> and <body> tags.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#fafafa' }}>
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                }}>
                    <div style={{
                        maxWidth: '480px',
                        width: '100%',
                        background: '#fff',
                        borderRadius: '16px',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        border: '1px solid #f0f0f0',
                    }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: '#fef2f2',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            fontSize: '28px',
                        }}>
                            ⚠️
                        </div>
                        <h1 style={{ fontSize: '1.5rem', color: '#111', margin: '0 0 0.5rem', fontWeight: 600 }}>
                            Something went wrong
                        </h1>
                        <p style={{ fontSize: '0.875rem', color: '#666', margin: '0 0 2rem', lineHeight: 1.6 }}>
                            We&apos;re sorry for the inconvenience. Please try again or return to the home page.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <button
                                onClick={reset}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: '#111',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '10px',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                }}
                            >
                                Try again
                            </button>
                            <a
                                href="/"
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: '#f5f5f5',
                                    color: '#333',
                                    borderRadius: '10px',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                    display: 'block',
                                }}
                            >
                                Go to Home
                            </a>
                        </div>
                        {process.env.NODE_ENV === 'development' && (
                            <details style={{ marginTop: '2rem', textAlign: 'left' }}>
                                <summary style={{ fontSize: '0.75rem', color: '#999', cursor: 'pointer' }}>
                                    Error Details
                                </summary>
                                <pre style={{
                                    fontSize: '0.7rem',
                                    color: '#e53e3e',
                                    background: '#fef2f2',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    overflow: 'auto',
                                    marginTop: '0.5rem',
                                    maxHeight: '200px',
                                }}>
                                    {error.message}
                                    {'\n'}
                                    {error.stack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            </body>
        </html>
    );
}
