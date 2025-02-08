import {Component} from "react";
import BrightnessToggle from "./BrightnessToggle.jsx";

class Header extends Component {
    render() {
        return <div className={"z-30 w-auto sticky top-0"}>
            <div className={"border-1 m-5 p-5 pr-2 shadow-2xl rounded-md flex items-center justify-between bg-clip-padding backdrop-filter backdrop-blur-sm border dark:bg-amber-300/5 dark:border-amber-300 border-yinmn-blue bg-yinmn-blue/25 h-20 theme-transition"}>
                <p className={"flex-1"}>Marco Farace's</p>
                <div className={"flex flex-row @xs:flex-row-reverse items-center justify-between @xs:justify-end"}>
                    <div className={"absolute invisible sm:relative sm:visible"}>
                        <BrightnessToggle/>
                    </div>
                    <p className={"sm:pr-2 @xs:text-end font-bold text-xl text-wrap max-w-50 md:pr-5"}>Technical
                        Portfolio</p>
                </div>
            </div>
        </div>;
    }
}

export default Header;