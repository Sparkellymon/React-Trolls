import React from "react";

class TrollButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            margin_top: 100,
            margin_left: 700,
        };
    }

    onButtonHover = (e) => {
        const signY = Math.random() < 0.5 ? 1 : -1;
        const signX = Math.random() < 0.5 ? 1 : -1;

        this.setState({
            margin_top: e.pageY + signY * Math.random() * 200,
            margin_left: e.pageX + signX * Math.random() * 200,
        });
    };

    render = () => {
        return (
            <div className="troll-button">
                <h1
                    style={{
                        position: `absolute`,
                        transition: `all 0.2s ease-in-out`,
                        top: this.state.margin_top,
                        left: this.state.margin_left,
                    }}
                    onClick={() => {
                        alert("You Won!");
                    }}
                    onMouseEnter={this.onButtonHover}
                >
                    {this.props.children}
                </h1>
            </div>
        );
    };
}

export default TrollButton;
