import React, {Component} from 'react';
import {useEffect} from 'react';

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
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.currentTheme = newTheme;
        let toggles = document.querySelectorAll(".theme-label");
        toggles.forEach((toggle) => {
            toggle.innerText = newTheme;
        });

        window.dispatchEvent(new Event("themeChange"));
    }

    render() {
        return <div className={"border-1 rounded-md backdrop-blur-2xl shadow-2xl p-2 flex-fow items-center justify-center flex-nowrap"}>
            <p className={"text-center capitalize theme-label"}>{localStorage.currentTheme || window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light"}</p>
            <div className={"scale-80"}>
                <label className="cursor-pointer items-center justify-center flex">
                    <input type="checkbox" value="" className="sr-only peer" onInput={this.toggleTheme}/>
                    <div
                        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                </label>
            </div>
        </div>;
    }
}

export default BrightnessToggle;