import React, { useState, useEffect } from "react";
import { Editor } from 'primereact/editor';
import "../css/Content.css";

function Content(prop) {
    const [editing, setEditing] = useState(false);
    let content = prop.item.html ? prop.item.html : "No Data Available";
    const [editorHtmlValue, setEditorHtmlValue] = useState('');
    const [editorValue, setEditorValue] = useState('');
    useEffect(() => {
        // Update the editorState when the prop changes
        if (prop.item.html) {
            setEditorValue(prop.item.content);
            setEditorHtmlValue(prop.item.html)
        } else {
            setEditorValue(content);
            setEditorHtmlValue(content)
        }

    }, [prop]);

    const handleTextChange = (e) => {
        setEditorHtmlValue(e.htmlValue)
        setEditorValue(e.value)
    }
    const handleContentEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        // Save the edited content
        setEditing(false);
        saveToItemContent();
    };

    const handleCancel = () => {
        // Cancel editing and revert to original content
        setEditing(false);
        setEditorValue(content);
        setEditorHtmlValue(content)
    };

    const saveToItemContent = () => {
        let existingData = Array.isArray(prop.data) ? [...prop.data] : [];

        if (existingData) {
            existingData.forEach(mainMenuData => {
                if (mainMenuData.isSubMenuPresent) {
                    mainMenuData.subMenu.forEach(menuData => {
                        menuData = replaceContent(menuData);
                    })
                } else {
                    mainMenuData = replaceContent(mainMenuData)
                }
            })
        }

        prop.onSetData(existingData);
    };
    const replaceContent = (menuData) => {
        if (menuData.menu === prop.item.menu) {
            menuData.content = editorValue;
            menuData.html = editorHtmlValue;
        }
        return menuData
    }
    return (
        <div className="content-main">
            {(prop.editEnabled && editing)? (
                <div>
                <Editor style={{
                    maxHeight: '70vh', minHeight: '70vh',
                    backgroundColor: 'white', overflowY: 'auto'
                }}
                    value={editorHtmlValue}
                    onTextChange={handleTextChange}
                />
                <div className="save-btn-div">
                    <button className="save-cnt-btn" onClick={handleSave}>Save</button>
                    <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>

            </div>
            ) : (                
                <div style={{display:'flex', flexDirection:'column'}}>
                {prop.editEnabled &&
                <div>
                    <button className='edit-btn-content'
                        onClick={handleContentEdit}>Edit Content</button>
                </div>
                    
                }
                
                    <pre dangerouslySetInnerHTML={{ __html: editorHtmlValue }}></pre>
                
            </div>
            )}
        </div>
    );

}

export default Content;
