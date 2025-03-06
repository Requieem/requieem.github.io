import React from 'react';
import TextHeader from "./TextHeader.jsx";

/**
 *
 * @param {Object} props - The properties of the component
 * @param {String} props.title - The title of the block
 * @param {String} props.align - The alignment of the block title
 * @param {String} props.text - The text of the block
 * @returns {JSX.Element} - A JSX Element representing a text block
 */
function TextBlock(props) {
    return (
        <div className={"flex flex-col w-full"}>
            <TextHeader title={props.title} align={props.align}/>
            <p className={"text-sm text-justify mt-1"}>{props.text}</p>
        </div>
    );
}

export default TextBlock;