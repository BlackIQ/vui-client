import {
  Snackbar,
  Alert,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { Table, Form } from "@/components";
import API from "@/api";

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

  const { session, user } = useSelector((state) => state);

  const { role } = user;

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getData = async () => {
    setLoading(true);

    try {
      const { data } = await API.get(
        role === "admin" ? `clients/${user.username}` : `admins`
      );

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

  const createSnack = (message, type) => {
    setMessageSnack(message);
    setTypeSnack(type);

    setOpenSnack(true);
  };

  const delUser = async (username) => {
    try {
      await API.delete(`admins/${username}`);

      setOpenAdd(false);
      createSnack("کاربر با موفقیت حذف شد", "success");

      getData();
    } catch (error) {
      createSnack(error.message, "error");
    }
  };

  const addUser = async (data) => {
    data.owner = user.username;

    try {
      await API.post("admins/register", data);

      setOpenAdd(false);
      createSnack("کاربر با موفقیت ساخته شد", "success");

      getData();
    } catch (error) {
      createSnack(error.message, "error");
    }
  };

  return (
    <Container sx={{ my: 3 }}>
      {!loading ? (
        <Table
          table="users"
          data={
            role === "admin"
              ? users.filter((user) => user.role === "client")
              : users
          }
          // clk={(client) => {
          //   user.role === "god" && history.push(`/panel/${client.username}`);
          // }}
          add={() => setOpenAdd(true)}
          del={(client) => delUser(client.username)}
          addText="افزودن کاربر جدید"
        />
      ) : (
        <CircularProgress />
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
            btnStyle={{ fullWidth: false, disabled: false, color: "primary" }}
            button="افزودن"
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSnack(false)}
      >
        <Alert onClose={() => setOpenSnack(false)} severity={typeSnack}>
          {messageSnack}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Index;
