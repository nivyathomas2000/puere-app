import React from "react";
import { Link } from "react-router-dom";
import "../css/SideNav.css";
import SubMenu from "./SubMenu";

function SideNav(prop) {
  return (
    <div className="main col-2 col-md-2 col-lg-2">
      <nav>
        <ul>          
        {prop.menuData.map(x => (
            <React.Fragment key={x.menu}>
              <li>
                <Link to={"/" + x.path}>{x.menu}</Link>
              </li>
              {x.subMenu && <SubMenu subMenu={x} />}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SideNav;
