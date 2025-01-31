import React, {Component} from 'react';
import viteLogo from '/vite.svg'
import linkedinLogo from '/linkedin_logo.png'
import itchLogo from '/itch_logo.png'
import githubLogo from '/github_logo.png'
import reactLogo from "../assets/react.svg";
import LogoLink from "./LogoLink.jsx";

function Footer() {
    return (
        <footer className={"w-full sticky bottom-5\n"}>
            <div className={"flex items-center text-platinum dark:bg-oxford-blue/35 bg-yinmn-blue/35 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg border border-rich-black dark:border-yinmn-blue m-5 p-5"}>
                <LogoLink url="https://www.linkedin.com/in/marco-farace/" image={linkedinLogo} classes={"logo linkedin"} alt="Linkedin Logo"/>
                <LogoLink url="https://requieem.itch.io/" image={itchLogo} classes={"logo itch"} alt="Itch.io Logo"/>
                <LogoLink url="https://github.com/Requieem" image={githubLogo} classes={"logo github"} alt="Github Logo"/>
                <p className={"flex-3 text-center"}>This portfolio was created with Vite + React</p>
                <LogoLink url="https://vite.dev" image={viteLogo} classes={"logo"} alt="Vite Logo"/>
                <LogoLink url="https://react.dev" image={reactLogo} classes={"logo react"} alt="React Logo"/>
            </div>
        </footer>
    );
}

export default Footer;