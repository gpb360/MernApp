import React, { useMemo, useEffect, useCallback } from "react";
import moment from "moment";
import http from "../../api";
import { Button, Header } from "semantic-ui-react";
import Table from "../../components/Table";
import { useTracking } from "./trackingContext";

const Tracking = () => {
  const {
    state: { trackings, isLoading },
    actions,
    dispatch,
    types
  } = useTracking();

  const handleDelete = useCallback(
    async id => {
      try {
        await http.delete(`/trackings/${id}`);
        actions.deleteTracking(id);
      } catch (err) {
        dispatch({ type: types.ERROR });
      }
    },
    [actions, types, dispatch]
  );

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
              data-testid={`deleteButton${_id}`}
            >
              X
            </Button>
          );
        }
      }
    ],
    []
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await http.get("/trackings");
        actions.loadTrackings(data);
      } catch (error) {
        dispatch({ type: types.ERROR });
      }
    }
    if (trackings.length === 0) {
      fetchData();
    }
  }, [dispatch, actions, types]);

  return (
    <>
      <Header>Tracking</Header>
      <Table columns={columns} data={trackings} isLoading={isLoading} />
    </>
  );
};

export default Tracking;
