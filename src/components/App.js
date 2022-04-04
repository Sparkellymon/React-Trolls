import React from "react";

import TrollButton from "./TrollButton";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="app">
                <TrollButton>🐒</TrollButton>
            </div>
        );
    };
}

export default App;
