/**
 * Component for rendering Croatian-specific meta tags
 */
export const CroatianMetaTags = () => {
 return (
 <>
 {/* Croatian Language Meta Tags */}
 <meta name="geo.position"content="45.815;15.9819"/>
 <meta name="ICBM"content="45.815, 15.9819"/>
 <meta name="dc.language"content="hr"/>
 
 {/* Local Business Information */}
 <meta name="business:contact_data:street_address"content="Ilica 123"/>
 <meta name="business:contact_data:locality"content="Zagreb"/>
 <meta name="business:contact_data:region"content="Zagreb"/>
 <meta name="business:contact_data:postal_code"content="10000"/>
 <meta name="business:contact_data:country_name"content="Hrvatska"/>
 <meta name="business:contact_data:phone_number"content="+385-1-2345-678"/>
 <meta name="business:contact_data:email"content="info@smartblinds.hr"/>
 
 {/* Croatian Specific Social Meta */}
 <meta property="og:locale"content="hr_HR"/>
 <meta property="og:locale:alternate"content="en_US"/>
 
 {/* Content Language */}
 <meta httpEquiv="content-language"content="hr"/>
 
 {/* Currency and Pricing */}
 <meta name="currency"content="EUR"/>
 <meta name="price_range"content="€€"/>
 
 {/* Local SEO */}
 <meta name="geo.region"content="HR-21"/>
 <meta name="geo.placename"content="Zagreb, Hrvatska"/>
 </>
 );
}; 