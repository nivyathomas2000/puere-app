import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/SideNav.css";
import MenuFromExcel from "./MenuFromExcel";
import { FiEdit } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import Modal from "./Modal";
import { Tooltip } from "react-tooltip";

function MainSideNav({ menuData, editEnabled }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const closeModal = () => {
    setIsOpen(false)
  };
  
  const openModal = (isEdit) => {
    setIsOpen(true)
    setIsEdit(isEdit)    
  }

  return (
    <div className="main col-6 col-md-2 col-lg-2">
      <div className="title-content">
        <h1 className="title">PÜREE</h1>
        <p className="sub-title">
          Platform For The Overview And Research of IT Experience
        </p>
        {editEnabled && <div className="edit-bar">
          <button className="icon-btn" onClick={() => openModal(false)} 
          data-tooltip-id="tooltip" data-tooltip-content="Add Menu">
            <IoAdd className="edit-icon" />
          </button>
          <button className="icon-btn" onClick={() => openModal(true)}
          data-tooltip-id="tooltip" data-tooltip-content="Edit Menu">
            <FiEdit className="edit-icon" />
          </button>
          <Tooltip id="tooltip" />
          <Modal isOpen={isOpen} onClose={closeModal} 
          isEdit={isEdit} data ={menuData} />
        </div>}
      </div>
      <nav className="nav-div">
        <ul className="ul-list">
          <>
            {menuData?.map((item, index) => (
              <MenuFromExcel key={index} item={item} location={location} />
            ))}
          </>
        </ul>
      </nav>      
    </div>
  );
}

export default MainSideNav;
