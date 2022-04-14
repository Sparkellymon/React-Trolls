import React, { useEffect } from "react";
interface ExplodingCrossTextInterface {
    crossRef: any;
    crossX: number;
    crossY: number;
    exploded: boolean;
}
const ExplodingCrossText: React.FC<ExplodingCrossTextInterface> = (props) => {
    if (props.exploded) {
        console.log("[INFO] (ExplodingCross) Paths crossed");
    }

    useEffect(() => {
        console.log("[INFO] (ExplodingCross) Rerender");
    });

    const explodingText = props.exploded ? "💥" : "❌";
    return (
        <h1
            ref={props.crossRef}
            style={{
                position: `absolute`,
                top: props.crossY,
                left: props.crossX,
                // debug style
                margin: "0px",
                padding: "10px",
                borderRadius: "50%",
            }}
        >
            {explodingText}
        </h1>
    );
};

export default ExplodingCrossText;
