import React, { useEffect, useRef, useState } from "react";
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
    var crossRef = useRef(null);
    var trollRef = useRef(null);

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
    const getRandomNewTrollPosition = (mouseX, mouseY) => {
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

    const getDirectedNewTrollPosition = (mouseX, mouseY) => {
        // Getting line equation and calculating random points
        const trollCenterX = trollX + Math.floor(trollRef.current.offsetWidth / 2);
        const trollCenterY = trollY + Math.floor(trollRef.current.offsetHeight / 2);

        const newTrollCoordinates = getValidRandomPoint(trollCenterX, trollCenterY, mouseX, mouseY);

        var newTrollX = trollX;
        var newTrollY = trollY;

        // if a valid new point is returned, perform collision detection with ExplodingCrossText
        if (newTrollCoordinates.x) {
            // detect collision using helper
            const crossCenterX = crossX + Math.floor(crossRef.current.offsetWidth / 2);
            const crossCenterY = crossY + Math.floor(crossRef.current.offsetHeight / 2);
            const crossR = Math.abs(crossCenterX - crossX);

            const tempNewTrollX = newTrollCoordinates.x;
            const tempNewTrollY = newTrollCoordinates.y;

            var isColliding = checkLineColliding(
                trollCenterX,
                trollCenterY,
                tempNewTrollX,
                tempNewTrollY,
                crossCenterX,
                crossCenterY,
                crossR
            );

            console.log(isColliding);
            if (isColliding) {
                setTimeout(() => setExploded(true), 350);
                newTrollX = crossX;
                newTrollY = crossY;
            } else {
                newTrollX = tempNewTrollX;
                newTrollY = tempNewTrollY;
            }
        }

        // set states
        setTrollX(newTrollX);
        setTrollY(newTrollY);
    };

    const getDistance = (x1, y1, x2, y2) => {
        var a = x1 - x2;
        var b = y1 - y2;
        return Math.sqrt(a * a + b * b);
    };

    const getSlopeIntercept = (x1, y1, x2, y2) => {
        const slope = (y2 - y1) / (x2 - x1);
        return (x) => {
            const y = slope * (x - x1) + y1;
            return y;
        };
    };

    const getValidRandomPoint = (
        trollCenterX,
        trollCenterY,
        mouseX,
        mouseY,
        minRadius = 100,
        maxRadius = 300
    ) => {
        const slopeIntercept = getSlopeIntercept(trollCenterX, trollCenterY, mouseX, mouseY);

        var validX = [];
        for (var xi = 0; xi < props.boundsX; xi++) {
            var yi = slopeIntercept(xi);

            // checking within bounds
            if (
                yi < props.boundsY &&
                yi > 100 &&
                getDistance(trollCenterX, trollCenterY, xi, yi) <= maxRadius &&
                getDistance(trollCenterX, trollCenterY, xi, yi) >= minRadius
            ) {
                if (trollCenterX > mouseX && trollCenterY > mouseY) {
                    if (xi > trollCenterX && yi > trollCenterY) {
                        validX.push(xi);
                    }
                } else if (trollCenterX > mouseX && trollCenterY < mouseY) {
                    if (xi > trollCenterX && yi < trollCenterY) {
                        validX.push(xi);
                    }
                } else if (trollCenterX < mouseX && trollCenterY > mouseY) {
                    if (xi < trollCenterX && yi > trollCenterY) {
                        validX.push(xi);
                    }
                } else if (trollCenterX < mouseX && trollCenterY < mouseY) {
                    if (xi < trollCenterX && yi < trollCenterY) {
                        validX.push(xi);
                    }
                }
            }
        }

        if (validX.length > 0) {
            var randomX = validX[Math.floor(Math.random() * validX.length)];
            return {
                x: randomX,
                y: slopeIntercept(randomX),
            };
        } else {
            return { x: null, y: null };
        }
    };

    const checkLineColliding = (
        trollCenterX,
        trollCenterY,
        tempNewTrollX,
        tempNewTrollY,
        crossCenterX,
        crossCenterY,
        crossR
    ) => {
        const slopeIntercept = getSlopeIntercept(
            trollCenterX,
            trollCenterY,
            tempNewTrollX,
            tempNewTrollY
        );

        var collidingLineX = [];
        for (
            var xi = Math.min(trollCenterX, tempNewTrollX);
            xi <= Math.max(trollCenterX, tempNewTrollX);
            xi++
        ) {
            var yi = slopeIntercept(xi);
            if (getDistance(xi, yi, crossCenterX, crossCenterY) <= crossR) {
                return true;
            }
        }
        return false;
    };

    const takeMeThere = () => {
        if (!exploded) {
            setTrollX(crossX);
            setTrollY(crossY);
            setTimeout(() => setExploded(true), 350);
        }
    };
    // UTILS & HELPERS

    return (
        <div>
            <ExplodingCrossText
                crossRef={crossRef}
                crossX={crossX}
                crossY={crossY}
                exploded={exploded}
            />
            <TrollText
                trollRef={trollRef}
                trollText={props.trollText}
                trollX={trollX}
                trollY={trollY}
                exploded={exploded}
                getNewTrollPosition={getDirectedNewTrollPosition}
            />
            <button onClick={takeMeThere}>
                {!exploded ? "(╯°□°）╯︵ ┻━┻)" : "┬─┬ ノ( ゜-゜ノ)"}
            </button>
        </div>
    );
};

export default TrollManager;
