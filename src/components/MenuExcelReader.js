
// import React, { useEffect } from 'react'
//import { emitter } from './Modal';
// import ExcelReader from './ExcelReader';
// import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

function MenuExcelReader({ onSetData, file }) {
   
    // const onDataRead = (dataRead) => {
    //     SetData(dataRead)       
    // };
    
    const initialPath = "/";
    // useEffect=(()=>{
    //     addCustomMenu();
    //     console.log("useEffect called");

    // },[])
    
    // const SetData = (tempData) => {
    //     if (tempData) {
    //         console.log(tempData, "temp");
    //         let menuContentData = addCustomMenu();
    //         tempData.forEach((element) => {
    //             menuContentData.push({
    //                 menu: element.menu,
    //                 isEditContent:false,
    //                 ...(element.data &&
    //                     element.data.length > 0 &&
    //                     setSubMenuData(element)),
    //             });
    //         });
    //         onSetData(menuContentData);
    //     }
    // };

    // const getPath = (element, content) => {
    //     return (
    //         initialPath +
    //         (element.menu.toLowerCase() +
    //             initialPath +
    //             content[0].replace(" ", "").toLowerCase())
    //     );
    // };

    // const setSubMenuData = (element) => {
    //     let isContentOnly = false;
    //     let subMenuDetails = [];
    //     element.data.forEach((content, index) => {
    //         if (index != 0 && content[0]) {
    //             subMenuDetails.push({
    //                 menu: content[0] != "" && content[0],
    //                 path: getPath(element, content),
    //                 content: content[1],
    //                 html: content[2]
    //             });
    //         } else if (index != 0 && content[0] == null && content[1]) {
    //             subMenuDetails.push(content[1]);
    //             isContentOnly = true;
    //         }
    //     });

    //     return isContentOnly
    //         ? {
    //             content: subMenuDetails[0],
    //             isSubMenuPresent: false,
    //             path: initialPath + element.menu.toLowerCase(),
    //             html: element.data[1][2],                
    //         }
    //         : {
    //             subMenu: subMenuDetails,
    //             isSubMenuPresent: true,
    //             iconOpened: <IoMdArrowDropup style={{ color: "white" }} />,
    //             iconClosed: <IoMdArrowDropdown style={{ color: "white" }} />,
    //         };
    // };
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
        onSetData(temp) ;
    };

    addCustomMenu();
    return null;
    // return (
    //     <div>
    //         <ExcelReader onSetData={onDataRead} type="appData" filePath={file} />
    //     </div>
    // )
}

export default MenuExcelReader
