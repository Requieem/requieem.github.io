import React from 'react';

function ActionButton(props) {

    return (
        <button className={"rounded-md"
                        + " p-0.5 m-0.5"
                        + " hover:not:shadow-xl"
                        + " hover:not-focus:drop-shadow-xl"
                        + " w-full flex"
                        + " hover:not-focus:scale-x-110 hover:not-focus:scale-y-110 hover:mx-2"
                        + " flex-row items-stretch justify-stretch"
                        + " transition-all"
                        + " duration-250 ease-[cubic-bezier(0.34, 1.56,"
                           + " 0.64, 1)] focus:scale-x-95 focus:scale-y-95"
                           + " focus:mx-0"} style={{
            background: "var(--color-gradient-dark)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",


        }}>
            <div className={"bg-text-light rounded-sm w-full flex flex-row"
                            + " items-center"
                            + " justify-center"} style={{
                                background: props.primary ? "var(--color-gradient-dark)" : null,
            }}>
            <span className={"line-clamp-1 align-middle"} style={{
                fontSize: "calc(0.75rem + 0.5cqw)",
                color: props.primary ? "var(--color-text-light)" : null,
            }}>{props.text}</span>
        </div>
        </button>
    );
}

export default ActionButton;