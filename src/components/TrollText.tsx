import React, { useEffect, useRef, useState } from "react";

interface TrollTextInterface {
    trollText: string;
    trollX: number;
    trollY: number;
    exploded: boolean;
    getNewTrollPosition: any;
}

const TrollText: React.FC<TrollTextInterface> = (props) => {
    const trollRef = useRef();

    useEffect(() => {
        console.log("[INFO] (TrollText / UE_2) Rerender");
    });

    const onTextHover = (e) => {
        props.getNewTrollPosition(e.pageX, e.pageY, trollRef);
    };

    return (
        <div>
            {!props.exploded ? (
                <h1
                    ref={trollRef}
                    style={{
                        position: `absolute`,
                        transition: `all 0.3s ease-in-out`,
                        top: props.trollY,
                        left: props.trollX,
                        // debug style
                        margin: "0px",
                        padding: "10px",
                        borderRadius: "50%",
                    }}
                    onMouseEnter={onTextHover}
                    onTouchMove={onTextHover}
                >
                    {props.trollText}
                </h1>
            ) : null}
        </div>
    );
};

export default TrollText;
