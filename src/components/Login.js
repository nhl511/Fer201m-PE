import React from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

function Login() {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid
      container
      pt={18}
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Card sx={{ minWidth: 500 }}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Box sx={{ "& > :not(style)": { m: 1 } }} pt={5} pl={5} pr={5}>
              <Typography variant="h5"><b>Log in</b></Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }} pb={3}>
            <Box sx={{ "& > :not(style)": { ml: 1 } }} pl={5} pr={5}>
              <Typography variant="h7">
                Doesn't have account yet? Sign up
              </Typography>
            </Box>
          </Box>
          <Box sx={{ "& > :not(style)": { m: 1 } }} pl={5} pr={5}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <PermIdentityIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                fullWidth
                id="input-with-sx"
                label="Username"
                variant="standard"
              />
            </Box>
          </Box>
          <Box sx={{ "& > :not(style)": { m: 1 } }} pl={5} pr={5}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ "& > :not(style)": { m: 1 } }} pt={1} pl={5}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <FormControlLabel
                control={
                  <Checkbox style={{ color: "#242526" }} defaultChecked />
                }
                label="Remember me"
              />
            </Box>
          </Box>
          <Box sx={{ "& > :not(style)": { m: 1 } }} pt={1} pl={5} pr={5}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              style={{ backgroundColor: "#242526" }}
            >
              Login
            </Button>
          </Box>
          <p>Or login with</p>
          <Grid container pt={3} pb={5}>
            <Grid item xs={6}>
              <Button
                onClick={google}
                size="large"
                startIcon={<GoogleIcon />}
                variant="contained"
                color="error"
              >
                Google
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                size="large"
                startIcon={<FacebookIcon />}
                variant="contained"
              >
                Facebook
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Login;
