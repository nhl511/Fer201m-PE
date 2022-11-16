import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { withStyles } from "@mui/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import UpdatePost from "./UpdatePost";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from "react-router-dom";
const StyledTableCell = withStyles({
  root: {
    color: "white",
  },
})(TableCell);
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const Dashboard = ({ user }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#242526",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const [posts, setPosts] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

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
      .delete(`https://635fe664ca0fe3c21aa783b3.mockapi.io/news/${id}`)
      .then((res) => console.log(`Deleted!!!`, res))
      .catch((err) => console.log(err));
    setOpen(true);
  };
  React.useEffect(() => {
    setLoading(true);

    axios
      .get(`https://635fe664ca0fe3c21aa783b3.mockapi.io/news`)
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
        <Grid
          container
          p={2}
          style={{ background: "#242526" }}
          columnSpacing={1}
        >
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
              onClick={(e) => (
                postDelete(modalData.id, e), setOpenDialog(false)
              )}
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
              description={modalData.description}
              content={modalData.content}
              actractive={modalData.actractive}
              status={modalData.status}

            />
          ) : undefined}
        </Box>
      </Modal>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Delete post successfully
        </Alert>
      </Snackbar>
      {loading ? (
        <Grid container pt={18} pb={17}>
          <div className="classic-4"></div>
        </Grid>
      ) : (
        <Grid item pt={10} pb={10} pl={5}>
          <TableContainer
            sx={{ minWidth: 1000 }}
            component={Paper}
            style={{ background: "#242526" }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell align="left">Description</StyledTableCell>
                  <StyledTableCell align="left">Views</StyledTableCell>
                  <StyledTableCell align="left">Image</StyledTableCell>
                  <StyledTableCell align="left">Actractive</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>

                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts
                  .filter((post) => post.authorid === user.id)
                  .map((post) => (
                    <TableRow
                      key={post.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell align="left">
                        {post.title}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {post.description}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {post.views}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <img src={post.img} width="70" />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {post.actractive ? <p>True</p> : <p>False</p>}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                      {post.status ? <p>True</p> : <p>False</p>}

                      </StyledTableCell>

                      <StyledTableCell align="left">
                        <Accordion>
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon style={{ color: "white" }} />
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{ background: "#242526", color: "white" }}
                          >
                            <Typography>More option</Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            align="left"
                            style={{ background: "#242526" }}
                          >
                            <Grid container>
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
                      </StyledTableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid pt={2} pl={2} align="left">
          <Link
                to="/createpost"
                style={{ textDecoration: "none", color: "white" }}
              >
            <Button size="large" variant="text" style={{color:'white'}} startIcon={<AddCircleOutlineIcon/>}>Add news</Button>
            </Link>
            </Grid>
        </Grid>
      )}
    </Grid>
  );
};
export default Dashboard;
