import "./App.css";
import MainSideNav from "./components/MainSideNav";
import Content from "./components/Content";
import "bootstrap/dist/css/bootstrap.min.css";
import ExcelReader from "./components/ExcelReader";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";

function App() {
  const [data, setData] = useState([]);
  const onDataRead = (dataRead) => {
    setData(dataRead);
  };

  return (
    <div className="row">
      <ExcelReader key={'excelReader'} initialData={data} onSetData={onDataRead} />
      <MainSideNav key={"main"} menuData={data}></MainSideNav>
      <Routes>
        {data.map((item, index) => (
          <>{setRoute(item, index)}</>
        ))}
      </Routes>
    </div>
  );

  function setRoute(item, index) {
    if (item.hasOwnProperty("subMenu")) {
      item.subMenu.map((x, ind) => {
      return setRouter(ind, x, <Content item={item} />);
      });
    } else if (item.menu == "Home") {
      return setRouter(index, item, <Home>Home</Home>);
    } else {
      return setRouter(index, item, <Content item={item} />);
    }
  }

  function setRouter(index, x, routeElement) {
     return<Route key={index} path={x.path} element={routeElement}></Route>;
  }
}

export default App;
