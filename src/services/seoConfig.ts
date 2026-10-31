/**
 * SEO & Structured Data Configuration for NEW FITEMS Studio
 * Manages per-page meta tags, canonical links, OpenGraph, Twitter Cards, and Schema.org JSON-LD
 */

export type PageId = 'home' | 'concept' | 'services' | 'stories' | 'pricing' | 'contact';

export interface PageSEO {
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  schema: object;
}

export const BASE_URL = 'https://newfitems.rs';

export const PAGE_SEO_DATA: Record<PageId, PageSEO> = {
  home: {
    path: '/',
    title: 'NEW FITEMS · EMS Trening Studio Nova Pazova | 30 Minuta do Forme',
    description: 'Ekskluzivni EMS fitnes studio u Novoj Pazovi. Vođeni treninzi od 30 minuta za žene i muškarce na modernim spravama uz trenere Vuka i Lazara. Zakaži probni termin.',
    keywords: 'EMS trening Nova Pazova, EMS fitnes studio, Nova Pazova, Stara Pazova, Batajnica, maderoterapija, vakum kapsula, treninzi za zene, 30 minuta trening, personalni trener, Vuk Djoric',
    ogImage: `${BASE_URL}/assets/hero_blend_image.jpg`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE_URL}/#webpage`,
      url: `${BASE_URL}/`,
      name: 'NEW FITEMS · EMS Trening Studio Nova Pazova',
      description: 'Savremeni fitness studio za individualne vođene EMS treninge od 30 minuta u Novoj Pazovi.',
      inLanguage: 'sr',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: `${BASE_URL}/`,
        name: 'NEW FITEMS EMS Studio',
      },
    },
  },
  concept: {
    path: '/koncept',
    title: 'Brend Koncept & EMS Tehnologija · NEW FITEMS Nova Pazova',
    description: 'Kako radi EMS trening tehnologija? 30 minuta vođenog treninga aktivira preko 90% mišićnih vlakana bez opterećenja zglobova i kičme. Upoznaj naš koncept.',
    keywords: 'EMS tehnologija, kako radi EMS, aktivacija mišića 30 minuta, trening bez zglobnog opterećenja, koncept New Fitems Nova Pazova, treneri Vuk i Lazar',
    ogImage: `${BASE_URL}/assets/hero_blend_image.jpg`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${BASE_URL}/koncept#about`,
      url: `${BASE_URL}/koncept`,
      name: 'Brend Koncept i Tehnologija - New Fitems',
      description: 'Fitnes program za žene i muškarce koji cene svoje vreme. 30 minuta vođenog treninga na naprednim EMS i vakum spravama.',
      mainEntity: {
        '@type': 'SportsClub',
        name: 'NEW FITEMS',
        address: 'Kralja Petra I Karađorđevića 87, Nova Pazova',
      },
    },
  },
  services: {
    path: '/usluge',
    title: 'Usluge i Sprave · EMS Vođeni Trening, Vakum IR & Madero Roler | NEW FITEMS',
    description: 'Pregled svih sprava i tretmana: EMS individualni trening (30 min), Vakum kapsula sa infracrvenim svetlima za topljenje masti i Madero roler masaža.',
    keywords: 'EMS odelo trening, vakum kapsula infracrvena, madero roler celulit, tretmani tela Nova Pazova, limfna drenaza, zatezanje koze, mrsavljenje stomak',
    ogImage: 'https://64.media.tumblr.com/78b135ec5509e73cc4afe1e85ec4317b/822f13a412d29853-5b/s2048x3072/9be4a61ff24135879e903a852e495094cc7e68f7.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${BASE_URL}/usluge#services`,
      url: `${BASE_URL}/usluge`,
      name: 'Usluge i Sprave u New Fitems Studiju',
      itemListElement: [
        {
          '@type': 'Service',
          position: 1,
          name: 'EMS Vođeni Trening',
          description: 'Aktivacija preko 90% muskulature u samo 30 minuta uz personalnog trenera.',
          provider: { '@type': 'SportsActivityLocation', name: 'NEW FITEMS' },
        },
        {
          '@type': 'Service',
          position: 2,
          name: 'Vakum Sprava sa IR Svetlima',
          description: 'Topljenje upornih masnih naslaga, eliminacija zadržane vode i ubrzanje mikrocirkulacije.',
          provider: { '@type': 'SportsActivityLocation', name: 'NEW FITEMS' },
        },
        {
          '@type': 'Service',
          position: 3,
          name: 'Madero Roler Terapija',
          description: 'Mehanička anticelulit masaža i limfna drenaža za zatezanje kože i relaksaciju.',
          provider: { '@type': 'SportsActivityLocation', name: 'NEW FITEMS' },
        },
        {
          '@type': 'Service',
          position: 4,
          name: 'Plan Ishrane i Savetovanje',
          description: 'Održive smernice i zdravi obroci bez rigoroznih dijeta prilagođeni zaposlenim ljudima.',
          provider: { '@type': 'SportsActivityLocation', name: 'NEW FITEMS' },
        },
      ],
    },
  },
  stories: {
    path: '/iskustva',
    title: 'Iskustva i Rezultati Klijenata · Transformacije u NEW FITEMS Studiju',
    description: 'Pročitajte utiske klijentkinja i pogledajte stvarne video rezultate sa treninga u Novoj Pazovi. Gubitak centimetara, zatezanje i energija za 30–90 dana.',
    keywords: 'EMS rezultati iskustva, transformacije pre i posle Nova Pazova, utisci vezbaca, mrsavljenje zene iskustva, video snimci treninga',
    ogImage: `${BASE_URL}/assets/hero_blend_image.jpg`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ItemPage',
      '@id': `${BASE_URL}/iskustva#reviews`,
      url: `${BASE_URL}/iskustva`,
      name: 'Iskustva Klijenata i Rezultati - New Fitems',
      description: 'Zabeleženi autentični rezultati i video snimci vežbača u Novoj Pazovi.',
      mainEntity: {
        '@type': 'SportsActivityLocation',
        name: 'NEW FITEMS',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          reviewCount: '48',
        },
      },
    },
  },
  pricing: {
    path: '/cenovnik',
    title: 'Cenovnik i Paketi Treninga · 90-Dnevni Total Fit | NEW FITEMS',
    description: 'Pogledajte cene i pakete: Starter paket (8 termina), najtraženiji 90-Dnevni Total Fit program i Body Sculpt tretmani. 1-na-1 rad i kompletna oprema uključeni.',
    keywords: 'EMS trening cena Nova Pazova, cenovnik New Fitems, 90 dana fitnes program cena, cene teretane Nova Pazova, probni trening cena',
    ogImage: 'https://64.media.tumblr.com/7b1c6284676c98713e149ec851cce6eb/822f13a412d29853-53/s2048x3072/8d5e2a3040cb212763ededa0c87bb9b379e0910b.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      '@id': `${BASE_URL}/cenovnik#pricing`,
      url: `${BASE_URL}/cenovnik`,
      name: 'Cenovnik Paketa Treninga - New Fitems',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Starter Mesečni Paket (8 EMS termina)',
          price: '14500',
          priceCurrency: 'RSD',
          description: 'Uvodni paket sa 8 vođenih 1-na-1 EMS treninga, merenjem i opremom.',
        },
        {
          '@type': 'Offer',
          name: '90-Dnevni Total Fit Program',
          price: '39900',
          priceCurrency: 'RSD',
          description: 'Kompletan sistem transformacije: EMS + Vakum IR + Madero roler + Plan ishrane.',
        },
        {
          '@type': 'Offer',
          name: 'Body Sculpt & Detox (10 termina)',
          price: '16900',
          priceCurrency: 'RSD',
          description: '10 kombinovanih termina: Vakum IR kapsula i Madero roler za eliminaciju celulita.',
        },
      ],
    },
  },
  contact: {
    path: '/kontakt',
    title: 'Kontakt i Lokacija · Kralja Petra I Karađorđevića 87 | NEW FITEMS',
    description: 'Adresa i kontakt EMS studija New Fitems: Kralja Petra I Karađorđevića 87, Nova Pazova. Pozovite 069 270 7833 ili pošaljite online rezervaciju termina.',
    keywords: 'New Fitems adresa, gde se nalazi New Fitems, Kralja Petra I 87 Nova Pazova, telefon studio, radno vreme, zakazivanje termina',
    ogImage: `${BASE_URL}/assets/hero_blend_image.jpg`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${BASE_URL}/kontakt#contact`,
      url: `${BASE_URL}/kontakt`,
      name: 'Kontakt i Lokacija - New Fitems',
      mainEntity: {
        '@type': 'SportsActivityLocation',
        name: 'NEW FITEMS Nova Pazova',
        telephone: '+381692707833',
        email: 'newfitems.novapazova@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Kralja Petra I Karađorđevića 87',
          addressLocality: 'Nova Pazova',
          postalCode: '22330',
          addressCountry: 'RS',
        },
      },
    },
  },
};

