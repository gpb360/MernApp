import React from "react";

const ProductsContext = React.createContext();

const types = {
  LOAD_PRODUCTS: "LOAD_PRODUCTS",
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
  ADD_TRACKING: "ADD_TRACKING",
  DELETE_TRACKING: "DELETE_TRACKING",
  ERROR: "ERROR"
};

function productsReducer(state, action) {
  const { products } = state;
  const { payload, type } = action;
  console.log("State", state, "Action", action);
  switch (type) {
    case types.OPEN_MODAL:
      return { ...state, show: true };
    case types.CLOSE_MODAL:
      return { ...state, show: false };
    case types.LOAD_PRODUCTS:
      return { ...state, products: payload.products, isLoading: true };
    case types.ADD_TRACKING:
      return {
        ...state,
        products: [...products, payload.row]
      };
    case types.DELETE_TRACKING:
      return {
        ...state,
        products: products.filter(product => product._id !== payload.id)
      };
    case types.ERROR:
      return { ...state, error: "Sorry something went wrong" };
    default:
      throw new Error();
  }
}

function ProductsProvider(props) {
  const [state, dispatch] = React.useReducer(productsReducer, {
    products: [],
    isLoading: false,
    show: false
  });
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <ProductsContext.Provider value={value} {...props} />;
}

function useProducts() {
  const context = React.useContext(ProductsContext);
  if (!context) {
    throw new Error(`useProducts must be used within a ProductsProvider`);
  }
  const [state, dispatch] = context;

  const actions = {
    loadProducts: data =>
      dispatch({
        type: types.LOAD_PRODUCTS,
        payload: { products: data }
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

export { ProductsProvider, useProducts };
