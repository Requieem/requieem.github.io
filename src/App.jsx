import "./input.css";
import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header.jsx";
import Landing from "./Components/Landing.jsx";
import CursorFollow from "./Components/CursorFollow.jsx";
import {useEffect, useRef, useState} from "react";
import {v4 as uuidv4} from "uuid";
import Page from "./Components/Page.jsx";
import axios from "axios";
import PageModel from "./Models/PageModel.js";
import {projectsData} from "./ProjectsData/projectsData.js";
import TableOfContents from "./Components/TableOfContents.jsx";

function App() {
    let page = 0;
    let canScroll = useRef(true);
    const [jsonData, setJsonData] = useState(null);
    const nextPage = () => {
        if (!canScroll.current) return;
        const container = document.querySelector(".scroll-container"); // Target your scrolling div
        if (container) {
            const pages = document.querySelector(".pages");
            const maxPage = pages.children.length;
            page = Math.min(page + 1, maxPage - 1);
            doScroll(container);
        }
    };

    const prevPage = () => {
        if (!canScroll.current) return;
        const container = document.querySelector(".scroll-container"); // Target your scrolling div
        if (container) {
            page = Math.max(page - 1, 0);
            doScroll(container);
        }
    }

    const doScroll = (container) => {
        let totalHeight = 0;
        const pages = document.querySelector(".pages");

        for (let i = 0; i < page; i++) {
            totalHeight += pages.children[i].clientHeight
        }
        const scrollTarget = totalHeight;
        // scroll a full page height
        canScroll.current = false
        setTimeout(() => {
            canScroll.current = true;
        }, 500);
        container.scrollTo({
            top: scrollTarget,
            behavior: "smooth"
        });
    }

    // Use Effect Hook to react to scroll events
    useEffect(() => {
        setJsonData(projectsData);
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
    }, [jsonData]);

    return (
        <>
            {/*Container Div*/}
            <CursorFollow/>
            <div className={"@container scroll-container flex flex-col h-full overflow-y-scroll font-display dark:text-platinum"} onScroll={(e) => e.preventDefault()}>
                <div className={"background absolute w-full h-full opacity-25 dark:invert theme-transition"}></div>
                <Header/>
                <div className={"flex-col -z-0 max-h-full pages"}>
                    {/* Pages, from jsonData array */}
                    <div className={"h-full"}>
                        <Landing canScrollRef={canScroll} buttonClick={nextPage}/>
                    </div>
                    <div className={"h-full"}>
                        <TableOfContents/>
                    </div>
                    {jsonData !== null && jsonData.map((data, index) => (
                        <div className={"h-full"} key={`page_${index}_${uuidv4()}`}>
                            <Page canScrollRef={canScroll} model={new PageModel(data.title, data.description, data.images, data.codeBlocks, data.docs)}/>
                        </div>
                    ))}
                </div>
            </div>
                <Footer/>
        </>
    );
}

export default App;
