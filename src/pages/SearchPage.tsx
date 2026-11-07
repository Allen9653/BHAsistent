import React from 'react';
import { SiteWideSearch } from '../components/SiteWideSearch';
import { PageSeo } from '../components/PageSeo';
import { Sparkles, Layers, Newspaper, FolderGit2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchPageProps {
  onOpenBojanka?: () => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onOpenBojanka }) => {
  return (
    <div className="pt-20 pb-16 w-full min-h-[75vh]">
      <PageSeo
        title="Pretraga Alata, Članaka i Projekata | B&H Assistant d.o.o. Zenica"
        description="Pronađite specifične digitalne alate (BH Konver, PapirFinder), autorske članke, magazine SCENA+ ili razvojne projekte firme B&H Assistant d.o.o."
        canonicalUrl="https://bh-assistant.ba/pretraga"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Main Site-Wide Search Component */}
        <SiteWideSearch
          variant="section"
          onOpenBojanka={onOpenBojanka}
          title="Centralna Pretraga B&H Assistant Platforme"
          subtitle="Pretražite kompletnu bazu domaćih digitalnih kalkulatora, e-Uprave, analitičkih IT članaka, magazina SCENA+ i razvojnih inicijativa."
        />

        {/* Quick Access Portals */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <Link
            to="/alati"
            className="p-5 rounded-2xl bg-[#0F2038]/80 hover:bg-[#1A3152] border border-[#1A3152] hover:border-[#00C9A7]/50 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#0A1628] border border-[#1A3152] flex items-center justify-center text-[#00C9A7]">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-syne font-bold text-base text-[#F5F0E8] group-hover:text-[#00C9A7] transition-colors">
                Digitalni Alati & Kalkulatori
              </h4>
              <p className="text-xs text-[#F5F0E8]/70 leading-relaxed font-sans">
                Isprobajte BH Konver i pretražite općinske obrasce kroz BH PapirFinder.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-mono text-[#00C9A7]">
              <span>Pregledaj alate</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/novosti"
            className="p-5 rounded-2xl bg-[#0F2038]/80 hover:bg-[#1A3152] border border-[#1A3152] hover:border-[#00E5BE]/50 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#0A1628] border border-[#1A3152] flex items-center justify-center text-[#00E5BE]">
                <Newspaper className="w-5 h-5" />
              </div>
              <h4 className="font-syne font-bold text-base text-[#F5F0E8] group-hover:text-[#00E5BE] transition-colors">
                Novosti, Analize & Magazin
              </h4>
              <p className="text-xs text-[#F5F0E8]/70 leading-relaxed font-sans">
                IT trendovi, lokalna dešavanja, kulturna baština i saopštenja redakcije.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-mono text-[#00E5BE]">
              <span>Čitaj članke</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/projekti"
            className="p-5 rounded-2xl bg-[#0F2038]/80 hover:bg-[#1A3152] border border-[#1A3152] hover:border-[#C9A84C]/50 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#0A1628] border border-[#1A3152] flex items-center justify-center text-[#C9A84C]">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <h4 className="font-syne font-bold text-base text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors">
                Projekti & Partnerstva
              </h4>
              <p className="text-xs text-[#F5F0E8]/70 leading-relaxed font-sans">
                ZENTAXI, besplatna Gummi bojanka i tehnološka partnerstva u BiH.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-mono text-[#C9A84C]">
              <span>Pogledaj projekte</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
