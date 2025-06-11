import React from 'react';

const DataUsageSection: React.FC = () => {
 return (
 <>
 <section className="mb-10">
 <h2 className="text-2xl mb-4 text-gray-900">4. Pravna osnova za obradu</h2>
 <p className="text-gray-800">Vaše osobne podatke obrađujemo na temelju sljedećih pravnih osnova:</p>
 <ul className="list-disc pl-5 mb-4 text-gray-800">
 <li><strong>Ugovor:</strong> Obrada nužna za izvršenje ugovora s vama</li>
 <li><strong>Zakonska obveza:</strong> Obrada nužna za usklađenost s našim zakonskim obvezama</li>
 <li><strong>Legitimni interesi:</strong> Obrada nužna za naše legitimne interese</li>
 <li><strong>Pristanak:</strong> Kada ste dali pristanak za specifične aktivnosti obrade</li>
 </ul>
 </section>
 
 <section className="mb-10">
 <h2 className="text-2xl mb-4 text-gray-900">5. Kako koristimo vaše informacije</h2>
 <p className="text-gray-800">Vaše informacije koristimo za sljedeće svrhe:</p>
 <ul className="list-disc pl-5 mb-4 text-gray-800">
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
 <h2 className="text-2xl mb-4 text-gray-900">6. Zadržavanje podataka</h2>
 <p className="text-gray-800">Vaše osobne podatke zadržavamo samo onoliko dugo koliko je potrebno za ispunjenje svrha za koje su prikupljeni, uključujući zadovoljavanje zakonskih, računovodstvenih ili izvještajnih zahtjeva.</p>
 <p className="text-gray-800">Različite vrste podataka mogu se čuvati različita razdoblja. Pri određivanju odgovarajućih razdoblja čuvanja, razmatramo:</p>
 <ul className="list-disc pl-5 mb-4 text-gray-800">
 <li>Količinu, prirodu i osjetljivost osobnih podataka</li>
 <li>Potencijalni rizik od štete zbog neovlaštene uporabe ili otkrivanja</li>
 <li>Svrhe za koje obrađujemo podatke</li>
 <li>Možemo li postići te svrhe drugim sredstvima</li>
 <li>Primjenjive zakonske zahtjeve</li>
 </ul>
 </section>
 </>
 );
};

export default DataUsageSection; 