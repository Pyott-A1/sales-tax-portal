import { useEffect, useState } from 'react';
import { Table, Input, Button } from 'reactstrap';

const SalesItems = props => {

    const { isReadOnly, salesItems, addSelected, removeSelected, selectedSales, setPrice, setSalesTax, setImportTax } = props

    return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Price</th>
          <th>Sales Tax</th>
          <th>Import Tax</th>
          {!isReadOnly ? 
          <>
            <th></th>
            <th>Selected</th>
            <th></th>
          </>
          : null}
        </tr>
      </thead>
      <tbody>
        {salesItems.map((item) =>{
           return(
            <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.itemName}</td>
            <td><Input className='w-50' readOnly={isReadOnly} onChange={(e) => setPrice(item.id, e.target.value )} defaultValue={item.price}></Input></td>
            <td><Input type="checkbox" disabled={isReadOnly} onChange={(e) => setSalesTax(item.id, e.target.checked )} defaultChecked={item.salesTax}/></td>
            <td><Input type="checkbox" disabled={isReadOnly} onChange={(e) => setImportTax(item.id, e.target.checked )} defaultChecked={item.importTax}/></td>
            {!isReadOnly ? 
            <>
            <td>
                <Button 
                    outline color="danger"
                    onClick={() => removeSelected(item.id)}
                >
                     - 
                </Button>
            </td>
            <td>
                <Input className='w-50' readOnly value={item.count}></Input>
            </td>
            <td>
                <Button 
                    outline color="success"
                    onClick={() => addSelected(item.id)}
                >
                    +
                </Button>
            </td>
            </> : null}
            </tr>
           ) 
        })}
      </tbody>
    </Table>
  )
  }
  export default SalesItems;