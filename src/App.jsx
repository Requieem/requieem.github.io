import { useState, useRef } from "react";
import "./input.css";
import PostContainer from "./Components/PostContainer.jsx";
import BrightnessToggle from "./Components/BrightnessToggle.jsx";
import Footer from "./Components/Footer.jsx";
import { FaArrowCircleDown } from "react-icons/fa";
import ReactCurvedText from "react-curved-text";
import CursorFollow from "./Components/CursorFollow.jsx";

function App() {
    const imageRef = useRef(null);
    let animationFrameId = null;

    const handleMouseMove = (e) => {
        if (!imageRef.current) return;

        const rect = imageRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        const maxRotation = 30;
        const rotateX = -(deltaY / rect.height) * maxRotation;
        const rotateY = (deltaX / rect.width) * maxRotation;

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        animationFrameId = requestAnimationFrame(() => {
            if (imageRef.current) {
                imageRef.current.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
    };

    const handleMouseLeave = () => {
        animationFrameId = requestAnimationFrame(() => {
            if (imageRef.current) {
                imageRef.current.style.transform = "none";
                imageRef.current.style.perspective = "none";
                imageRef.current.style.rotateX = "none";
                imageRef.current.style.rotateY = "none";
            }
        });
    };

    return (
        <>
            {/*Container Div*/}
            <CursorFollow/>
            <div className={"@container flex flex-col h-full font-display dark:text-platinum"}>
                <div className={"background absolute w-full h-full opacity-25 dark:invert"}></div>
                <div className={"flex-1 h-auto flex p-5 flex-col m-5 rounded-md items-center align-middle overflow-clip"}>
                    <div className={"border-1 p-5 shadow-2xl rounded-md flex w-full items-center justify-between w-full"}>
                        <p className={"flex-1"}>Marco Farace's</p>
                        <div className={"flex flex-row @xs:flex-row-reverse items-center justify-between @xs:justify-end"}>
                            <div className={"absolute invisible sm:relative sm:visible"}>
                                <BrightnessToggle/>
                            </div>
                            <p className={"sm:pr-2 @xs:text-end font-bold text-xl text-wrap max-w-50 md:pr-5"}>Technical Portfolio</p>
                        </div>
                    </div>
                    <p className={"text-justify p-5 mb-20 md:mb-5"}>
                        From crafting procedurally generated worlds to tackling full-stack mobile development, I turn ideas into polished, playable experiences.
                        Whether it's C# in Unity, C++ in Unreal, or some chaotic game jam magic, I love pushing technical boundaries while keeping things fun.
                        Need a creative coder who’s as sharp as his debugging skills? You’re in the right place.
                    </p>
                    <div className={"grid grid-cols-1 grid-rows-1 align-middle justify-center items-center relative image-stack"}>
                        <img
                            ref={imageRef}
                            onMouseLeave={handleMouseLeave}
                            onMouseEnter={handleMouseLeave}
                            onMouseMove={handleMouseMove}
                            src={"DSC09388.jpg"}
                            className={"z-1 transform row-end-1 row-start-1 col-start-1 col-end-1 max-h-60 max-w-60 md:max-w-90 md:max-h-90 md:mt-5 sm:max-w-70 sm:max-h-70 object-cover aspect-square rounded-full z-10 border-3 border-rich-black dark:border-yinmn-blue hover:scale-110 shadow-black hover:shadow-2xl transition-all ease-in-out duration-200 about-image"}
                        />
                        <div className={"row-end-1 row-start-1 col-start-1 col-end-1 flex flex-col items-center justify-center"}>
                            <button className={"z-20 hover:scale-250 scale-200 p-1 border-1 rounded-full ease-in-out duration-200 z-10 absolute -bottom-2 md:-bottom-20 scroll-button"}>
                                <FaArrowCircleDown className={"hover:scale-120 duration-400 ease-in-out hover:shadow-2xl shadow-black"} />
                            </button>
                        </div>
                    </div>
                    <p className={"absolute invisible @xs:relative @xs:visible mt-10 md:mt-30"}>Click the Arrow</p>
                    <p className={"absolute invisible @xs:relative @xs:visible"}>That's when it gets serious!</p>
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default App;
