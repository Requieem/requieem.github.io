import React, {useEffect, useRef, useState} from 'react';
import {FaArrowLeft, FaArrowRight, FaClipboard, FaClipboardCheck, FaExpand, FaFileImage} from "react-icons/fa";
import {FaCircleXmark, FaX} from "react-icons/fa6";
import PropTypes, {bool} from "prop-types";
import {atomOneDark, CodeBlock} from "react-code-blocks";
import PageModel from "../Models/PageModel.js";
import { v4 as uuidv4 } from 'uuid';

function PostTabs({canScrollRef, model}) {
    let [index, setIndex] = useState(0);
    let [previousIndex, setPreviousIndex] = useState(0);
    let [docsOpen, setDocsOpen] = useState(false);
    let [forceDocsOpen, setForceDocsOpen] = useState(false);
    let [imageOpen, setImageOpen] = useState(false);
    let [forceImageOpen, setForceImageOpen] = useState(false);
    let [showCode, setCode] = useState(false);
    let [codeCopied, setCodeCopied] = useState(false);
    const docsRef = useRef(null);
    const imageRef = useRef(null);

    const copyCode = async () => {
        try {
            const text = model.codeBlocks[index].text;
            await navigator.clipboard.writeText(text.trimEnd());
            setCodeCopied(true);
        } catch (e) {
            console.error(e);
            setCodeCopied(false);
            console.log("There was an error copying this code block to the clipboard.");
        }
    }

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

        let shouldImageOpen = forceImageOpen;
        let shouldDocsOpen = forceDocsOpen;
        let isDifferentIndex = previousIndex != index;

        if(isDifferentIndex) {
            setCodeCopied(false);
            if(model.codeBlocks.length <= index || model.codeBlocks[index] === null || model.codeBlocks[index] === undefined) {
                setCode(false);
            }
        }

        // close the expanded carousels if the index changes
        shouldImageOpen = shouldImageOpen && !(isDifferentIndex);
        shouldDocsOpen = shouldDocsOpen && !(isDifferentIndex);

        // Prevent opening the image carousel if the image is not valid
        let isImageValid = model.images.length > index && model.images[index] !== null && model.images[index] !== undefined && model.images[index] !== "";
        shouldImageOpen = shouldImageOpen && isImageValid;

        // Prevent opening the docs carousel if the docs or code is not valid
        let isDocValid = model.docs.length > index && model.docs[index] !== null && model.docs[index] !== undefined;
        let isCodeValid = model.codeBlocks.length > index && model.codeBlocks[index] !== null && model.codeBlocks[index] !== undefined && model.codeBlocks[index].text !== null;
        shouldDocsOpen = shouldDocsOpen && (isDocValid || isCodeValid);

        shouldDocsOpen = shouldDocsOpen || (!isImageValid && (isCodeValid || isDocValid));
        shouldImageOpen = shouldImageOpen || (!isDocValid && !isCodeValid);

        setImageOpen(shouldImageOpen);
        setForceImageOpen(shouldImageOpen);
        setDocsOpen(shouldDocsOpen);
        setForceDocsOpen(shouldDocsOpen);
        setPreviousIndex(index);


        if(imageOpen) {
            imageRef.current.style.zIndex = "100";
            docsRef.current.style.zIndex = null;
        } else if (docsOpen) {
            docsRef.current.style.zIndex = "100";
            imageRef.current.style.zIndex = null;
        }


    }, [index, docsOpen, imageOpen, showCode, forceDocsOpen, forceImageOpen]);


        return (
            <div className={"w-full h-full flex-col md:flex-row"
                            + " lg:flex-col"
                            + " flex"
                            + " items-center justify-center"
                            + " items-center"
                            + " justify-center"
                            + " relative grow"}>
                {/* Image Carousel */}
                <div ref={imageRef} className={"grid grid-rows-1"
                                               + " grid-cols-1 items-end"
                                               + " justify-end w-full h-full"
                                               + " mb-5 md:mb-0"
                                               + " md:w-[49.5%] lg:mb-5"
                                               + " relative lg:w-full"
                                               + " md:absolute"
                                               + " lg:relative"
                                               + " overflow-clip"
                                               + " whitespace-nowrap"
                                               + " flex-nowrap shadow-inner"
                                               + " bg-black/15 rounded-lg"
                                               + " transition-all ease-in-out duration-500"} style={{
                    left: 0,
                    width: imageOpen ? "100%" : null,
                    marginBottom: imageOpen ? "0" : null,
                    height: docsOpen ? "0%" : null,
                }}>
                    <div className={"bg-gradient-to-br from-yinmn-blue to-oxford-blue absolute w-full h-full"}/>
                    <div className={`flex-row flex items-stretch rounded-lg overflow-clip justify-evenly absolute flex-nowrap w-full h-full overflow-visible transition-all ease-in-out duration-500`} style={{transform: `translateX(-${index * 100}%)`}}>
                        {Array.from({ length: model.maxIndex }).map((_, i) => {
                            if(model.images.length > i) {
                                const image = model.images[i];
                                return(<div key={`${uuidv4()}`} className={"grid-cols-1 grid-rows-1 grid h-full min-w-full"}>
                                    <img src={image} className={`row-start-1 row-end-2 col-start-1 col-end-2 object-cover h-full w-full min-w-full bottom-0 relative rounded-lg p-1 transition-all duration-500 linear`} style={{
                                        opacity: imageOpen ? "1" : "0",
                                    }}/>
                                    <img src={image} className={`row-start-1 row-end-2 col-start-1 col-end-2 object-cover h-full w-full min-w-full bottom-0 relative rounded-lg p-1 transition-all duration-500 linear`} style={{
                                        opacity: imageOpen ? "0" : "1",
                                    }}/>
                                </div>);
                            }
                            else {
                                return(<FaFileImage key={`${i}_image_missing`} className={`self-center justify-self-center h-full w-full min-w-full relative rounded-lg p-60 fill-platinum`} />
                                );}})}
                    </div>
                    <button className={"group w-full h-full rounded-lg hover:bg-black/75 border-3 border-transparent hover:z-100 hover:border-amber-300 z-90 flex flex-col items-center justify-center transition-all ease-in-out duration-300"} onClick={() => {
                        let forceImage = !forceImageOpen;
                        setForceImageOpen(forceImage);
                        if(forceImage) {
                            setForceDocsOpen(false);
                        }
                    }}>
                        <p className={"text-white text-center p-2 invisible group-hover:visible rounded-lg"}>{!imageOpen ? "Expand" : "Close"}</p>
                        {!imageOpen ? (
                            <FaExpand className={"invisible group-hover:visible fill-platinum"}/>
                        ) : (
                            <FaX className={"invisible group-hover:visible fill-platinum"}/>
                        )}
                    </button>
                </div>
                {/* Docs and Code */}
                <div ref={docsRef} className={"grid grid-rows-1"
                                              + " grid-cols-1 items-end"
                                              + " justify-end w-full h-full"
                                              + " relative md:w-[49.5%]"
                                              + " lg:w-full md:absolute"
                                              + " lg:relative"
                                              + " overflow-clip"
                                              + " whitespace-nowrap"
                                              + " flex-nowrap shadow-inner"
                                              + " bg-black/15 rounded-lg"
                                              + " transition-all ease-in-out duration-500"} style={{
                    right: 0,
                    width: docsOpen ? "100%" : null,
                    height: imageOpen ? "0%" : null,
                }}>
                    <button key={"docs-button"}
                            className={"absolute top-0 left-0 w-15 text-left p-3.5 pt-2 h-10 z-92 text-platinum"}
                            onClick={() => setCode(false)}>Docs</button>
                    <button key={"code-button"}
                            style = {{
                                opacity: model.codeBlocks.length > index && model.codeBlocks[index] !== null && model.codeBlocks[index] !== undefined && model.codeBlocks[index].text !== null ? "1" : "0",
                                pointerEvents: model.codeBlocks.length > index && model.codeBlocks[index] !== null && model.codeBlocks[index] !== undefined && model.codeBlocks[index].text !== null ? "auto" : "none",
                            }}
                            className={"absolute top-0 left-15 w-15"
                                       + " text-left p-3.5 pt-2 h-10 z-92"
                                       + " text-platinum transition-all ease-in-out duration-300"}
                            onClick={() => { setCode(true); setForceDocsOpen(true); }}>Code</button>
                    <div className={"bg-gradient-to-br from-yinmn-blue to-oxford-blue absolute top-0 w-full text-left p-2 h-10 z-91"}></div>
                    <div className={"bg-oxford-blue absolute top-0 w-17 text-left p-2 h-10 z-91 rounded-tl-lg rounded-tr-lg transition-all ease-in-out duration-300"} style={{ left: showCode ? "calc(var(--spacing) * 15.5)" : "0rem", }}/>
                    <button className={"absolute top-0 w-12 right-7 text-right p-2 h-10 z-91 rounded-tl-lg rounded-tr-lg transition-all ease-in-out duration-300 flex items-center justify-center"} onClick={copyCode}>
                        <FaClipboard className={"fill-platinum hover:scale-150 transition-all ease-in-out duration-300"} style={{
                            opacity: showCode && !codeCopied ? "1" : "0",
                            position: showCode && !codeCopied ? "relative" : "absolute",
                            scale: showCode && !codeCopied ? null : "0",
                            rotate: showCode && !codeCopied ? "0deg" : "360deg",
                        }}/>
                        <FaClipboardCheck className={"fill-amber-300 hover:scale-150 transition-all ease-in-out duration-300"} style={{
                            opacity: showCode && codeCopied ? "1" : "0",
                            position: showCode && codeCopied ? "relative" : "absolute",
                            scale: showCode && codeCopied ? null : "0",
                            rotate: showCode && codeCopied ? "0deg" : "360deg",
                        }}/>
                    </button>
                    <button className={"absolute top-0 w-12 right-0 text-right p-3 h-10 z-91 rounded-tl-lg rounded-tr-lg transition-all ease-in-out duration-300 flex items-center justify-center"} onClick={() => {
                        let forceDocs = !forceDocsOpen;
                        setForceDocsOpen(forceDocs);
                        if(forceDocs) {
                            setForceImageOpen(false);
                        }
                    }}>
                        <FaCircleXmark className={"fill-platinum hover:scale-150 transition-all ease-in-out duration-300"} style={{
                            opacity: docsOpen ? "1" : "0",
                            position: docsOpen ? "relative" : "absolute",
                            scale: docsOpen ? null : "0",
                            rotate: docsOpen ? "0deg" : "360deg",
                        }}/>
                        <FaExpand className={"fill-platinum hover:scale-150 transition-all ease-in-out duration-300"} style={{
                            opacity: !docsOpen ? "1" : "0",
                            position: !docsOpen ? "relative" : "absolute",
                            scale: !docsOpen ? null : "0",
                            rotate: !docsOpen ? "0deg" : "360deg",
                        }}/>
                    </button>
                    <div className={"bg-oxford-blue w-full h-full rounded-lg"}/>
                    <div className={`flex-row flex items-stretch rounded-lg justify-evenly absolute flex-nowrap h-full w-full`}>
                        <div className={`flex-row flex items-stretch rounded-lg justify-evenly absolute flex-nowrap w-full h-full max-h-full transition-transform ease-in-out duration-500`} style={{transform: `translateX(-${index * 100}%)`}} onMouseEnter={() => canScrollRef.current = false} onMouseLeave={() => canScrollRef.current = true}>
                            {Array.from({ length: model.maxIndex }).map((_, i) => {
                                let docElement;
                                let codeElement;
                                if(model.docs.length > i) {
                                    const doc = model.docs[i];
                                    docElement = <div className={"text-platinum row-start-1 row-end-4 col-start-1 col-end-4 min-w-full h-full flex flex-row text-wrap text-justify mt-8 p-7 pt-5 text-ellipsis transition-all ease-in-out duration-250"} style={{opacity: showCode ? "0" : "1"}}>{doc}</div>
                                }
                                if(model.codeBlocks.length > i && model.codeBlocks[i] !== null && model.codeBlocks[i] !== undefined && model.codeBlocks[i].text !== null) {
                                    const codeBlock = model.codeBlocks[i];
                                    codeElement = <div className={"row-start-1 row-end-4 col-start-1 col-end-4 pt-5 min-w-full mt-4 transition-all ease-in-out duration-250 grid grid-rows-1 grid-cols-1 overflow-visible"} style={{opacity: showCode ? "1" : "0"}}>
                                            <CodeBlock
                                                language={codeBlock.language}
                                                text={codeBlock.text}
                                                showLineNumbers={true}
                                                theme={atomOneDark}
                                                customStyle={{
                                                    overflow: "visible",
                                                }}
                                                codeBlockStyle={{
                                                    overflow: "visible",
                                                }}
                                                codeContainerStyle={{
                                                    overflow: "visible",
                                                }}
                                            />
                                        </div>
                                }
                                return (
                                    <div key={`${uuidv4()}`} className={"grid grid-cols-1 grid-rows-1 h-full w-full min-w-full overflow-y-auto"} style={{
                                        backgroundColor: showCode ? "rgba(40, 44, 52, 255)" : null,
                                        overflowX: showCode ? "auto" : "hidden",
                                    }}>
                                        {docElement}
                                        {codeElement}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className={"w-full flex flex-row items-end"
                                + " justify-center"}>
                    <div className={"absolute -bottom-11 md:-bottom-7 flex"
                                    + " flex-row"
                                    + " items-center"
                                    + " justify-around"}>
                        {/* Left Arrow */}
                        <div className={"flex-row flex items-end"
                                        + " justify-center"
                                        + " pointer-events-none z-100 mr-5"}>
                            <button className={"pointer-events-auto z-200"} onClick={() => {
                                let newIndex = index - 1;
                                if (newIndex < 0) {
                                    newIndex = model.maxIndex - 1;
                                }
                                setIndex(newIndex);
                                console.log("LeftButton");
                            }}><FaArrowLeft/></button>
                        </div>
                        {/* Carousel Dots */}
                        <div className={"flex-row flex items-end justify-center"}>
                            {Array.from({ length: model.maxIndex }).map((_, i) => (
                                <div key={`${i}_tic`} className={"h-3.5 flex items-center justify-center shadow-2xl relative bg-clip-padding backdrop-filter backdrop-blur-sm dark:bg-amber-300/5 dark:border-amber-300 border-yinmn-blue bg-yinmn-blue/25 transition-all duration-200 ease-in-out theme-transition"} style={{
                                    paddingLeft: i == 0 ? "0.25em" : "0.1em",
                                    paddingRight: i == model.maxIndex - 1 ? "0.25em" : "0.1em",
                                    paddingTop: "0.3rem",
                                    paddingBottom: "0.3rem",
                                    borderTopLeftRadius: i == 0 ? "0.5rem" : null,
                                    borderBottomLeftRadius: i == 0 ? "0.5rem" : null,
                                    borderTopRightRadius: i == model.maxIndex - 1 ? "0.5rem" : null,
                                    borderBottomRightRadius: i == model.maxIndex - 1 ? "0.5rem" : null,
                                    borderTopWidth: "1px",
                                    borderBlockWidth: "1px",
                                    borderLeftWidth: i == 0 ? "1px" : "0px",
                                    borderRightWidth: i == model.maxIndex - 1 ? "1px" : "0px",
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
                        {/* Right Arrow */}
                        <div className={"flex-row flex items-end"
                                        + " justify-center"
                                        + " pointer-events-none z-100 ml-5"}>
                            <button onClick={() => setIndex((index + 1) % model.maxIndex)} className={"pointer-events-auto z-200"}><FaArrowRight/></button>
                        </div>
                    </div>
                </div>
            </div>
);
}

PostTabs.propTypes = {
    model: PropTypes.instanceOf(PageModel),
}

export default PostTabs;