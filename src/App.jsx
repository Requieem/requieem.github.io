import "./input.css";
import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header.jsx";
import Landing from "./Components/Landing.jsx";
import CursorFollow from "./Components/CursorFollow.jsx";

function App() {

    const nextPage = () => {
        console.log("Next Page");

        const container = document.querySelector(".scroll-container"); // Target your scrolling div
        if (container) {
            // scroll a full page height
            container.scrollTo({
                top: (container.scrollTop + container.clientHeight) * 1.001,
                behavior: "smooth"
            });
        }
    };


    return (
        <>
            {/*Container Div*/}
            <CursorFollow/>
            <div className={"@container scroll-container flex flex-col h-full overflow-y-scroll font-display dark:text-platinum"}>
                <div className={"background absolute w-full h-full opacity-25 dark:invert theme-transition"}></div>
                <Header/>
                <div className={"flex-col -z-0 max-h-full"}>
                    <div className={"h-full"}>
                        <Landing buttonClick={nextPage}/>
                    </div>
                    <div className={"h-full"}>
                        <Landing buttonClick={nextPage}/>
                    </div>
                    <div className={"h-full"}>
                        <Landing buttonClick={nextPage}/>
                    </div>
                    <div className={"h-full"}>
                        <Landing buttonClick={nextPage}/>
                    </div>
                    <div className={"h-full"}>
                        <Landing buttonClick={nextPage}/>
                    </div>
                </div>
            </div>
                <Footer/>
        </>
    );
}

export default App;
