import React, { useState } from "react";
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

const TrackingsForm = ({ handleClose, handleAdd, error }) => {
  const { register, errors, handleSubmit, control } = useForm({
    nativeValidation: true
  });
  console.log(error);
  const onSubmit = async formData => {
    const { longitude, latitude } = formData;
    const elevation = await getElevation(latitude, longitude);
    const { data } = await http.post("/trackings/add", {
      ...formData,
      elevation
    });
    await handleClose();
    handleAdd(data);
  };
  const [startDate] = useState(new Date());

  const { description, longitude, latitude } = errors;
  console.log(errors);
  return (
    <Form onSubmit={handleSubmit(onSubmit)} data-testid="trackingForm">
      <Form.Input
        label="Tracking Description"
        error={description && { content: description.message }}
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
          error={longitude && { content: longitude.message }}
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
          error={latitude && { content: latitude.message }}
        >
          <input
            placeholder="Latitude"
            type="number"
            name="latitude"
            ref={register({ required: "Enter latitude" })}
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
      <Button type="submit" data-testid="trackingSubmit">
        Submit
      </Button>
      <Button onClick={handleClose}>Close</Button>
    </Form>
  );
};

export default TrackingsForm;
