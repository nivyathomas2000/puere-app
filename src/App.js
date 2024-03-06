import "./App.css";
import MainSideNav from "./components/MainSideNav";
import Content from "./components/Content";
import "bootstrap/dist/css/bootstrap.min.css";
import ExcelReader from "./components/ExcelReader";
import { useEffect, useState } from "react";
import {
  BrowserRouter as 
  Route,
  Routes,
  useHistory
} from "react-router-dom";
import Home from "./components/Home";

function App() {
  const [data, setData] = useState([]);
  const history = useHistory();

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
        } else {
          return setRouter(index, item, <Content item={item} />);
        }
      });
    }
  };

  useEffect(() => {
    const initialPath = "/";
    history.push(initialPath);
  }, [history]);

  return (
    <div className="row">
      <ExcelReader
        key={"excelReader"}
        initialData={data}
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
