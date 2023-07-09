import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { setSession } from "@/redux/actions/session";
import { setUser } from "@/redux/actions/user";

import { Form } from "@/components";
import API from "@/api";

import { Box, Typography, Grid, Divider, Snackbar, Alert } from "@mui/material";
import Head from "next/head";

const Auth = () => {
  const dispatch = useDispatch();
  const history = useRouter();

  const { session, user } = useSelector((state) => state);

  useEffect(() => {
    if (session) {
      if (user.role === "admin") {
        history.push(`/panel/${user.username}`);
      } else {
        history.push(`/panel`);
      }
    }
  }, [session]);

  // Snackbar
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [typeSnack, setTypeSnack] = useState("");

  const createSnack = (message, type) => {
    setMessageSnack(message);
    setTypeSnack(type);

    setOpenSnack(true);
  };

  const authUser = async (callback) => {
    try {
      const result = await API.post(
        callback.god ? `auth/login` : `admins/login`,
        callback
      );

      const { user } = result.data;

      dispatch(setUser(user));
      dispatch(setSession(true));
    } catch (error) {
      createSnack(error.response.data.message, "error");
    }
  };

  return (
    <>
      <Head>
        <title>VUI - ورود به پنل</title>
      </Head>
      <Box
        sx={{
          border: 1,
          borderColor: "primary.main",
          borderRadius: 1,
          marginTop: "5rem",
        }}
      >
        <Grid columns={{ xs: 6, md: 12 }} container>
          <Grid
            item
            sx={{
              padding: "2rem",
            }}
            xs={6}
          >
            <Box>
              <Typography variant="h4" color="primary" gutterBottom>
                ورود به پنل
              </Typography>
              <Divider />
              <Form
                name="auth"
                callback={authUser}
                button="ورود به پنل"
                btnStyle={{
                  fullWidth: true,
                  disabled: false,
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              backgroundColor: "primary.main",
            }}
          />
        </Grid>

        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={() => setOpenSnack(false)}
        >
          <Alert onClose={() => setOpenSnack(false)} severity={typeSnack}>
            {messageSnack}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Auth;
