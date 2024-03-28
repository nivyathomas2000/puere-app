
import React, { useState} from 'react';
import "../css/Modal.css";

function EditAddModal({value, onMenuChange}) {
    const [selectedValue, setSelectedValue] = useState('');
    
    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        //onMenuChange(e.target.value);
      };
      const handleSave = () => {      
        onMenuChange(selectedValue);
      };
    return (
        <div>            
            <div className="input-div">
                <input className='input-select'
                    type="text"
                     defaultValue={value}
                    // value={selectedValue?selectedValue:value}
                    onChange={handleChange}
                />
                <button className='save-add-btn' 
                disabled={value === selectedValue || selectedValue ===''}
                 onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}

export default EditAddModal

