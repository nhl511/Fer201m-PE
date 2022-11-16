import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormGroup,
  Grid,
  Snackbar,
  Switch,
  TextField,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { useFormik } from "formik";
import * as Yup from "yup";

import MuiAlert from "@mui/material/Alert";

import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreatePost = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [checked1, setChecked1] = React.useState(true);
  const [checked2, setChecked2] = React.useState(true);


  const [image, setImage] = useState("");
  const [open, setOpen] = React.useState(false);


  const handleChange1 = (event) => {
    setChecked1(event.target.checked);
  };
  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const uploadImage = async (e) => {
    setLoading(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "yzd58rhe");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/diwf1mkhu/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log(file);
    setImage(file.secure_url);
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      authorid: user.id,
      views: 1,
      title: "",
      description: "",
      content: "",
      image: "",
      actractive: true,
      status: true,
    },
    onSubmit: async (values, { resetForm }) => {
      axios
        .post("https://635fe664ca0fe3c21aa783b3.mockapi.io/news", {
          title: values.title,
          authorid: values.authorid,
          views: values.views,
          description: values.description,
          content: values.content,
          actractive: values.actractive,
          status: values.status,
          image,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setOpen(true);
      setImage(false);
      resetForm();
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
    <Grid
      container
      pt={20}
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Card sx={{ minWidth: 800 }} style={{ background: "#242526" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Create post successfully
          </Alert>
        </Snackbar>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <span hidden>
              <TextField
                autoFocus
                margin="dense"
                name="authorid"
                label="AuthorID"
                type="text"
                fullWidth
                variant="outlined"
                value={formik.values.authorid}
              />
                <TextField
                type="number"
                autoFocus
                margin="dense"
                name="views"
                label="Views"
                fullWidth
                variant="outlined"
                value={formik.values.views}
              />
            </span>
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

            <Grid item align="left">
              {loading ? (
                <h5>Loading image...</h5>
              ) : (
                image && (
                  <div>
                    <img alt="not fount" width={"100px"} src={image} />
                    <br />
                  </div>
                )
              )}
              <br />
              <Button
              size="large"
                variant="outlined"
                component="label"
                startIcon={<AddPhotoAlternateIcon />}
                color="warning"
              >
                Choose cover photo
                <input
                  accept="image/*"
                  name="image"
                  type="file"
                  hidden
                  onChange={uploadImage}
                />
              </Button>
            </Grid>
            <Grid item pt={5}>
              <Button fullWidth variant="contained" size="small" type="submit" color="warning">
                Post
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CreatePost;
