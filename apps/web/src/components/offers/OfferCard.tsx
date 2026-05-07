import { Tag, Sparkles, CreditCard, Gift } from 'lucide-react';

interface OfferCardProps {
  offer: {
    id: string;
    title: string;
    description: string;
    discount: string;
    type: string;
  };
}

const getIcon = (type: string) => {
  switch (type) {
    case 'festival': return <Sparkles size={24} className="text-yellow-400" />;
    case 'emi': return <CreditCard size={24} className="text-blue-400" />;
    case 'accessory': return <Gift size={24} className="text-purple-400" />;
    default: return <Tag size={24} className="text-red-400" />;
  }
};

export default function OfferCard({ offer }: OfferCardProps) {
  return (
    <div className="relative group p-8 rounded-2xl bg-zinc-900 border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center mb-6">
          {getIcon(offer.type)}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{offer.title}</h3>
        <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
          {offer.description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-white/10">
          <p className="text-red-500 font-bold uppercase tracking-widest text-sm text-center">
            {offer.discount}
          </p>
        </div>
      </div>
    </div>
  );
}
