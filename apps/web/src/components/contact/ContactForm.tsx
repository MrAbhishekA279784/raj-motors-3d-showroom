'use client';

import { useState } from 'react';
import { submitContact } from '@/lib/api';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      bikeInterest: formData.get('bikeInterest') as string,
      message: (formData.get('message') as string) || '',
    };

    const res = await submitContact(data);
    setLoading(false);

    if (res.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSuccess(false), 5000);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <div>
            <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-6 leading-none">
              Book a <br /> Test Ride
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
              Experience the adrenaline firsthand. Fill out the form to schedule a test ride at our dealership.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                  <span className="text-red-500 font-bold font-mono">01</span>
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm">Select Your Bike</h4>
                  <p className="text-gray-500 text-sm">Choose from our premium inventory</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                  <span className="text-red-500 font-bold font-mono">02</span>
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm">Schedule Time</h4>
                  <p className="text-gray-500 text-sm">We'll call to confirm your slot</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                  <span className="text-red-500 font-bold font-mono">03</span>
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm">Ride & Decide</h4>
                  <p className="text-gray-500 text-sm">Experience the thrill</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-[100px] pointer-events-none" />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    pattern="^[6-9]\d{9}$"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="bike" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Bike Interest *</label>
                <select
                  id="bike"
                  name="bikeInterest"
                  required
                  defaultValue=""
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors appearance-none"
                >
                  <option value="" disabled>Select a motorcycle</option>
                  <option value="Pulsar NS200">Pulsar NS200</option>
                  <option value="Apache RTR 160">Apache RTR 160</option>
                  <option value="Dominar 400">Dominar 400</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors resize-none"
                  placeholder="Any specific questions or preferred time?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold tracking-widest uppercase py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Request Test Ride'}
              </button>

              {success && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-center text-sm">
                  Request submitted successfully! We will contact you soon.
                </div>
              )}
              {errorMsg && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-center text-sm">
                  Error: {errorMsg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
