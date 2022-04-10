import React, { useEffect, useState } from "react";

interface TrollText2Interface {
    trolltext : string,
    explodingCrossX: number,
    explodingCrossY: number,
    pageHeight: number,
    pageWidth: number,
    setShouldExplode: any,
    hasExploded: boolean,
    setOldCrossX: any,
    setOldCrossY: any,
    setDisableFunctionality: any,
    disableFunctionality: boolean
}

const isPointBetweenPoints = (currPoint, point1, point2, threshold=100) => {
    console.log('crossCoords', currPoint);
    console.log('oldTroll', point1);
    console.log('newTroll', point2);
    const dxc = currPoint.x - point1.x;
    console.log("dxc=",dxc);
    const dyc = currPoint.y - point1.y;
    console.log("dyc=",dyc);

    const dxl = point2.x - point1.x;
    console.log("dxl",dxl);

    const dyl = point2.y - point1.y;
    console.log("dyl=",dyl);


    const cross = dxc * dyl - dyc * dxl;
    console.log("cross",cross);


    if (Math.abs(cross) > threshold)
    {  
        console.log('returning from cross!=0')
        return false;
    }

    if (Math.abs(dxl) >= Math.abs(dyl)){
        console.log(dxl > 0 ? 
            point1.x <= currPoint.x && currPoint.x <= point2.x :
            point2.x <= currPoint.x && currPoint.x <= point1.x);
        return dxl > 0 ? 
            point1.x <= currPoint.x && currPoint.x <= point2.x :
            point2.x <= currPoint.x && currPoint.x <= point1.x;

    }
    else {
        console.log(dyl > 0 ? 
            point1.y <= currPoint.y && currPoint.y <= point2.y :
            point2.y <= currPoint.y && currPoint.y <= point1.y);
        return dyl > 0 ? 
            point1.y <= currPoint.y && currPoint.y <= point2.y :
            point2.y <= currPoint.y && currPoint.y <= point1.y;
    }
  }

const FunctionalTrollText2: React.FC<TrollText2Interface> = (props) => {

    console.log(props);

    const [ trollTextMarginTop, setTrollTextMarginTop ] = useState(Math.floor(props.pageHeight/2));
    const [ trollTextMarginLeft, setTrollTextMarginLeft ]= useState(Math.floor(props.pageWidth/2));


    useEffect(()=>{
        console.log("FunctionalTrollText2 Rerender");
    });

    const onTextHover = (e) => {
        console.log("in Text Hover");
        console.log("props.trollTextX", trollTextMarginLeft);
        console.log("props.trollTextY", trollTextMarginTop);
        if(!props.disableFunctionality){

        const signY = Math.random() <0.5 ? 1: -1;
        const signX = Math.random() < 0.5 ? 1: -1;

        const newTrollTextY = (props.pageHeight + (trollTextMarginTop + Math.floor((signY) * Math.random() * 150))) % props.pageHeight;

        const newTrollTextX = (props.pageWidth + (trollTextMarginLeft + Math.floor((signX) * Math.random() * 150))) % props.pageWidth;

        const oldTrollPoint = { x: trollTextMarginLeft, y: trollTextMarginTop };
        const newTrollPoint = { x: newTrollTextX, y: newTrollTextY };

        const explodingCrossPoint = { x: props.explodingCrossX, y: props.explodingCrossY };
        const shouldExplode = isPointBetweenPoints(explodingCrossPoint, oldTrollPoint, newTrollPoint);
        console.log(e, newTrollTextY, newTrollTextX, shouldExplode) ;
        setTrollTextMarginTop(newTrollTextY);
        setTrollTextMarginLeft(newTrollTextX);
        props.setShouldExplode(shouldExplode);
        if(shouldExplode){
            setTimeout(()=> props.setDisableFunctionality(true), 450);
        }
        }

    }

    const takeMeThere = () => {
        console.log("takeMeThere");
        console.log('props.explodingCrossX', props.explodingCrossX);
        console.log('props.explodingCrossY', props.explodingCrossY);
        if(!props.disableFunctionality){
            setTrollTextMarginTop(props.explodingCrossY);
            setTrollTextMarginLeft(props.explodingCrossX);
            // props.setOldCrossX(props.explodingCrossX);
            // props.setOldCrossY(props.explodingCrossY);
            setTimeout(()=> props.setShouldExplode(true), 300);
            setTimeout(()=> props.setDisableFunctionality(true), 450);
        }   
    }
    
    return (
        <div>
        {!props.disableFunctionality ?
            <h1
                style={{
                            position: `absolute`,
                            transition: `all 0.3s ease-in-out`,
                            top: trollTextMarginTop,
                            left: trollTextMarginLeft,
                        }}
                // onClick={() => {
                //             alert("You Won!");
                //         }}
                onMouseEnter={onTextHover}
                onTouchMove={onTextHover}
                >
                {props.trolltext}
            </h1> 
         : null}
        <button onClick={takeMeThere}>{!props.disableFunctionality ? "(╯°□°）╯︵ ┻━┻)" : "┬─┬ ノ( ゜-゜ノ)"}</button>
        </div>
    )
}

export default FunctionalTrollText2;