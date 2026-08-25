# B&H Assistant d.o.o. - Zvanični Web Portal & Digitalni Ekosistem

![B&H Assistant Status](https://img.shields.io/badge/Status-Aktivan_Projekat-00C9A7?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React_19_%7C_TypeScript_%7C_Vite_%7C_Tailwind_v4-0A1628?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/Licenca-Sva_prava_zadržana-C9A84C?style=for-the-badge)

Zvanični web portal i digitalna platforma agencije **B&H Assistant d.o.o. Zenica** (https://www.bh-assistant.ba). Inovativna bosanskohercegovačka platforma koja spaja digitalne alate, e-Upravu, multimediju, kulturna izdanja i partnerske integracije na jednom mjestu.

---

## 🌟 O Kompaniji B&H Assistant d.o.o.

**B&H Assistant d.o.o.** je privatna firma registrovana u Zenici (72000, Bosna i Hercegovina), specijalizovana za razvoj softverskih rješenja, e-Upravu, digitalne alate i medijska izdanja.

- **Puni Naziv:** B&H ASSISTANT d.o.o. Zenica
- **Sjedište:** Ul. Bulevar Ezhera Eze Arnautovića 8, 72000 Zenica, Bosna i Hercegovina
- **Jedinstveni ID Broj (JIB):** 4219296620005
- **Matični Broj Subjekta (MBS):** 43-01-0177-25
- **Kategorija Djelatnosti:** IT Softver, e-Uprava & Mediji
- **Kontakt Telefon:** +387 62 580 207
- **Email:** info@bh-assistant.ba
- **Zvanična Web Stranica:** [https://bh-assistant.ba](https://bh-assistant.ba)

---

## 🚀 Ključni Moduli i Digitalni Alati

1. **BH KONVER - Pametni Valutni & Poslovni Konverter:**
   - Obrada i pretvaranje valuta (BAM, EUR, USD, CHF...), jedinica mjere i poslovnih kalkulacija prilagođenih bh. tržištu.
2. **BH PAPIRFINDER - Vodič kroz e-Upravu:**
   - Interaktivna pretraga besplatnih općinskih obrazaca, taksi i administrativnih procedura u javnoj upravi u BiH.
3. **SCENA+ Magazin:**
   - Urbani magazin za umjetnost, kulturu, muziku i izdanja iz bosanskohercegovačke kulturne baštine i estetike.
4. **GUMMI - Vaš Jaran & Edukativna Bojanka:**
   - Edukativni projekat za najmlađe sa besplatnim digitalnim izdanjem na Archive.org i Canva Reader platformi.
5. **Dvojezična Podrška (BS / EN) & Napredna Pristupačnost:**
   - Brzo prebacivanje jezika u navigacijskom baru uz animirani indikator skrolanja.

---

## 🛠️ Tehnološki Stog (Tech Stack)

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **Ikone:** Lucide React
- **Animacije:** Motion (`motion/react`)
- **Hosting & CI/CD:** Optimizovano za Vercel, Netlify, Cloudflare Pages ili Google Cloud Run

---

## 💻 Lokalno Pokretanje i Razvoj (Setup Guide)

### Preduvjeti
- [Node.js](https://nodejs.org/) (verzija 18+ preporučena)
- `npm` (dolazi uz Node.js)

### Koraci

1. **Klonirajte repozitorij:**
   ```bash
   git clone https://github.com/TVOJ-KORISNIK/bh-assistant.git
   cd bh-assistant
   ```

2. **Instalirajte zavisnosti:**
   ```bash
   npm install
   ```

3. **Pokrenite razvojni server:**
   ```bash
   npm run dev
   ```
   Aplikacija se pokreće na `http://localhost:3000`.

4. **Izgradnja produkcijskog paketa:**
   ```bash
   npm run build
   ```
   Optimizovani produkcijski bundle generiše se u `dist/` folderu.

---

## 📁 Struktura Projekta

```
bh-assistant/
├── public/                 # Favicon, verifikacioni fajlovi i statički resursi
├── src/
│   ├── components/         # Modularne React UI komponente (Navbar, Hero, Alati, SCENA+...)
│   ├── context/            # LanguageContext (BS, EN, DE, TR)
│   ├── data/               # Podaci o kompaniji, vijestima, prijevodima (companyData, newsData, translations)
│   ├── hooks/              # Custom React hooks (usePullToRefresh...)
│   ├── pages/              # Stranice aplikacije (HomePage, AboutPage, ToolsPage, ScenaPage...)
│   ├── utils/              # Pomoćne funkcije i CDN konfiguracija slika (images.ts)
│   ├── types.ts            # Globalni TypeScript tipovi
│   ├── App.tsx             # Glavni ruter i layout hijerarhija
│   ├── index.css           # Globalni Tailwind v4 stilovi
│   └── main.tsx            # Glavni entry point
├── vercel.json             # SPA URL rewrite pravila za Vercel deployment
├── package.json            # Zavisnosti i skripte
├── tsconfig.json           # TypeScript konfiguracija
├── vite.config.ts          # Vite konfiguracija
└── README.md               # Dokumentacija projekta
```

---

## 📄 Licenca i Autorska Prava

© 2026 **B&H Assistant d.o.o. Zenica**. Sva prava zadržana.  
Zabranjeno je neovlašteno kopiranje i distribucija bez pismene saglasnosti kompanije.
