import { Basket } from '../components/Basket/Basket';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

export default function BasketPage() {
  return (
    <>
      <SEO
        title="Košarica | Smartblinds Croatia"
        description="Pregledajte vaš izbor i nastavite s narudžbom."
      />
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Početna', path: '/' },
              { label: 'Košarica', path: '/basket' }
            ]}
          />
        </div>
        <Basket />
      </div>
    </>
  );
} 