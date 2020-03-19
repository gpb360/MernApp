import React from "react";
import { TrackingsProvider } from "../features/Tracking/trackingContext";
import { render } from "@testing-library/react";

function renderWithContext(node) {
  return render(<TrackingsProvider>{node}</TrackingsProvider>);
}

export default renderWithContext;
