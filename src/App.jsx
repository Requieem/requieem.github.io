import "./input.css";
import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header.jsx";
import Landing from "./Components/Landing.jsx";
import CursorFollow from "./Components/CursorFollow.jsx";
import {useEffect} from "react";
import Page from "./Components/Page.jsx";

function App() {
    let page = 0;

    const nextPage = () => {
        console.log("Next Page");

        const container = document.querySelector(".scroll-container"); // Target your scrolling div
        if (container) {
            const pages = document.querySelector(".pages");
            const maxPage = pages.children.length;
            const currentPage = pages.children[page];
            page++;
            page = Math.min(page, maxPage - 1);
            let totalHeight = 0;
            for (let i = 0; i < page; i++) {
                totalHeight += pages.children[i].clientHeight
            }
            const scrollTarget = totalHeight;
            // scroll a full page height
            container.scrollTo({
                top: scrollTarget,
                behavior: "smooth"
            });
        }
    };

    const prevPage = () => {
        console.log("Prev Page");

        const container = document.querySelector(".scroll-container"); // Target your scrolling div
        if (container) {
            const pages = document.querySelector(".pages");
            const currentPage = pages.children[page];
            page--;
            page = Math.max(page, 0);
            let totalHeight = 0;
            for (let i = 0; i < page; i++) {
                totalHeight += pages.children[i].clientHeight
            }
            const scrollTarget = totalHeight;
            // scroll a full page height
            container.scrollTo({
                top: scrollTarget,
                behavior: "smooth"
            });
        }
    }

    // Use Effect Hook to react to scroll events
    useEffect(() => {
        const whichPage = (scrollEvent) => {
            // decide whether to go to the next or previous page
            if (scrollEvent.deltaY > 0) {
                nextPage();
            } else {
                prevPage();
            }
        }

        window.addEventListener("wheel", whichPage);
        return () => {
            window.removeEventListener("wheel", whichPage);
        }
    }, []);

    return (
        <>
            {/*Container Div*/}
            <CursorFollow/>
            <div className={"@container scroll-container flex flex-col h-full overflow-y-scroll font-display dark:text-platinum"}>
                <div className={"background absolute w-full h-full opacity-25 dark:invert theme-transition"}></div>
                <Header/>
                <div className={"flex-col -z-0 max-h-full pages"}>
                    <div className={"h-full"}>
                        <Landing buttonClick={nextPage}/>
                    </div>
                    <div className={"h-full"}>
                        <Page buttonClick={nextPage}/>
                    </div>
                    <div className={"h-full"}>
                        <Page buttonClick={nextPage}/>
                    </div>
                    <div className={"h-full"}>
                        <Page buttonClick={nextPage}/>
                    </div>
                    <div className={"h-full"}>
                        <Page buttonClick={nextPage}/>
                    </div>
                </div>
            </div>
                <Footer/>
        </>
    );
}

export default App;
