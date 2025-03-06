import React from 'react';

/**
 *
 * @param {Object} props - The properties of the component
 * @param {String} props.title - The title of the header
 * @param {String} props.align - The alignment of the header
 * @returns {JSX.Element} - A JSX Element representing a paragraph header
 */
function TextHeader(props) {
    return (
        <div className={"flex flex-col w-full"}>
            <h4 className={"text-md text-center font-semibold"} style={{
                textAlign: props.align ? props.align : "center",
            }}>{props.title}</h4>
        </div>
    );
}

export default TextHeader;