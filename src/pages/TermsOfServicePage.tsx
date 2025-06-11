import React from 'react';
import CroatianSEO from '../components/SEO/CroatianSEO';

const TermsOfServicePage: React.FC = () => {
 return (
 <div className="container mx-auto px-4 py-8 max-w-4xl">
 <CroatianSEO
 title="Uvjeti korištenja | Smartblinds Croatia"
 description="Uvjeti korištenja web stranice Smartblinds Croatia."
 keywords="uvjeti korištenja, terms of service, smartblinds"
 pageType="info"
 />
 
 <h1 className="text-3xl font-bold mb-6">Uvjeti korištenja</h1>
 
 <div className="prose prose-lg max-w-none">
 <p className="mb-4">
 Dobrodošli na Smartblinds Croatia. Korištenjem naše web stranice pristajete na sljedeće uvjete korištenja.
 </p>

 <h2 className="text-2xl font-semibold mt-8 mb-4">1. Prihvaćanje uvjeta</h2>
 <p className="mb-4">
 Pristupanjem i korištenjem ove web stranice prihvaćate ove uvjete korištenja u cijelosti. 
 Ako se ne slažete s ovim uvjetima, molimo vas da ne koristite našu web stranicu.
 </p>

 <h2 className="text-2xl font-semibold mt-8 mb-4">2. Korištenje web stranice</h2>
 <p className="mb-4">
 Ova web stranica i njezin sadržaj namijenjeni su vašoj osobnoj i nekomercijalnoj uporabi. 
 Zabranjeno je:
 </p>
 <ul className="list-disc pl-6 mb-4">
 <li>Mijenjati ili kopirati materijale</li>
 <li>Koristiti materijale u komercijalne svrhe</li>
 <li>Pokušati dekompilirati ili obrnuto inženjerstvo softvera</li>
 <li>Uklanjati autorska prava ili druge vlasničke oznake</li>
 </ul>

 <h2 className="text-2xl font-semibold mt-8 mb-4">3. Privatnost</h2>
 <p className="mb-4">
 Vaša privatnost nam je važna. Molimo pregledajte našu Politiku privatnosti koja objašnjava 
 kako prikupljamo, koristimo i štitimo vaše podatke.
 </p>

 <h2 className="text-2xl font-semibold mt-8 mb-4">4. Narudžbe i plaćanje</h2>
 <p className="mb-4">
 Sve cijene su prikazane u eurima (EUR) i uključuju PDV. Zadržavamo pravo promjene cijena 
 bez prethodne najave. Plaćanje se vrši putem sigurnih platnih metoda.
 </p>

 <h2 className="text-2xl font-semibold mt-8 mb-4">5. Dostava</h2>
 <p className="mb-4">
 Dostavljamo po cijeloj Hrvatskoj. Rokovi dostave ovise o lokaciji i dostupnosti proizvoda. 
 Detaljne informacije o dostavi možete pronaći na stranici Dostava.
 </p>

 <h2 className="text-2xl font-semibold mt-8 mb-4">6. Povrat i zamjena</h2>
 <p className="mb-4">
 Imate pravo na povrat proizvoda u roku od 14 dana od primitka. Proizvod mora biti u 
 originalnom stanju i pakiranju. Troškove povrata snosi kupac.
 </p>

 <h2 className="text-2xl font-semibold mt-8 mb-4">7. Ograničenje odgovornosti</h2>
 <p className="mb-4">
 Smartblinds Croatia neće biti odgovoran za bilo kakve neizravne, slučajne ili posljedične 
 štete koje proizlaze iz korištenja naših proizvoda ili web stranice.
 </p>

 <h2 className="text-2xl font-semibold mt-8 mb-4">8. Izmjene uvjeta</h2>
 <p className="mb-4">
 Zadržavamo pravo izmjene ovih uvjeta u bilo kojem trenutku. Izmjene stupaju na snagu 
 odmah nakon objave na web stranici.
 </p>

 <h2 className="text-2xl font-semibold mt-8 mb-4">9. Kontakt</h2>
 <p className="mb-4">
 Za sva pitanja vezana uz ove uvjete korištenja, molimo kontaktirajte nas:
 </p>
 <ul className="list-disc pl-6 mb-4">
 <li>E-mail: info@smartblinds.hr</li>
 <li>Telefon: +385 1 234 5678</li>
 <li>Adresa: Ilica 123, 10000 Zagreb, Hrvatska</li>
 </ul>

 <p className="mt-8 text-sm text-gray-600">
 Zadnje ažuriranje: 15. prosinca 2024.
 </p>
 </div>
 </div>
 );
};

export default TermsOfServicePage; 