/**
 * Google Consent Mode v2 & Google Tag Manager Integration Manager
 * Handles dataLayer events, consent states, cookie/localStorage persistence,
 * and deferred GTM container injection upon user consent.
 */

export const GTM_CONTAINER_ID = 'GTM-MG545DQF';
export const CONSENT_STORAGE_KEY = 'consentGranted';
export const PREFERENCES_STORAGE_KEY = 'bh_assistant_cookie_consent_v1';
export const CONSENT_COOKIE_NAME = 'bh_assistant_consent_v2';

export interface ConsentSettings {
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Ensures gtag function exists on window, pushing arguments to dataLayer
 */
export function ensureGtag(): (...args: any[]) => void {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }
  return window.gtag;
}

/**
 * Checks whether user has already granted consent in localStorage or cookies
 */
export function isConsentGranted(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    
    // Check primary flag
    const granted = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (granted === 'true') return true;

    // Check detailed preferences
    const detailed = localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (detailed) {
      const parsed = JSON.parse(detailed);
      if (parsed && parsed.consented && (parsed.analytics || parsed.marketing)) {
        return true;
      }
    }

    // Check cookie
    if (document.cookie.includes(`${CONSENT_COOKIE_NAME}=granted`)) {
      return true;
    }
  } catch (e) {
    // LocalStorage or cookie access might fail in private browsing
  }
  return false;
}

/**
 * Dynamically loads Google Tag Manager script into document head if not already loaded.
 * Container is loaded ONLY when consent is granted, preventing tracking prior to consent.
 */
export function loadTagManagerScript(containerId: string = GTM_CONTAINER_ID): void {
  if (typeof document === 'undefined') return;

  // Check if GTM script is already present
  const existingGtm = document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${containerId}"]`);
  if (existingGtm) {
    return;
  }

  const gtmScript = document.createElement('script');
  gtmScript.async = true;
  gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
  gtmScript.setAttribute('data-gtm-container', containerId);

  const firstScript = document.getElementsByTagName('script')[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(gtmScript, firstScript);
  } else {
    document.head.appendChild(gtmScript);
  }
}

/**
 * Sets a persistent browser cookie
 */
function setCookie(name: string, value: string, days: number = 365): void {
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch (e) {
    // Non-fatal
  }
}

/**
 * Updates Google Consent Mode v2 state, saves to storage, logs to dataLayer,
 * and dynamically loads Tag Manager if consent is granted.
 */
export function updateConsentState(
  status: 'granted' | 'denied',
  options: {
    analytics?: boolean;
    marketing?: boolean;
    interactionType: 'grant_all' | 'essential_only' | 'custom_save';
    buttonId?: string;
  }
): void {
  const gtag = ensureGtag();
  const isGranted = status === 'granted';

  const settings: ConsentSettings = {
    ad_user_data: isGranted && options.marketing !== false ? 'granted' : 'denied',
    ad_personalization: isGranted && options.marketing !== false ? 'granted' : 'denied',
    ad_storage: isGranted && options.marketing !== false ? 'granted' : 'denied',
    analytics_storage: isGranted && options.analytics !== false ? 'granted' : 'denied',
  };

  // 1. Save consent decision to localStorage
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, isGranted ? 'true' : 'false');
    localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify({
        essential: true,
        analytics: settings.analytics_storage === 'granted',
        marketing: settings.ad_storage === 'granted',
        consented: true,
        timestamp: new Date().toISOString(),
      })
    );
  } catch (e) {
    // Ignore storage quota or security errors
  }

  // 2. Save to cookie
  setCookie(CONSENT_COOKIE_NAME, isGranted ? 'granted' : 'denied');

  // 3. Update Consent Mode in Google Tag
  gtag('consent', 'update', settings);

  // 4. Push consent banner interaction event to data layer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'consent_banner_interaction',
    consent_decision: status,
    interaction_type: options.interactionType,
    trigger_button_id: options.buttonId || 'unknown',
    consent_settings: settings,
    timestamp: new Date().getTime(),
  });

  // 5. Load Tag Manager container if user granted consent
  if (isGranted) {
    loadTagManagerScript(GTM_CONTAINER_ID);
  }
}

/**
 * Attaches DOM event listeners to monitor interactions with consent buttons.
 * Guarantees compliance with both programmatic React flows and direct DOM button clicks.
 */
export function attachConsentButtonListeners(): () => void {
  if (typeof document === 'undefined') return () => {};

  const handleGrantClick = (e: Event) => {
    const target = e.currentTarget as HTMLElement | null;
    const buttonId = target?.id || 'grantButton';
    updateConsentState('granted', {
      analytics: true,
      marketing: true,
      interactionType: 'grant_all',
      buttonId,
    });
  };

  const handleDenyClick = (e: Event) => {
    const target = e.currentTarget as HTMLElement | null;
    const buttonId = target?.id || 'btn-cookie-accept-essential';
    updateConsentState('denied', {
      analytics: false,
      marketing: false,
      interactionType: 'essential_only',
      buttonId,
    });
  };

  const grantButtons = [
    document.getElementById('grantButton'),
    document.getElementById('btn-cookie-accept-all'),
  ].filter(Boolean) as HTMLElement[];

  const denyButtons = [
    document.getElementById('btn-cookie-accept-essential'),
    document.getElementById('denyButton'),
  ].filter(Boolean) as HTMLElement[];

  grantButtons.forEach((btn) => btn.addEventListener('click', handleGrantClick));
  denyButtons.forEach((btn) => btn.addEventListener('click', handleDenyClick));

  return () => {
    grantButtons.forEach((btn) => btn.removeEventListener('click', handleGrantClick));
    denyButtons.forEach((btn) => btn.removeEventListener('click', handleDenyClick));
  };
}
