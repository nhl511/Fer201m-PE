import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';import {
  Avatar,
  Card,
  CardContent,
  Container,
  Menu,
  MenuItem,
  Modal,
  Tooltip,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import Login from "./Login";
const settings = ["Logout"];

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

const Navbar = ({ user }) => {
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="absolute" sx={{ background: "#242526" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CodeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              fstackdev
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* <Link to="/" style={{ color: "black", textDecoration: "none" }}> */}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              {/* </Link> */}
              {/* <Link
                to="/About"
                style={{ color: "black", textDecoration: "none" }}
              > */}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">About me</Typography>
              </MenuItem>
              {/* </Link> */}
              {/* <Link
                to="/Project"
                style={{ color: "black", textDecoration: "none" }}
              > */}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">My Projects</Typography>
              </MenuItem>
              {/* </Link> */}
              {/* <Link
                to="/Contact"
                style={{ color: "black", textDecoration: "none" }}
              > */}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Contact</Typography>
              </MenuItem>
              {/* </Link> */}
            </Menu>
          </Box>
          <CodeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            fstackdev
          </Typography>
          <Box sx={{ justifyContent: 'center' ,flexGrow: 1,display: { xs: "none", md: "flex" } }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Button onClick={handleCloseNavMenu} color="inherit">
              <HomeIcon/>
              </Button>
            </Link>
            {user ? (
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button onClick={handleCloseNavMenu} color="inherit">
                <DashboardIcon/>                                </Button>
              </Link>
            ) : undefined}
            {/* {user ? (
              <Link
                to="/createpost"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button onClick={handleCloseNavMenu} color="inherit">
                <PostAddIcon/>
                </Button>
              </Link>
            ) : undefined} */}
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button onClick={handleCloseNavMenu} color="inherit">
                <InfoIcon/>
              </Button>
            </Link>
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button onClick={handleCloseNavMenu} color="inherit">
              <ContactSupportIcon/>
              </Button>
            </Link>
          </Box>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Button
                  startIcon={<Avatar src={user.photos[0].value} />}
                  endIcon={<ArrowDropDownIcon />}
                  onClick={handleOpenUserMenu}
                  color="inherit"
                >
                  {user.displayName}
                </Button>
              </Tooltip>
              <Menu
                sx={{ mt: "45px"}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Button variant="text" onClick={logout}>
                      Logout
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Link to="login" style={{ textDecoration: "none", color: "white" }}>
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
