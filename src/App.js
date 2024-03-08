import "./App.css";
import MainSideNav from "./components/MainSideNav";
import Content from "./components/Content";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuExcelReader from "./components/MenuExcelReader";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";
import InventoryExcelReader from "./components/InventoryExcelReader";

function App() {
  const [data, setData] = useState([]);

  const onDataRead = (dataRead) => {
    setData(dataRead);
  };

  const setRouter = (index, x, routeElement) => {
    return <Route key={index} path={x.path} element={routeElement} />;
  };

  const setRoute = () => {
    if (data != null) {
      return data.map((item, index) => {
        if (item.hasOwnProperty("subMenu")) {
          return item.subMenu.map((x, i) => {
            return setRouter(`${index}-${i}`, x, <Content item={x} />);
          });
        } else if (item.menu == "Home") {
          return setRouter(index, item, <Home />);
        }
        else if (item.menu == "Inventory") {
          return setRouter(index, item, <InventoryExcelReader />);
        } else {
          return setRouter(index, item, <Content item={item} />);
        }
      });
    }
  };

  return (
    <div className="row">
      <MenuExcelReader
        key={"excelReader"}
        onSetData={onDataRead}
      />
      <MainSideNav key={"main"} menuData={data}></MainSideNav>
      <Routes>
        <>{setRoute()}</>
      </Routes>
    </div>
  );
}

export default App;
