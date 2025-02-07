import React, {Component} from 'react';
import viteLogo from '/vite.svg'
import linkedinLogo from '/linkedin_logo.png'
import itchLogo from '/itch_logo.png'
import githubLogo from '/github_logo.png'
import reactLogo from "../assets/react.svg";
import LogoLink from "./LogoLink.jsx";
import BrightnessToggle from "./BrightnessToggle.jsx";

function Footer() {
    return (
        <footer className={"w-full sticky bottom-0"}>
            <div className={"flex items-center rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm border dark:bg-amber-300/5 dark:border-amber-300 border-yinmn-blue bg-yinmn-blue/25 m-5 p-5 h-20"}>
                <LogoLink url="https://www.linkedin.com/in/marco-farace/" image={linkedinLogo} classes={"logo linkedin"} alt="Linkedin Logo"/>
                <LogoLink url="https://requieem.itch.io/" image={itchLogo} classes={"logo itch"} alt="Itch.io Logo"/>
                <LogoLink url="https://github.com/Requieem" image={githubLogo} classes={"logo github"} alt="Github Logo"/>
                <p className={"flex-3 text-center invisible absolute sm:relative sm:visible"}>This portfolio was created with Vite + React</p>
                <div className={"absolute invisible sm:relative sm:visible"}>
                    <LogoLink url="https://vite.dev" image={viteLogo} classes={"logo"} alt="Vite Logo"/>
                </div>
                <div className={"absolute invisible sm:relative sm:visible"}>
                    <LogoLink url="https://react.dev" image={reactLogo} classes={"logo react"} alt="React Logo"/>
                </div>
                <div className={"flex-1 flex justify-end -m-3 sm:absolute sm:invisible relative visible"}>
                    <BrightnessToggle/>
                </div>
            </div>
        </footer>
    );
}

export default Footer;