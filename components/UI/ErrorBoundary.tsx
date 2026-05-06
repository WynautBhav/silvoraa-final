'use client';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
        this.setState({ errorInfo });
    }

    private handleReload = () => { window.location.reload(); };
    private handleGoHome = () => { window.location.href = '/'; };

    public render() {
        if (this.state.hasError) {
            const errorDetails = this.state.error?.stack || this.state.error?.message || 'Unknown error';
            const componentStack = this.state.errorInfo?.componentStack || '';

            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                        </div>
                        <h1 className="font-serif text-3xl text-gray-900 mb-2">Something went wrong</h1>
                        <p className="text-gray-500 mb-8">We apologize for the inconvenience. Our team has been notified.</p>
                        <div className="space-y-3">
                            <button
                                onClick={this.handleReload}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-black transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Reload Page
                            </button>
                            <button
                                onClick={this.handleGoHome}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                Return Home
                            </button>
                        </div>
                        <div className="mt-8 text-left">
                            <div className="flex items-center gap-2 mb-2">
                                <Bug className="w-4 h-4 text-red-500" />
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Error Details</p>
                            </div>
                            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                                <pre className="text-xs text-red-500 overflow-auto mb-4">{this.state.error?.message}</pre>
                                <pre className="text-xs text-red-400 overflow-auto max-h-60">{errorDetails}</pre>
                                {componentStack && (
                                    <pre className="text-xs text-red-400 overflow-auto max-h-40 mt-4">{componentStack}</pre>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
