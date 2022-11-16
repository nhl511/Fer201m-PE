import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import MuiAlert from "@mui/material/Alert";

import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";

import axios from "axios";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const UpdatePost = ({ id, title,description, content,actractive,status }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);

  };
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const formik = useFormik({
    initialValues: {
      title: title,
      description: description,
      content: content,
      actractive: actractive,
      status: status
    },
    onSubmit: (values) => {
      axios
        .put(`https://635fe664ca0fe3c21aa783b3.mockapi.io/news/${id}`, {
          title: values.title,
          description: values.description,
          content: values.content,
          actractive: values.actractive,
          status: values.status
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
        setOpen(true);


    },

    validationSchema: Yup.object({
      title: Yup.string()
        .required("*Required")
        .min(10, "Must be 10 characters or more"),
        description: Yup.string()
        .required("*Required")
        .min(10, "Must be 10 characters or more"),
      content: Yup.string()
        .required("*Required")
        .min(10, "Must be 10 characters or more"),
    }),
  });
  return (
    <form onSubmit={formik.handleSubmit}>

            <TextField
              sx={{ input: { color: "white" } }}
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={formik.values.title}
              onChange={formik.handleChange}
              color="warning"
              focused
              placeholder="Enter new title"
            />
            {formik.errors.title && formik.touched.title && (
              <p align="left" style={{ color: "red" }}>
                {formik.errors.title}
              </p>
            )}
                        <TextField
              margin="dense"
              multiline
              inputProps={{ style: { color: "white" } }}
              rows={3}
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={formik.values.description}
              onChange={formik.handleChange}
              color="warning"
              focused
              placeholder="Enter new description"
            />
            {formik.errors.description && formik.touched.description && (
              <p align="left" style={{ color: "red" }}>
                {formik.errors.description}
              </p>
            )}
            <TextField
              margin="dense"
              multiline
              inputProps={{ style: { color: "white" } }}
              rows={6}
              name="content"
              label="Content"
              type="text"
              fullWidth
              variant="outlined"
              value={formik.values.content}
              onChange={formik.handleChange}
              color="warning"
              focused
              placeholder="Enter new content"
            />
            {formik.errors.content && formik.touched.content && (
              <p align="left" style={{ color: "red" }}>
                {formik.errors.content}
              </p>
            )}
                        <FormGroup>
              <FormControlLabel
              style={{color:'white'}}
                control={
                  <Switch
                    name="actractive"
                    checked={formik.values.actractive}
                    onChange={formik.handleChange}
                    color="warning"
                  />
                }
                label="Attractive"
              />
              <FormControlLabel
              style={{color:'white'}}
                control={
                  <Switch
                  name="status"
                    checked={formik.values.status}
                    onChange={formik.handleChange}
                    color="warning"
                  />
                }
                label="Public"
              />
            </FormGroup>
      <Grid item pt={5}>
        <Button fullWidth variant="contained" size="small" type="submit" color="warning">
          Update
        </Button>

      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Update post successfully
            </Alert>
          </Snackbar>
    </form>
  );
};

export default UpdatePost;
