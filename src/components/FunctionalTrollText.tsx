import React, { useState } from "react";
interface TrollTextInterface {
    trolltext : string,
    pageHeight: number
    pageWidth: number
}
const FunctionalTrollText: React.FC<TrollTextInterface> = (props) => {
    const [ marginTop, setMarginTop ] = useState(props.pageHeight/2);
    const [ marginLeft, setMarginLeft ]= useState(props.pageWidth/2);

    console.log(props);

    const onTextHover = (e) => {
        const signY = Math.random() <0.5 ? 1: -1;
        const signX = Math.random() < 0.5 ? 1: -1;

        const newMarginTop = (e.clientY + (signY) * Math.random() * 200) % props.pageHeight;

        const newMarginLeft = (e.clientX + (signX) * Math.random() * 200) % props.pageWidth;
        console.log(e, newMarginTop, newMarginLeft);

        setMarginTop(newMarginTop);
        setMarginLeft(newMarginLeft);
    }
    
    return (
        <h1
            style={{
                        position: `absolute`,
                        transition: `all 0.2s ease-in-out`,
                        top: marginTop,
                        left: marginLeft,
                    }}
            onClick={() => {
                        alert("You Won!");
                    }}
            onMouseEnter={onTextHover}
            >
            {props.trolltext}
        </h1>
    )
}

export default FunctionalTrollText;