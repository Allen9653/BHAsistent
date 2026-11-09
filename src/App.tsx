import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ToolsPage } from './pages/ToolsPage';
import { ScenaPage } from './pages/ScenaPage';
import { NewsPage } from './pages/NewsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ShopPage } from './pages/ShopPage';
import { CommunityPage } from './pages/CommunityPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ImpressumPage } from './pages/ImpressumPage';
import { SearchPage } from './pages/SearchPage';
import { AdminPage } from './pages/AdminPage';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { AdminBar } from './components/AdminBar';

export default function App() {
  const [isBojankaOpen, setIsBojankaOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <SpeedInsights />
        <AdminBar />
        <Routes>
          <Route
            element={
              <Layout
                isBojankaOpen={isBojankaOpen}
                setIsBojankaOpen={setIsBojankaOpen}
                isAdminOpen={isAdminOpen}
                setIsAdminOpen={setIsAdminOpen}
              />
            }
          >
            {/* Owner Admin Route */}
            <Route path="/admin" element={<AdminPage />} />

            {/* Main Home Route */}
          <Route
            path="/"
            element={
              <HomePage
                onOpenBojanka={() => setIsBojankaOpen(true)}
                onOpenAdmin={() => setIsAdminOpen(true)}
              />
            }
          />

          {/* O Nama / About Company & Video Presentations */}
          <Route path="/o-nama" element={<AboutPage />} />
          <Route path="/about" element={<Navigate to="/o-nama" replace />} />

          {/* BH Digital Tools & Services */}
          <Route
            path="/alati"
            element={<ToolsPage onOpenBojanka={() => setIsBojankaOpen(true)} />}
          />
          <Route path="/usluge" element={<Navigate to="/alati" replace />} />
          <Route path="/digitalni-alati" element={<Navigate to="/alati" replace />} />

          {/* SCENA+ Magazine */}
          <Route path="/scena-magazin" element={<ScenaPage />} />
          <Route path="/scena" element={<Navigate to="/scena-magazin" replace />} />

          {/* News & CMS */}
          <Route
            path="/novosti"
            element={<NewsPage onOpenAdmin={() => setIsAdminOpen(true)} />}
          />
          <Route
            path="/novosti/:slug"
            element={<NewsPage onOpenAdmin={() => setIsAdminOpen(true)} />}
          />

          {/* Proizvodi & Usluge (Products & Services: 8 IT Services, Applications & Free Downloads) */}
          <Route
            path="/proizvodi-i-usluge"
            element={<ProjectsPage onOpenBojanka={() => setIsBojankaOpen(true)} />}
          />
          <Route path="/usluge" element={<Navigate to="/proizvodi-i-usluge" replace />} />
          <Route path="/proizvodi" element={<Navigate to="/proizvodi-i-usluge" replace />} />
          <Route path="/projekti" element={<Navigate to="/proizvodi-i-usluge" replace />} />

          {/* Shop & Education Center */}
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/edukacija" element={<Navigate to="/shop" replace />} />

          {/* Instagram Social Community */}
          <Route path="/zajednica" element={<CommunityPage />} />

          {/* Contact */}
          <Route path="/kontakt" element={<ContactPage />} />

          {/* Impressum & Editorial Standards (E-E-A-T) */}
          <Route path="/impresum" element={<ImpressumPage />} />
          <Route path="/urednistvo" element={<Navigate to="/impresum" replace />} />
          <Route path="/editorial" element={<Navigate to="/impresum" replace />} />

          {/* Site-Wide Search Route */}
          <Route
            path="/pretraga"
            element={<SearchPage onOpenBojanka={() => setIsBojankaOpen(true)} />}
          />
          <Route path="/search" element={<Navigate to="/pretraga" replace />} />

          {/* Legal Pages (Direct Semantic Routes) */}
          <Route path="/politika-privatnosti" element={<PrivacyPolicyPage />} />
          <Route path="/privatnost" element={<Navigate to="/politika-privatnosti" replace />} />
          <Route path="/privacy-policy" element={<Navigate to="/politika-privatnosti" replace />} />

          <Route path="/uslovi-koristenja" element={<TermsPage />} />
          <Route path="/uslovi" element={<Navigate to="/uslovi-koristenja" replace />} />
          <Route path="/terms" element={<Navigate to="/uslovi-koristenja" replace />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AdminAuthProvider>
);
}
