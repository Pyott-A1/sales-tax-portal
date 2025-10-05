import { Input, Container, Row, Col, Card, CardBody, Label } from "reactstrap";
import '../App.css';
import SalesItems from "./SalesItems";
import CalculatedItems from "./CalculatedItems";
import { useState, useEffect } from "react";

const SalesCalc = props => {

    const [selectedSales, setselectedSales] = useState([])
    const [salesItems, setSalesItems] = useState([]);
    const [calculatedItems, setCalculatedItems] = useState([]);

    const getSalesItems = () =>{
        fetch(`https://localhost:7283/Sales/GetSalesItems`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setSalesItems(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getSalesItems();
    }, [])
    
    const addSelected = (id) => {
        setSalesItems(salesItems => 
            salesItems.map(item =>
               item.id === id
               ? {...item, count: item.count ? item.count++ : 1} 
               : item
            )
        );
    }

    const removeSelected = (id) => {
        setSalesItems(salesItems => 
            salesItems.map(item =>
               item.id === id
               ? {...item, count: item.count ? item.count-- : 0} 
               : item
            )
        );
    }

    const setPrice = (id, price) => {
        setSalesItems(salesItems => 
            salesItems.map(item =>
               item.id === id
               ? {...item, price: price} 
               : item
            )
        );
    }

    const setSalesTax = (id, tax) => {
        setSalesItems(salesItems => 
            salesItems.map(item =>
               item.id === id
               ? {...item, salesTax: tax} 
               : item
            )
        );
    }

    const setImportTax = (id, tax) => {
        setSalesItems(salesItems => 
            salesItems.map(item =>
               item.id === id
               ? {...item, importTax: tax} 
               : item
            )
        );
    }

    const calculateTax = () => {
        let selectedItems = salesItems.filter((item) => item.count > 0)

        if(selectedItems.length < 1){
            setCalculatedItems([])
            return;
        }

        fetch(`https://localhost:7283/Sales/CalculateTotal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedItems)
        })
            .then(response => response.json())
            .then(data => {
                if(!data.errors){
                    setCalculatedItems(data)
                }
                else{
                    setCalculatedItems([])
                }
            })
            .catch(err => {
                console.log(err)
            })


    }

    useEffect(() => {
        calculateTax()
    }, [salesItems])

    return (
            <Row>
                <Col>
                <Card className="Card-Full">
                    <CardBody>
                        <SalesItems 
                            salesItems={salesItems} 
                            isReadOnly={false} 
                            selectedSales={selectedSales} 
                            setPrice={setPrice} 
                            addSelected={addSelected} 
                            removeSelected={removeSelected}
                            setImportTax={setImportTax}
                            setSalesTax={setSalesTax}
                            >
                        </SalesItems>
                    </CardBody>
                    </Card>
                </Col>
                <Col className="float-right">
                    <Card className="Card-Full">
                        <CardBody>
                        <Row>
                            <CalculatedItems calculatedItems={calculatedItems}></CalculatedItems>
                        </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
    )

}
export default SalesCalc;