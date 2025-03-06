import React from 'react';
import IndexCarousel from "./IndexCarousel.jsx";

function TableOfContents() {
        return (
            <div className={"flex-wrap flex flex-col h-full justify-start"
                            + " items-start p-10 pt-0 overflow-visible"}>
                <IndexCarousel/>
            </div>
        );
}

export default TableOfContents;