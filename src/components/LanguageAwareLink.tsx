import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { isValidLanguage } from '../context/LanguageContext';

/**
 * Link koji automatski prenosi aktivni jezik (?lang=) na ciljnu rutu,
 * tako da navigacija ne gubi jezik. Primjeri:
 *   <LanguageAwareLink to="/novosti">Novosti</LanguageAwareLink>
 *   <LanguageAwareLink to={{ pathname: '/kontakt', search: '?usluga=X' }}>Kontakt</LanguageAwareLink>
 *
 * - Ako "to" već sadrži ?lang=, ostaje kako jeste.
 * - Ako "to" sadrži druge query parametre (?clanak=, ?usluga=, #faq...), oni se čuvaju
 *   i ?lang= se dopisuje.
 * - Eksterni linkovi (http...) se ne mijenjaju.
 */
export const LanguageAwareLink: React.FC<LinkProps> = ({ to, children, ...rest }) => {
  const { language } = useLanguage();

  const target: LinkProps['to'] = React.useMemo(() => {
    if (typeof to === 'string') {
      // Eksterni URL — ostavi nepromijenjen
      if (/^https?:\/\//i.test(to)) return to;
      // Bez query stringa: dodaj ?lang=
      if (!to.includes('?')) return `${to}?lang=${language}`;
      // Ima query: provjeri da li već ima lang
      const [path, ...rest] = to.split('?');
      const query = rest.join('?');
      const params = new URLSearchParams(query);
      if (!params.has('lang')) params.set('lang', language);
      return `${path}?${params.toString()}`;
    }
    if (to && typeof to === 'object') {
      const search = (to as { search?: string }).search || '';
      const params = new URLSearchParams(search);
      if (!isValidLanguage(params.get('lang'))) params.set('lang', language);
      return { ...to, search: `?${params.toString()}` };
    }
    return to;
  }, [to, language]);

  return (
    <Link to={target} {...rest}>
      {children}
    </Link>
  );
};

/**
 * Helper: dodaje ?lang= na string putanju (za <a href> i navigate()).
 *   withLang('/novosti', 'en') -> '/novosti?lang=en'
 *   withLang('/kontakt?usluga=X', 'de') -> '/kontakt?usluga=X&lang=de'
 */
export function withLang(path: string, language: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const [base, ...rest] = path.split('?');
  const params = new URLSearchParams(rest.join('?'));
  if (!params.has('lang')) params.set('lang', language);
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

/**
 * Helper: dodaje ?lang= na href sa hashom, npr. '/novosti#feed' -> '/novosti?lang=en#feed'
 */
export function withLangAndHash(path: string, language: string): string {
  const [beforeHash, hash] = path.split('#');
  const withL = withLang(beforeHash, language);
  return hash !== undefined ? `${withL}#${hash}` : withL;
}

export default LanguageAwareLink;
