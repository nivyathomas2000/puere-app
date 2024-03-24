import React, { useState } from 'react'
import "../css/Header.css";
import ExportToExcel from './ExportToExcel';
import MenuExcelReader from './MenuExcelReader';

const Header = ({ onSetData }) => {
 const [file, setFile] =useState(null)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
      // Call ExcelReader component with the file data
      setFile(file)
  };
  return (
    <div className='header-nav'>
      {file && <MenuExcelReader
        key={"excelReader"}
        onSetData={onSetData}
        file={file}
       />}
      <input type="file" onChange={handleFileChange} />
      <ExportToExcel></ExportToExcel>
    </div>
  )
}

export default Header
