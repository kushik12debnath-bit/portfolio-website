import { Component, ErrorInfo, PropsWithChildren } from "react";

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<PropsWithChildren, State> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          color: "#eae5ec",
          background: "#0b080c",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          fontFamily: "Geist, sans-serif",
          textAlign: "center"
        }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "16px" }}>Something went wrong</h1>
          <p style={{ color: "#888", maxWidth: "600px", marginBottom: "24px" }}>
            {this.state.error?.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 32px",
              background: "#c2a4ff",
              color: "#0b080c",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer"
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
