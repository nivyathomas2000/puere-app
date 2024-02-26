import './App.css';
import SideNav from './components/SideNav';
import Content from './components/Content';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExcelReader from './components/ExcelReader';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const onDataRead = (dataRead) => {
    setData(dataRead);
  }

  return (
    <div className='row'>
      <ExcelReader initialData={[]} onSetData={onDataRead}></ExcelReader>
      <SideNav menuData={data}></SideNav>
      <Content></Content>
    </div>
  );
}

export default App;
