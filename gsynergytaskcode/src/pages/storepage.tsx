import React, { useState } from "react";
import { FaTrash, FaGripVertical } from "react-icons/fa";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./storelist.css";

interface Store {
  id: string | number;
  seq: number;
  label: string;
  city: string;
  state: string;
}

interface StoreListProps {
  data: Store[];
}

const StoreList: React.FC<StoreListProps> = ({ data }) => {
  const [storeList, setStoreList] = useState<Store[]>(data);

  const handleDelete = (id: string | number) => {
    const numericId =
      typeof id === "string" ? parseInt(id.replace(/\D/g, ""), 10) : id;
    const updatedList = storeList.filter((store) => store.id !== numericId);
    setStoreList(updatedList);
  };

  const handleAddStore = () => {
    const newStore: Store = {
      id: storeList.length + 1,
      seq: storeList.length + 1,
      label: "New Store",
      city: "New City",
      state: "NC",
    };
    setStoreList([...storeList, newStore]);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items =[...storeList];;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setStoreList(items);
  };

  return (
    <div className="store-container">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="stores">
          {(provided) => (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Action</th>
                  <th>S.No</th>
                  <th>Store</th>
                  <th>City</th>
                  <th>State</th>
                </tr>
              </thead>
               <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {storeList.map((store, index) => (
                  <Draggable
                    key={store.id.toString()}
                    draggableId={store.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <td>
                          <FaTrash
                            onClick={() => handleDelete(store.id)}
                            style={{ cursor: "pointer", color: "red" }}
                          />
                        </td>
                        <td>
                          <FaGripVertical />
                        </td>
                        <td>{store.seq}</td>
                        <td>{store.label}</td>
                        <td>{store.city}</td>
                        <td>{store.state}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>

      <div className="new-store-btn-container">
        <button className="add-store-btn" onClick={handleAddStore}>
          NEW STORE
        </button>
      </div>
    </div>
  );
};

export default StoreList;
