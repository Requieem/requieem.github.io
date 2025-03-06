import React from 'react';

function IndexCarousel() {
    return (
            <div className={"flex flex-col w-screen"}>
                <h2>Section Title</h2>
                <div className={"h-5"}/>
                <div className={"flex flex-row justify-center"
                                + " sm:justify-start max-w-screen w-screen"
                                + " scroll-container"
                                + " items-center"}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
                        <div className={"grid grid-rows-1 grid-cols-1 m-1"
                                        + " min-h-50 min-w-75"
                                        + " rounded-lg max-w-full max-h-full"
                                        + " overflow-clip"
                                        + " group"
                                        + " items-center justify-center"
                                        + "align-middle"
                                        + "bg-cover bg-center"
                                        + "group-hover:drop-shadow-2xl"
                                        + " hover:scale-125 hover:mr-10"
                                        + " hover:ml-10"
                                        + " transition-all duration-250"
                                        + " ease-in-out"} style={{backgroundImage: "url('')"}}>
                            <div className={"w-full h-full col-start-1"
                                            + " object-cover col-end-2"
                                            + " row-start-1 row-end-2"
                                            + " brightness-25"
                                            + " group-hover:brightness-100"
                                            + " transition-all duration-250"
                                            + " bg-cover bg-center"
                                            + " ease-in-out"} style={{backgroundImage:"url(/StormFounders/title_screen.png)"}}/>
                            <div className={"text-platinum row-start-1 row-end-2"
                                            + " text-center"
                                            + " col-start-1 col-end-2 z-10"
                                            + " group-hover:opacity-0"
                                            + " transition-all duration-250"
                                            + " ease-in-out h-full w-full"
                                            + " backdrop-blur-xs "
                                            + " backdrop-filter"}></div>
                            <h3 className={"text-platinum row-start-1 row-end-2"
                                           + " text-center"
                                           + " col-start-1 col-end-2 z-10"
                                           + " group-hover:opacity-0 transition-all duration-250 ease-in-out"}>Content Title</h3>
                        </div>
                    ))}
                </div>
            </div>
    );
}

export default IndexCarousel;