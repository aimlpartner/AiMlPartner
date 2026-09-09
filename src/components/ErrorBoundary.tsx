import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends (React.Component as any) {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('[ErrorBoundary] Caught unhandled React error:', error, errorInfo);

    // Auto-clean any rogue service workers and stale caches
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(regs => {
        regs.forEach(r => r.unregister());
      }).catch(() => {});
    }
    if (typeof caches !== 'undefined' && caches.keys) {
      caches.keys().then(keys => {
        keys.forEach(k => caches.delete(k));
      }).catch(() => {});
    }

    // If it's a stale chunk or dual-React-instance error, automatically recover once
    const errorMsg = String(error?.message || '');
    const isChunkOrHookError =
      errorMsg.includes('Invalid hook call') ||
      errorMsg.includes("reading 'useEffect'") ||
      errorMsg.includes('Failed to fetch dynamically imported module') ||
      errorMsg.includes('Importing a module script failed');

    if (isChunkOrHookError) {
      const retryKey = 'eb_recovery_' + window.location.pathname;
      const lastRetry = sessionStorage.getItem(retryKey);
      if (!lastRetry) {
        sessionStorage.setItem(retryKey, String(Date.now()));
        console.warn('[ErrorBoundary] Detected stale chunk/hook mismatch. Auto-refreshing cleanly...');
        setTimeout(() => {
          window.location.reload();
        }, 120);
      }
    }
  }

  handleReset = () => {
    // Purge any storage and service workers before reloading
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(regs => {
        regs.forEach(r => r.unregister());
      }).catch(() => {});
    }
    if (typeof caches !== 'undefined' && caches.keys) {
      caches.keys().then(keys => {
        keys.forEach(k => caches.delete(k));
      }).catch(() => {});
    }
    sessionStorage.clear();
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-black text-white selection:bg-[#FF5500] selection:text-black">
          <div className="max-w-md w-full p-8 rounded-3xl bg-[#0d0d10] border border-white/10 shadow-2xl text-center relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#FF5500]/10">
              <AlertTriangle size={28} />
            </div>

            <h2 className="text-2xl font-bold font-display text-white mb-2 tracking-tight">
              Page Rendering Interrupted
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              A temporary client state issue was encountered. Click below to reload cleanly or return to the main dashboard.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FF5500] hover:bg-[#FF6611] text-black font-semibold text-sm transition-all shadow-lg shadow-[#FF5500]/20 hover:scale-[1.02] cursor-pointer"
              >
                <RefreshCw size={15} />
                <span>Reload Page</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition-all cursor-pointer"
              >
                <Home size={15} />
                <span>Return Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
