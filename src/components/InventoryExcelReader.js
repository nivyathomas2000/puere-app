import React, { useState } from 'react';
import ExcelReader from './ExcelReader';
import '../css/Table.css'

function InventoryExcelReader() {
  const [excelData, setData] = useState([]);
  const filePath = process.env.PUBLIC_URL+"Templates/InventoryList.xlsx";
  const onReadData = (data) => {
  localStorage.setItem("inventoryData", JSON.stringify(data));
//     if(data[0] && data[0].data){
// let excelTitle = data[0].data[0];
// let mappedData =[];
// data[0].data.slice(1).map((item,index)=>{
//   mappedData.push({
    
//   })
// })
// }
    setData(data[0].data);
    console.log(excelData, 'data')
  };
  const openExcel = () => {
    // Use the ms-excel URL scheme to attempt to open the file in Excel
    window.location.href = `ms-excel:ofe|u|file://${filePath}`;

  }
  return (
    <>
      <div className="content-main" style={{ height: '92vh', overflow:"auto" }}>
        <ExcelReader onSetData={onReadData} type='inventoryData' filePath="Templates/InventoryList.xlsx" />
        <div className='edit-btn-div'>
          <h1 className='title-header'>Inventory</h1>
          <button className='edit-button'>update
          </button>
        </div>
        <div className='table-container'>
          <table style={{ border: '1px solid' }}>
            <thead className='table-header'>
              <tr >
                {excelData.length > 0 &&
                  excelData[0].map((cell, index) => (
                    <th key={index}>{cell}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {excelData.length > 1 &&
                excelData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default InventoryExcelReader
