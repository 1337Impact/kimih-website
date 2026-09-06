declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: { pageLanguage: string },
          elementId: string
        ) => void;
      };
    };
  }
}

let loadPromise: Promise<void> | null = null;

function waitForCombo(timeoutMs = 8000): Promise<void> {
  const started = Date.now();
  return new Promise((resolve) => {
    const poll = () => {
      if (document.querySelector(".goog-te-combo") || Date.now() - started > timeoutMs) {
        resolve();
        return;
      }
      window.setTimeout(poll, 50);
    };
    poll();
  });
}

export function loadGoogleTranslate(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (document.querySelector(".goog-te-combo")) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve) => {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      }
      waitForCombo().then(resolve);
    };

    const existing = document.querySelector(
      'script[src*="translate.google.com/translate_a/element.js"]'
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return loadPromise;
}

export function applyGoogleTranslateLanguage(languageCode: string) {
  const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
  if (!combo) return false;
  combo.value = languageCode;
  combo.dispatchEvent(new Event("change"));
  return true;
}

export function getStoredLanguage() {
  if (typeof window === "undefined") return "en";
  return localStorage.getItem("kimih-lang") || localStorage.getItem("language") || "en";
}
