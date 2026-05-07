import { fetchOffers } from '@/lib/api';
import OfferCard from './OfferCard';

export default async function OffersSection() {
  const offers = await fetchOffers();

  return (
    <section id="offers" className="py-24 bg-black relative border-y border-white/10">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510168925345-0370d10b71ee?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] grayscale mix-blend-screen" />
      
      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-4">
              Exclusive Offers
            </h2>
            <p className="text-gray-400 text-lg">
              Unlock exceptional value with our limited-time dealership promotions and financing options.
            </p>
          </div>
          <button className="text-white hover:text-red-500 uppercase tracking-widest text-sm font-bold border-b-2 border-transparent hover:border-red-500 transition-all font-mono">
            View All Terms →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers?.map((offer: any) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
          {(!offers || offers.length === 0) && (
            <p className="text-zinc-500 col-span-full">No active offers at this moment.</p>
          )}
        </div>
      </div>
    </section>
  );
}
