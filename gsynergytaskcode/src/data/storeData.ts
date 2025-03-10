import { Store } from "../types/storeTypes";

export const storeData: Store[] = [
  { seq: 1, id: "ST035", label: "San Francisco Bay Trends", city: "San Francisco", state: "CA" },
  { seq: 2, id: "ST046", label: "Phoenix Sunwear", city: "Phoenix", state: "AZ" },
  { seq: 3, id: "ST064", label: "Dallas Ranch Supply", city: "Dallas", state: "TX" },
  { seq: 4, id: "ST066", label: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
  { seq: 5, id: "ST073", label: "Nashville Melody Music Store", city: "Nashville", state: "TN" },
  { seq: 6, id: "ST074", label: "New York Empire Eats", city: "New York", state: "NY" },
  { seq: 7, id: "ST091", label: "Denver Peaks Outdoor", city: "Denver", state: "CO" },
  { seq: 8, id: "ST094", label: "Philadelphia Liberty Market", city: "Philadelphia", state: "PA" },
  { seq: 9, id: "ST097", label: "Boston Harbor Books", city: "Boston", state: "MA" },
  { seq: 10, id: "ST101", label: "Austin Vibe Co.", city: "Austin", state: "TX" },
  { seq: 11, id: "ST131", label: "Los Angeles Luxe", city: "Los Angeles", state: "CA" },
  { seq: 12, id: "ST150", label: "Houston Harvest Market", city: "Houston", state: "TX" },
  { seq: 13, id: "ST151", label: "Portland Evergreen Goods", city: "Portland", state: "OR" },
  { seq: 14, id: "ST156", label: "Chicago Charm Boutique", city: "Chicago", state: "IL" },
  { seq: 15, id: "ST163", label: "Las Vegas Neon Treasures", city: "Las Vegas", state: "NV" },
  { seq: 16, id: "ST175", label: "Seattle Skyline Goods", city: "Seattle", state: "WA" },
  { seq: 17, id: "ST176", label: "Miami Breeze Apparel", city: "Miami", state: "FL" },
  { seq: 18, id: "ST177", label: "San Diego Wave Surf Shop", city: "San Diego", state: "CA" },
  { seq: 19, id: "ST193", label: "Charlotte Queen’s Closet", city: "Charlotte", state: "NC" },
  { seq: 20, id: "ST208", label: "Detroit Motor Gear", city: "Detroit", state: "MI" }
].map(store=>({
    ...store,
    id: parseInt(store.id.replace(/\D/g, ""), 10) 
}));
