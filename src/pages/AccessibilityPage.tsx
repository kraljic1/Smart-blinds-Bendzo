import React from 'react';
import CroatianSEO from '../components/SEO/CroatianSEO';

const AccessibilityPage: React.FC = () => {
 return (
 <div className="container mx-auto px-4 py-8 max-w-4xl">
 <CroatianSEO
 title="Pristupačnost | Smartblinds Croatia"
 description="Informacije o pristupačnosti naše web stranice i proizvoda."
 keywords="pristupačnost, accessibility, smartblinds"
 pageType="info"
 />
 
 <h1 className="text-3xl font-bold mb-6">Izjava o pristupačnosti</h1>
 
 <div className="prose prose-lg max-w-none">
 <p className="mb-4">
 Smartblinds Croatia je posvećen osiguravanju digitalne pristupačnosti za osobe s invaliditetom. 
 Kontinuirano poboljšavamo korisničko iskustvo za sve i primjenjujemo relevantne standarde pristupačnosti.
 </p>

 <h2 className="text-2xl font-semibold mt-8 mb-4">Mjere za podršku pristupačnosti</h2>
 <p className="mb-4">Smartblinds Croatia poduzima sljedeće mjere za osiguravanje pristupačnosti:</p>
 <ul className="list-disc pl-6 mb-4">
 <li>Uključuje pristupačnost kao dio naše misije.</li>
 <li>Integrira pristupačnost u naše prakse nabave.</li>
 <li>Zapošljava formalne metode osiguravanja kvalitete pristupačnosti.</li>
 <li>Dodjeljuje jasne ciljeve i odgovornosti pristupačnosti.</li>
 </ul>

 <h2 className="text-2xl font-semibold mt-8 mb-4">Status usklađenosti</h2>
 <p className="mb-4">
 Trenutni status usklađenosti: Djelomično usklađeno s WCAG 2.1 razinom AA.
 </p>

 <h2 className="text-2xl font-semibold mt-8 mb-4">Povratne informacije</h2>
 <p className="mb-4">
 Vaše povratne informacije su nam važne. Ako naiđete na probleme s pristupačnošću na ovoj web stranici, 
 molimo vas da nas kontaktirate:
 </p>
 <ul className="list-disc pl-6 mb-4">
 <li>E-mail: pristupacnost@smartblinds.hr</li>
 <li>Telefon: +385 1 234 5678</li>
 </ul>

 <h2 className="text-2xl font-semibold mt-8 mb-4">Tehnička specifikacija</h2>
 <p className="mb-4">
 Pristupačnost ove web stranice oslanja se na sljedeće tehnologije:
 </p>
 <ul className="list-disc pl-6 mb-4">
 <li>HTML</li>
 <li>CSS</li>
 <li>JavaScript</li>
 <li>React</li>
 </ul>

 <h2 className="text-2xl font-semibold mt-8 mb-4">Datum</h2>
 <p className="mb-4">
 Ova izjava je ažurirana 15. prosinca 2024.
 </p>
 </div>
 </div>
 );
};

export default AccessibilityPage; 