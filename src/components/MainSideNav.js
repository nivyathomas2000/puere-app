import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/SideNav.css";
import MenuFromExcel from "./MenuFromExcel";

function MainSideNav({ menuData }) {
  const location = useLocation();
  return (
    <div className="main col-2 col-md-2 col-lg-2">
    <div className="title-content">
    <h1 className="title">PÜREE</h1>
      <p className="sub-title">
      Platform For The Overview And Research of IT Experience
      </p>
    </div>        
      <nav className="nav-div">
        <ul className="ul-list">
          <>
            <li className={`list-sub 
                ${(location.pathname == '/')
              && 'selected'}`}>
              <Link className="link" to={"/"}>Home</Link>
            </li>
            {menuData.map((item, index) => (
              <MenuFromExcel key={index} item={item} location={location} />
            ))}
          </>
        </ul>
      </nav>
    </div>
  );
}

export default MainSideNav;
