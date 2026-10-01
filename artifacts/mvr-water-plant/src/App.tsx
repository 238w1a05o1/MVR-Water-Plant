import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import tankPhoto from '@assets/r2_1790871832977.jpeg';
import plantVehiclePhoto from '@assets/r1_1790871845200.jpeg';
import vinayakaGreeting from '@assets/r3_1790872258308.jpeg';
import ugadiGreeting from '@assets/r4_1790872264353.jpeg';
import republicDayGreeting from '@assets/r6_1790872271131.jpeg';
import plantTeamPhoto from '@assets/IMG_20251230_165220_1790872329456.jpg';
import NotFound from '@/pages/not-found';
import {
  ArrowDown,
  ArrowUpRight,
  Clock3,
  Droplets,
  MapPin,
  Navigation,
  Phone,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();
const mapUrl =
  'https://www.google.com/maps/dir/?api=1&destination=PQF8%2B77%20Botlapalem%2C%20Potha%20Kamuru%2C%20Andhra%20Pradesh';
const reviewSearchUrl =
  'https://www.google.com/maps/search/?api=1&query=MVR%20Water%20Plant%20Botlapalem';
const contactNumbers = ['8978269778', '8885328976', '8978426527'] as const;

type Language = 'te' | 'en';

const copy = {
  te: {
    pageTitle: 'MVR వాటర్ ప్లాంట్ | బొట్లపాలెం',
    description:
      'బొట్లపాలెంలోని MVR వాటర్ ప్లాంట్ చిరునామా, స్థానిక సమీక్షలు, సందర్శన వివరాలు మరియు Google Maps దారి తెలుసుకోండి.',
    tagline: 'మంచి రుచిగల నీటికి స్థానిక చిరునామా',
    languageSwitch: 'భాష ఎంచుకోండి',
    mainNavigation: 'ప్రధాన నావిగేషన్',
    glanceLabel: 'MVR వాటర్ ప్లాంట్ వివరాలు',
    ratingLabel: '5కి 5 నక్షత్రాలు',
    brandCategory: 'నీటి శుద్ధి కేంద్రం',
    aboutNav: 'మా గురించి',
    reviewsNav: 'సమీక్షలు',
    locationNav: 'మమ్మల్ని చేరుకోండి',
    photosNav: 'ఫొటోలు',
    directions: 'దారి చూడండి',
    locationEyebrow: 'బొట్లపాలెం · పోత కమూరు',
    heroTitleFirst: 'మంచి నీరు,',
    heroTitleAccent: 'మన ఇంటి రుచి.',
    heroCopy:
      'బొట్లపాలెం పరిసరాల్లో మంచి రుచి, నాణ్యతతో గుర్తింపు పొందిన స్థానిక నీటి శుద్ధి కేంద్రం. ఇక్కడికి వస్తే యజమానుల ఆప్యాయత కూడా మీకు తెలుస్తుంది.',
    comeVisit: 'మమ్మల్ని సందర్శించండి',
    localReviews: 'స్థానికుల సమీక్షలు',
    ratingDescription: 'Google సమీక్షల్లో',
    placeLabel: 'ఇక్కడే ఉంది',
    reviewCount: '4 సమీక్షలు',
    stateAndPostal: 'ఆంధ్రప్రదేశ్ · 523252',
    aboutIndex: '01 / మా గురించి',
    aboutHeading: 'మంచి నీరు మన ఊరి విషయం.',
    aboutFirst:
      'బొట్లపాలెం, పోత కమూరు ప్రాంత ప్రజలకు సేవలందిస్తున్న స్థానిక నీటి శుద్ధి కేంద్రం MVR Water Plant. మంచి నీటికి మంచి రుచి ఉండాలి; ఇక్కడికి రావడమూ సులభంగా ఉండాలి.',
    aboutSecond:
      'ఇక్కడి నీటి రుచి, నాణ్యత, యజమానుల ఆప్యాయత గురించి స్థానికులు తమ సమీక్షల్లో పంచుకున్నారు.',
    pullQuote: '“తియ్యని రుచి గల నీరు, ఆప్యాయమైన యజమానులు.”',
    photosIndex: '02 / మా ప్రదేశం',
    photosHeading: 'MVR వాటర్ ప్లాంట్ చిత్రాలు',
    tankPhotoAlt: 'నీటి ట్యాంక్‌తో ఉన్న వాహనం',
    tankPhotoCaption: 'ట్యాంక్‌తో కూడిన నీటి వాహనం',
    vehiclePhotoAlt: 'బొట్లపాలెంలోని భవనం ముందు నిలిపిన పసుపు రంగు వాహనం',
    vehiclePhotoCaption: 'బొట్లపాలెం ప్లాంట్ పరిసరాల్లో',
    vinayakaPhotoAlt: 'MVR వాటర్ ప్లాంట్ బృందంతో వినాయక చవితి శుభాకాంక్షల పోస్టర్',
    vinayakaPhotoCaption: 'వినాయక చవితి శుభాకాంక్షలు',
    ugadiPhotoAlt: 'MVR వాటర్ ప్లాంట్ ఉగాది శుభాకాంక్షల పోస్టర్',
    ugadiPhotoCaption: 'ఉగాది శుభాకాంక్షలు',
    republicDayPhotoAlt: 'MVR వాటర్ ప్లాంట్ రిపబ్లిక్ డే శుభాకాంక్షల పోస్టర్',
    republicDayPhotoCaption: 'గణతంత్ర దినోత్సవ శుభాకాంక్షలు',
    teamPhotoAlt: 'MVR వాటర్ ప్లాంట్ బృంద సభ్యులతో రూపొందించిన పోస్టర్',
    teamPhotoCaption: 'MVR వాటర్ ప్లాంట్ బృందం',
    reviewsIndex: '03 / స్థానికుల మాటల్లో',
    reviewsHeadingFirst: 'మంచి మాట',
    reviewsHeadingSecond: 'దూరం వెళ్తుంది.',
    googleRating: 'Google రేటింగ్',
    reviewAkhil: '“నీరు బాగుంది, రుచి బాగుంది, నాణ్యత బాగుంది, యజమానులు కూడా మంచివారు.”',
    reviewNiranjan: '“ఈ ప్రాంతంలోనే అత్యుత్తమ నాణ్యత గల వాటర్ ప్లాంట్.”',
    reviewAnand: '“తియ్యని రుచి గల నీరు, ఆప్యాయమైన యజమానులు.”',
    reviewTranslation:
      'సమీక్షల అసలు వాక్యాలు ఆంగ్లంలో ఉన్నాయి; ఇక్కడ తెలుగులోకి అనువదించాం.',
    allReviews: 'Google లోని 4 సమీక్షలు చూడండి',
    visitIndex: '04 / సందర్శించండి',
    visitHeadingFirst: 'చేరుకోవడం సులభం.',
    visitHeadingSecond: 'పలకరించడమూ సులభం.',
    visitCopy:
      'MVR Water Plant బొట్లపాలెంలో ఉంది; పోత కమూరు ప్రాంత ప్రజలకు సేవలందిస్తుంది. మీ ప్రయాణాన్ని ప్లాన్ చేసుకోవడానికి మ్యాప్‌లో దారి చూడండి.',
    addressTitle: 'బొట్లపాలెం, పోత కమూరు',
    contactHeading: 'ఫోన్ ద్వారా సంప్రదించండి',
    plusCode: 'Google Maps ప్లస్ కోడ్',
    hoursNote:
      'జాబితాలో ఉన్న సమయం: శుక్రవారం ఉదయం 5:30కి తెరుస్తుంది. ఇతర సమయాలు ఇవ్వలేదు.',
    openDirections: 'దారి తెరవండి',
    viewListing: 'Google Maps వివరాలు',
    mapLinkLabel: 'Google Maps లో MVR Water Plant దారి చూడండి',
    mapPlantName: 'MVR వాటర్ ప్లాంట్',
    mapArea: 'బొట్లపాలెం · ఆంధ్రప్రదేశ్',
    footerDescription:
      'ఆంధ్రప్రదేశ్‌లోని బొట్లపాలెంలో స్థానిక నీటి శుద్ధి కేంద్రం.',
    footerTagline: 'మంచి నీరు, మన ఇంటి దగ్గరే.',
    illustrationLabel: 'నీటి పాత్రను చూపించే MVR వాటర్ ప్లాంట్ చిత్రణ',
  },
  en: {
    pageTitle: 'MVR Water Plant | Botlapalem Water Treatment Plant',
    description:
      'MVR Water Plant is a local water treatment plant in Botlapalem, Andhra Pradesh. Find the address, customer reviews and Google Maps directions for your visit.',
    tagline: 'A local name for good-tasting water',
    languageSwitch: 'Choose language',
    mainNavigation: 'Main navigation',
    glanceLabel: 'MVR Water Plant at a glance',
    ratingLabel: '5 out of 5 stars',
    brandCategory: 'Water treatment plant',
    aboutNav: 'Our place',
    reviewsNav: 'Kind words',
    locationNav: 'Find us',
    photosNav: 'Photos',
    directions: 'Get directions',
    locationEyebrow: 'Botlapalem · Potha Kamuru',
    heroTitleFirst: 'Water that',
    heroTitleAccent: 'tastes like home.',
    heroCopy:
      'A familiar local water plant, known around Botlapalem for good-tasting water, quality you can count on, and owners who make you feel welcome.',
    comeVisit: 'Come find us',
    localReviews: 'Read local reviews',
    ratingDescription: 'from 4 Google reviews',
    placeLabel: 'Right here in',
    reviewCount: '4 reviews',
    stateAndPostal: 'Andhra Pradesh · 523252',
    aboutIndex: '01 / A little about us',
    aboutHeading: 'Good water is a neighbourhood thing.',
    aboutFirst:
      'MVR Water Plant is a local water treatment plant serving Botlapalem and the Potha Kamuru area. A good glass of water should taste right—and a visit should feel easy.',
    aboutSecond:
      'People nearby mention the water, its quality, and the owners’ warm welcome in their reviews.',
    pullQuote: '“Tasty sweet water, sweet owners.”',
    photosIndex: '02 / Around the plant',
    photosHeading: 'A look around MVR',
    tankPhotoAlt: 'A vehicle carrying a large water tank',
    tankPhotoCaption: 'A water tank on a vehicle',
    vehiclePhotoAlt: 'A yellow vehicle parked beside a building in Botlapalem',
    vehiclePhotoCaption: 'Around the plant in Botlapalem',
    vinayakaPhotoAlt: 'A Vinayaka Chavithi greeting poster from MVR Water Plant featuring team members',
    vinayakaPhotoCaption: 'Vinayaka Chavithi wishes',
    ugadiPhotoAlt: 'An Ugadi greeting poster from MVR Water Plant',
    ugadiPhotoCaption: 'Ugadi wishes',
    republicDayPhotoAlt: 'A Republic Day greeting poster from MVR Water Plant',
    republicDayPhotoCaption: 'Republic Day wishes',
    teamPhotoAlt: 'An MVR Water Plant poster featuring team members',
    teamPhotoCaption: 'The MVR Water Plant team',
    reviewsIndex: '03 / Neighbour notes',
    reviewsHeadingFirst: 'Word travels',
    reviewsHeadingSecond: 'by water.',
    googleRating: 'Google rating',
    reviewAkhil: '“Nice water, tasty tasty, nice quality, nice owners”',
    reviewNiranjan: '“Best quality water plant in this area”',
    reviewAnand: '“Tasty sweet water, sweet owners”',
    reviewTranslation: 'Original reviews shown in English.',
    allReviews: 'Read all 4 Google reviews',
    visitIndex: '04 / Drop by',
    visitHeadingFirst: 'Easy to find.',
    visitHeadingSecond: 'Easy to say hello.',
    visitCopy:
      'MVR Water Plant is in Botlapalem, serving the Potha Kamuru area. Use the map directions to plan your visit.',
    addressTitle: 'Botlapalem, Potha Kamuru',
    contactHeading: 'Phone',
    plusCode: 'Google Maps Plus Code',
    hoursNote: 'Listing detail: opens 5:30 AM Friday. Other hours not listed.',
    openDirections: 'Open directions',
    viewListing: 'View Google listing',
    mapLinkLabel: 'Open directions to MVR Water Plant in Google Maps',
    mapPlantName: 'MVR Water Plant',
    mapArea: 'Botlapalem · Andhra Pradesh',
    footerDescription:
      'A local water treatment plant in Botlapalem, Andhra Pradesh.',
    footerTagline: 'Good water, close to home.',
    illustrationLabel: 'An illustration of a water jar for MVR Water Plant',
  },
} as const;

function Brand({ language }: { language: Language }) {
  return (
    <span className="brand-inner">
      <span className="brand-mark">
        <Droplets size={21} strokeWidth={1.7} />
      </span>
      <span>
        <span className="brand-name">MVR Water Plant</span>
        <span className="brand-meta">{copy[language].brandCategory}</span>
      </span>
    </span>
  );
}

function Home() {
  const [language, setLanguage] = useState<Language>('te');
  const text = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = text.pageTitle;

    const metaContent: Array<[string, string]> = [
      ['meta[name="description"]', text.description],
      ['meta[property="og:title"]', text.pageTitle],
      ['meta[property="og:description"]', text.description],
      ['meta[name="twitter:title"]', text.pageTitle],
      ['meta[name="twitter:description"]', text.description],
    ];

    for (const [selector, content] of metaContent) {
      document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
    }
  }, [language, text.description, text.pageTitle]);

  const reviews = [
    { name: 'Akhil yenikepalli', initial: 'A', quote: text.reviewAkhil },
    { name: 'Niranjan Vadala', initial: 'N', quote: text.reviewNiranjan },
    { name: 'Anand Jujjavarapu', initial: 'A', quote: text.reviewAnand },
  ];
  const galleryPhotos = [
    {
      src: tankPhoto,
      alt: text.tankPhotoAlt,
      caption: text.tankPhotoCaption,
      width: 1200,
      height: 1600,
    },
    {
      src: plantVehiclePhoto,
      alt: text.vehiclePhotoAlt,
      caption: text.vehiclePhotoCaption,
      width: 1600,
      height: 720,
    },
    {
      src: vinayakaGreeting,
      alt: text.vinayakaPhotoAlt,
      caption: text.vinayakaPhotoCaption,
      width: 1254,
      height: 1254,
    },
    {
      src: ugadiGreeting,
      alt: text.ugadiPhotoAlt,
      caption: text.ugadiPhotoCaption,
      width: 1024,
      height: 1024,
    },
    {
      src: republicDayGreeting,
      alt: text.republicDayPhotoAlt,
      caption: text.republicDayPhotoCaption,
      width: 768,
      height: 1376,
    },
    {
      src: plantTeamPhoto,
      alt: text.teamPhotoAlt,
      caption: text.teamPhotoCaption,
      width: 1208,
      height: 648,
    },
  ];

  return (
    <main className="site-shell" data-language={language}>
      <div className="topline">
        <span className="topline-message">
          <i /> {text.tagline} <i />
        </span>
        <div className="language-switch" role="group" aria-label={text.languageSwitch}>
          <button
            type="button"
            className={language === 'te' ? 'active' : ''}
            aria-pressed={language === 'te'}
            onClick={() => setLanguage('te')}
          >
            తెలుగు
          </button>
          <button
            type="button"
            className={language === 'en' ? 'active' : ''}
            aria-pressed={language === 'en'}
            onClick={() => setLanguage('en')}
          >
            English
          </button>
        </div>
      </div>
      <header className="nav-wrap">
        <nav className="nav" aria-label={text.mainNavigation}>
          <a href="#top" className="brand" data-testid="link-home">
            <Brand language={language} />
          </a>
          <div className="nav-links">
            <a href="#our-place">{text.aboutNav}</a>
            <a href="#photos">{text.photosNav}</a>
            <a href="#reviews">{text.reviewsNav}</a>
            <a href="#visit">{text.locationNav}</a>
            <a
              className="nav-cta"
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="link-directions-top"
            >
              {text.directions} <ArrowUpRight size={14} />
            </a>
          </div>
        </nav>
      </header>
      <section className="hero" id="top">
        <div className="hero-content">
          <div className="eyebrow reveal">{text.locationEyebrow}</div>
          <h1 className="reveal reveal-delay">
            {text.heroTitleFirst}
            <br />
            <em>{text.heroTitleAccent}</em>
          </h1>
          <p className="hero-copy reveal reveal-delay-2">{text.heroCopy}</p>
          <div className="hero-actions reveal reveal-delay-2">
            <a className="button-primary" href="#visit">
              {text.comeVisit} <ArrowDown size={15} />
            </a>
            <a className="text-link" href="#reviews">
              {text.localReviews} <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="rating-line">
            <span className="stars" aria-label={text.ratingLabel}>
              ★★★★★
            </span>
            <strong>5.0</strong>
            <span>{text.ratingDescription}</span>
          </div>
        </div>
        <div className="hero-art" role="img" aria-label={text.illustrationLabel}>
          <div className="sun-disc" />
          <div className="waterline" />
          <div className="waterline two" />
          <div className="waterline three" />
          <div className="jar">
            <div className="jar-shine" />
          </div>
          <div className="jar-label">
            <b>MVR</b>
            <span>{language === 'te' ? 'మన ఇంటి దగ్గరే నీరు' : 'Water, close to home'}</span>
          </div>
          <div className="floating-note">
            {language === 'te' ? (
              <>
                మంచి నీరు.
                <br />
                మంచి మనుషులు.
              </>
            ) : (
              <>
                Good water.
                <br />
                Good people.
              </>
            )}
            <small>{language === 'te' ? 'బొట్లపాలెం ప్రజల కోసం' : 'Botlapalem local'}</small>
          </div>
        </div>
      </section>
      <section className="local-strip" aria-label={text.glanceLabel}>
        <div className="local-strip-inner">
          <div>
            <div className="strip-label">{text.placeLabel}</div>
            <div className="strip-location">
              <MapPin size={17} /> {language === 'te' ? 'బొట్లపాలెం' : 'Botlapalem'}
            </div>
          </div>
          <div className="strip-rating">
            <span className="stars">★★★★★</span>
            <strong>5.0</strong>
            <span>· {text.reviewCount}</span>
          </div>
          <div className="strip-label">{text.stateAndPostal}</div>
        </div>
      </section>
      <section className="section story" id="our-place">
        <div>
          <div className="section-index">{text.aboutIndex}</div>
          <h2>{text.aboutHeading}</h2>
        </div>
        <div className="story-copy">
          <p>{text.aboutFirst}</p>
          <p>{text.aboutSecond}</p>
          <div className="story-pull">{text.pullQuote}</div>
        </div>
      </section>
      <section className="photo-showcase" id="photos">
        <div className="section">
          <div className="photo-showcase-heading">
            <div className="section-index">{text.photosIndex}</div>
            <h2>{text.photosHeading}</h2>
          </div>
          <div className="photo-grid">
            {galleryPhotos.map((photo) => (
              <figure className="photo-card" key={photo.src}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="reviews" id="reviews">
        <div className="section">
          <div className="reviews-top">
            <div>
              <div className="section-index">{text.reviewsIndex}</div>
              <h2>
                {text.reviewsHeadingFirst}
                <br />
                {text.reviewsHeadingSecond}
              </h2>
            </div>
            <div className="review-score">
              <strong>5.0</strong>
              <div>
                <div className="stars">★★★★★</div>
                <span>
                  {text.googleRating}
                  <br />
                  {text.reviewCount}
                </span>
              </div>
            </div>
          </div>
          <div className="review-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <div>
                  <div className="review-stars">★★★★★</div>
                  <p className="review-quote">{review.quote}</p>
                </div>
                <footer>
                  <span className="initial">{review.initial}</span>
                  {review.name}
                </footer>
              </article>
            ))}
          </div>
          <div className="reviews-foot">
            <span>{language === 'te' ? text.reviewTranslation : 'Kind words from people nearby.'}</span>
            <a
              href={reviewSearchUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="link-google-reviews"
            >
              {text.allReviews} <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>
      <section className="section visit" id="visit">
        <div className="visit-grid">
          <div>
            <div className="section-index">{text.visitIndex}</div>
            <h2>
              {text.visitHeadingFirst}
              <br />
              {text.visitHeadingSecond}
            </h2>
            <p className="visit-copy">{text.visitCopy}</p>
            <div className="address-card">
              <MapPin size={19} />
              <div>
                <strong>{text.addressTitle}</strong>
                <span>
                  {text.stateAndPostal}
                  <br />
                  {text.plusCode}: PQF8+77
                </span>
              </div>
            </div>
            <div className="contact-block">
              <div className="contact-heading">
                <Phone size={15} aria-hidden="true" />
                <strong>{text.contactHeading}</strong>
              </div>
              <div className="contact-numbers">
                {contactNumbers.map((number) => (
                  <a
                    key={number}
                    href={`tel:+91${number}`}
                    aria-label={`${text.contactHeading}: ${number}`}
                  >
                    {number}
                  </a>
                ))}
              </div>
            </div>
            <div className="hours-note">
              <Clock3 size={15} /> {text.hoursNote}
            </div>
            <div className="visit-actions">
              <a
                className="button-primary"
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="link-directions"
              >
                {text.openDirections} <Navigation size={14} />
              </a>
              <a
                className="text-link"
                href={reviewSearchUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="link-find-google"
              >
                {text.viewListing} <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
          <a
            className="map-art"
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={text.mapLinkLabel}
            data-testid="link-map-card"
          >
            <div className="map-road" />
            <div className="map-road secondary" />
            <div className="map-pin">
              <MapPin size={37} fill="currentColor" stroke="#f7f5eb" strokeWidth={1.5} />
            </div>
            <div className="map-pin-label">{text.mapPlantName}</div>
            <div className="map-note">{text.mapArea}</div>
          </a>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-inner">
          <div className="brand">
            <Brand language={language} />
          </div>
          <div className="footer-note">
            {text.footerDescription}
            <br />
            {text.footerTagline}
          </div>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;