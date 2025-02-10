import React, {useState} from 'react';



function Carousel({images}) {
    let [index, setIndex] = useState(0);




        return (
            <div>
                <div className={"flex flex-row items-center justify-center w-full h-100 relative"}>
                    <div className={"absolute left-5 z-1"}>
                        <button className={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"}>
                            Prev
                        </button>
                    </div>
                    <img src={"BG.jpg"} className={"object-cover aspect-square w-80 left-15 relative brightness-50 rounded-xl p-1"}/>
                    <img src={"BG.jpg"} className={"object-cover aspect-square w-95 z-0 left-10 relative brightness-75 rounded-xl p-1"}/>
                    <img src={"BG.jpg"} className={"object-cover aspect-square w-110 rounded-xl p-1 z-2"}/>
                    <img src={"BG.jpg"} className={"object-cover aspect-square w-95 z-1 right-10 relative brightness-75 rounded-xl p-1"}/>
                    <img src={"BG.jpg"} className={"object-cover aspect-square w-80 right-15 relative brightness-50 rounded-xl p-1"}/>
                    <div className={"absolute right-5 z-1"}>
                        <button className={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        );
}

export default Carousel;