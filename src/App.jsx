import { useState } from 'react'
import './input.css'
import PostContainer from "./Components/PostContainer.jsx";
import BrightnessToggle from "./Components/BrightnessToggle.jsx";
import Footer from "./Components/Footer.jsx";

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
        <div className={"overflow-y-scroll h-full overflow-x-clip"} onScroll={handleScroll}>
            <BrightnessToggle/>
            <div className={"@container"}>
                <div className={"flex @max-[1650px]:flex-col m-10 @min-[1650px]:flex-wrap dark:bg-oxford-blue bg-yinmn-blue rounded-md"}>
                    <PostContainer scrollPosition={scrollPosition} index={0}/>
                    <PostContainer scrollPosition={scrollPosition} index={0} reverse={true}/>
                    <PostContainer scrollPosition={scrollPosition} index={2} />
                    <PostContainer scrollPosition={scrollPosition} index={3} reverse={true}/>
                    <PostContainer scrollPosition={scrollPosition} index={4} />
                    <PostContainer scrollPosition={scrollPosition} index={5} reverse={true}/>
                    <PostContainer scrollPosition={scrollPosition} index={6} />
                    <PostContainer scrollPosition={scrollPosition} index={7} reverse={true}/>
                    <PostContainer scrollPosition={scrollPosition} index={8} />
                    <PostContainer scrollPosition={scrollPosition} index={9} reverse={true}/>
                </div>
            </div>
            <Footer/>
        </div>
    </>
  );
}

export default App;
