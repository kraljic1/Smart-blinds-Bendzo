import React from 'react';

const DataCollectionSection: React.FC = () => {
 return (
 <>
 <section className="mb-10">
 <h2 className="text-2xl mb-4 text-gray-900">1. Uvod</h2>
 <p className="text-gray-800">Dobrodošli u Smartblinds ("mi","naš"ili"nas"). Posvećeni smo zaštiti vaše privatnosti i osobnih podataka. Ova Politika privatnosti objašnjava kako prikupljamo, koristimo, otkrivamo i štitimo vaše podatke kada posjećujete našu web stranicu i koristite naše usluge.</p>
 <p className="text-gray-800">Ova Politika privatnosti usklađena je s Općom uredbom o zaštiti podataka (GDPR) i drugim relevantnim zakonima o zaštiti podataka Europskog unije.</p>
 </section>
 
 <section className="mb-10">
 <h2 className="text-2xl mb-4 text-gray-900">2. Voditelj obrade podataka</h2>
 <p className="text-gray-800">U svrhu GDPR-a, Smartblinds Hrvatska je voditelj obrade podataka odgovoran za vaše osobne podatke.</p>
 <p className="text-gray-800">Kontakt podaci:<br />
 Email: info@smartblinds-croatia.com<br />
 Adresa: Split, Hrvatska
 </p>
 </section>
 
 <section className="mb-10">
 <h2 className="text-2xl mb-4 text-gray-900">3. Informacije koje prikupljamo</h2>
 <p className="text-gray-800">Prikupljamo sljedeće vrste informacija:</p>
 <h3 className="text-xl mb-2 mt-4 text-gray-900">3.1 Osobni podaci</h3>
 <p className="text-gray-800">Osobni podaci su informacije koje vas mogu identificirati kao pojedinca. Možemo prikupljati:</p>
 <ul className="list-disc pl-5 mb-4 text-gray-800">
 <li>Kontakt informacije (ime, email adresa, telefonski broj, adresa za dostavu)</li>
 <li>Informacije o računu (korisničko ime, lozinka)</li>
 <li>Informacije o plaćanju (podaci o kreditnoj kartici se obrađuju direktno putem Stripe-a, mi ne pohranjujemo podatke o kartici)</li>
 <li>Povijest narudžbi i preferencije</li>
 <li>Podaci o komunikaciji (kada kontaktirate našu korisničku podršku)</li>
 </ul>
 
 <h3 className="text-xl mb-2 mt-4 text-gray-900">3.1.1 Napomena o podacima plaćanja</h3>
 <p className="text-gray-800">
 <strong>Važno:</strong> Vaši podaci o kreditnoj/debitnoj kartici (broj kartice, CVV, datum isteka) 
 se nikad ne pohranjuju na našim serverima. Ovi osjetljivi podaci se obrađuju direktno putem 
 Stripe-a koji je certificiran prema PCI DSS Level 1 standardima. Mi primamo samo potvrdu o 
 uspješnosti ili neuspješnosti transakcije.
 </p>
 
 <h3 className="text-xl mb-2 mt-4 text-gray-900">3.2 Podaci o korištenju</h3>
 <p className="text-gray-800">Automatski prikupljamo određene informacije kada posjećujete našu web stranicu:</p>
 <ul className="list-disc pl-5 mb-4 text-gray-800">
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
 </>
 );
};

export default DataCollectionSection; 