import React from 'react';

const RightsAndContactSection: React.FC = () => {
 return (
 <>
 <section className="mb-10">
 <h2 className="text-2xl mb-4 text-gray-900">9. Vaša prava</h2>
 <p className="text-gray-800">Prema GDPR-u, imate sljedeća prava:</p>
 <ul className="list-disc pl-5 mb-4 text-gray-800">
 <li><strong>Pravo na pristup:</strong> Možete zatražiti kopiju svojih osobnih podataka</li>
 <li><strong>Pravo na ispravak:</strong> Možete zatražiti ispravak netočnih podataka</li>
 <li><strong>Pravo na brisanje:</strong> Možete zatražiti brisanje svojih podataka u određenim okolnostima</li>
 <li><strong>Pravo na ograničenje obrade:</strong> Možete zatražiti ograničenje obrade u određenim okolnostima</li>
 <li><strong>Pravo na prenosivost podataka:</strong> Možete zatražiti prijenos svojih podataka u strukturiranom formatu</li>
 <li><strong>Pravo na prigovor:</strong> Možete prigovoriti obradi temeljenoj na legitimnim interesima</li>
 <li><strong>Pravo na povlačenje privole:</strong> Možete povući privolu u bilo kojem trenutku</li>
 </ul>
 <p className="text-gray-800">Za ostvarivanje bilo kojeg od ovih prava, molimo kontaktirajte nas na info@smartblinds-croatia.com.</p>
 </section>
 
 <section className="mb-10">
 <h2 className="text-2xl mb-4 text-gray-900">10. Sigurnost podataka</h2>
 <p className="text-gray-800">Implementiramo odgovarajuće tehničke i organizacijske mjere za zaštitu vaših osobnih podataka od neovlaštene ili nezakonite obrade, slučajnog gubitka, uništenja ili oštećenja.</p>
 <p className="text-gray-800">Iako ulažemo razumne napore za zaštitu vaših podataka, nijedna metoda prijenosa putem interneta ili elektroničkog pohranjivanja nije 100% sigurna.</p>
 </section>
 
 <section className="mb-10">
 <h2 className="text-2xl mb-4 text-gray-900">11. Međunarodni prijenosi podataka</h2>
 <p className="text-gray-800">Možemo prenositi vaše osobne podatke u zemlje izvan Europskog gospodarskog prostora (EGP). Kada to činimo, osiguravamo sličnu razinu zaštite implementiranjem barem jedne od sljedećih zaštitnih mjera:</p>
 <ul className="list-disc pl-5 mb-4 text-gray-800">
 <li>Prijenos u zemlje s odlukama o primjerenosti koje je donijela Europska komisija</li>
 <li>Korištenje specifičnih ugovora koje je odobrila Europska komisija</li>
 <li>Implementacija standardnih ugovornih klauzula</li>
 </ul>
 </section>
 
 <section className="mb-10">
 <h2 className="text-2xl mb-4 text-gray-900">12. Otkrivanje trećim stranama</h2>
 <p className="text-gray-800">Možemo dijeliti vaše osobne podatke s:</p>
 <ul className="list-disc pl-5 mb-4 text-gray-800">
 <li>Pružateljima usluga koji pružaju usluge u naše ime</li>
 <li>Procesorima plaćanja za obradu transakcija (uključujući Stripe Inc.)</li>
 <li>Tvrtkama za dostavu radi isporuke narudžbi</li>
 <li>Pravnim i regulatornim tijelima kada to zahtijeva zakon</li>
 <li>Profesionalnim savjetnicima poput odvjetnika, revizora i osiguravatelja</li>
 </ul>
 <p className="text-gray-800">Zahtijevamo od svih trećih strana da poštuju sigurnost vaših osobnih podataka i da postupaju s njima u skladu sa zakonom.</p>
 
 <h3 className="text-xl mb-2 mt-4 text-gray-900">12.1 Stripe kao procesor plaćanja</h3>
 <p className="text-gray-800">
 Stripe Inc. je naš primarni procesor plaćanja za transakcije karticama. Stripe je:
 </p>
 <ul className="list-disc pl-5 mb-4 text-gray-800">
 <li>Certificiran prema PCI DSS Level 1 standardima</li>
 <li>Reguliran od strane financijskih tijela u zemljama gdje posluje</li>
 <li>Usklađen s GDPR-om i drugim zakonima o zaštiti podataka</li>
 <li>Odgovoran za sigurno rukovanje podacima o karticama</li>
 </ul>
 <p className="text-gray-800">
 Stripe može postaviti kolačiće i koristiti druge tehnologije potrebne za sigurno procesiranje plaćanja. 
 Više informacija o Stripe politici privatnosti možete pronaći na njihovoj web stranici.
 </p>
 </section>
 
 <section className="mb-10">
 <h2 className="text-2xl mb-4 text-gray-900">13. Privatnost djece</h2>
 <p className="text-gray-800">Naše usluge nisu namijenjene osobama mlađim od 16 godina. Ne prikupljamo svjesno osobne podatke od djece. Ako saznate da nam je dijete dalo osobne podatke, molimo vas da nas kontaktirate.</p>
 </section>
 
 <section className="mb-10">
 <h2 className="text-2xl mb-4 text-gray-900">14. Promjene ove Politike privatnosti</h2>
 <p className="text-gray-800">Možemo povremeno ažurirati ovu Politiku privatnosti. Ažurirana verzija bit će označena ažuriranim datumom"Zadnje ažurirano". Potičemo vas da periodično pregledavate ovu Politiku privatnosti.</p>
 </section>
 
 <section className="mb-10">
 <h2 className="text-2xl mb-4 text-gray-900">15. Kontaktirajte nas</h2>
 <p className="text-gray-800">Ako imate pitanja o ovoj Politici privatnosti ili našim praksama s podacima, molimo kontaktirajte nas na:</p>
 <p className="text-gray-800">Email: info@smartblinds-croatia.com<br />
 Adresa: Split, Hrvatska
 </p>
 </section>
 
 <section>
 <h2 className="text-2xl mb-4 text-gray-900">16. Tijelo za zaštitu podataka</h2>
 <p className="text-gray-800">Imate pravo podnijeti pritužbu tijelu za zaštitu podataka ako smatrate da nismo postupali u skladu sa zakonima o zaštiti podataka. Relevantno tijelo za zaštitu podataka u Hrvatskoj je Agencija za zaštitu osobnih podataka (AZOP).</p>
 </section>
 </>
 );
};

export default RightsAndContactSection; 