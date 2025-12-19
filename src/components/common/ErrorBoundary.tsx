import * as React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean, error: Error, reset: () => void }

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            hasError: false,
            error: new Error(),
            reset: () => { }
        }
    }

    static getDerivedStateFromError(error: any) {

        return { hasError: true, error }
    }

    handleReload = () => {
        window.location.reload();
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log(error, errorInfo);
        this.setState({
            error
        })

    }

    render(): React.ReactNode {

        if (this.state.hasError) {

            return (
                <main style={{ maxWidth: "100%", minHeight: 620, display: "flex", alignItems: 'center', justifyContent: "center" }}>
                    <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>Something went wrong</h2><br />
                        <p><span>Name: </span>  {this.state.error.name}</p><br />
                        <p><span>Message: </span>  {this.state.error.message}</p><br />
                        <button
                            onClick={() => this.handleReload()}
                            style={{ backgroundColor: "green", color: "white", padding: 4, borderRadius: 4 }}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Try again
                        </button>
                    </div>
                </main>
            )
        }

        return this.props.children
    }


}