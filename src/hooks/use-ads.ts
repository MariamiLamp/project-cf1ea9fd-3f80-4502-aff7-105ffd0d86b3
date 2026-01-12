import { useEffect, useState } from "react";

export type AdPlacement = "hero-bottom" | "ats-bottom";

export type AdItem = {
  id: number;
  title?: string;
  description?: string;
  imageUrl: string;
  link?: string;
  placement: AdPlacement;
  enabled?: boolean;
};

const STORAGE_KEY = "site_ads";

const readFromStorage = (): AdItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AdItem[];
  } catch (e) {
    console.error("use-ads: failed to read storage", e);
    return [];
  }
};

const writeToStorage = (ads: AdItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ads));
  } catch (e) {
    console.error("use-ads: failed to write storage", e);
  }
};

export default function useAds() {
  const [ads, setAds] = useState<AdItem[]>(() => readFromStorage());

  useEffect(() => {
    const onStorage = () => setAds(readFromStorage());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = (ad: Omit<AdItem, "id">) => {
    const id = Date.now();
    const item: AdItem = { id, ...ad };
    const next = [...ads, item];
    setAds(next);
    writeToStorage(next);
    return item;
  };

  const remove = (id: number) => {
    const next = ads.filter((a) => a.id !== id);
    setAds(next);
    writeToStorage(next);
  };

  const update = (id: number, patch: Partial<AdItem>) => {
    const next = ads.map((a) => (a.id === id ? { ...a, ...patch } : a));
    setAds(next);
    writeToStorage(next);
    return next.find((a) => a.id === id) as AdItem | undefined;
  };

  const getByPlacement = (placement: AdPlacement) =>
    ads.filter((a) => a.placement === placement && a.enabled !== false);

  const clear = () => {
    setAds([]);
    writeToStorage([]);
  };

  return { ads, add, remove, getByPlacement, clear } as const;
}
