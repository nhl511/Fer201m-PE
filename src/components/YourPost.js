import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CardHeader,
  Collapse,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Snackbar,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdatePost from "./UpdatePost";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const YourPost = ({ user }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);

  const [posts, setPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
    setOpenModal(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const postDelete = (id, e) => {
    e.preventDefault();
    axios
      .delete(`https://635fe664ca0fe3c21aa783b3.mockapi.io/posts/${id}`)
      .then((res) => console.log(`Deleted!!!`, res))
      .catch((err) => console.log(err));
    setOpen(true);
  };
  useEffect(() => {
    setLoading(true);

    axios
      .get(`https://635fe664ca0fe3c21aa783b3.mockapi.io/posts`)
      .then((res) => {
        console.log(res);
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Grid container pl={10} pr={10} pt={15}>
      <Dialog onClose={handleClose} open={openDialog}>
        <DialogTitle style={{ background: "#242526", color: "white" }}>
          Are you sure you want to delete?
        </DialogTitle>
        <Grid container p={2} style={{ background: "#242526" }} columnSpacing={1}>
          <Grid item>
          <Button variant="contained" size="small" onClick={handleClose}>
            No
          </Button>
          </Grid>
          <Grid item>

          <Button
          variant="contained"
            size="small"
            color="error"
            onClick={(e) => (postDelete(modalData.id, e), setOpenDialog(false))}
          >
            Yes
          </Button>
          </Grid>
        </Grid>
      </Dialog>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modalData != null ? (
            <UpdatePost
              id={modalData.id}
              title={modalData.title}
              content={modalData.content}
            />
          ) : undefined}
        </Box>
      </Modal>
      {loading ? (
        <Grid container pt={18} pb={17}>
          <div className="classic-4"></div>
        </Grid>
      ) : (
        posts
          .filter((post) => post.authorid === user.id)
          .map((post) => (
            <Grid key={post.id} item xs={4} pr={2} pt={2} pb={2}>
              <Card style={{ background: "#242526", color: "white" }}>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleCloseAlert}
                >
                  <Alert
                    onClose={handleCloseAlert}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Delete post successfully
                  </Alert>
                </Snackbar>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/post/${post.id}`}
                >
                  <CardHeader
                    align="left"
                    title={
                      <Typography variant="body1">{post.author}</Typography>
                    }
                    subheader={
                      <Typography variant="body2" style={{ color: "#b2bec3" }}>
                        {post.date}
                      </Typography>
                    }
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={post.image}
                    alt="green iguana"
                  />
                  <CardContent align="left">
                    <Typography variant="h5" component="div" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" style={{ color: "#b2bec3" }}>
                      {post.content}
                    </Typography>
                  </CardContent>
                </Link>
                <CardActions>
                  <Grid container>
                    <Grid item xs={12}>
                      <Accordion>
                        <AccordionSummary
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          style={{ background: "#242526", color: "white" }}
                        >
                          <MoreHorizIcon />
                        </AccordionSummary>
                        <AccordionDetails
                          align="left"
                          style={{ background: "#242526" }}
                        >
                          <Grid container pl={1}>
                            <Grid item xs={12}>
                              <Button
                                style={{ color: "white" }}
                                variant="text"
                                onClick={() => {
                                  setOpenModal(true);
                                  setModalData(post);
                                }}
                                startIcon={<EditIcon />}
                              >
                                Edit
                              </Button>
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                style={{ color: "white" }}
                                startIcon={<DeleteIcon />}
                                onClick={() => {
                                  setOpenDialog(true);
                                  setModalData(post);
                                }}
                              >
                                Delete
                              </Button>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>

                    {/* <Collapse
                      style={{ position: "absolute" }}
                      in={open}
                      timeout="auto"
                      unmountOnExit
                      
                    >
                      <Card align="left" sx={{ width: 120 }}>
                        <Grid container pl={1}>
                          <Grid item xs={12}>
                            <Button startIcon={<EditIcon />}>Edit</Button>
                            <hr />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              startIcon={<DeleteIcon color="error" />}
                              // onClick={fetch(
                              //   `https://635fe664ca0fe3c21aa783b3.mockapi.io/posts/`+post.id,
                              //   {
                              //     method: "DELETE",
                              //   }
                              // )
                              //   .then((res) => res.text()) // or res.json()
                              //   .then((res) => console.log(res))}
                              // onClick={(e) => postDelete(post.id, e)}
                              onClick={() => {
                                setOpenDialog(true);
                                setModalData(post);
                              }}
                            >
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      </Card>
                    </Collapse> */}
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))
      )}
    </Grid>
  );
};

export default YourPost;
