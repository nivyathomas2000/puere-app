import React from "react";
import { Link } from "react-router-dom";
import "../css/SubMenu.css";

function SubMenu(prop) {
  return (
    <div className="sub-main">
      <nav>
        <ul className="ul-list">
          {prop.subMenu.map((x) => (
            <li
              key={x.name}
              className={`list-sub 
            ${prop.location.pathname == x.path && "selected"}`}
              style={{ borderBottom: "none" }}
            >
              <Link
                className={`link ${
                  prop.location.pathname == x.path && "selected"
                }`}
                to={x.path}
                style={{ fontSize: "15px", color:"#999999" }}
              >
                {x.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SubMenu;
