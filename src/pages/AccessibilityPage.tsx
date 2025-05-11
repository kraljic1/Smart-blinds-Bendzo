import React from 'react';
import { Helmet } from 'react-helmet-async';

const AccessibilityPage: React.FC = () => {
  return (
    <div className="modern-page-container">
      <Helmet>
        <title>Pristupačnost | Smartblinds</title>
        <meta name="description" content="Informacije o pristupačnosti za Smartblinds - Naša predanost pristupačnosti" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Izjava o pristupačnosti</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Zadnje ažurirano: {new Date().toLocaleDateString('hr-HR')}</p>
        
        <div className="prose prose-blue max-w-none dark:prose-invert text-gray-800">
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Naša predanost</h2>
            <p className="text-gray-800 dark:text-gray-300">Smartblinds je predan osiguravanju digitalne pristupačnosti za osobe s invaliditetom. Kontinuirano poboljšavamo korisničko iskustvo za sve i primjenjujemo relevantne standarde pristupačnosti.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Status usklađenosti</h2>
            <p className="text-gray-800 dark:text-gray-300">Smjernice za pristupačnost web sadržaja (WCAG) definiraju zahtjeve za dizajnere i programere za poboljšanje pristupačnosti za osobe s invaliditetom. Definira tri razine usklađenosti: Razina A, Razina AA i Razina AAA.</p>
            <p className="text-gray-800 dark:text-gray-300">Smartblinds je djelomično usklađen s WCAG 2.1 razinom AA. Djelomično usklađen znači da neki dijelovi sadržaja nisu u potpunosti u skladu sa standardom pristupačnosti.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Poduzete mjere</h2>
            <p className="text-gray-800 dark:text-gray-300">Smartblinds poduzima sljedeće mjere kako bi osigurao pristupačnost:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Uključivanje pristupačnosti kao dio naše misije</li>
              <li>Integriranje pristupačnosti u naše nabavne prakse</li>
              <li>Pružanje kontinuirane edukacije o pristupačnosti za naše osoblje</li>
              <li>Postavljanje jasnih ciljeva i odgovornosti vezanih uz pristupačnost</li>
              <li>Primjena formalnih metoda osiguranja kvalitete pristupačnosti</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Značajke pristupačnosti</h2>
            <p className="text-gray-800 dark:text-gray-300">Naša web stranica uključuje sljedeće značajke pristupačnosti:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Semantičko HTML5 označavanje</li>
              <li>ARIA oznake za čitače zaslona</li>
              <li>Pravilna struktura naslova</li>
              <li>Smisleni alternativni tekst za slike</li>
              <li>Dovoljan kontrast boja</li>
              <li>Podrška za navigaciju tipkovnicom</li>
              <li>Mogućnost promjene veličine teksta bez gubitka sadržaja ili funkcionalnosti</li>
              <li>Dosljedna navigacija</li>
              <li>Tamni način rada za smanjenje naprezanja očiju</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Kompatibilnost s pomoćnom tehnologijom</h2>
            <p className="text-gray-800 dark:text-gray-300">Smartblinds je dizajniran da bude kompatibilan sa sljedećim pomoćnim tehnologijama:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Čitači zaslona (npr. NVDA, JAWS, VoiceOver)</li>
              <li>Povećala zaslona</li>
              <li>Softver za prepoznavanje glasa</li>
              <li>Alternativni uređaji za unos</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Poznata ograničenja</h2>
            <p className="text-gray-800 dark:text-gray-300">Unatoč našim najboljim naporima da osiguramo pristupačnost Smartblinds-a, mogu postojati neka ograničenja. U nastavku je popis poznatih ograničenja:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Neki stariji PDF dokumenti možda nisu potpuno pristupačni</li>
              <li>Neki videozapisi možda nemaju titlove ili zvučne opise</li>
              <li>Neke složene interaktivne značajke mogu imati ograničenu navigaciju tipkovnicom</li>
            </ul>
            <p className="text-gray-800 dark:text-gray-300">Radimo na rješavanju ovih problema i poboljšanju pristupačnosti naše web stranice.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Povratne informacije</h2>
            <p className="text-gray-800 dark:text-gray-300">Pozdravljamo vaše povratne informacije o pristupačnosti Smartblinds-a. Molimo vas da nas obavijestite ako naiđete na prepreke pristupačnosti na našoj web stranici:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Email: info@smartblinds-croatia.com</li>
              <li>Telefon: +1 (234) 567-890</li>
            </ul>
            <p className="text-gray-800 dark:text-gray-300">Nastojimo odgovoriti na povratne informacije unutar 3 radna dana.</p>
          </section>
          
          <section>
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Tehničke specifikacije</h2>
            <p className="text-gray-800 dark:text-gray-300">Pristupačnost Smartblinds-a oslanja se na sljedeće tehnologije za rad s određenom kombinacijom web preglednika i bilo kojim pomoćnim tehnologijama ili dodacima instaliranim na vašem računalu:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>WAI-ARIA</li>
            </ul>
            <p className="text-gray-800 dark:text-gray-300">Ove se tehnologije koriste za usklađenost s korištenim standardima pristupačnosti.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPage; 