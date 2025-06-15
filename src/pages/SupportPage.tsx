import React from 'react';
import CroatianSEO from '../components/SEO/CroatianSEO';

const SupportPage = () => {
 return (
 <>
 <CroatianSEO 
 title="Podrška - Smartblinds Hrvatska | Pomoć"
 description="Potrebna vam je pomoć s pametnim roletama? Kontaktirajte naš tim za podršku. Odgovorimo na sva vaša pitanja o instalaciji, korištenju i održavanju."
 keywords="podrška, pomoć, kontakt, smartblinds, pametne rolete, instalacija, jamstvo"
 pageType="support"
 ogType="website"
 breadcrumbs={[
 { name: 'Početna', item: 'https://bendzosmartblinds.netlify.app/' },
 { name: 'Podrška', item: 'https://bendzosmartblinds.netlify.app/support' }
 ]}
 />
 <div className="modern-page-container">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <h1 className="modern-page-title">Podrška</h1>
 <p className="modern-page-subtitle">Tu smo da pomognemo s bilo kojim pitanjima koje možda imate.</p>
 
 <div className="grid md:grid-cols-2 gap-8 mb-16">
 <div className="modern-card-container">
 <div className="modern-card-bg"></div>
 <h2 className="modern-card-title">Kontaktirajte nas</h2>
 <form className="space-y-5">
 <div>
 <label htmlFor="support-name"className="block text-sm font-medium text-gray-700 mb-1.5">Ime</label>
 <input 
 type="text"
 id="support-name"
 name="support-name"
 className="modern-input"
 placeholder="Vaše ime"
 required
 autoComplete="name"
 />
 </div>
 <div>
 <label htmlFor="support-email"className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
 <input 
 type="email"
 id="support-email"
 name="support-email"
 className="modern-input"
 placeholder="vas.email@primjer.com"
 required
 autoComplete="email"
 />
 </div>
 <div>
 <label htmlFor="support-message"className="block text-sm font-medium text-gray-700 mb-1.5">Poruka</label>
 <textarea 
 id="support-message"
 name="support-message"
 rows={4} 
 className="modern-input"
 placeholder="Kako vam možemo pomoći?"
 required
 autoComplete="off"
 ></textarea>
 </div>
 <button 
 type="submit"
 className="modern-button"
 >
 Pošaljite poruku
 </button>
 </form>
 </div>
 
 <div className="modern-card-container">
 <div className="modern-card-bg"></div>
 <h2 className="modern-card-title">Česta pitanja</h2>
 <div className="space-y-6">
 {[
 {
 q:"Koliko dugo traje instalacija?",
 a:"Instalacija obično traje 15-30 minuta po prozoru."
 },
 {
 q:"Koliko traje baterija?",
 a:"Naše baterije traju do 12 mjeseci pri normalnoj uporabi."
 },
 {
 q:"Nudite li jamstvo?",
 a:"Da, nudimo 5-godišnje jamstvo na sve naše proizvode."
 }
 ].map((faq, index) => (
 <div key={index} className="modern-item-card">
 <h3 className="font-semibold text-lg text-gray-900 mb-2">{faq.q}</h3>
 <p className="modern-info-text">{faq.a}</p>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 </>
 );
};

export default SupportPage;