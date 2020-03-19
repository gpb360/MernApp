import React from "react";

import { render, cleanup, act } from "@testing-library/react";
import { useTracking, TrackingProvider } from "./trackingContext";

const Trackings = ({ children, ...rest }) => children(useTracking(rest));

function setup(props) {
  const returnVal = {};
  render(
    <TrackingProvider>
      <Trackings {...props}>
        {val => {
          Object.assign(returnVal, val);
          return null;
        }}
      </Trackings>
    </TrackingProvider>
  );
  return returnVal;
}

afterEach(cleanup);

test("useTrackings inititial state", () => {
  const defaults = setup();
  expect(defaults).toHaveProperty("state.trackings", []);
  expect(defaults).toHaveProperty("state.isLoading", false);
  expect(defaults).toHaveProperty("state.show", false);
});

test("useTrackings load Tracking", () => {
  const defaults = setup();
  act(() => {
    defaults.actions.loadTrackings([{ id: 1 }]);
  });
  expect(defaults).toHaveProperty("state.trackings", [{ id: 1 }]);
});

test("useTrackings Add Tracking", () => {
  const defaults = setup();
  act(() => {
    defaults.actions.addTracking({ id: 1 });
  });
  expect(defaults).toHaveProperty("state.trackings", [{ id: 1 }]);
});
