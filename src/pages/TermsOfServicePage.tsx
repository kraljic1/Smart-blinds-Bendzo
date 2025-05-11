import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="modern-page-container">
      <Helmet>
        <title>Uvjeti Korištenja | Smartblinds</title>
        <meta name="description" content="Uvjeti Korištenja za Smartblinds - Naši uvjeti i odredbe" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Uvjeti Korištenja</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Zadnje ažurirano: {new Date().toLocaleDateString('hr-HR')}</p>
        
        <div className="prose prose-blue max-w-none dark:prose-invert text-gray-800">
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">1. Uvod</h2>
            <p className="text-gray-800 dark:text-gray-300">Dobrodošli u Smartblinds. Ovi Uvjeti korištenja ("Uvjeti") reguliraju vaše korištenje naše web stranice, proizvoda i usluga. Pristupanjem ili korištenjem naših usluga, pristajete biti vezani ovim Uvjetima.</p>
            <p className="text-gray-800 dark:text-gray-300">Molimo vas da pažljivo pročitate ove Uvjete. Ako se ne slažete s ovim Uvjetima, ne smijete pristupati niti koristiti naše usluge.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">2. O nama</h2>
            <p className="text-gray-800 dark:text-gray-300">Smartblinds vodi Smartblinds Hrvatska, registrirana u Hrvatskoj.</p>
            <p className="text-gray-800 dark:text-gray-300">Kontakt podaci:<br />
              Email: info@smartblinds-croatia.com<br />
              Adresa: Split, Hrvatska
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">3. Definicije</h2>
            <p className="text-gray-800 dark:text-gray-300">U ovim Uvjetima:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>"Mi", "nas", "naš" i "Smartblinds" odnosi se na Smartblinds Hrvatska.</li>
              <li>"Vi" i "vaš" odnosi se na korisnika ili posjetitelja naše web stranice i usluga.</li>
              <li>"Usluge" odnosi se na našu web stranicu, proizvode i povezane usluge.</li>
              <li>"Sadržaj" odnosi se na informacije, tekst, grafike, fotografije, dizajn, zaštitne znakove i druge materijale koji se učitavaju, preuzimaju ili se pojavljuju na našim Uslugama.</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">4. Pravo korištenja</h2>
            <p className="text-gray-800 dark:text-gray-300">Za korištenje naših Usluga, morate:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Imati najmanje 18 godina ili biti punoljetni prema zakonima vaše jurisdikcije</li>
              <li>Imati pravnu sposobnost sklapanja obvezujućih ugovora</li>
              <li>Ne biti zabranjeni za korištenje naših Usluga prema važećim zakonima</li>
            </ul>
            <p className="text-gray-800 dark:text-gray-300">Ako koristite naše Usluge u ime tvrtke ili organizacije, izjavljujete da imate ovlasti da obvežete taj entitet ovim Uvjetima.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">5. Registracija računa</h2>
            <p className="text-gray-800 dark:text-gray-300">Za pristup određenim značajkama naših Usluga, možda ćete trebati stvoriti račun. Prilikom registracije, pristajete:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Pružiti točne i potpune informacije</li>
              <li>Održavati sigurnost svojih vjerodajnica za račun</li>
              <li>Odmah nas obavijestiti o bilo kakvom neovlaštenom pristupu vašem računu</li>
              <li>Preuzeti odgovornost za sve aktivnosti koje se događaju pod vašim računom</li>
            </ul>
            <p className="text-gray-800 dark:text-gray-300">Zadržavamo pravo suspendirati ili zatvoriti račune koji krše ove Uvjete ili su neaktivni dulje vrijeme.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">6. Proizvodi i narudžbe</h2>
            <h3 className="text-xl mb-2 mt-4 text-gray-900 dark:text-white">6.1 Informacije o proizvodu</h3>
            <p className="text-gray-800 dark:text-gray-300">Činimo sve što je u našoj moći da naše proizvode prikažemo točno, uključujući boje, dimenzije i specifikacije. Međutim, ne jamčimo da će zaslon vašeg uređaja točno prikazati stvarnu boju ili točne dimenzije proizvoda.</p>
            
            <h3 className="text-xl mb-2 mt-4 text-gray-900 dark:text-white">6.2 Naručivanje</h3>
            <p className="text-gray-800 dark:text-gray-300">Prilikom naručivanja:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Pristajete pružiti trenutne, potpune i točne informacije o kupnji</li>
              <li>Vaša narudžba predstavlja ponudu za kupnju proizvoda</li>
              <li>Zadržavamo pravo odbiti ili otkazati bilo koju narudžbu iz bilo kojeg razloga</li>
              <li>Potvrda narudžbe ne predstavlja prihvaćanje</li>
            </ul>
            
            <h3 className="text-xl mb-2 mt-4 text-gray-900 dark:text-white">6.3 Cijene i plaćanje</h3>
            <p className="text-gray-800 dark:text-gray-300">Sve cijene su prikazane u odgovarajućoj valuti i uključuju primjenjive poreze, osim ako nije drugačije navedeno. Zadržavamo pravo mijenjati cijene u bilo kojem trenutku. Plaćanje se mora izvršiti u trenutku narudžbe korištenjem načina plaćanja koje nudimo.</p>
            
            <h3 className="text-xl mb-2 mt-4 text-gray-900 dark:text-white">6.4 Dostava</h3>
            <p className="text-gray-800 dark:text-gray-300">Ulažemo razumne napore da isporučimo proizvode unutar procijenjenog vremenskog okvira. Međutim, rokovi isporuke nisu zajamčeni. Rizik gubitka i prijenos vlasništva događa se pri predaji proizvoda dostavljaču.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">7. Pravo odustajanja i povrati</h2>
            <p className="text-gray-800 dark:text-gray-300">U skladu s zakonima o zaštiti potrošača Europske unije, imate pravo odustati od kupnje bez navođenja razloga u roku od 14 dana od dana primitka proizvoda. Za ostvarivanje ovog prava:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Obavijestite nas o svojoj odluci o odustajanju jasnom izjavom</li>
              <li>Vratite proizvod u njegovom izvornom stanju i pakiranju</li>
              <li>Snosite izravne troškove povrata proizvoda</li>
            </ul>
            <p className="text-gray-800 dark:text-gray-300">Za proizvode izrađene po mjeri prema vašim specifikacijama, pravo odustajanja možda neće biti primjenjivo.</p>
            <p className="text-gray-800 dark:text-gray-300">Nadoknadit ćemo sve uplate primljene od vas za vraćeni proizvod, uključujući troškove dostave (osim dodatnih troškova koji proizlaze iz vašeg izbora vrste dostave koja nije najjeftinija standardna dostava koju nudimo).</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">8. Jamstva i odgovornost</h2>
            <h3 className="text-xl mb-2 mt-4 text-gray-900 dark:text-white">8.1 Jamstva proizvoda</h3>
            <p className="text-gray-800 dark:text-gray-300">Naši proizvodi dolaze s 5-godišnjim jamstvom koje pokriva proizvodne nedostatke. Ovo jamstvo je dodatak, i ne utječe na vaša zakonska prava kao potrošača.</p>
            
            <h3 className="text-xl mb-2 mt-4 text-gray-900 dark:text-white">8.2 Ograničenje odgovornosti</h3>
            <p className="text-gray-800 dark:text-gray-300">U mjeri dopuštenoj zakonom:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Nismo odgovorni za bilo kakve neizravne, slučajne, posebne, posljedične ili kaznene štete</li>
              <li>Naša ukupna odgovornost za bilo koji zahtjev ne prelazi iznos koji ste platili za proizvod ili uslugu koja je predmet zahtjeva</li>
              <li>Ovo ograničenje primjenjuje se na bilo kakvu odgovornost koja proizlazi iz ili u vezi s našim proizvodima, uslugama, sadržajem ili ovim Uvjetima</li>
            </ul>
            <p className="text-gray-800 dark:text-gray-300">Ništa u ovim Uvjetima ne isključuje ili ograničava našu odgovornost za smrt ili osobnu ozljedu uzrokovanu našim nemarom, prijevaru ili bilo koju drugu odgovornost koja ne može biti isključena ili ograničena zakonom.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">9. Intelektualno vlasništvo</h2>
            <p className="text-gray-800 dark:text-gray-300">Sav sadržaj na našoj web stranici, uključujući tekst, grafike, logotipe, slike, softver i druge materijale, u vlasništvu je nas ili naših davatelja licenci i zaštićen je zakonima o intelektualnom vlasništvu. Ne smijete:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Koristiti naš sadržaj u komercijalne svrhe bez dobivanja licence od nas</li>
              <li>Modificirati, kopirati, distribuirati, prenositi, prikazivati, izvoditi, reproducirati, objavljivati, licencirati, stvarati izvedena djela, prenositi ili prodavati bilo koje informacije dobivene s naše web stranice</li>
              <li>Koristiti naše zaštitne znakove bez našeg prethodnog pisanog pristanka</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">10. Korisnički sadržaj</h2>
            <p className="text-gray-800 dark:text-gray-300">Zadržavate vlasništvo nad bilo kojim sadržajem koji pošaljete na našu web stranicu (kao što su recenzije, komentari ili povratne informacije). Slanjem sadržaja, dajete nam globalnu, neisključivu, besplatnu licencu za korištenje, reprodukciju, modificiranje, prilagodbu, objavljivanje, prevođenje, distribuciju i prikazivanje takvog sadržaja.</p>
            <p className="text-gray-800 dark:text-gray-300">Izjavljujete i jamčite da je vaš sadržaj:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
              <li>Točan i nije obmanjujući</li>
              <li>Ne krši prava intelektualnog vlasništva bilo koje treće strane</li>
              <li>Ne krši bilo koji primjenjivi zakon ili propis</li>
              <li>Nije klevetnički, nepristojan ili uvredljiv</li>
            </ul>
            <p className="text-gray-800 dark:text-gray-300">Zadržavamo pravo ukloniti bilo koji sadržaj koji krši ove Uvjete ili koji smatramo neprikladnim.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">11. Privatnost</h2>
            <p className="text-gray-800 dark:text-gray-300">Naše prikupljanje i korištenje vaših osobnih podataka regulirano je našom <a href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">Politikom privatnosti</a>. Korištenjem naših Usluga, pristajete na naše prakse s podacima kako je opisano u našoj Politici privatnosti.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">12. Promjene Uvjeta</h2>
            <p className="text-gray-800 dark:text-gray-300">Možemo povremeno ažurirati ove Uvjete. Ažurirana verzija bit će važeća od datuma navedenog na vrhu Uvjeta. Obavijestit ćemo vas o materijalnim promjenama objavljivanjem obavijesti na našoj web stranici ili slanjem e-maila. Vaše nastavljeno korištenje naših Usluga nakon što promjene stupe na snagu predstavlja vaše prihvaćanje ažuriranih Uvjeta.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">13. Raskid</h2>
            <p className="text-gray-800 dark:text-gray-300">Možemo raskinuti ili suspendirati vaš pristup našim Uslugama odmah, bez prethodne obavijesti ili odgovornosti, iz bilo kojeg razloga, uključujući ako prekršite ove Uvjete. Nakon raskida, vaše pravo na korištenje naših Usluga odmah prestaje.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">14. Mjerodavno pravo</h2>
            <p className="text-gray-800 dark:text-gray-300">Ovi Uvjeti podliježu zakonima Hrvatske. Bilo koji spor koji proizlazi iz ili u vezi s ovim Uvjetima podliježe isključivoj nadležnosti sudova Hrvatske.</p>
            <p className="text-gray-800 dark:text-gray-300">Ako ste potrošač, možete imati koristi od bilo kojih obveznih odredbi zakona zemlje u kojoj imate prebivalište. Ništa u ovim Uvjetima ne utječe na vaša prava kao potrošača da se oslanjate na takve obvezne odredbe lokalnog zakona.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">15. Online rješavanje sporova</h2>
            <p className="text-gray-800 dark:text-gray-300">U skladu s EU Uredbom br. 524/2013, potrošači s prebivalištem u Europskoj uniji mogu pristupiti platformi za online rješavanje sporova koju pruža Europska komisija za rješavanje sporova vezanih uz online kupnje. Platforma je dostupna na: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">https://ec.europa.eu/consumers/odr</a>.</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">16. Djelomična ništavnost</h2>
            <p className="text-gray-800 dark:text-gray-300">Ako se bilo koja odredba ovih Uvjeta smatra nevažećom ili neizvršivom, takva odredba će se izbrisati, a preostale odredbe će se provesti.</p>
          </section>
          
          <section>
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">17. Kontaktirajte nas</h2>
            <p className="text-gray-800 dark:text-gray-300">Ako imate pitanja o ovim Uvjetima, molimo kontaktirajte nas na:</p>
            <p className="text-gray-800 dark:text-gray-300">Email: info@smartblinds-croatia.com<br />
              Adresa: Split, Hrvatska
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage; 