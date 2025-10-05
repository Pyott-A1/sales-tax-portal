import { useEffect, useState } from 'react';
import { Table, Input, Label } from 'reactstrap';

const CalculatedItems = props => {

    const { isReadOnly, calculatedItems } = props

    if(calculatedItems.length < 1)
        return null

    return (
        <div>
        <Table>
        <thead>
            <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Count</th>
            </tr>
        </thead>
        <tbody>
            {calculatedItems.salesItems.map((item) =>{
            return(
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.itemName}</td>
                <td>{item.price}</td>
                <td>{item.count}</td>
                </tr>
            ) 
            })}
        </tbody>
        </Table>
        <Label>Sales Taxes: {calculatedItems.salesTax.toFixed(2)}</Label>
        <br />
        <Label>Total: {calculatedItems.totalPrice.toFixed(2)}</Label>
        </div>
  )
  }
  export default CalculatedItems;