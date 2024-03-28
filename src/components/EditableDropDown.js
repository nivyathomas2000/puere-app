import React, { useState } from 'react';
import "../css/Dropdown.css";

const EditableDropdown = ({ data, onValueSelected}) => {
  const [selectedValue, setSelectedValue] = useState(''); // State to hold the selected value
 
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    onValueSelected(e.target.value);
  };

  return (
    <div>
      <select className='drdw-select'
        value={selectedValue}
        onChange={handleChange}
      ><option key={'select'}value="">Select...</option>
        {data.map((item, index) => (
          <option key={item.menu + index} value={item.menu}>
            {item.menu}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EditableDropdown;
