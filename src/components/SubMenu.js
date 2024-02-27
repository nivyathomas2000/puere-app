import React from "react";
import { Link } from "react-router-dom";
import "../css/SideNav.css";

function SubMenu(prop) {
    console.log(prop.subMenu,'hhhhhhhhhhhhhhh')
  return (
    <div className="main">
      <nav>
        <ul>
          {prop.subMenu.subMenu.map((x) => (
            <li key={x.name}>
              <Link to={"/" +prop.subMenu.path +"/"+ x.name}>{x.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SubMenu;
