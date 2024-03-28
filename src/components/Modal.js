
import React, { useState } from "react";
import "../css/Modal.css";
import "../css/Dropdown.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EditableDropdown from "./EditableDropDown";
import EditAddModal from "./EditAddModal";
import emitter from "./EventEmitter";
const Modal = ({ isOpen, onClose, isEdit, data }) => {
  const EDIT_TEXT = 'Edit';
  const ADD_TEXT = 'Add';
  let title = "";
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const [isSubMenuAdd, setIsSubMenuAdd] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isSubMenuEdit, setIsSubMenuEdit] = useState(false);
  // const [isEdit, setIsEdit] = useState(false)
  if (isEdit) {
    title = EDIT_TEXT + ' Menu'
  }
  else {
    title = ADD_TEXT + ' New Menu'
  }
  // const[isOpened, setIsOpen] = useState(isOpen)
  const handleSave = () => {
    //     setIsEditing(false);
    //     // You can add validation or any other logic here before saving the value
  };
  const onSaveClick = () => {
    if (selectedValue) {
      emitter.emit('saveClicked', { message: selectedValue });
      onCloseClick()
    }
  }
  const onAddSubMenuClick = () => {
    setIsSubMenuAdd(true)
  }
  const onEditSubMenuClick = () => {
    let isMenuSelected = selectedValue && selectedValue.subMenu
    isMenuSelected ? setIsSubMenuEdit(isMenuSelected) : setIsSubMenuAdd(isMenuSelected);
  }
  const onCloseClick = () => {
    setSelectedValue(null);
    setSelectedSubMenu(null);
    setIsSubMenuAdd(false);
    setIsSubMenuEdit(false)
    setShowWarning(false)
    onClose()
  }
  const handleMainMenuChange = (value) => {
    setShowWarning(false)
    if (isEdit && value) {
      let tempValue = { ...selectedValue };
      tempValue.menu = value;
      setSelectedValue({ ...tempValue, oldMenu: selectedValue?.menu })
    }
    else {
      let menuExist = data.some(x => x.menu === value);
      menuExist ? setShowWarning(true) :
        setSelectedValue({ ...selectedValue, menu: value, oldMenu: selectedValue?.menu });
    }
  };
  const handleSubMenuChange = (value) => {
    let menuExist = selectedValue.subMenu?.some(x => x.menu === value);
    if (!menuExist) {
      let menu = { menu: value, oldMenu: selectedSubMenu?.menu }
      setSelectedSubMenu(menu)
      if (selectedValue.subMenu) {
        let tempMenuData = selectedValue;
        if (tempMenuData.subMenu.some(x => x.menu === menu.oldMenu)) {
          let addSubmenu = tempMenuData.subMenu.map(x => {
            if (menu.oldMenu && x.menu === menu.oldMenu) {
              return { ...menu }
            } else {
              return { ...x }
            }
          })
          const val = { ...tempMenuData, subMenu: addSubmenu }
          setSelectedValue(val);
        }
        else {
          tempMenuData.subMenu.push(menu)
          setSelectedValue(tempMenuData);
        }

        console.log(selectedValue, 'with sub');
      } else {
        const val = { ...selectedValue, subMenu: [menu] }
        setSelectedValue(val);
        console.log(selectedValue, 'without sub');
      }
    }
    else {
      setShowWarning(true)
    }
  };

  const onMenuSelected = (value) => {
    let valueSelected = {}
    valueSelected = data.find(x => x.menu === value);
    valueSelected = valueSelected ? valueSelected : '';
    setSelectedValue(valueSelected);
  }
  const onSubMenuSelected = (value) => {
    let valueSelected = {}
    valueSelected = selectedValue.subMenu?.find(x => x.menu === value);
    valueSelected = valueSelected ? valueSelected : '';
    setSelectedSubMenu(valueSelected);
  }
  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2 className="title-h">{title}</h2>
            <div className="content-div">
              <div className="add-drp-div">
                {(!isEdit || (isEdit && selectedValue)) ?
                  <EditAddModal
                    value={selectedValue?.menu ? selectedValue.menu : ''}
                    onMenuChange={handleMainMenuChange} /> :
                  <EditableDropdown data={data} onValueSelected={onMenuSelected}
                  />
                }
              </div>

              <div className="add-btn-div">
                {
                  selectedValue &&
                  <button className="add-edit-btn" onClick={onAddSubMenuClick}>
                    Add Sub-Menu
                  </button>
                }
                {/* {
                (selectedValue && selectedValue.subMenu) &&
                <button className="add-edit-btn" onClick={onEditSubMenuClick}>
                  Edit Sub-Menu
                </button>
              } */}
              </div>
              <div className="add-drp-div">
                {(selectedSubMenu || isSubMenuAdd)
                  ? <EditAddModal
                    value={selectedSubMenu?.menu || !isSubMenuAdd ? selectedSubMenu.menu : ''}
                    onMenuChange={handleSubMenuChange} />
                  : (selectedValue && selectedValue.subMenu)
                    ? <EditableDropdown data={selectedValue.subMenu}
                      onValueSelected={onSubMenuSelected} />
                    : null
                }
                {showWarning && (<div className="warning text-danger">
                  The Menu you have added already exist
                </div>)}
              </div>

              <div className="footer">
                <button className="save-btn" onClick={onSaveClick}>Save</button>
                <button className="close-btn" onClick={onCloseClick}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
