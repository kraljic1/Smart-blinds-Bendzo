import React from 'react';

interface ItemsTableProps {
 items: {
 id: string;
 name: string;
 quantity: number;
 unitPrice: number;
 totalPrice: number;
 description: string;
 }[];
 currency: string;
}

const ItemsTable: React.FC<ItemsTableProps> = ({ items, currency }) => {
 return (
 <div className="items-section">
 <table className="items-table">
 <thead>
 <tr>
 <th>Proizvod</th>
 <th>Količina</th>
 <th>Jedinična cijena</th>
 <th>Ukupno</th>
 </tr>
 </thead>
 <tbody>
 {items.map((item, index) => (
 <tr key={index}>
 <td>
 <div className="item-info">
 <strong>{item.name}</strong>
 {item.description && <p className="item-description">{item.description}</p>}
 </div>
 </td>
 <td>{item.quantity}</td>
 <td>{item.unitPrice.toFixed(2)} {currency}</td>
 <td>{item.totalPrice.toFixed(2)} {currency}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 );
};

export default ItemsTable; 