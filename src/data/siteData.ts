export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  duration: string;
  benefits: string[];
  forWho: string;
  image?: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'ems-trening',
    title: 'EMS Vođeni Trening',
    subtitle: 'Maksimalna mišićna stimulacija u 30\u00A0minuta',
    tag: '30\u00A0MINUTA · 1-NA-1',
    image: 'https://64.media.tumblr.com/7069e0c06abed0c8c0a2143be18db975/6de5ed117d7b0ed3-63/s2048x3072/80c53ff40bb4ff137cee2c243f9ff17ee20a993d.jpg',
    description: 'Vežbanje u specijalnim odelima sa elektrodama koje šalju kontrolisane impulse direktno u mišićna vlakna. Tokom 30\u00A0minuta aktivira se preko 90% muskulature istovremeno, bez opterećenja za zglobove i kičmu.',
    duration: '30\u00A0min po terminu',
    benefits: [
      'Aktivacija dubokih mišićnih slojeva',
      'Ubrzanje metabolizma i sagorevanje kalorija',
      'Trener je 100% posvećen tebi tokom čitavog treninga',
      'Idealno za zauzete ljude koji nemaju sate za klasičnu teretanu'
    ],
    forWho: 'Za žene i muškarce koji žele maksimalan efekat za minimalno vreme.'
  },
  {
    id: 'vakum-sprava',
    title: 'Vakum Sprava sa IR Svetlima',
    subtitle: 'Napredna tehnologija za cirkulaciju i tonus',
    tag: 'INFRACRVENA TEHNOLOGIJA',
    image: 'https://64.media.tumblr.com/5677d53408918f07d4e93d302f5dbb3e/6de5ed117d7b0ed3-27/s2048x3072/ae385b6e1cab2f976ef431bda945fc28fa2ef42a.jpg',
    description: 'Kombinacija blagog kardio pokreta u vakum kapsuli sa infracrvenim svetlima. Vakum stvara negativan pritisak koji drastično pojačava mikrocirkulaciju u kritičnim zonama (stomak, bokovi, butine), dok IR svetla zagrevaju tkivo i podstiču eliminaciju viška tečnosti.',
    duration: '30\u00A0min po terminu',
    benefits: [
      'Topljenje upornih masnih naslaga',
      'Efikasna limfna drenaža i smanjenje otoka',
      'Poboljšanje elastičnosti kože',
      'Manji osećaj težine u nogama'
    ],
    forWho: 'Za sve koji žele brzo oblikovanje figure i oslobađanje od zadržane vode.'
  },
  {
    id: 'madero-roler',
    title: 'Madero Roler Terapija',
    subtitle: 'Mehanička masaža za relaksaciju i zatezanje',
    tag: 'ANTICELULIT & OPORAVAK',
    image: 'https://64.media.tumblr.com/a8003352326c3c01d244dccc74ced654/6de5ed117d7b0ed3-5e/s2048x3072/ef2517e1d45fa6ef6c8c29d5c7461f398dd721a9.jpg',
    description: 'Specijalno dizajnirani anatomski drveni roleri koji podstiču cirkulaciju, razbijaju celulit i opuštaju zategnute mišiće nakon treninga. Telo dobija definisaniji izgled, a koža postaje primetno zategnuta i glatka.',
    duration: '20–30\u00A0min',
    benefits: [
      'Ubrzano izbacivanje toksina kroz limfu',
      'Prirodno peglanje i učvršćivanje kože',
      'Smanjenje upale i relaksacija mišića',
      'Savršen dodatak uz EMS i Vakum treninge'
    ],
    forWho: 'Za klijentkinje i klijente koji žele zategnutu kožu i ubrzan oporavak.'
  },
  {
    id: 'ishrana-plan',
    title: 'Plan Ishrane i Savetovanje',
    subtitle: 'Održive navike prilagođene tvom tempu',
    tag: 'INDIVIDUALNO',
    description: 'Bez rigoroznih dijeta, bez keta i bez izgladnjivanja. Kreiramo jednostavne smernice i obroke koje lako uklapaš u porodični život, posao i svakodnevne obaveze.',
    duration: 'Kontinuirano praćenje',
    benefits: [
      'Dostupne namirnice iz svake prodavnice',
      'Brza priprema obroka (15-20 min)',
      'Održivi rezultati bez jo-jo efekta',
      'Direktna podrška trenera za sve nedoumice'
    ],
    forWho: 'Za svakoga ko želi zdrave promene bez stresa.'
  }
];

