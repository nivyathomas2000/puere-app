
import React from 'react'
import ExcelReader from './ExcelReader';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

function MenuExcelReader({ onSetData }) {

    const onDataRead = (dataRead) => {
        onSetData1(dataRead);
    };
    const initialPath = "/";
    const onSetData1 = (tempData) => {
        if (tempData) {
            console.log(tempData, "temp");
            let menuContentData = addCustomMenu();
            tempData.forEach((element) => {
                menuContentData.push({
                    menu: element.menu,
                    ...(element.data &&
                        element.data.length > 0 &&
                        setSubMenuData(element)),
                });
            });
            onSetData(menuContentData);
        }
    };

    const getPath = (element, content) => {
        return (
            initialPath +
            (element.menu.toLowerCase() +
                initialPath +
                content[0].replace(" ", "").toLowerCase())
        );
    };

    const setSubMenuData = (element) => {
        let isContentOnly = false;
        let subMenuDetails = [];
        element.data.forEach((content, index) => {
            if (index != 0 && content[0]) {
                subMenuDetails.push({
                    name: content[0] != "" && content[0],
                    path: getPath(element, content),
                    content: content[1],
                    html: content[2]
                });
            } else if (index != 0 && content[0] == null && content[1]) {
                subMenuDetails.push(content[1]);
                isContentOnly = true;
            }
        });

        return isContentOnly
            ? {
                content: subMenuDetails[0],
                isSubMenuPresent: false,
                path: initialPath + element.menu.toLowerCase(),
                html: element.data[1][2]
            }
            : {
                subMenu: subMenuDetails,
                isSubMenuPresent: true,
                iconOpened: <IoMdArrowDropup style={{ color: "white" }} />,
                iconClosed: <IoMdArrowDropdown style={{ color: "white" }} />,
            };
    };
    const addCustomMenu = () => {
        let temp = [];
        if (temp != null) {
            temp.push({
                menu: "Home",
                path: initialPath,
                isSubMenuPresent: false,
            });
            temp.push({
                menu: "Inventory",
                path: "/inventory",
                isSubMenuPresent: false,
            });
        }
        return temp;
    };
    return (
        <div>
            <ExcelReader onSetData={onDataRead} filePath="/Templates/Pueree.xlsx" />
        </div>
    )
}

export default MenuExcelReader
