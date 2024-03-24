import React from 'react';
import * as XLSX from 'xlsx';

function ExportToExcel() {
  const exportToExcel = () => {
    const storedWorkbook = localStorage.getItem('workbook');
    if (storedWorkbook) {
      const workbook = JSON.parse(storedWorkbook)
      XLSX.writeFile(workbook, 'exported_file.xlsx');;
    }
    // const htmlExcel = JSON.parse(localStorage.getItem('htmlExcel'));
    // const wb = XLSX.utils.book_new();

    // htmlExcel.forEach((htmlContent, index) => {
    //   //Convert HTML string to DOM element
    //   const parser = new DOMParser();
    //   const doc = parser.parseFromString(htmlContent.table, 'text/html');
    //   const table = doc.querySelector('table'); // Get the table element

    //   // Convert DOM element to XLSX worksheet
    //   const ws = XLSX.utils.table_to_sheet(table);
      
    //   // Append the worksheet to the workbook
    //   XLSX.utils.book_append_sheet(wb, ws, htmlContent.sheetName);
    // });

    // Save the workbook as an Excel file
    // XLSX.writeFile(wb, 'exported_file.xlsx', {cellStyles:true});
  };

  return (
    <>    
    <button onClick={exportToExcel}>Export to Excel</button>
    </>    
  );
}

export default ExportToExcel;

