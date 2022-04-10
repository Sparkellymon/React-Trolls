import React, { useEffect, useState } from "react";
// @ts-ignore
import ExplodingCrossText from "./ExplodingCrossText.tsx";
// @ts-ignore
import TrollText from "./TrollText.tsx";

interface TrollManagerInterface {
    boundsX: number;
    boundsY: number;
    trollText: string;
}

const TrollManager: React.FC<TrollManagerInterface> = (props) => {
    const [crossX, setCrossX] = useState(0);
    const [crossY, setCrossY] = useState(0);
    const [trollX, setTrollX] = useState(0);
    const [trollY, setTrollY] = useState(0);
    const [exploded, setExploded] = useState(false);

    // initial render & tracking props [bounds]
    useEffect(() => {
        const posCrossX = Math.floor(Math.random() * props.boundsX);
        const posCrossY = Math.floor(Math.random() * props.boundsY);
        setCrossX(posCrossX);
        setCrossY(posCrossY);
        const posTrollX = Math.floor(Math.random() * props.boundsX);
        const posTrollY = Math.floor(Math.random() * props.boundsY);
        setTrollX(posTrollX);
        setTrollY(posTrollY);
        console.log(
            `[INFO] (TrollManager / UE_3) 
            crossX: ${posCrossX} crossY: ${posCrossY}
            trollX: ${posTrollX} trollY: ${posTrollY}`
        );
    }, [props.boundsX, props.boundsY]);

    // UTILS & HELPERS
    const getNewTrollPosition = (mouseX, mouseY) => {
        const signX = Math.random() < 0.5 ? 1 : -1;
        const signY = Math.random() < 0.5 ? 1 : -1;
        // TODO set bounds and rebouncing
        const newTrollX = mouseX + signX * Math.random() * 200;
        const newTrollY = mouseY + signY * Math.random() * 200;

        // detect collision using helper
        const newExploded = false;

        // set states
        setTrollX(newTrollX);
        setTrollY(newTrollY);
        setExploded(newExploded);
    };

    // detect collision

    const takeMeThere = () => {
        if (!exploded) {
            setTrollX(crossX);
            setTrollY(crossY);
            setTimeout(() => setExploded(true), 350);
        }
    };

    return (
        <div>
            <ExplodingCrossText
                crossX={crossX}
                crossY={crossY}
                exploded={exploded}
            />
            <TrollText
                trollText={props.trollText}
                trollX={trollX}
                trollY={trollY}
                exploded={exploded}
                getNewTrollPosition={getNewTrollPosition}
            />
            <button onClick={takeMeThere}>
                {!exploded ? "(╯°□°）╯︵ ┻━┻)" : "┬─┬ ノ( ゜-゜ノ)"}
            </button>
        </div>
    );
};

export default TrollManager;
