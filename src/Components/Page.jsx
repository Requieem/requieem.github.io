import {Component, useRef} from "react";
import {FaArrowCircleDown} from "react-icons/fa";
import PropTypes from "prop-types";
import Carousel from "./Carousel.jsx";
import CarouselAlternative from "./CarouselAlternative.jsx";
import unity6 from "/Unity6.png";
import caveMesh from "/cave_mesh.png";

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
            className={"-z-0 flex-1 h-full flex p-5 pt-0 pb-0 flex-col m-5 pt-0 pb-70 mb-100 rounded-md items-stretch align-middle overflow-clip"}>
                <h2 className={"text-left p-5 pt-0 bold text-2xl"}> Page Title </h2>
                <p className={"text-justify p-5 pt-0"}> "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
                <CarouselAlternative images={[caveMesh, caveMesh, caveMesh]}/>
        </div></>
);

}

Landing.propTypes = {
    buttonClick: PropTypes.func,
};

export default Landing;