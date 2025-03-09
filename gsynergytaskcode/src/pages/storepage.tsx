// components/StoreList.tsx
import React from "react";
import { Store } from "../types/storeTypes";

interface StoreListProps {
  data: Store[];
}

const StoreList: React.FC<StoreListProps> = ({ data }) => {
  return (
    <div>
      <h2>Store List</h2>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Store</th>
            <th>City</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {data.map((store) => (
            <tr key={store.id}>
              <td>{store.seq}</td>
              <td>{store.label}</td>
              <td>{store.city}</td>
              <td>{store.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;