export const CLIENT_STORIES = [
  {
    name: 'Jovana',
    city: 'Nova Pazova',
    result: '−5 kg i −15 cm u struku',
    quote: 'Za mesec dana — 5 kg manje i 15 cm u obimu struka. Zahvalna sam Vuku i Lazaru što su uvek bili tu za mene sa mojim radnim vremenom. Da nije bilo njihove podrške, teško bih ovo postigla.',
    tag: 'EMS + Ishrana',
    avatar: 'JO'
  },
  {
    name: 'Milica',
    city: 'Stara Pazova',
    result: '−9 kg i osećaj lakoće',
    quote: 'Izgubila sam 9 kg i obimi su se smanjili. Moj posao je vezan za sedenje — uz treninge na spravama izbacila sam tečnost koja se zadržavala u donjem delu tela. Preporuka za New Fitems!',
    tag: 'Vakum + EMS',
    avatar: 'MI'
  },
  {
    name: 'Marija',
    city: 'Nova Pazova',
    result: 'Zategnuto telo za 1.5 mesec',
    quote: 'Prezadovoljna sam treninzima i atmosferom. Nisam očekivala ovakve rezultate za samo mesec i po dana. Telo je zategnuto, kondicija bolja, mišići definisaniji. Vuk i Lazar su sjajan tim!',
    tag: 'EMS + Madero',
    avatar: 'MA'
  },
  {
    name: 'Tamara',
    city: 'Batajnica',
    result: '3 meseca u kontinuitetu',
    quote: 'Osećam se energičnije, manja nadutost, razliku primećujem i ja i okolina. Tri meseca bez preskočenog treninga — atmosfera u studiju je prijatna i trener je posvećen svakom vežbaču.',
    tag: 'Kondicija & Energija',
    avatar: 'TA'
  },
  {
    name: 'Sandra',
    city: 'Nova Pazova',
    result: 'Sa 96.7 kg na 90 kg',
    quote: 'Ja sam osoba koja nikad nije volela klasičnu teretanu — ali u ovom studiju mi je trening pravo uživanje. Sa 96.7 kg došli smo do 90 kg i nastavljamo dalje sa osmehom!',
    tag: 'Transformacija',
    avatar: 'SA'
  },
  {
    name: 'Dragana',
    city: 'Nova Pazova',
    result: 'Čak do −16 cm u obimima',
    quote: 'Veoma sam zadovoljna treninzima i rezultatima. Obim se smanjio čak do 16 cm na pojedinim delovima tela. Treneri su izuzetno komunikativni i posvećeni. Sve preporuke!',
    tag: 'Madero + Vakum',
    avatar: 'DR'
  }
];

export interface BlackFridayStep {
  step: string;
  id: string;
  title: string;
  duration: string;
  subtitle: string;
  description: string;
  visualNote: string;
  image: string;
}

export const BLACK_FRIDAY_STEPS: BlackFridayStep[] = [
  {
    step: '01',
    id: 'vakum-trening',
    title: 'Vakuum trening',
    duration: '30 minuta',
    subtitle: 'Hod u vakuum kapsuli · Infracrvena svetla',
    description:
      'Lagan hod u vakuum kapsuli uz infracrvena svetla. Tempo je prilagođen tebi, bez trčanja i bez iscrpljivanja.',
    visualNote: 'Donji deo tela je u zatvorenoj kapsuli na traci za lagani hod dok IR svetla zagrevaju kritične zone.',
    image:
      'https://64.media.tumblr.com/5677d53408918f07d4e93d302f5dbb3e/6de5ed117d7b0ed3-27/s2048x3072/ae385b6e1cab2f976ef431bda945fc28fa2ef42a.jpg',
  },
  {
    step: '02',
    id: 'madero-roller',
    title: 'Madero roller',
    duration: '15 minuta',
    subtitle: 'Mehanička masaža drvenim valjcima',
    description:
      'Masaža roller aparatom koja opušta telo i doprinosi glađem izgledu kože.',
    visualNote: 'Rotirajući anatomski drveni roleri prelaze preko nogu, bokova i stomaka uz prijatan oporavak.',
    image:
      'https://64.media.tumblr.com/a8003352326c3c01d244dccc74ced654/6de5ed117d7b0ed3-5e/s2048x3072/ef2517e1d45fa6ef6c8c29d5c7461f398dd721a9.jpg',
  },
  {
    step: '03',
    id: 'ems-tretman',
    title: 'EMS tretman',
    duration: '30 minuta',
    subtitle: 'Ležiš dok aparat pokreće tvoje mišiće',
    description:
      'Ti ležiš, a aparat pokreće tvoje mišiće. Biraš zonu na kojoj želiš da radiš: stomak, zadnjicu ili butine.',
    visualNote: 'Udobno ležiš dok kontrolisani bioelektrični impulsi ciljano kontrahuju izabranu grupu mišića.',
    image:
      'https://64.media.tumblr.com/7069e0c06abed0c8c0a2143be18db975/6de5ed117d7b0ed3-63/s2048x3072/80c53ff40bb4ff137cee2c243f9ff17ee20a993d.jpg',
  },
];

