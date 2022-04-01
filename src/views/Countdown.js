import React, { useState, useEffect } from "react";

// Class component
class CountDown extends React.Component {
    state = {
        count: 10
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                count: this.state.count - 1
            })
        }, 1000)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count && this.state.count === 0) {
            clearInterval(this.timer);
            this.props.onTimesUp();
        }
    }

    render() {
        return (
            <div>{this.state.count} class</div>
        )
    }
}

// Hook component
const NewCountDown = (props) => {
    const [count, setCount] = useState(10)

    useEffect(() => {
        if (count === 0) {
            props.onTimesUp();
            return;
        }

        let timer = setInterval(() => {
            setCount(count - 1)
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [count])

    return (
        <div>{count} hook</div>
    )
}

export { CountDown, NewCountDown };