import { useState } from 'react'
import './input.css'
import PostContainer from "./Components/PostContainer.jsx";
import BrightnessToggle from "./Components/BrightnessToggle.jsx";
import Footer from "./Components/Footer.jsx";
import { FaArrowCircleDown } from "react-icons/fa";
import ReactCurvedText from 'react-curved-text';

function App() {
    let [scrollPosition, setScrollPosition] = useState(0);
    let currentMaxHeight = 0;


    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const position = Math.ceil(
            (scrollTop / (scrollHeight - clientHeight)) * 100
        );
        currentMaxHeight = (scrollHeight - clientHeight);
        setScrollPosition(position);
    };

  return (
    <>
        <div className={"flex flex-col h-full font-display dark:text-platinum"} onScroll={handleScroll}>
            <div className={"background absolute w-full h-full opacity-25 dark:invert"}></div>
            <div className={"flex-1 h-auto flex p-5 flex-col m-5 rounded-md items-center align-middle overflow-clip mb-25"}>
                    <div className={"border-1 p-5 shadow-2xl rounded-md flex w-full  items-center justify-between w-full"}>
                        <p>Marco Farace's</p>
                        <div className={"flex flex-row items-center justify-between"}>
                            <p className={"pr-2"}>Awesome Portfolio</p>
                            <BrightnessToggle className={"pl-10"}/>
                        </div>
                    </div>
                <p className={"text-justify p-5"}>From crafting procedurally generated worlds to tackling full-stack mobile development, I turn ideas into polished, playable experiences. Whether it's C# in Unity, C++ in Unreal, or some chaotic game jam magic, I love pushing technical boundaries while keeping things fun. Need a creative coder who’s as sharp as his debugging skills? You’re in the right place.</p>

                    <img src={"DSC09388.jpg"} className={"mt-5 w-90 h-90 object-cover aspect-square rounded-full z-10 border-2 border-rich-black dark:border-yinmn-blue hover:border-5 hover:scale-105 hover:shadow-2xl ease-in-out duration-200"}/>
                <p className={"mt-10"}>Scroll Down</p>
                <p>That's where it gets serious!</p>
                <button className={"hover:scale-250 relative top-15 scale-200 p-1 border-1 rounded-full ease-in-out duration-200"}>
                    <FaArrowCircleDown className={"hover:scale-120 duration-400 ease-in-out"} />
                </button>
            </div>
            <Footer/>
        </div>
    </>
  );
}

export default App;
