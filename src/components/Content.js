import React from "react";
import '../css/Content.css';

function Content(prop){
    console.log(prop.item.content, 'prop.item.content')
    let content=prop.item.content ? prop.item.content:"No Data Available"
     return (
        <div className="content-main col-10 col-md-10 col-lg-10">
            {/* <p>{prop.item.content ? prop.item.content:"No Data Available"}</p> */}
            
            <pre dangerouslySetInnerHTML={{ __html: content }}></pre>            
        </div>
    );
}

export default Content;