/**
 * Route mapping for clean URLs
 */
export const ROUTE_TO_PAGE: Record<string, PageId> = {
  '/': 'home',
  '/pocetna': 'home',
  '/home': 'home',
  '/koncept': 'concept',
  '/brend-koncept': 'concept',
  '/concept': 'concept',
  '/usluge': 'services',
  '/sprave': 'services',
  '/trening': 'services',
  '/services': 'services',
  '/iskustva': 'stories',
  '/transformacije': 'stories',
  '/rezultati': 'stories',
  '/stories': 'stories',
  '/cenovnik': 'pricing',
  '/cene': 'pricing',
  '/pricing': 'pricing',
  '/kontakt': 'contact',
  '/lokacija': 'contact',
  '/contact': 'contact',
};

export const PAGE_TO_ROUTE: Record<PageId, string> = {
  home: '/',
  concept: '/koncept',
  services: '/usluge',
  stories: '/iskustva',
  pricing: '/cenovnik',
  contact: '/kontakt',
};

/**
 * Helper to dynamically update the document <head> when navigating
 */
export function updateDocumentSEO(pageId: PageId): void {
  const seo = PAGE_SEO_DATA[pageId] || PAGE_SEO_DATA.home;

  // 1. Update Title
  document.title = seo.title;

  // 2. Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', seo.description);

  // 3. Update Meta Keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', seo.keywords);

  // 4. Update Canonical Link
  const fullCanonicalUrl = `${BASE_URL}${seo.path}`;
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', fullCanonicalUrl);

  // 5. Update OpenGraph Tags
  const updateMetaProperty = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  updateMetaProperty('og:title', seo.title);
  updateMetaProperty('og:description', seo.description);
  updateMetaProperty('og:url', fullCanonicalUrl);
  updateMetaProperty('og:image', seo.ogImage);

  // 6. Update Twitter Tags
  const updateMetaName = (name: string, content: string) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  updateMetaName('twitter:title', seo.title);
  updateMetaName('twitter:description', seo.description);
  updateMetaName('twitter:image', seo.ogImage);

  // 7. Inject / Update Page-Specific Schema.org JSON-LD
  let scriptSchema = document.getElementById('schema-page-specific');
  if (!scriptSchema) {
    scriptSchema = document.createElement('script');
    scriptSchema.id = 'schema-page-specific';
    scriptSchema.setAttribute('type', 'application/ld+json');
    document.head.appendChild(scriptSchema);
  }
  scriptSchema.textContent = JSON.stringify(seo.schema, null, 2);
}
