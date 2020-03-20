import React from "react";
import { TrackingProvider } from "../features/Tracking/trackingContext";
import { render } from "@testing-library/react";

const renderWithContext = node => {
  return render(<TrackingProvider>{node}</TrackingProvider>);
};

export default renderWithContext;
