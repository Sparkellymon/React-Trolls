import React, { useEffect, useState } from "react";

interface TrollTextInterface {
    trollText: string;
    trollX: number;
    trollY: number;
    exploded: boolean;
    getNewTrollPosition: any;
}

const TrollText: React.FC<TrollTextInterface> = (props) => {
    useEffect(() => {
        console.log("[INFO] (Func2 / UE_1) Rerender");
    });

    const onTextHover = (e) => {
        props.getNewTrollPosition(e.pageX, e.pageY);
    };

    return (
        <div>
            {!props.exploded ? (
                <h1
                    style={{
                        position: `absolute`,
                        transition: `all 0.3s ease-in-out`,
                        top: props.trollY,
                        left: props.trollX,
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
