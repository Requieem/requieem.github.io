import React, {Component} from 'react';
import {useEffect} from 'react';
import {FaMoon, FaSun} from "react-icons/fa";
import {Fa0} from "react-icons/fa6";

class BrightnessToggle extends Component {
    componentDidMount() {
        if(!("currentTheme" in localStorage) && !("theme" in localStorage))
            localStorage.currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

        document.documentElement.classList.toggle(
            "dark",
            localStorage.currentTheme === "dark"
        );

        document.querySelector(".theme-label").innerText = localStorage.currentTheme;
    }

    toggleTheme(event) {
        const currentTheme = localStorage.currentTheme || "light";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        const themeBox = document.querySelector(".theme-box");
        themeBox.value = currentTheme === 'dark';
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.currentTheme = newTheme;
        let toggles = document.querySelectorAll(".theme-label");
        toggles.forEach((toggle) => {
            toggle.innerText = newTheme;
        });

        window.dispatchEvent(new Event("themeChange"));
    }

    render() {
        return <div className={"border-1 rounded-md shadow-2xl p-2 flex-fow items-center justify-center flex-nowrap border-amber-300 dark:background-yinmn-blue/100 dark:border-yinmn-blue background-amber-300"}>
            <p className={"text-center capitalize theme-label"}>{localStorage.currentTheme || window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light"}</p>
            <div className={"scale-80"}>
                <label className="cursor-pointer items-center justify-center flex">
                    <input type="checkbox" value="" className="z-30 sr-only peer theme-box" onInput={this.toggleTheme}/>
                    <div
                        className="flex-row justify-end relative items-center relative w-11 h-6 bg-amber-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 dark:peer-checked:bg-yinmn-blue dark:peer-checked:bg-yinmn-blue">
                        <FaSun className="z-10 absolute left-6 dark:left-1 top-1 opacity-100 dark:opacity-0 fill-amber-300"/>
                        <FaMoon className="z-10 absolute left-6 dark:left-1 top-1 dark:opacity-100 opacity-0 fill-yinmn-blue"/>
                    </div>
                </label>
            </div>
        </div>;
    }
}

export default BrightnessToggle;