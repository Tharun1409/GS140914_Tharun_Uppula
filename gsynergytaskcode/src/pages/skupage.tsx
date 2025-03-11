import React, { useState } from "react";
import { SkuStoreData } from "../data/storeData";
import { FaTrash, FaEdit } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./skulist.css";

interface SKU {
  id: string;
  label: string;
  class: string;
  department: string;
  price: string;
  cost: string;
}

const SKUList: React.FC = () => {
  const [skuData, setSkuData] = useState<SKU[]>(SkuStoreData);

 
  const handleAddSKU = () => {
    const newSKU: SKU = {
      id: `SK00${skuData.length + 1}`, 
      label: "New SKU",
      class: "Category",
      department: "Department",
      price: "$0.00",
      cost: "$0.00",
    };
    setSkuData([...skuData, newSKU]);
  };

 
  const handleDelete = (id: string) => {
    const updatedList = skuData.filter((sku) => sku.id !== id);
    setSkuData(updatedList);
  };


  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedData = [...skuData];
    const [reorderedItem] = updatedData.splice(result.source.index, 1);
    updatedData.splice(result.destination.index, 0, reorderedItem);

    setSkuData(updatedData);
  };

  return (
    <div className="sku-container">
      <button className="add-sku-btn" onClick={handleAddSKU}>
        Add New SKU
      </button>

      {skuData.length === 0 ? (
        <p className="empty-message">No SKU data available. Please add new SKUs.</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="skuTable">
            {(provided) => (
              <table
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="sku-table"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Label</th>
                    <th>Class</th>
                    <th>Department</th>
                    <th>Price</th>
                    <th>Cost</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {skuData.map((sku, index) => (
                    <Draggable
                      key={sku.id}
                      draggableId={sku.id}
                      index={index}
                    >
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="sku-row"
                        >
                          <td>{sku.id}</td>
                          <td>{sku.label}</td>
                          <td>{sku.class}</td>
                          <td>{sku.department}</td>
                          <td>{sku.price}</td>
                          <td>{sku.cost}</td>
                          <td>
                            <FaTrash
                              onClick={() => handleDelete(sku.id)}
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </td>
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
      )}
    </div>
  );
};

export default SKUList;
