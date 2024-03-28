import React, { useEffect, useState } from 'react';
import emitter from './EventEmitter'; // Importing 'emitter' from 'eventEmitter.js'
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

function InitialDataLoad({ onSetData }) {
    const initialPath = "/";
    const [message, setMessage] = useState(null);
    const [data, setData] = useState(null); // Changed setDataTemp to setData

    useEffect(() => {
        // Subscribe to the 'buttonClicked' event
        const handleButtonClick = (emitdata) => {
            // Set message state only if it's different from the current message
            if (emitdata.message !== message) {
                setMessage(emitdata.message);
                updateData(emitdata.message);
            }
        };
        emitter.on('saveClicked', handleButtonClick);

        // Cleanup function to unsubscribe from the event
        return () => {
            emitter.off('saveClicked', handleButtonClick);
        };

    }, [message]); // Include 'message' in the dependency array

    useEffect(() => {
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
            setData(temp); // Set data state here
            onSetData(temp);
        };

        !fetchDataFromLS() && addCustomMenu();
    }, []); // Ensure that this effect runs only once

    const updateData = (emitedData) => {
        if (data) {
            if (emitedData) {
                setMessage(emitedData)
                updateMenu(emitedData)
            }
        }
        else {
            fetchDataFromLS()
            if (emitedData)
                updateMenu(emitedData)
        }
    }

    const updateMenu = (emitedData) => {
        let tempData = fetchDataFromLS()

        if (!emitedData.oldMenu &&
            !tempData.some(x => x.menu === emitedData.menu)) {
            let temp = tempData;
            temp = addNewMenu(emitedData)
            setData(temp);
            onSetData(temp)
        }
        else {
            let newData = tempData.map(item => {
                if ((emitedData.oldMenu && item.menu === emitedData.oldMenu)
                    ||
                    item.menu === emitedData.menu) {
                    if (item.menu === emitedData.oldMenu) {
                        item.menu = emitedData.menu;
                        return addToSubMenuData(item, emitedData);
                    } else {
                        return addToSubMenuData(item, emitedData);
                    }
                }
                return item;
            });
            setData(newData); // Set data state here
            onSetData(newData);
        }
    }

    const addToSubMenuData = (item, emitedData) => {
        if (emitedData.subMenu) {
            if (item.subMenu) {
                emitedData.subMenu.map(x => {
                    if (x?.oldMenu) {
                        item.subMenu.map(y => {
                            if (y.menu === x.oldMenu) {
                                y.menu = x.menu
                                y.path = initialPath + item.menu?.replace(" ", "").toLowerCase()
                                    + initialPath + x.menu?.replace(" ", "").toLowerCase()
                            }
                        })
                    }
                    else if(!item.subMenu.some(z=>z.menu ===x.menu)) {
                        item.subMenu.push(subMenuObj(x, item))
                    }
                })
            }
            else {
                item = {
                    ...item, menu: emitedData.menu, isSubMenuPresent: true,
                    subMenu: setSubMenuData(emitedData),
                    iconOpened: <IoMdArrowDropup style={{ color: "white" }} />,
                    iconClosed: <IoMdArrowDropdown style={{ color: "white" }} />
                }
            }
        }
        return item
    }

    const addNewMenu = (item) => {
        let tempData = fetchDataFromLS() // Make a copy of the array
        tempData.push({
            menu: item.menu,
            content: item.content ? item.content : '',
            html: item.html ? item.html : '',
            isSubMenuPresent: item.subMenu,
            path: initialPath + item.menu?.replace(" ", "").toLowerCase(),
            ...(item.subMenu && {
                subMenu: setSubMenuData(item), isSubMenuPresent: true,
                iconOpened: <IoMdArrowDropup style={{ color: "white" }} />,
                iconClosed: <IoMdArrowDropdown style={{ color: "white" }} />
            }),
        });
        return tempData;
    }

    const setSubMenuData = (messageData) => {
        let subMenuDetails = [];
        messageData.subMenu.map(item => {
            subMenuDetails.push(subMenuObj(item, messageData));
        })
        return subMenuDetails;
    }

    function subMenuObj(item, messageData) {
        return {
            menu: item.menu,
            path: initialPath + messageData.menu?.replace(" ", "").toLowerCase()
                + initialPath + item.menu?.replace(" ", "").toLowerCase(),
            content: item.content ? item.content : '',
            html: item.html ? item.html : ''
        };
    }

    const fetchDataFromLS = () => {
        //localStorage.clear('appData')
        const temp = localStorage.getItem('appData');
        if (temp) {
            const temp1 = JSON.parse(temp)
            setData(temp1);
            onSetData(temp1);
            return temp1; // Return the fetched data
        }

        return data;
    }

    return null;
}

export default InitialDataLoad;
