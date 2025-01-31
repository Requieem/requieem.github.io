import React, {Component, useEffect, useState} from 'react';

// function that computed opacity based on current viewport position


function PostContainer({reverse, scrollPosition, index}) {
    let positionClass = (scrollPosition) + (100 - index * 10) < 100 ? reverse ? "translate-x-full opacity-0" : "-translate-x-full opacity-0" : "";

    return (
        <div className={"@container @min-[1650px]:w-1/2"}>
            <div className={`@max-[750px]:h-auto @min-[750px]:max-h-128 overflow-clip items-center align-middle flex @min-[750px]:flex-row @max-[750px]:flex-col relative transition-all justify-stretch dark:border-yinmn-blue border-2 rounded-md m-5 p-10 ${positionClass} ${reverse ? "@min-[750px]:flex-row-reverse" : ""}`}>
                <div className="rounded-md flex-1 w-full flex items-center align-middle justify-center overflow-clip dark:border-yinmn-blue border-2 aspect-square">
                    <img src={"Unity6.png"} className={"aspect-square @min-[750px]:max-w-96 "}/>
                </div>
                <div className={"w-10 h-10"}></div>
                <div className="flex overflow-y-clip border-oxford-blue rounded-md text-justify w-full items-center flex-3">
                    <span className={"overflow-y-auto h-100 align-middle items-center flex"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
                </div>
            </div>
        </div>
    )
}

export default PostContainer;