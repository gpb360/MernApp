import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import Trackings from "./features/Tracking";
import AddTracking from "./features/Tracking/components/AddTracking";
import { TrackingProvider } from "./features/Tracking/trackingContext";
import "./app.styles.scss";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  return (
    <Container className="app" data-testid="trackingApp">
      <TrackingProvider>
        <AddTracking
          show={show}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
        <Trackings />
      </TrackingProvider>
    </Container>
  );
}

export default App;