export const BLACK_FRIDAY_FAQ = [
  {
    question: 'Da li je Black Friday cena trajna?',
    answer:
      'Ne. 11.900 din važi samo za one koji počnu do 30. novembra. Posle toga paket se vraća na redovnu cenu od 14.000 din.',
  },
  {
    question: 'Nikad nisam trenirala. Da li je ovo za mene?',
    answer:
      'Da. Ne treba ti nikakvo predznanje ni kondicija, jer program prilagođavamo tvom nivou i trener je uz tebe sve vreme.',
  },
  {
    question: 'Da li EMS tretman boli?',
    answer:
      'Ne. Osećaš jake kontrakcije mišića, a intenzitet podešavamo zajedno sa tobom. Narednog dana možeš da osetiš blagu upalu mišića, kao posle dobrog treninga.',
  },
  {
    question: 'Do kada moram da počnem?',
    answer:
      'Najkasnije do 30. novembra. Što se ranije prijaviš, lakše biraš termin koji ti odgovara.',
  },
  {
    question: 'Šta da ponesem?',
    answer:
      'Udobnu odeću za vežbanje, patike i flašicu vode. Sve ostalo je spremno.',
  },
  {
    question: 'Da li je tretman za svakoga?',
    answer:
      'EMS tretman se ne radi u trudnoći i kod osoba sa pejsmejkerom ili metalnim implantima. Ako nisi sigurna, slobodno nas pitaj kad te pozovemo.',
  },
  {
    question: 'Šta se dešava kad pošaljem prijavu?',
    answer:
      'Pozovemo te u roku od 24 sata, upoznamo se, odgovorimo na sva pitanja i zajedno izaberemo termine.',
  },
];

export const DEFAULT_BOOKING_SERVICE = '3u1 Paket (Black Friday · 11.900 din)';

export const BOOKING_SERVICE_OPTIONS = [
  {
    value: '3u1 Paket (Black Friday · 11.900 din)',
    label: '3u1 Paket — Black Friday (11.900 din / mesečno)',
  },
  {
    value: 'Vakuum trening · 30 min',
    label: 'Vakuum trening (30 min)',
  },
  {
    value: 'Madero roller · 15 min',
    label: 'Madero roller masaža (15 min)',
  },
  {
    value: 'EMS tretman · 30 min',
    label: 'EMS tretman (30 min, zona po izboru)',
  },
  {
    value: 'Uvodne konsultacije',
    label: 'Uvodne konsultacije i upoznavanje sa studijom',
  },
];

export const PRICING_PACKAGES = [
  {
    id: '3u1-black-friday',
    name: '3u1 paket',
    badge: 'BLACK FRIDAY −15%',
    regularPrice: '14.000',
    price: '11.900',
    savings: '2.100 din',
    currency: 'din',
    period: 'mesečno (8 dolazaka mesečno)',
    deadlineNote: 'Black Friday popust važi za sve koji počnu najkasnije do 30. novembra.',
    description:
      'Vakuum trening, madero roller i EMS tretman u jednom dolasku od 75 minuta, dva puta nedeljno — sa trenerom uz tebe sve vreme.',
    features: [
      'Vakuum trening · 30 min',
      'Madero roller · 15 min',
      'EMS tretman · 30 min, zona po izboru',
      '2 dolaska nedeljno (8 dolazaka mesečno)',
      'Trener uz tebe tokom celog dolaska',
    ],
    popular: true,
  },
];

export interface InstagramReel {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  reelUrl: string;
  embedUrl: string;
}

