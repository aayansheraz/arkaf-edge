import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary Caught Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", backgroundColor: "#0b0f0e", color: "#F1F7F6", fontFamily: "sans-serif", minHeight: "100vh" }}>
          <h1 style={{ color: "#00DF81" }}>⚠️ Runtime Error Detected</h1>
          <pre style={{ backgroundColor: "#141c19", padding: "20px", borderRadius: "8px", color: "#ff6b6b" }}>
            {this.state.error?.toString()}
            {"\n\nStack:\n"}
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: "10px 20px", backgroundColor: "#00DF81", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
