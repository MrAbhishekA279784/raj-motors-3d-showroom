const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchBikes = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/bikes`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch bikes');
    return await res.json();
  } catch (error) {
    console.error('Error fetching bikes:', error);
    return [];
  }
};

export const fetchOffers = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/offers`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch offers');
    return await res.json();
  } catch (error) {
    console.error('Error fetching offers:', error);
    return [];
  }
};

export const submitContact = async (data: any) => {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to submit contact');
    
    return { success: true, message: result.message };
  } catch (error: any) {
    console.error('Error submitting contact:', error);
    return { success: false, message: error.message };
  }
};
