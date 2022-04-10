import React, { useEffect } from "react";
interface ExplodingCrossTextInterface {
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
            style={{
                position: `absolute`,
                top: props.crossY,
                left: props.crossX,
            }}
        >
            {explodingText}
        </h1>
    );
};

export default ExplodingCrossText;
