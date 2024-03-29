import {
  Snackbar,
  Alert,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { unsetUser } from "@/redux/actions/user";
import { unsetSession } from "@/redux/actions/session";

import { Logout } from "@mui/icons-material";

import { Table, Form, Loading } from "@/components";
import API from "@/api";
import Head from "next/head";

export const getServerSidePaths = async () => {
  const paths = [];

  try {
    const { data } = await API.get("admins");

    data.data.map((dt) => paths.push({ params: { username: dt.username } }));
  } catch (error) {}

  return {
    paths,
    fallback: false,
  };
};

export const getServerSideProps = async ({ params }) => {
  // try {
  //   const { data } = await API.get(`clients/${params.username}`);

  //   return {
  //     props: {
  //       clients: data,
  //       d: params,
  //     },
  //   };
  // } catch (error) {
  //   return {
  //     props: {
  //       error: { error: JSON.stringify(error) },
  //     },
  //   };
  // }

  return {
    props: {
      username: params.username,
    },
  };
};

const Index = ({ username }) => {
  const history = useRouter();
  const dispatch = useDispatch();

  const { session, user } = useSelector((state) => state);

  const { role } = user;

  // Loading
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getData = async () => {
    setLoading(true);

    try {
      const { data } = await API.get(`clients/${username}`);

      setUsers(data.data);
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!session) history.push("/auth");

    getData();
  }, [session]);

  const [openAdd, setOpenAdd] = useState(false);

  // Snackbar
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [typeSnack, setTypeSnack] = useState("");

  const createSnack = (message, type) => {
    setMessageSnack(message);
    setTypeSnack(type);

    setOpenSnack(true);
  };

  const delUser = async (username) => {
    setLoading(true);

    try {
      await API.delete(`clients/${username}`);

      setOpenAdd(false);
      createSnack("کاربر با موفقیت حذف شد", "success");

      getData();
    } catch (error) {
      createSnack(error.message, "error");
    }

    setLoading(false);
  };

  const addUser = async (data) => {
    setLoading(true);

    data.owner = user.username;

    try {
      await API.post("clients", data);

      setOpenAdd(false);
      createSnack("کاربر با موفقیت ساخته شد", "success");

      getData();
    } catch (error) {
      createSnack(error.message, "error");
    }

    setLoading(false);
  };

  const userAccess = async (data) => {
    setLoading(true);

    const sendingData = {
      access: !data.access,
    };

    const message = data.access
      ? "دسترسی کاربر با موفقیت قطع شد"
      : "دسترسی کاربر با موفقیت فعال شد";

    try {
      await API.patch(`clients/access/${data.username}`, sendingData);

      setOpenAdd(false);
      createSnack(message, "success");

      getData();
    } catch (error) {
      createSnack(error.message, "error");
    }

    setLoading(false);
  };

  const logout = () => {
    dispatch(unsetSession());
    dispatch(unsetUser());
  };

  return (
    <>
      <Head>
        <title>VUI - پنل</title>
      </Head>
      <Container sx={{ my: 3 }}>
        {role === "admin" && (
          <>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h4">خوش‌آمدید {user.name}!</Typography>
              <IconButton color="error" size="large" onClick={logout}>
                <Logout fontSize="large" />
              </IconButton>
            </Box>
            <br />
          </>
        )}
        {!loading ? (
          ["admin", "god"].includes(role) ? (
            <Table
              table="clients"
              data={users}
              add={() =>
                role === "admin"
                  ? setOpenAdd(true)
                  : createSnack("با اکانت ادمین لاگین کنید", "info")
              }
              del={(user) =>
                role === "admin"
                  ? delUser(user.username)
                  : createSnack("با اکانت ادمین لاگین کنید", "info")
              }
              addText={"افزودن کاربر جدید"}
              acs={(data) =>
                role === "admin"
                  ? userAccess(data)
                  : createSnack("با اکانت ادمین لاگین کنید", "info")
              }
            />
          ) : (
            <Table table="users" data={users} />
          )
        ) : (
          <Loading />
        )}

        <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
          <DialogTitle>افزودن کاربر</DialogTitle>
          <DialogContent>
            <DialogContentText>
              در این بخش میتوانید کاربر جدید اضافه نمایید
            </DialogContentText>
            <Form
              name="user"
              callback={addUser}
              btnStyle={{
                fullWidth: false,
                disabled: loading,
                color: "primary",
              }}
              button="افزودن"
            />
          </DialogContent>
        </Dialog>
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          sx={{ direction: "ltr", textAlign: "left" }}
          onClose={() => setOpenSnack(false)}
        >
          <Alert onClose={() => setOpenSnack(false)} severity={typeSnack}>
            {messageSnack}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Index;