export const INSTAGRAM_REELS: InstagramReel[] = [
  {
    id: 'DcjJEo5MyVZ',
    title: 'Maja se uz EMS trening oblikovala i zategla',
    category: 'Rezultati',
    description: 'Transformacija i oblikovanje tela uz redovan EMS trening i posvećenost.',
    thumbnailUrl: 'https://64.media.tumblr.com/6e27de2f07b37cfe011d325154049224/dba7d392ad2d996a-9e/s640x960/e642b6c2d8a891033edd20a4e84ef4d2d8f56c6d.pnj',
    reelUrl: 'https://www.instagram.com/reel/DcjJEo5MyVZ/',
    embedUrl: 'https://www.instagram.com/reel/DcjJEo5MyVZ/embed/'
  },
  {
    id: 'DMfndpJtsF4',
    title: 'Ovo sam ja danas!',
    category: 'Rezultati',
    description: 'Vidljiva promena, nova energija i ponos na postignute rezultate.',
    thumbnailUrl: 'https://64.media.tumblr.com/532ced768cb51e5b3f8288d340421bda/dba7d392ad2d996a-bc/s640x960/3a9dcabee27eeada1fdf8cf3a33fcad740b9e723.pnj',
    reelUrl: 'https://www.instagram.com/reel/DMfndpJtsF4/',
    embedUrl: 'https://www.instagram.com/reel/DMfndpJtsF4/embed/'
  },
  {
    id: 'DZaUtZwsrFk',
    title: 'Izgubila sam 7 kilograma!',
    category: 'Rezultati',
    description: 'Konkretan gubitak 7 kg uz 30-minutne vođene treninge i plan ishrane.',
    thumbnailUrl: 'https://64.media.tumblr.com/f2b59aac60b99375b9ea9b8cc001f002/dba7d392ad2d996a-e9/s640x960/a42a6286ab9b2f42dd229a0e0eaeacccfda1e52d.pnj',
    reelUrl: 'https://www.instagram.com/reel/DZaUtZwsrFk/',
    embedUrl: 'https://www.instagram.com/reel/DZaUtZwsrFk/embed/'
  },
  {
    id: 'DYAPfADM3c1',
    title: 'Od kad sam krenula osećam se mnogo bolje',
    category: 'Rezultati',
    description: 'Više energije u toku dana, manje napetosti u leđima i osećaj lakoće.',
    thumbnailUrl: 'https://64.media.tumblr.com/36d6a6223d04a385c144183f667a1e47/dba7d392ad2d996a-00/s640x960/0bd19537ca4b58f7385c622efb5c180e85ba236d.pnj',
    reelUrl: 'https://www.instagram.com/reel/DYAPfADM3c1/',
    embedUrl: 'https://www.instagram.com/reel/DYAPfADM3c1/embed/'
  },
  {
    id: 'DTx1kDcDJvO',
    title: 'Smršala sam 5kg uz 2 sata nedeljno',
    category: 'Rezultati',
    description: 'Maksimalna efikasnost za zauzete dame koje imaju samo 2 sata nedeljno.',
    thumbnailUrl: 'https://64.media.tumblr.com/21a54cc581b6a2b3c0d021484b8c2cd7/dba7d392ad2d996a-61/s640x960/b1436df5533de2de12dfc89eec539e0024748f05.pnj',
    reelUrl: 'https://www.instagram.com/reel/DTx1kDcDJvO/',
    embedUrl: 'https://www.instagram.com/reel/DTx1kDcDJvO/embed/'
  },
  {
    id: 'DXmrViGDBgD',
    title: 'Kratka poruka za sve mame',
    category: 'Rezultati',
    description: 'Iskrena poruka podrške za sve mame koje žele da povrate svoju formu.',
    thumbnailUrl: 'https://64.media.tumblr.com/b5af191c2b25b434b60ad04f368e40c6/dba7d392ad2d996a-ec/s640x960/a068a0ff139ad0e2736c00085ff327ba3daa1948.pnj',
    reelUrl: 'https://www.instagram.com/reel/DXmrViGDBgD/',
    embedUrl: 'https://www.instagram.com/reel/DXmrViGDBgD/embed/'
  }
];

export const INSTAGRAM_HIGHLIGHTS = [
  { title: 'Trening', label: 'Kako izgleda EMS', color: '#CFF3CF' },
  { title: 'Iskustva', label: 'Stvarni rezultati', color: '#FAF3EB' },
  { title: 'Usluge', label: 'Sprave & oprema', color: '#838487' },
  { title: 'Saveti', label: 'Hidratacija & ishrana', color: '#CFF3CF' },
  { title: 'Studio', label: 'Ambijent', color: '#FAF3EB' }
];

export const CONTACT_INFO = {
  phone: "0692707833",
  phoneDisplay: "069 270 7833",
  phoneIntl: "+381692707833",
  email: "newfitems.novapazova@gmail.com",
  address: "Kralja Petra I Karađorđevića 87, Nova Pazova",
  mapsUrl: "https://maps.app.goo.gl/NTVj2zU3F6yqZHwq7",
  instagramUrl: "https://www.instagram.com/newfitems.novapazova/",
  facebookUrl: "https://www.facebook.com/newfitemsstudio/?locale=sr_RS",
  tiktokUrl: "https://www.tiktok.com/@new.fitems",
};
