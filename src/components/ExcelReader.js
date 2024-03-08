import { useEffect } from "react";
import * as XLSX from "xlsx";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

function ExcelReader({ initialData, onSetData }) {
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
          html:content[2]
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
          html:element.data[1][2]
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
    }
    return temp;
  };
  const getContentInHtml = (jsonData, sheet) => {
    if (jsonData && jsonData.length > 0) {
      let length = jsonData.length;
      for (let i = 2; i <= length; i++) {
        let gt = 'B' + i;
        if (sheet[gt]) {
         let value = sheet[gt]
          jsonData[i - 1].push(value.h);
        }
      }
    }
    return jsonData;
  };
  useEffect(() => {
    // Path to your Excel file
    const excelFilePath =
      process.env.PUBLIC_URL + "Templates/InventoryList.xlsx";
    let temData = [];
    // Read the Excel file
    const readFile = async () => {
      const response = await fetch(excelFilePath);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "buffer" });
        console.log(workbook, "workbook");
        const sheetLength = workbook.SheetNames.length;
        for (let i = 0; i < sheetLength; i++) {
          const sheetName = workbook.SheetNames[i]; // Assuming there's only one sheet
          const sheet = workbook.Sheets[sheetName];
          console.log(sheet, "sheet");
          const jsonData = XLSX.utils
            .sheet_to_json(sheet, { header: 1 })
            .filter((row) => row.length > 0);
          let data = getContentInHtml(jsonData, sheet);
          console.log(data, "jsonData");
          temData.push({ menu: sheetName, data: jsonData });
        }
        onSetData1(temData);
      };

      reader.readAsArrayBuffer(blob);
    };

    readFile();
  }, []);
}
export default ExcelReader;
