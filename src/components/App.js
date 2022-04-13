import "./../style/App.css";
import React, { useEffect, useState } from "react";
import TrollManager from "./TrollManager.tsx";

const App = (props) => {
    const [boundsX, setBoundsX] = useState(0);
    const [boundsY, setBoundsY] = useState(0);

    // initial render
    useEffect(() => {
        let pageWidth = Math.floor(document.documentElement.scrollWidth) - 100;
        let pageHeight = Math.floor(document.documentElement.scrollHeight) - 100;
        setBoundsX(pageWidth);
        setBoundsY(pageHeight);
        console.log(`[INFO] (App / UE_1) ${pageWidth} ${pageHeight}`);
    }, []);

    return (
        <div className="app">
            <TrollManager trollText="🐢" boundsX={boundsX} boundsY={boundsY} />
        </div>
    );
};

export default App;
