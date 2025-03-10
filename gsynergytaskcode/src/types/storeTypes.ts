export interface Store {
    id: string | number;  
    seq: number;
    label: string;
    city: string;
    state: string;
}
// types/storeTypes.ts
export interface DataStore {
    id: string;
    label: string;
    class: string;
    department: string;
    price: string;
    cost: string;
  }
  
  export interface IStoreData {
    Store: string;
    SKU: string;
    Week: string;
    SalesUnits: number;
    Price: number;
    Cost: number;
}
