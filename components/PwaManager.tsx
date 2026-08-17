'use client';

import React, { useState, useEffect } from 'react';
import { Download, WifiOff, RefreshCw, X } from 'lucide-react';

export function PwaManager() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [, setIsOnline] = useState(() => typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [showOfflineBanner, setShowOfflineBanner] = useState(() => typeof navigator !== 'undefined' ? !navigator.onLine : false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineBanner(false);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // PWA Install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Service Worker update check
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  setUpdateAvailable(true);
                }
              }
            };
          }
        };
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      {/* Install Button Widget (Shown when installable) */}
      {isInstallable && (
        <div className="fixed bottom-4 right-4 z-50 animate-bounce">
          <button
            onClick={handleInstallClick}
            aria-label="Install EMIProX App"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-full shadow-lg font-medium text-sm transition-all"
          >
            <Download size={16} />
            <span>Install EMIProX</span>
          </button>
        </div>
      )}

      {/* Update Available Banner */}
      {updateAvailable && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-3 rounded-xl shadow-xl flex items-center gap-4 text-sm font-medium border border-zinc-700 dark:border-zinc-300">
          <span>New version available!</span>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs transition-colors"
          >
            <RefreshCw size={14} />
            <span>Refresh</span>
          </button>
        </div>
      )}

      {/* Offline Status Toast */}
      {showOfflineBanner && (
        <div className="fixed bottom-4 left-4 z-50 bg-amber-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 text-xs font-medium">
          <WifiOff size={16} />
          <span>Offline mode — Cached calculators are ready</span>
          <button 
            onClick={() => setShowOfflineBanner(false)}
            className="ml-2 p-1 hover:bg-amber-700 rounded transition-colors"
            aria-label="Dismiss offline banner"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </>
  );
}
