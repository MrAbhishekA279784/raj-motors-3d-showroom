import { fetchBikes } from '@/lib/api';
import BikeCard from './BikeCard';
import { Bike } from '@ktm/shared';

export default async function CatalogGrid() {
  const bikes: Bike[] = await fetchBikes();

  return (
    <section id="catalog" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
            Our Collection
          </h2>
          <p className="mt-4 text-gray-400">
            Explore our premium range of motorcycles. Engineered for performance, designed to thrill.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bikes?.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
          {(!bikes || bikes.length === 0) && (
            <p className="text-zinc-500 text-center col-span-full">No motorcycles currently available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
