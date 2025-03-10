
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { Grid2, Theme } from "@mui/material";

interface LoginComponent {
    handleSubmit: (event: {
        preventDefault: () => void;
        currentTarget: HTMLFormElement | undefined;
    }) => Promise<void>;

    theme: Theme;

    showAlert: boolean;

  }

  const AlertCustom = ({ showAlert }: any) => {
    if (!showAlert) {
      return null;
    }
  
    return (
      <Alert variant="outlined" severity="error" sx={{ m: 2}}>
        Incorrect data
      </Alert>
    );
  };



const LoginComponent: React.FC<LoginComponent> = ({ handleSubmit, theme, showAlert }) => {

    

    return(
        <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <AlertCustom showAlert={showAlert} />
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid2 container>
              <Grid2>
                <Link href="/register" variant="body2">
                  {"Register"}
                </Link>
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );
};

export default LoginComponent;

