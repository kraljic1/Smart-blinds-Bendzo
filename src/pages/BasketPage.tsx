import { Helmet } from 'react-helmet-async';
import { Basket } from '../components/Basket/Basket';
import SEO from '../components/SEO/SEO';
import Breadcrumb from '../components/Navigation/Breadcrumb';

export default function BasketPage() {
  return (
    <>
      <Helmet>
        <SEO
          title="Košarica | Smartblinds Croatia"
          description="Pregledajte vaš izbor i nastavite s narudžbom."
        />
      </Helmet>
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