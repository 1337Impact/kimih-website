// src/global.d.ts
export {};

declare global {
  interface Window {
    CardSDK: {
      renderTapCard: any;
      Theme: any;
      Currencies: any;
      Direction: any;
      Edges: any;
      Locale: any;
      tokenize: any;
      resetCardInputs: any;
      saveCard: any;
      updateCardConfiguration: any;
      updateTheme: any;
      loadSavedCard: any;
    };
  }
}
