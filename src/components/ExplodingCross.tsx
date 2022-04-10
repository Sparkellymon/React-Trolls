import React, { useEffect } from "react";
interface ExplodingCrossInterface {
    explodingCrossX: number,
    explodingCrossY: number,
    shouldExplode: boolean
}
const ExplodingCross: React.FC<ExplodingCrossInterface> = (props) => {

    const explodingText = props.shouldExplode ? "💥" : "❌";

    if(props.shouldExplode)
    {
        console.log("Exploding Cross says paths crossed");
    }

    useEffect(()=>{
        console.log("Exploding Cross Rerender");
    });

    return (
            <h1
            style={{
                position: `absolute`,
                top: props.explodingCrossY,
                left: props.explodingCrossX,
            }}
            >
                {explodingText}
            </h1>
    );
}

export default ExplodingCross;