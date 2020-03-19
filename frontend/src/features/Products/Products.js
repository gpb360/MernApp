import React, { useMemo, useState, useEffect, useReducer } from "react";
import moment from "moment";
import http from "../../api";
import { Button, Header } from "semantic-ui-react";
import ReactTable from "../../components/Table";
import { ProductsProvider, useProducts } from "./productContext";

const intialState = {
  products: [],
  isLoading: false
};

const Products = () => {
  const {
    state: { products, isLoading },
    actions,
    dispatch,
    types
  } = useProducts();

  const columns = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        sort: "ASC"
      },
      {
        Header: "Longitude",
        accessor: "longitude"
      },
      {
        Header: "Latitude",
        accessor: "latitude"
      },
      {
        Header: "Elevation",
        accessor: "elevation"
      },
      {
        Header: "Date",
        accessor: "datetime",
        Cell: ({
          row: {
            values: { datetime }
          }
        }) => {
          return <div>{moment.utc(datetime).format("YYYY-MM-DD")}</div>;
        }
      },
      {
        accessor: "_id",
        Cell: ({
          row: {
            values: { _id }
          }
        }) => {
          return (
            <Button
              onClick={() => {
                handleDelete(_id);
              }}
              size="tiny"
            >
              X
            </Button>
          );
        }
      }
    ],
    [products]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await http.get("/products");
        actions.loadProducts(data);
      } catch (error) {
        dispatch({ type: types.ERROR });
      }
    }

    fetchData();
  }, []);

  const handleDelete = async id => {
    try {
      http.delete(`/products/${id}`);
      actions.deleteTracking(id);
    } catch (err) {
      dispatch({ type: types.ERROR });
    }
  };

  return (
    <>
      <Header>Products</Header>
      <ReactTable columns={columns} data={products} isLoading={isLoading} />
    </>
  );
};

export default Products;
