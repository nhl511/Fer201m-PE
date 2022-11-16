import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Chip, Grid } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import axios from "axios";
import { useParams } from "react-router-dom";
import { WidthNormalTwoTone } from "@mui/icons-material";
function Post() {
  const [loading, setLoading] = useState(true);

  const [post, setPost] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`https://635fe664ca0fe3c21aa783b3.mockapi.io/news/${id}`)
      .then((res) => {
        console.log(res);
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return loading ? (
    <Grid container pl={8} pt={33} pb={17}>
      <div className="classic-4"></div>
    </Grid>
  ) : (
    <Grid container pt={25}>
      <Grid item xs={6} pl={25} pb={4} align="left">
        <Button
          variant="text"
          startIcon={<VisibilityIcon />}
          style={{ color: "white" }}
        >
          {post.views}
        </Button>
      </Grid>
      <Grid item xs={6} pr={25} pb={4} align="right">
        {post.actractive ? (
          <Chip color="error" icon={<WhatshotIcon />} label="HOT" />
        ) : undefined}
      </Grid>
      <Grid item pl={25} pr={25} align="left">
        <Typography style={{ color: "white" }} variant="h4">
          {post.title}
        </Typography>
      </Grid>
      <Grid item pt={5} pl={25} pr={25} align="left">
        <Typography variant="h6" style={{ color: "#bdc3c7" }}>
          <i>{post.description}</i>
        </Typography>
      </Grid>
      <Grid item pt={5} pl={25} pr={25}>
        <img src={post.img} width="500" />
      </Grid>
      <Grid item pt={5} pl={25} pr={15} align="left">
        <Typography style={{ color: "white" }} variant="h6">
          {post.content}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Post;
