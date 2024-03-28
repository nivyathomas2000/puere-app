import SubMenu from "./SubMenu";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

function MenuFromExcel({ item, location }) {
    const [isExpanded, setDropDown] = useState(false)
    const ExpandOrCollapse = () => {
        if (item.isSubMenuPresent) {
            setDropDown(!isExpanded);
        }
    }
    return (
        <>
            <div onClick={ExpandOrCollapse}>
                <li
                    className=
                    {`list-sub ${(!item.isSubMenuPresent
                        && location.pathname == item.path)
                        ? 'selected'
                        : (isExpanded && 'show')}`
                    }>
                    <NavLink
                        className={`link ${(!item.isSubMenuPresent
                            && location.pathname == item.path)
                            ? 'selected'
                            : (isExpanded && 'show')}`}
                        to={!item.isSubMenuPresent && item.path}>
                        {item.menu}
                    </NavLink>
                    <div className="icon-dropdown">
                        {(item.isSubMenuPresent && isExpanded)
                            ? <IoMdArrowDropup style={{ color: "white" }} />
                            : (item.isSubMenuPresent && <IoMdArrowDropdown style={{ color: "white" }} />)
                        }
                    </div>
                </li>
            </div>
            {
                (item.subMenu && isExpanded) &&
                <SubMenu
                    subMenu={item.subMenu}
                    location={location}>
                </SubMenu>
            }
        </>
    )
}
export default MenuFromExcel;
