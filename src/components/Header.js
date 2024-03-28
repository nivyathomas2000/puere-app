import React, { useState } from 'react'
import "../css/Header.css";

const Header = ({ onSetData, onSetEnableEdit }) => {
//  const [file, setFile] =useState(null);
 const [editEnabled, setEdit] =useState(true);
 
 const handleEdit=()=>{
  let isEditable = !editEnabled
  setEdit(isEditable);
  onSetEnableEdit(editEnabled)
 }
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //     // Call ExcelReader component with the file data
  //     setFile(file)
  // };
  return (
    <div className='header-nav'>
      {/* {file && <MenuExcelReader
        key={"excelReader"}
        onSetData={onSetData}
        file={file}
       />}
      <input type="file" onChange={handleFileChange} />
      <ExportToExcel></ExportToExcel> */}
      <button className={!editEnabled?'exit-btn':'edit-btn'} 
      onClick={handleEdit}>
        {!editEnabled?'Exit Edit Mode':'Edit Application'}</button>
    </div>
  )
}

export default Header
