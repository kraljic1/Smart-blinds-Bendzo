import React from 'react';

const CookiesAndPaymentSection: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default CookiesAndPaymentSection; 