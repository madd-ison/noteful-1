import React from 'react';

export default class HandleError extends React.Component {
    state = {hasError: null};
    static getDerivedStateFromError(error) {
        console.error(error);

        this.setState({hasError: error})
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="error">
                    <h1>Sorry, something went wrong. Please try again!</h1>
                </main>
            )
        }
        return this.props.children
    }
}