import { Basket } from '../components/Basket/Basket';
import CroatianSEO from '../components/SEO/CroatianSEO';
import Breadcrumb from '../components/Navigation/Breadcrumb';

export default function BasketPage() {
  return (
    <>
      <CroatianSEO
        title="Košarica | Smartblinds Croatia"
        description="Pregledajte vaš izbor i nastavite s narudžbom."
        keywords="košarica, narudžba, pametne rolete, smartblinds"
        pageType="info"
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