import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'next-themes';
import { inject } from '@vercel/analytics';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';

const CustomThemeProvider = ThemeProvider as unknown as React.FC<{
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  children?: React.ReactNode;
}>;

inject();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </CustomThemeProvider>
  </StrictMode>,
);
