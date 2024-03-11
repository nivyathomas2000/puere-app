import React, { useState } from 'react';
import ExcelReader from './ExcelReader';
import '../css/Table.css'

function InventoryExcelReader() {
  const [excelData, setData] = useState([])
  const onReadData = (data) => {
    setData(data[0].data);
    console.log(excelData, 'data')
  };

  return (
    <>
      <div className="content-main col-6 col-md-10 col-lg-10" style={{height:'100vh'}}>
        <ExcelReader onSetData={onReadData} filePath="/Templates/InventoryList.xlsx" />
        <div className='edit-btn-div'>
          <h1 className='title-header'>Inventory</h1>
        <button className='edit-button'>Edit Inventory on Excel</button>

        </div>
        <div className='table-container'>
          <table style={{border:'1px solid'}}>
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
