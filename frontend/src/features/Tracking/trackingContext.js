import React from "react";

const TrackingContext = React.createContext();

const types = {
  LOAD_PRODUCTS: "LOAD_PRODUCTS",
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
  ADD_TRACKING: "ADD_TRACKING",
  DELETE_TRACKING: "DELETE_TRACKING",
  ERROR: "ERROR"
};

function trackingReducer(state, action) {
  const { trackings } = state;
  const { payload, type } = action;

  switch (type) {
    case types.OPEN_MODAL:
      return { ...state, show: true };
    case types.CLOSE_MODAL:
      return { ...state, show: false };
    case types.LOAD_PRODUCTS:
      return { ...state, trackings: payload.trackings, isLoading: true };
    case types.ADD_TRACKING:
      return {
        ...state,
        trackings: [...trackings, payload.row]
      };
    case types.DELETE_TRACKING:
      return {
        ...state,
        trackings: trackings.filter(tracking => tracking._id !== payload.id)
      };
    case types.ERROR:
      return { ...state, error: "Sorry something went wrong" };
    default:
      throw new Error();
  }
}

function TrackingProvider(props) {
  const [state, dispatch] = React.useReducer(trackingReducer, {
    trackings: [],
    isLoading: false,
    show: false
  });
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <TrackingContext.Provider value={value} {...props} />;
}

function useTracking() {
  const context = React.useContext(TrackingContext);
  if (!context) {
    throw new Error(`useTrackings must be used within a TrackingsProvider`);
  }
  const [state, dispatch] = context;

  const actions = {
    loadTrackings: data =>
      dispatch({
        type: types.LOAD_PRODUCTS,
        payload: { trackings: data }
      }),
    deleteTracking: id =>
      dispatch({
        type: types.DELETE_TRACKING,
        payload: { id }
      }),
    addTracking: row =>
      dispatch({
        type: types.ADD_TRACKING,
        payload: { row }
      }),
    openModal: () => dispatch({ type: types.OPEN_MODAL }),
    closeModal: () => dispatch({ type: types.CLOSE_MODAL })
  };
  return {
    state,
    dispatch,
    types,
    actions
  };
}

export { TrackingProvider, useTracking };
