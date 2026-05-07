import HeroSection from '@/components/hero/HeroSection';
import CatalogGrid from '@/components/catalog/CatalogGrid';
import OffersSection from '@/components/offers/OffersSection';
import ContactForm from '@/components/contact/ContactForm';
import BikeViewerWrapper from '@/components/3d/BikeViewerWrapper';

export default function Home() {
  return (
    <>
      <HeroSection />
      <BikeViewerWrapper />
      <CatalogGrid />
      <OffersSection />
      <ContactForm />
    </>
  );
}
