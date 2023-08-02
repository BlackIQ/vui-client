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

import { Table, Loading } from "@/components";
import API from "@/api";
import Head from "next/head";

// export const getServerSideProps = async () => {
//   try {
//     const users = await API.get(`users`);

//     return {
//       props: {
//         users: users.data.data,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         error: { error: typeof error },
//       },
//     };
//   }
// };

const Index = () => {
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
      const { data } = await API.get("clients");

      setUsers(data.data);
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!session) history.push("/auth");
    if (role === "admin") history.push(`/panel/${user.username}`);

    getData();
  }, [session]);

  const [openAdd, setOpenAdd] = useState(false);

  // Snackbar
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [typeSnack, setTypeSnack] = useState("");

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
        {!loading ? <Table table="all" data={users} /> : <Loading />}

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
