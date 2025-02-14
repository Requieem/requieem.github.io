import { useState, useEffect } from "react";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";


function CursorFollower() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const swapCursor = () => {
            const sun = document.querySelector(".sun");
            const moon = document.querySelector(".moon");
            const cursor = document.querySelector(".cursor-div");

            if (localStorage.currentTheme === "dark") {
                sun.style.display = "none";
                moon.style.display = "block";
                cursor.className = cursor.className.replace(" cursor-shadow", "");
                cursor.className += " cursor-shadow-dark";
                console.log(cursor.className);
            }

            if (localStorage.currentTheme === "light") {
                sun.style.display = "block";
                moon.style.display = "none";
                cursor.className = cursor.className.replace(" cursor-shadow-dark", "");
                cursor.className = cursor.className.replace(" backdrop-blur-xs", "");
                cursor.className += " cursor-shadow";
                cursor.className += " backdrop-blur-sm";
                console.log(cursor.className);
            }
        }

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("themeChange", swapCursor);
        swapCursor();
        const cursor = document.querySelector(".cursor-div");
        cursor.className = cursor.className.replace(" backdrop-blur-xs", "");
        cursor.className += " backdrop-blur-xs";
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("themeChange", swapCursor);
        }
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: position.y,
                left: position.x,
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                pointerEvents: "none", // Prevents blocking interactions
                transform: "translate(-50%, -50%)", // Center the circle on the cursor
                zIndex: 9000, // Ensure it's above everything
                transition: "transform 0.05s linear", // Smooth movement
            }}

            className={"hidden sm:flex cursor-div bg-silver-lake-blue/25"
                       + " dark:bg-yellow-200/15 flex-col bg-clip-padding bg-radial items-center justify-center flex backdrop-filter backdrop-blur-xs"}
        >
            <FaSun className={"w-5 h-5 fill-yinmn-blue sun pointer-events-none"}/>
            <FaMoon className={"w-5 h-5 fill-yellow-200 moon pointer-events-none z-10"}/>
        </div>
    );
}

export default CursorFollower;