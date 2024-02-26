import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';


function ExcelReader({initialData, onSetData}) {
  const [excelData, setExcelData] = useState(initialData);
//   const setData=()=>{
// excelData.map(item =>{
//   console.log(item)
// })
// onSetData(excelData)
//   }

  useEffect(() => {
    // Path to your Excel file
    const excelFilePath = process.env.PUBLIC_URL + 'Templates/InventoryList.xlsx';

    // Read the Excel file
    const readFile = async () => {
      const response = await fetch(excelFilePath);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onload = () => {
        const data = new Uint8Array(reader.result);
        const workbook = XLSX.read(data, { type: 'array' });
        console.log(workbook);
        let temData=[];
        
        const sheetLength = workbook.SheetNames.length;
        for(let i=0; i<sheetLength; i++){
          const sheetName = workbook.SheetNames[i]; // Assuming there's only one sheet
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }).filter(row=>row.length>0);
          temData.push({menu:sheetName, data:jsonData});
        }
        
        setExcelData(temData);
        onSetData(temData);
      };

      reader.readAsArrayBuffer(blob);
    };

    readFile();
  }, []);
//setData();

  
}
export default ExcelReader;




