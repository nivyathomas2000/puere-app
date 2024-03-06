import './App.css';
import MainSideNav from './components/MainSideNav';
import Content from './components/Content';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExcelReader from './components/ExcelReader';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Home from './components/Home';


function App() {
  const [data, setData] = useState([]);
  const onDataRead = (dataRead) => {
    setData(dataRead);
  }

  return (
    <div className='row'>
      <ExcelReader key={'1'} initialData={data} onSetData={onDataRead}/>
      <MainSideNav key={'2'} menuData={data}></MainSideNav>          
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        {data.map((item, index) => (
          <>
            {item.hasOwnProperty('subMenu') ?
              (item.subMenu.map((x, ind) => (
                <Route key={ind} path={x.path} 
                  element={<Content item={x} />}>
                </Route>
              ))) : 
              (<Route key={index} path={item.path} 
              element={<Content item={item} />}>
              </Route>)}</>
        ))}
      </Routes>
    </div>
  );
}

export default App;
