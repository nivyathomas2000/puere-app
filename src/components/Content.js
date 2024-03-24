import React from "react";
import "../css/Content.css"

function Content(prop){
    console.log(prop.item.content, 'prop.item.content')
    let content=prop.item.html ? prop.item.html:"No Data Available"
     return (
        <div className="content-main">
            {/* <p>{prop.item.content ? prop.item.content:"No Data Available"}</p> */}
            
            <pre dangerouslySetInnerHTML={{ __html: content }}></pre>            
        </div>
    );
}

export default Content;