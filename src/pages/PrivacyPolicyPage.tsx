import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="modern-page-container">
      <Helmet>
        <title>Politika Privatnosti | Smartblinds</title>
        <meta name="description" content="Politika privatnosti za Smartblinds - Saznajte kako upravljamo vašim podacima" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Politika Privatnosti</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Zadnje ažurirano: {new Date().toLocaleDateString('hr-HR')}</p>
        
        <div className="prose prose-blue max-w-none dark:prose-invert text-gray-800">
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">1. Uvod</h2>
            <p className="text-gray-800 dark:text-gray-300">Dobrodošli u Smartblinds ("mi", "naš" ili "nas"). Posvećeni smo zaštiti vaše privatnosti i osobnih podataka. Ova Politika privatnosti objašnjava kako prikupljamo, koristimo, otkrivamo i štitimo vaše podatke kada posjećujete našu web stranicu i koristite naše usluge.</p>
            <p className="text-gray-800 dark:text-gray-300">Ova Politika privatnosti usklađena je s Općom uredbom o zaštiti podataka (GDPR) i drugim relevantnim zakonima o zaštiti podataka Europskog unije.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">2. Voditelj obrade podataka</h2>
            <p className="text-gray-800 dark:text-gray-300">U svrhu GDPR-a, Smartblinds Hrvatska je voditelj obrade podataka odgovoran za vaše osobne podatke.</p>
            <p className="text-gray-800 dark:text-gray-300">Kontakt podaci:<br />
              Email: info@smartblinds-croatia.com<br />
              Adresa: Split, Hrvatska
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">3. Informacije koje prikupljamo</h2>
            <p className="text-gray-800 dark:text-gray-300">Prikupljamo sljedeće vrste informacija:</p>
            <h3 className="text-xl mb-2 mt-4 text-gray-900 dark:text-white">3.1 Osobni podaci</h3>
            <p className="text-gray-800 dark:text-gray-300">Osobni podaci su informacije koje vas mogu identificirati kao pojedinca. Možemo prikupljati:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Kontakt informacije (ime, email adresa, telefonski broj, adresa za dostavu)</li>
              <li>Informacije o računu (korisničko ime, lozinka)</li>
              <li>Informacije o plaćanju (podaci o kreditnoj kartici se obrađuju direktno putem Stripe-a, mi ne pohranjujemo podatke o kartici)</li>
              <li>Povijest narudžbi i preferencije</li>
              <li>Podaci o komunikaciji (kada kontaktirate našu korisničku podršku)</li>
            </ul>
            
            <h3 className="text-xl mb-2 mt-4 text-gray-900 dark:text-white">3.1.1 Napomena o podacima plaćanja</h3>
            <p className="text-gray-800 dark:text-gray-300">
              <strong>Važno:</strong> Vaši podaci o kreditnoj/debitnoj kartici (broj kartice, CVV, datum isteka) 
              se nikad ne pohranjuju na našim serverima. Ovi osjetljivi podaci se obrađuju direktno putem 
              Stripe-a koji je certificiran prema PCI DSS Level 1 standardima. Mi primamo samo potvrdu o 
              uspješnosti ili neuspješnosti transakcije.
            </p>
            
            <h3 className="text-xl mb-2 mt-4 text-gray-900 dark:text-white">3.2 Podaci o korištenju</h3>
            <p className="text-gray-800 dark:text-gray-300">Automatski prikupljamo određene informacije kada posjećujete našu web stranicu:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>IP adresa</li>
              <li>Vrsta i verzija preglednika</li>
              <li>Operativni sustav</li>
              <li>Referentna web stranica</li>
              <li>Stranice koje pregledavate</li>
              <li>Vrijeme i datum vašeg posjeta</li>
              <li>Vrijeme provedeno na stranicama</li>
              <li>Informacije o uređaju</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">4. Pravna osnova za obradu</h2>
            <p className="text-gray-800 dark:text-gray-300">Vaše osobne podatke obrađujemo na temelju sljedećih pravnih osnova:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li><strong>Ugovor:</strong> Obrada nužna za izvršenje ugovora s vama</li>
              <li><strong>Zakonska obveza:</strong> Obrada nužna za usklađenost s našim zakonskim obvezama</li>
              <li><strong>Legitimni interesi:</strong> Obrada nužna za naše legitimne interese</li>
              <li><strong>Pristanak:</strong> Kada ste dali pristanak za specifične aktivnosti obrade</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">5. Kako koristimo vaše informacije</h2>
            <p className="text-gray-800 dark:text-gray-300">Vaše informacije koristimo za sljedeće svrhe:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Za pružanje i održavanje naših usluga</li>
              <li>Za obradu i ispunjenje vaših narudžbi</li>
              <li>Za komunikaciju s vama o narudžbama, proizvodima, uslugama i promocijama</li>
              <li>Za personalizaciju vašeg iskustva</li>
              <li>Za poboljšanje naše web stranice i usluga</li>
              <li>Za obradu plaćanja</li>
              <li>Za ispunjavanje zakonskih obveza</li>
              <li>Za zaštitu naših prava i sprječavanje prijevara</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">6. Zadržavanje podataka</h2>
            <p className="text-gray-800 dark:text-gray-300">Vaše osobne podatke zadržavamo samo onoliko dugo koliko je potrebno za ispunjenje svrha za koje su prikupljeni, uključujući zadovoljavanje zakonskih, računovodstvenih ili izvještajnih zahtjeva.</p>
            <p className="text-gray-800 dark:text-gray-300">Različite vrste podataka mogu se čuvati različita razdoblja. Pri određivanju odgovarajućih razdoblja čuvanja, razmatramo:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Količinu, prirodu i osjetljivost osobnih podataka</li>
              <li>Potencijalni rizik od štete zbog neovlaštene uporabe ili otkrivanja</li>
              <li>Svrhe za koje obrađujemo podatke</li>
              <li>Možemo li postići te svrhe drugim sredstvima</li>
              <li>Primjenjive zakonske zahtjeve</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">7. Kolačići i tehnologije praćenja</h2>
            <p className="text-gray-800 dark:text-gray-300">Koristimo kolačiće i slične tehnologije praćenja za prikupljanje i praćenje informacija o vašim aktivnostima pregledavanja. Kolačićima možete upravljati putem postavki vašeg preglednika.</p>
            <p className="text-gray-800 dark:text-gray-300">Vrste kolačića koje koristimo:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li><strong>Neophodni kolačići:</strong> Nužni za funkcioniranje web stranice</li>
              <li><strong>Analitički kolačići:</strong> Za razumijevanje kako posjetitelji koriste našu web stranicu</li>
              <li><strong>Oglašivački kolačići:</strong> Za pružanje personaliziranih oglasa</li>
              <li><strong>Kolačići preferencija:</strong> Za pamćenje vaših preferencija</li>
              <li><strong>Kolačići za plaćanje:</strong> Za sigurno procesiranje plaćanja putem Stripe servisa</li>
            </ul>
            
            <h3 className="text-xl mb-2 mt-4 text-gray-900 dark:text-white">7.1 Stripe kolačići za plaćanje</h3>
            <p className="text-gray-800 dark:text-gray-300">Za procesiranje plaćanja karticom koristimo Stripe, vodeći svjetski servis za sigurno procesiranje plaćanja. Stripe postavlja kolačiće koji su neophodni za:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Sigurno procesiranje vaših podataka o kartici</li>
              <li>Sprječavanje prevara i neovlaštenih transakcija</li>
              <li>Održavanje sesije tijekom procesa plaćanja</li>
              <li>Usklađenost s PCI DSS standardima sigurnosti</li>
            </ul>
            <p className="text-gray-800 dark:text-gray-300">
              <strong>Važno:</strong> Ovi kolačići su neophodni za funkcioniranje plaćanja karticom. Bez njih nećete moći završiti kupovinu karticom. 
              Stripe kolačići uključuju domene: m.stripe.com, merchant-ui-api.stripe.com i .stripe.com.
            </p>
            <p className="text-gray-800 dark:text-gray-300">
              Prije korištenja Stripe servisa, zatražit ćemo vaš pristanak za postavljanje ovih kolačića. 
              Možete odbiti kolačiće, ali u tom slučaju plaćanje karticom neće biti dostupno i morat ćete koristiti alternativne načine plaćanja.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">8. Procesiranje plaćanja i treće strane</h2>
            <p className="text-gray-800 dark:text-gray-300">Za sigurno procesiranje plaćanja koristimo Stripe Inc., certificirani PCI DSS Level 1 pružatelj usluga plaćanja.</p>
            
            <h3 className="text-xl mb-2 mt-4 text-gray-900 dark:text-white">8.1 Stripe procesiranje plaćanja</h3>
            <p className="text-gray-800 dark:text-gray-300">Kada odaberete plaćanje karticom:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Vaši podaci o kartici se šalju direktno Stripe-u putem sigurne konekcije</li>
              <li>Mi nikad ne vidimo ili ne pohranjujemo vaše podatke o kartici</li>
              <li>Stripe obrađuje plaćanje u skladu s njihovom politikom privatnosti</li>
              <li>Stripe može postaviti kolačiće potrebne za sigurnost i funkcionalnost</li>
            </ul>
            
            <h3 className="text-xl mb-2 mt-4 text-gray-900 dark:text-white">8.2 Podaci dijeljeni sa Stripe-om</h3>
            <p className="text-gray-800 dark:text-gray-300">Sa Stripe-om dijelimo sljedeće informacije potrebne za procesiranje plaćanja:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Iznos transakcije i valuta</li>
              <li>Opis narudžbe</li>
              <li>Vaše ime i email adresa</li>
              <li>Adresa za dostavu (ako je potrebna)</li>
            </ul>
            
            <h3 className="text-xl mb-2 mt-4 text-gray-900 dark:text-white">8.3 Stripe politika privatnosti</h3>
            <p className="text-gray-800 dark:text-gray-300">
              Stripe obrađuje vaše podatke u skladu s njihovom politikom privatnosti dostupnom na: 
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                https://stripe.com/privacy
              </a>
            </p>
            <p className="text-gray-800 dark:text-gray-300">
              Stripe je certificiran za PCI DSS Level 1, najviši standard sigurnosti u industriji plaćanja, 
              što osigurava da su vaši podaci o kartici zaštićeni prema najstrožim sigurnosnim standardima.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">9. Vaša prava</h2>
            <p className="text-gray-800 dark:text-gray-300">Prema GDPR-u, imate sljedeća prava:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li><strong>Pravo na pristup:</strong> Možete zatražiti kopiju svojih osobnih podataka</li>
              <li><strong>Pravo na ispravak:</strong> Možete zatražiti ispravak netočnih podataka</li>
              <li><strong>Pravo na brisanje:</strong> Možete zatražiti brisanje svojih podataka u određenim okolnostima</li>
              <li><strong>Pravo na ograničenje obrade:</strong> Možete zatražiti ograničenje obrade u određenim okolnostima</li>
              <li><strong>Pravo na prenosivost podataka:</strong> Možete zatražiti prijenos svojih podataka u strukturiranom formatu</li>
              <li><strong>Pravo na prigovor:</strong> Možete prigovoriti obradi temeljenoj na legitimnim interesima</li>
              <li><strong>Pravo na povlačenje privole:</strong> Možete povući privolu u bilo kojem trenutku</li>
            </ul>
            <p className="text-gray-800 dark:text-gray-300">Za ostvarivanje bilo kojeg od ovih prava, molimo kontaktirajte nas na info@smartblinds-croatia.com.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">10. Sigurnost podataka</h2>
            <p className="text-gray-800 dark:text-gray-300">Implementiramo odgovarajuće tehničke i organizacijske mjere za zaštitu vaših osobnih podataka od neovlaštene ili nezakonite obrade, slučajnog gubitka, uništenja ili oštećenja.</p>
            <p className="text-gray-800 dark:text-gray-300">Iako ulažemo razumne napore za zaštitu vaših podataka, nijedna metoda prijenosa putem interneta ili elektroničkog pohranjivanja nije 100% sigurna.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">11. Međunarodni prijenosi podataka</h2>
            <p className="text-gray-800 dark:text-gray-300">Možemo prenositi vaše osobne podatke u zemlje izvan Europskog gospodarskog prostora (EGP). Kada to činimo, osiguravamo sličnu razinu zaštite implementiranjem barem jedne od sljedećih zaštitnih mjera:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Prijenos u zemlje s odlukama o primjerenosti koje je donijela Europska komisija</li>
              <li>Korištenje specifičnih ugovora koje je odobrila Europska komisija</li>
              <li>Implementacija standardnih ugovornih klauzula</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">12. Otkrivanje trećim stranama</h2>
            <p className="text-gray-800 dark:text-gray-300">Možemo dijeliti vaše osobne podatke s:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Pružateljima usluga koji pružaju usluge u naše ime</li>
              <li>Procesorima plaćanja za obradu transakcija (uključujući Stripe Inc.)</li>
              <li>Tvrtkama za dostavu radi isporuke narudžbi</li>
              <li>Pravnim i regulatornim tijelima kada to zahtijeva zakon</li>
              <li>Profesionalnim savjetnicima poput odvjetnika, revizora i osiguravatelja</li>
            </ul>
            <p className="text-gray-800 dark:text-gray-300">Zahtijevamo od svih trećih strana da poštuju sigurnost vaših osobnih podataka i da postupaju s njima u skladu sa zakonom.</p>
            
            <h3 className="text-xl mb-2 mt-4 text-gray-900 dark:text-white">12.1 Stripe kao procesor plaćanja</h3>
            <p className="text-gray-800 dark:text-gray-300">
              Stripe Inc. je naš primarni procesor plaćanja za transakcije karticama. Stripe je:
            </p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Certificiran prema PCI DSS Level 1 standardima</li>
              <li>Reguliran od strane financijskih tijela u zemljama gdje posluje</li>
              <li>Usklađen s GDPR-om i drugim zakonima o zaštiti podataka</li>
              <li>Odgovoran za sigurno rukovanje podacima o karticama</li>
            </ul>
            <p className="text-gray-800 dark:text-gray-300">
              Stripe može postaviti kolačiće i koristiti druge tehnologije potrebne za sigurno procesiranje plaćanja. 
              Više informacija o Stripe politici privatnosti možete pronaći na njihovoj web stranici.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">13. Privatnost djece</h2>
            <p className="text-gray-800 dark:text-gray-300">Naše usluge nisu namijenjene osobama mlađim od 16 godina. Ne prikupljamo svjesno osobne podatke od djece. Ako saznate da nam je dijete dalo osobne podatke, molimo vas da nas kontaktirate.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">14. Promjene ove Politike privatnosti</h2>
            <p className="text-gray-800 dark:text-gray-300">Možemo povremeno ažurirati ovu Politiku privatnosti. Ažurirana verzija bit će označena ažuriranim datumom "Zadnje ažurirano". Potičemo vas da periodično pregledavate ovu Politiku privatnosti.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">15. Kontaktirajte nas</h2>
            <p className="text-gray-800 dark:text-gray-300">Ako imate pitanja o ovoj Politici privatnosti ili našim praksama s podacima, molimo kontaktirajte nas na:</p>
            <p className="text-gray-800 dark:text-gray-300">Email: info@smartblinds-croatia.com<br />
               Adresa: Split, Hrvatska
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">16. Tijelo za zaštitu podataka</h2>
            <p className="text-gray-800 dark:text-gray-300">Imate pravo podnijeti pritužbu tijelu za zaštitu podataka ako smatrate da nismo postupali u skladu sa zakonima o zaštiti podataka. Relevantno tijelo za zaštitu podataka u Hrvatskoj je Agencija za zaštitu osobnih podataka (AZOP).</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 