import {Component, useRef, useState} from "react";
import {FaArrowCircleDown}           from "react-icons/fa";
import PropTypes from "prop-types";
import CarouselAlternative from "./CarouselAlternative.jsx";
import unity6 from "/Unity6.png";
import caveMesh from "/cave_mesh.png";
import PageModel      from "../Models/PageModel.js";
import {FaX, FaXmark} from "react-icons/fa6";

function Page({canScrollRef, model}) {
    let [showCarousel, setShowCarousel] = useState(false);

    let dummyModel = new PageModel(`Title - Page ${Math.random()}`, [caveMesh, caveMesh], [
        {
            text: "    const handleMouseLeave = () => {\n" +
                "        animationFrameId = requestAnimationFrame(() => {\n" +
                "            if (imageRef.current) {\n" +
                "                imageRef.current.style.transform = \"none\";\n" +
                "                imageRef.current.style.perspective = \"none\";\n" +
                "                imageRef.current.style.rotateX = \"none\";\n" +
                "                imageRef.current.style.rotateY = \"none\";\n" +
                "            }\n" +
                "        });\n" +
                "    };",
            language: "javascript"
        },
        {
            text: "    const handleMouseLeave = () => {\n" +
                "        animationFrameId = requestAnimationFrame(() => {\n" +
                "            if (imageRef.current) {\n" +
                "                imageRef.current.style.transform = \"none\";\n" +
                "                imageRef.current.style.perspective = \"none\";\n" +
                "                imageRef.current.style.rotateX = \"none\";\n" +
                "                imageRef.current.style.rotateY = \"none\";\n" +
                "            }\n" +
                "        });\n" +
                "    };" +
                "" +
                "" +
                "" +
                "" +
                "" +
                "" +
                "" +
                "" +
                "",
            language: "javascript"
        },
        {
            text: "    const handleMouseLeave = () => {\n" +
                "        animationFrameId = requestAnimationFrame(() => {\n" +
                "            if (imageRef.current) {\n" +
                "                imageRef.current.style.transform = \"none\";\n" +
                "                imageRef.current.style.perspective = \"none\";\n" +
                "                imageRef.current.style.rotateX = \"none\";\n" +
                "                imageRef.current.style.rotateY = \"none\";\n" +
                "            }\n" +
                "        });\n" +
                "    };" +
                "" +
                "" +
                "" +
                "" +
                "" +
                "" +
                "" +
                "",
            language: "javascript"
        },],
        ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."]
    );

    console.log(model);

        return (
            <><div
            className={"-z-0 lg:flex-3 h-full flex p-5 pt-0 pb-80 md:pb-75"
                       + " flex-col"
                       + " lg:flex-row rounded-md items-stretch"
                       + " align-middle"}>
                <div className={"flex flex-1 flex-col md:flex-row"
                                + " lg:flex-col"
                                + " mb-7 md:mb-10 lg:mb-0"
                                + " items-stretch"
                                + " align-middle max-h-147 sm:max-h-full"} style={{display: showCarousel ? "none" : null}}>
                    <h2 className={"text-left p-5 pt-0 bold text-2xl lg:pb-0"
                                   + ""}>{model.title}</h2>
                    <p className={"text-justify p-5 pt-0"
                                  + " overflow-y-auto border-1 p-2 pt-5 pb-5"
                                  + " rounded-md sm:border-0"}>
                        {model.description}
                    </p>
                </div>
                <div className={"flex-2 shrink hidden md:block"} style={{display: showCarousel ? "block" : null}}>
                    <CarouselAlternative canScrollRef={canScrollRef} model={model}/>
                </div>
                <div className={"relative flex-2 w-full h-full flex-col flex"
                                + " items-center"
                                + ""
                                + " md:hidden"
                                + " justify-center"} style={{
                                    flex: showCarousel ? "0" : null,
                    height: showCarousel ? "2em" : null,
                }}>
                    <button className={"text-platinum border-1 p-3 flex items-center justify-center"
                                       + " rounded-md max-w-100"
                                       + " shadow-2xl"
                                       + " bg-gradient-to-br pr-15 pl-15"
                                       + " -bottom-13 left-5"
                                       + " from-yinmn-blue to-oxford-blue"
                                       + " transition-all ease-in-out"
                                       + " duration-500 "}
                            style={{
                                borderRadius: showCarousel ? "100px" : null,
                                height: showCarousel ? "2em" : null,
                                width: showCarousel ? "2em" : null,
                                position: showCarousel ? "absolute" : null,
                                padding: showCarousel ? "0" : null,
                            }}
                            onClick={() => setShowCarousel(!showCarousel)}>
                        {showCarousel ? null : "Learn More"}
                        <FaXmark style={{
                            display: showCarousel ? "block" : "none",
                        }}/>
                    </button>
                </div>
        </div></>
);

}

Page.propTypes = {
    canScrollRef: PropTypes.object,
    buttonClick: PropTypes.func,
};

export default Page;