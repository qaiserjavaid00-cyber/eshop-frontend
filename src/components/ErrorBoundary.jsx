import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, info: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error("Error caught by ErrorBoundary:", error);
        console.error(info);
        this.setState({ info });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-10 text-red-600">
                    <h2>Something went wrong in this component.</h2>
                    <pre>{this.state.error?.toString()}</pre>
                    {this.state.info && <pre>{this.state.info.componentStack}</pre>}
                </div>
            );
        }

        return this.props.children;
    }
}
