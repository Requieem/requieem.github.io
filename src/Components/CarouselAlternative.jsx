import React, {useEffect, useState} from 'react';
import {FaArrowLeft, FaArrowRight, FaExpand} from "react-icons/fa";



function CarouselAlternative({images}) {
    let [index, setIndex] = useState(0);
    let [docsOpen, setDocsOpen] = useState(false);
    let [showCode, setCode] = useState(false);

    // use effect to scroll through images by setting the index and rerendering
    // the component
    useEffect(() => {
        // // start a timer to scroll through the images automatically
        // const interval = setInterval(() => {
        //     setIndex((index + 1) % images.length);
        //     console.log(index);
        // }, 5000);
        //
        // return () => {
        //     clearInterval(interval);
        // }
    }, [index, docsOpen, showCode]);


        return (
            <div className={"w-full h-full flex flex-row items-stretch justify-stretch relative grow"}>
                <div className={"absolute -bottom-7 w-full h-full flex-row flex right-10 items-end justify-center z-10 pointer-events-none"}>
                    <button onClick={() => {
                        let newIndex = index - 1;
                        if (newIndex < 0) {
                            newIndex = images.length - 1;
                        }
                        setIndex(newIndex)}} className={"pointer-events-auto"}><FaArrowLeft/></button>
                </div>
                <div className={"absolute -bottom-7 w-full h-full flex-row flex left-10 items-end justify-center z-10 pointer-events-none"}>
                    <button onClick={() => setIndex((index + 1) % images.length)} className={"pointer-events-auto"}><FaArrowRight/></button>
                </div>
                <div className={"absolute -bottom-7 w-full h-full flex-row flex items-end justify-center"}>
                    {images.map((image, i) => (
                        <div className={"h-3.5 flex items-center justify-center shadow-2xl relative bg-clip-padding backdrop-filter backdrop-blur-sm dark:bg-amber-300/5 dark:border-amber-300 border-yinmn-blue bg-yinmn-blue/25 transition-all duration-200 ease-in-out theme-transition"} style={{
                            paddingLeft: i == 0 ? "0.25em" : "0.1em",
                            paddingRight: i == images.length - 1 ? "0.25em" : "0.1em",
                            paddingTop: "0.3rem",
                            paddingBottom: "0.3rem",
                            borderTopLeftRadius: i == 0 ? "0.5rem" : null,
                            borderBottomLeftRadius: i == 0 ? "0.5rem" : null,
                            borderTopRightRadius: i == images.length - 1 ? "0.5rem" : null,
                            borderBottomRightRadius: i == images.length - 1 ? "0.5rem" : null,
                            borderTopWidth: "1px",
                            borderBlockWidth: "1px",
                            borderLeftWidth: i == 0 ? "1px" : "0px",
                            borderRightWidth: i == images.length - 1 ? "1px" : "0px",
                        }}>
                            <button className={"rounded-full transition-all duration-200 ease-in-out"}
                                    style={{
                                        backgroundColor: i == index ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)",
                                        width: i == index ? "1rem" : "0.35rem",
                                        height: "0.35rem",
                                        border: "none",
                                        outline: "none",
                                        cursor: "pointer"
                                    }} onClick={() => setIndex(i)}/>
                        </div>
                    ))}
                </div>
                <div className={"md:mr-5 grid grid-rows-1 grid-cols-1 w-full h-full md:w-1/2 relative overflow-hidden whitespace-nowrap flex-nowrap shadow-inner bg-black/15 rounded-lg"}>
                    <div className={"bg-gradient-to-br from-yinmn-blue to-oxford-blue absolute w-full h-full"}/>
                    <div className={`flex-row flex items-stretch rounded-lg overflow-clip justify-evenly absolute flex-nowrap w-full h-full overflow-visible transition-all ease-in-out duration-500`} style={{transform: `translateX(-${index * 100}%)`}}>
                        {images.map((image, i) => (
                            <img key={i} src={image} className={`object-cover h-full w-full min-w-full bottom-0 relative rounded-lg p-1`} />
                        ))}
                    </div>
                </div>
                <div className={"hidden md:grid grid-rows-1 grid-cols-1 items-end justify-end w-full h-full md:w-1/2 relative overflow-clip whitespace-nowrap flex-nowrap shadow-inner bg-black/15 rounded-lg transition-all ease-in-out duration-500"} style={{
                    position: docsOpen ? "absolute" : "absolute",
                    right: docsOpen ? "0" : "0",
                    width: docsOpen ? "100%" : null,
                    top: docsOpen ? "-100" : null,
                    zIndex: docsOpen ? "100" : null,
                }}>
                    <button className={"absolute top-0 left-0 w-15 text-left p-3.5 pt-2 h-10 z-91 text-platinum"} onClick={() => setCode(false)}>Docs</button>
                    <button className={"absolute top-0 left-15 w-15 text-left p-3.5 pt-2 h-10 z-91 text-platinum"} onClick={() => setCode(true)}>Code</button>
                    <div className={"bg-gradient-to-br from-yinmn-blue to-oxford-blue absolute top-0 w-full text-left p-2 h-10 z-49"}></div>
                    <div className={"bg-oxford-blue absolute top-0 w-17 text-left p-2 h-10 z-49 rounded-tl-lg rounded-tr-lg transition-all ease-in-out duration-300"} style={{
                        left: showCode ? "calc(var(--spacing) * 15.5)" : "0rem",
                    }}/>
                    <div className={"bg-oxford-blue w-full h-full rounded-lg"}/>
                    <div className={`text-platinum flex-row flex items-stretch rounded-lg overflow-clip justify-evenly absolute flex-nowrap h-full w-full`}>
                        <div className={`flex-row flex items-stretch rounded-lg overflow-clip justify-evenly absolute flex-nowrap w-full max-h-full overflow-x-visible overflow-y-clip overflow-ellipsis transition-all ease-in-out duration-500`} style={{transform: `translateX(-${index * 100}%)`}}>
                            {images.map((image, i) => (
                                <p className={"max-h-full mb-4 min-w-full mt-8 flex flex-row text-wrap text-justify p-5 overflow-hidden text-ellipsis"}>
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." & "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            ))}
                        </div>
                        <button className={"group w-full h-full rounded-lg hover:bg-black/75 border-3 border-transparent hover:z-100 hover:border-amber-300 z-90 flex flex-col items-center justify-center"} onClick={() => setDocsOpen(!docsOpen)}>
                            <FaExpand className={"invisible group-hover:visible"}/>
                            <p className={"text-white text-center p-2 invisible group-hover:visible rounded-lg"}>Learn More</p>
                        </button>
                    </div>
                </div>
                <div className={"invisible md:grid grid-rows-1 grid-cols-1 items-end justify-end w-full h-full md:w-1/2 relative overflow-clip whitespace-nowrap flex-nowrap shadow-inner bg-black/15 rounded-lg transition-all ease-in-out duration-500"} style={{
                    position: docsOpen ? "relative" : "relative",
                    right: docsOpen ? "0" : "0",
                    width: docsOpen ? "100%" : null,
                    top: docsOpen ? "-100" : null,
                    zIndex: docsOpen ? "100" : null,
                }}>
                </div>
            </div>
);
}

export default CarouselAlternative;