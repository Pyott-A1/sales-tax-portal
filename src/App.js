import SalesItems from './components/SalesItems';
import SalesCalc from './components/SalesCalc';
import { Table, Card, Row, Col, Container, CardBody, Form, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [tabID, setTabID] = useState(1);
  const [salesItems, setSalesItems] = useState([]);

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

  return (
    <div className="App">
      <header>
      <h1 className="App-header">Sales Tax Calculator</h1>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={tabID === 1 ? "active" : null}
            onClick={() => setTabID(1)}
          >
            Sales Items
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={tabID === 2 ? "active" : null}
            onClick={() => setTabID(2)}
          >
            Sales Calculator
          </NavLink>
        </NavItem>
      </Nav>
      </header>
      <TabContent activeTab={tabID}>
        <TabPane tabId={1}>
              <SalesItems isReadOnly={true} salesItems={salesItems}></SalesItems>
        </TabPane>
        <TabPane tabId={2}>
              <SalesCalc></SalesCalc>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default App;
