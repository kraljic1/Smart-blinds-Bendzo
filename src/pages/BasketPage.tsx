import { Basket } from '../components/Basket/Basket';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

export default function BasketPage() {
  return (
    <>
      <SEO
        title="Shopping Basket | Smartblinds Croatia"
        description="Review your selections and proceed to checkout."
      />
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'Basket', path: '/basket' }
            ]}
          />
        </div>
        <Basket />
      </div>
    </>
  );
} 