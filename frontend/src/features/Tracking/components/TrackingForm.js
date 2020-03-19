import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { Button, Form } from "semantic-ui-react";
import http from "../../../api";
import "./trackingForm.styles.scss";

const getElevation = async (longitude, latitude) => {
  try {
    const {
      data: { data }
    } = await http.get(
      `https://geo-services-by-mvpc-com.p.rapidapi.com/elevation?locations=${latitude},${longitude}`,
      {
        headers: {
          "x-rapidapi-host": "geo-services-by-mvpc-com.p.rapidapi.com",
          "x-rapidapi-key": "2305d263ebmshc4ba8d01b709ffbp196ca4jsnf36b162b9916"
        }
      }
    );
    return data[0].elevation;
  } catch (e) {
    return null;
  }
};

const TrackingsForm = ({ handleClose, handleAdd }) => {
  const { register, errors, handleSubmit, control } = useForm({
    nativeValidation: true
  });

  const onSubmit = async formData => {
    console.log(formData);
    const { longitude, latitude, datetime } = formData;
    const elevation = await getElevation(latitude, longitude);
    const date = datetime || new Date().toISOString();
    const { data } = await http.post("/trackings/add", {
      ...formData,
      datetime: date,
      elevation
    });
    await handleClose();
    handleAdd(data);
  };
  const [startDate, setStartDate] = useState(new Date());

  const { description, longitude, latitude } = errors;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Input
        label="Tracking Description"
        error={description ? { content: description.message } : false}
      >
        <input
          placeholder="Description"
          name="description"
          ref={register({ required: "Please enter your description" })}
        />
      </Form.Input>
      <Form.Group>
        <Form.Input
          label="Longitude"
          error={longitude ? { content: longitude.message } : false}
        >
          <input
            placeholder="Longitude"
            type="number"
            name="longitude"
            ref={register({ required: "Enter longitude" })}
          />
        </Form.Input>
        <Form.Input
          label="Latitude"
          error={latitude ? { content: latitude.message } : false}
        >
          <input
            placeholder="Latitude"
            type="number"
            name="latitude"
            ref={register({ required: true })}
          />
        </Form.Input>
        <Form.Input label="Date">
          <Controller
            name="datetime"
            as={DatePicker}
            valueName="selected"
            selected={startDate}
            label="Date Time"
            onChange={([value]) => value}
            forwardRef={register}
            control={control}
          />
        </Form.Input>
      </Form.Group>
      <Button type="submit">Submit</Button>
      <Button onClick={handleClose}>Close</Button>
    </Form>
  );
};

export default TrackingsForm;
