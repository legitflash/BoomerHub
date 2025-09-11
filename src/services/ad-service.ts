
'use server';

import type { Advertisement } from '@/lib/types';

let ads: Advertisement[] = [];

export async function createAdvertisement(adData: Omit<Advertisement, 'id'>): Promise<string> {
  const newAd: Advertisement = {
    id: String(ads.length + 1),
    createdAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    ...adData,
  };
  ads.push(newAd);
  return newAd.id;
}

export async function getAllAdvertisements(): Promise<Advertisement[]> {
  return ads;
}

export async function getActiveAdvertisementsByPlacement(placement: Advertisement['placement']): Promise<Advertisement[]> {
    return ads.filter(ad => ad.placement === placement && ad.isActive);
}

export async function getAdvertisementById(id: string): Promise<Advertisement | null> {
  return ads.find(ad => ad.id === id) || null;
}

export async function updateAdvertisement(id: string, adData: Partial<Omit<Advertisement, 'id'>>): Promise<void> {
  const index = ads.findIndex(ad => ad.id === id);
  if (index !== -1) {
    ads[index] = { ...ads[index], ...adData } as Advertisement;
  }
}

export async function deleteAdvertisement(id: string): Promise<void> {
  ads = ads.filter(ad => ad.id !== id);
}
