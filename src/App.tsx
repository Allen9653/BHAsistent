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

export default function App() {
  const [isBojankaOpen, setIsBojankaOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <BrowserRouter>
      <SpeedInsights />
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

          {/* Projects Seeking Partners & Kids Coloring Book */}
          <Route
            path="/projekti"
            element={<ProjectsPage onOpenBojanka={() => setIsBojankaOpen(true)} />}
          />

          {/* Shop & Education Center */}
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/edukacija" element={<Navigate to="/shop" replace />} />

          {/* Instagram Social Community */}
          <Route path="/zajednica" element={<CommunityPage />} />

          {/* Contact & Impressum */}
          <Route path="/kontakt" element={<ContactPage />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
