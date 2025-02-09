import {Component, useRef} from "react";
import {FaArrowCircleDown} from "react-icons/fa";
import PropTypes from "prop-types";

function Landing({buttonClick}) {
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
            <><div
            className={"-z-0 flex-1 h-auto flex p-5 flex-col m-5 mt-0 rounded-md items-center align-middle overflow-clip"}>
            <p className={"text-justify p-5 pt-0 mb-20 md:mb-5"}>
                From crafting procedurally generated worlds to tackling full-stack mobile development, I turn
                ideas into polished, playable experiences.
                Whether it's C# in Unity, C++ in Unreal, or some chaotic game jam magic, I love pushing
                technical boundaries while keeping things fun.
                Need a creative coder who’s as sharp as his debugging skills? You’re in the right place.
            </p>
            <div
                className={"grid grid-cols-1 grid-rows-1 align-middle justify-center items-center relative image-stack"}>
                <img
                    ref={imageRef}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    src={"DSC09388.jpg"}
                    className={"z-0 transform row-end-1 row-start-1 col-start-1 col-end-1 max-h-60 max-w-60 md:max-w-90 md:max-h-90 md:mt-5 sm:max-w-70 sm:max-h-70 object-cover aspect-square rounded-full border-3 dark:border-amber-300 border-yinmn-blue hover:scale-110 shadow-black hover:shadow-2xl transition-all ease-in-out duration-200 about-image brightness-200"}
                />
                <div
                    className={"row-end-1 row-start-1 col-start-1 col-end-1 flex flex-col items-center justify-center z-10"}>
                    <button onClick={buttonClick}
                        className={"border-yinmn-blue dark:border-platinum pointer-events-auto z-20 hover:scale-250 scale-200 p-1 border-1 rounded-full ease-in-out duration-200 absolute dark:bg-yinmn-blue bg-amber-300 -bottom-2 md:-bottom-20 scroll-button fill-yinmn-blue dark:fill-amber-300"}>
                        <FaArrowCircleDown
                            className={"hover:scale-120 duration-400 ease-in-out hover:shadow-2xl shadow-black fill-yinmn-blue dark:fill-platinum"}/>
                    </button>
                </div>
            </div>
            <p className={"absolute invisible @xs:relative @xs:visible mt-10 md:mt-30"}>Click the Arrow</p>
            <p className={"absolute invisible @xs:relative @xs:visible"}>That's when it gets serious!</p>
        </div></>
);

}

Landing.propTypes = {
    buttonClick: PropTypes.func,
};

export default Landing;