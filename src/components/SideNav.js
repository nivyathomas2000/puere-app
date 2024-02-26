import React from "react";
import { Link } from "react-router-dom";
import '../css/SideNav.css'

function SideNav(prop) {
    console.log(prop.menuData, 'llllllllllll');
    return (
        <div className="main col-2 col-md-2 col-lg-2">
            <nav>
                <ul>
                    {prop.menuData.map(x => (
                        <li key={x.menu}>
                            <Link to={'/' + x.menu}>{x.menu}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );

}

export default SideNav