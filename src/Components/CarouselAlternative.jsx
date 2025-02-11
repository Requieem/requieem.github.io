import React, {useEffect, useRef, useState} from 'react';
import {FaArrowLeft, FaArrowRight, FaExpand, FaFileImage} from "react-icons/fa";
import {FaX} from "react-icons/fa6";
import PropTypes, {string} from "prop-types";
import {atomOneDark, atomOneLight, CodeBlock, dracula, solarizedLight} from "react-code-blocks";
import PageModel from "../Models/PageModel.js";

function CarouselAlternative({model}) {
    let [index, setIndex] = useState(0);
    let [previousIndex, setPreviousIndex] = useState(0);
    let [docsOpen, setDocsOpen] = useState(false);
    let [forceDocsOpen, setForceDocsOpen] = useState(false);
    let [imageOpen, setImageOpen] = useState(false);
    let [forceImageOpen, setForceImageOpen] = useState(false);
    let [showCode, setCode] = useState(false);
    const docsRef = useRef(null);
    const imageRef = useRef(null);

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

        // close the expanded carousels if the index changes
        shouldImageOpen = shouldImageOpen && !(previousIndex != index)
        shouldDocsOpen = shouldDocsOpen && !(previousIndex != index)

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
            console.log("Image Open");
        } else if (docsOpen) {
            docsRef.current.style.zIndex = "100";
            imageRef.current.style.zIndex = null;
            console.log("Docs Open");
        } else {
            console.log("Both Closed");
        }
    }, [index, docsOpen, imageOpen, showCode, forceDocsOpen, forceImageOpen]);
        return (
            <div className={"w-full h-full flex flex-row items-stretch justify-stretch relative grow"}>
                {/* Left Arrow */}
                <div className={"absolute -bottom-7 w-full h-full flex-row flex right-10 items-end justify-center z-10 pointer-events-none"}>
                    <button onClick={() => {
                        let newIndex = index - 1;
                        if (newIndex < 0) {
                            newIndex = model.maxIndex - 1;
                        }
                        setIndex(newIndex)}} className={"pointer-events-auto"}><FaArrowLeft/></button>
                </div>
                {/* Right Arrow */}
                <div className={"absolute -bottom-7 w-full h-full flex-row flex left-10 items-end justify-center z-10 pointer-events-none"}>
                    <button onClick={() => setIndex((index + 1) % model.maxIndex)} className={"pointer-events-auto"}><FaArrowRight/></button>
                </div>
                {/* Carousel Dots */}
                <div className={"absolute -bottom-7 w-full h-full flex-row flex items-end justify-center"}>
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
                {/* Image Carousel */}
                <div ref={imageRef} className={"grid grid-rows-1 grid-cols-1 w-full h-full md:w-[49.5%] relative overflow-hidden whitespace-nowrap flex-nowrap shadow-inner bg-black/15 rounded-lg transition-all ease-in-out duration-500"} style={{
                    position: imageOpen ? "absolute" : "absolute",
                    left: imageOpen ? "0" : "0",
                    width: imageOpen ? "100%" : null,
                    top: imageOpen ? "-100" : null,
                }}>
                    <div className={"bg-gradient-to-br from-yinmn-blue to-oxford-blue absolute w-full h-full"}/>
                    <div key={"images"} className={`flex-row flex items-stretch rounded-lg overflow-clip justify-evenly absolute flex-nowrap w-full h-full overflow-visible transition-all ease-in-out duration-500`} style={{transform: `translateX(-${index * 100}%)`}}>
                        {Array.from({ length: model.maxIndex }).map((_, i) => {
                            if(model.images.length > i) {
                                const image = model.images[i];
                                return(<img key={`${i}_image`} src={image} className={`object-cover h-full w-full min-w-full bottom-0 relative rounded-lg p-1`} />);
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
                {/* Image Carousel Phantom */}
                <div className={"invisible md:mr-5 grid grid-rows-1 grid-cols-1 w-full h-full md:w-[49.5%] relative overflow-hidden whitespace-nowrap flex-nowrap shadow-inner bg-black/15 rounded-lg transition-all ease-in-out duration-250"} style={{
                    position: imageOpen ? "relative" : "relative",
                    left: imageOpen ? "0" : "0",
                    width: imageOpen ? "100%" : null,
                    top: imageOpen ? "-100" : null,
                    zIndex: imageOpen ? "100" : null,
                    }}>
                </div>
                {/* Docs and Code */}
                <div ref={docsRef} className={"hidden md:grid grid-rows-1 grid-cols-1 items-end justify-end w-full h-full md:w-[49.5%] relative overflow-clip whitespace-nowrap flex-nowrap shadow-inner bg-black/15 rounded-lg transition-all ease-in-out duration-500"} style={{
                    position: docsOpen ? "absolute" : "absolute",
                    right: docsOpen ? "0" : "0",
                    width: docsOpen ? "100%" : null,
                    top: docsOpen ? "-100" : null,
                }}>
                    <button key={"docs-button"} className={"absolute top-0 left-0 w-15 text-left p-3.5 pt-2 h-10 z-92 text-platinum"} onClick={() => setCode(false)}>Docs</button>
                    <button key={"code-button"} className={"absolute top-0 left-15 w-15 text-left p-3.5 pt-2 h-10 z-92 text-platinum"} onClick={() => { setCode(true); setForceDocsOpen(true); }}>Code</button>
                    <div className={"bg-gradient-to-br from-yinmn-blue to-oxford-blue absolute top-0 w-full text-left p-2 h-10 z-91"}></div>
                    <div className={"bg-oxford-blue absolute top-0 w-17 text-left p-2 h-10 z-91 rounded-tl-lg rounded-tr-lg transition-all ease-in-out duration-300"} style={{
                        left: showCode ? "calc(var(--spacing) * 15.5)" : "0rem",
                    }}/>
                    <div className={"bg-oxford-blue w-full h-full rounded-lg"}/>
                    <div className={`flex-row flex items-stretch rounded-lg overflow-clip justify-evenly absolute flex-nowrap h-full w-full`}>
                        <div className={`flex-row flex items-stretch rounded-lg overflow-clip justify-evenly absolute flex-nowrap w-full max-h-full overflow-x-visible overflow-y-clip overflow-ellipsis transition-all ease-in-out duration-500`} style={{transform: `translateX(-${index * 100}%)`}}>
                            {Array.from({ length: model.maxIndex }).map((_, i) => {
                                let docElement;
                                let codeElement;
                                if(model.docs.length > i) {
                                    const doc = model.docs[i];
                                    docElement = <p key={`${i}_doc`} className={"text-platinum row-start-1 row-end-4 col-start-1 col-end-4 max-h-full mb-4 min-w-full mt-8 flex flex-row text-wrap text-justify p-5 overflow-hidden text-ellipsis transition-all ease-in-out duration-250"} style={{opacity: showCode ? "0" : "1"}}>{doc}</p>
                                }
                                if(model.codeBlocks.length > i) {
                                    const codeBlock = model.codeBlocks[i];
                                    codeElement = <div key={`${i}_code`} className={"row-start-1 row-end-4 col-start-1 col-end-4 pt-5 max-h-full min-h-100 min-w-full mt-4 overflow-hidden transition-all ease-in-out duration-250"} style={{opacity: showCode ? "1" : "0"}}>
                                        <CodeBlock theme={atomOneDark} text={codeBlock.text} language={codeBlock.language}/>
                                    </div>
                                }
                                return (
                                    <div key={`${i}_doc_code`} className={"grid grid-cols-1 grid-rows-1 max-h-full min-h-130 h-full w-full min-w-full p-0 m-0"}>
                                        {docElement}
                                        {codeElement}
                                    </div>
                                );
                            })}
                        </div>
                        <button className={"group w-full h-full rounded-lg hover:bg-black/75 border-3 border-transparent hover:border-oxford-blue z-90 flex flex-col items-center justify-center transition-all ease-in-out duration-300"} onClick={() => {
                            let forceDocs = !forceDocsOpen;
                            setForceDocsOpen(forceDocs);
                            if(forceDocs) {
                                setForceImageOpen(false);
                            }
                        }}>
                            <p className={"text-white text-center p-2 invisible group-hover:visible rounded-lg"}>{!docsOpen ? "Expand" : "Close"}</p>
                            {!docsOpen ? (
                            <FaExpand className={"fill-platinum invisible group-hover:visible"}/>
                        ) : (
                            <FaX className={"fill-platinum invisible group-hover:visible"}/>
                        )}
                        </button>
                    </div>
                </div>
                {/* Docs and Code Phantom */}
                <div className={"invisible hidden md:grid grid-rows-1 grid-cols-1 items-end justify-end w-full h-full md:w-[49.5%] relative overflow-clip whitespace-nowrap flex-nowrap shadow-inner bg-black/15 rounded-lg transition-all ease-in-out duration-500"} style={{
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

CarouselAlternative.propTypes = {
    model: PropTypes.instanceOf(PageModel),
}

export default CarouselAlternative;