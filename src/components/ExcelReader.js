import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

function ExcelReader({ onSetData, filePath, type }) {

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
    // if (localStorage.getItem(type)) {
    //   onSetData(JSON.parse(localStorage.getItem(type)));
    // }
    // else
    {
      // Path to your Excel file

      // Read the Excel file
      const readFile = async () => {
        if (typeof filePath === 'string') {
          const excelFilePath = filePath;
          const response = await fetch(excelFilePath);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            FormatData(data);

          };
          reader.readAsArrayBuffer(blob);
        }
        else if(filePath instanceof File){
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            FormatData(data);
          };
          reader.readAsArrayBuffer(filePath);
        }
      };

      readFile();
    }

  }, []);

  function FormatData(data) {
    let temData = [];
    const workbook = XLSX.read(data, { type: "buffer", cellStyles: true });
    const workbook1 = XLSX.read(data, { type: 'array' });

    type == "appData" && localStorage.setItem('workbook', JSON.stringify(workbook1));
    console.log(workbook, "workbook");
    const sheetLength = workbook.SheetNames.length;
    // const htmlExcel = []
    for (let i = 0; i < sheetLength; i++) {
      const sheetName = workbook.SheetNames[i]; // Assuming there's only one sheet
      const sheet = workbook.Sheets[sheetName];
      console.log(sheet, "sheet");
      const jsonData = XLSX.utils
        .sheet_to_json(sheet, { header: 1 })
        .filter((row) => row.length > 0);
      // const html = XLSX.utils
      //   .sheet_to_html(sheet)
      //  // Get the table element
      // htmlExcel.push({sheetName:sheetName, table: html})
      let data = getContentInHtml(jsonData, sheet);
      console.log(data, "jsonData");
      temData.push({ menu: sheetName, data: jsonData });
    }
    // type == "appData" && localStorage.setItem("htmlExcel", JSON.stringify(htmlExcel))
    // console.log(htmlExcel, "htmlExcel")
    onSetData(temData);
  }
}
export default ExcelReader;
