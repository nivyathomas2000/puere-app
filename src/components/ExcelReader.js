import { useEffect } from "react";
import * as XLSX from "xlsx";

function ExcelReader({ initialData, onSetData }) {
  const onSetData1 = (tempData) => {
    if (tempData) {
      let menuContentData = [];
      tempData.forEach((element) => {
        menuContentData.push({
          menu: element.menu,
          path: element.menu.toLowerCase(),
          ...(element.data && setSubMenuData(element.data)),
        });
      });
      onSetData(menuContentData);
      console.log(menuContentData, "kkkkkkkkkkkkkkkk");
    }
  };
  const setSubMenuData = (element) => {
    let isContentOnly = false;
    let subMenuDetails = [];
    element.forEach((content, index) => {
      if (index != 0 && content[0]) {
        subMenuDetails.push({
          name: content[0] != "" && content[0],
          path: content[0].toLowerCase(),
          content: content[1],
        });
      } else if (index != 0 && content[0] == null && content[1]) {
        subMenuDetails.push({ content: content[1] });
        isContentOnly = true;
      }
    });

    return isContentOnly
      ? { content: subMenuDetails }
      : { subMenu: subMenuDetails };
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

      reader.onload = () => {
        const data = new Uint8Array(reader.result);
        const workbook = XLSX.read(data, { type: "array" });
        console.log(workbook);
        const sheetLength = workbook.SheetNames.length;
        for (let i = 0; i < sheetLength; i++) {
          const sheetName = workbook.SheetNames[i]; // Assuming there's only one sheet
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils
            .sheet_to_json(sheet, { header: 1 })
            .filter((row) => row.length > 0);
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
