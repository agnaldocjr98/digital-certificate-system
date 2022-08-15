import { Typography } from "@mui/material";
import React, { Component } from "react";

interface State {
  hasError: boolean;
  message: string;
}

interface Props {
  children: React.ReactNode;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    message: "",
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Typography variant="subtitle2" color="GrayText">
          Aconteceu algum erro na renderização deste componente:{" "}
          {this.state.message}
        </Typography>
      );
    }
    return this.props.children;
  }
}
