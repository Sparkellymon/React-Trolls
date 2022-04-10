import React from "react";
import "./../style/App.css"
import TrollText from "./TrollText";
import FunctionalTrollText from "./FunctionalTrollText.tsx";
import ExplodingCross from "./ExplodingCross.tsx";
import Combined from "./Combined.tsx";
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    pageWidth  = Math.floor(document.documentElement.scrollWidth);
    pageHeight = Math.floor(document.documentElement.scrollHeight);
    render = () => {
        return (
            <div className="StyledApp">
                {/* <TrollText>🐉</TrollText> */}
                {/* <ExplodingCross pageWidth={this.pageWidth} pageHeight={this.pageHeight}></ExplodingCross>
                <FunctionalTrollText trolltext="🐢" pageWidth={this.pageWidth} pageHeight={this.pageHeight}></FunctionalTrollText> */}
                <Combined trollText="🐢" pageHeight={this.pageHeight} pageWidth={this.pageWidth}/>
            </div>
        );
    };
}

export default App;
