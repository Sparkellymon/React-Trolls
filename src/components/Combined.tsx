import React, { useEffect, useState } from "react";
import FunctionalTrollText2 from "./FunctionalTrollText2.tsx";
import ExplodingCross from "./ExplodingCross.tsx";
interface CombinedInterface {
    pageHeight: number,
    pageWidth: number,
    trollText: string
}
const Combined: React.FC<CombinedInterface> = (props) => {
    const randomMarginTopForCross = Math.floor(Math.random() * props.pageHeight);
    const randomMarginLeftForCross = Math.floor(Math.random() * props.pageWidth);

    const [ shouldExplode, setShouldExplode ] = useState(false);
    const [ disableFunctionality, setDisableFunctionality ] = useState(false);


    const [ oldCrossX, setOldCrossX ] = useState(randomMarginLeftForCross);
    const [ oldCrossY, setOldCrossY ] = useState(randomMarginTopForCross);

    const crossX = shouldExplode ? oldCrossX : randomMarginLeftForCross;
    const crossY = shouldExplode ? oldCrossY : randomMarginTopForCross;


    useEffect(()=>{
        console.log("rerendered Combined");
        console.log("randomMarginTopForCross", randomMarginTopForCross);
        console.log("randomMarginLeftForCross", randomMarginLeftForCross);
        console.log("oldCrossX", oldCrossX);
        console.log("oldCrossY", oldCrossY);

        console.log("CrossX", crossX);
        console.log("CrossY", crossY);
    });

    return (
        <div>
            <ExplodingCross 
                explodingCrossX={crossX} 
                explodingCrossY={crossY} 
                shouldExplode={shouldExplode} />
            <FunctionalTrollText2 
                trolltext={props.trollText} 
                explodingCrossX={randomMarginLeftForCross} 
                explodingCrossY={randomMarginTopForCross} 
                pageHeight={props.pageHeight} 
                pageWidth={props.pageWidth} 
                setShouldExplode={setShouldExplode} 
                hasExploded={shouldExplode} 
                setOldCrossX={setOldCrossX} 
                setOldCrossY={setOldCrossY} 
                setDisableFunctionality={setDisableFunctionality} 
                disableFunctionality={disableFunctionality}/> 
        </div>
    );
}

export default Combined;