import {
  Snackbar,
  Alert,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { Table, Form } from "@/components";
import API from "@/api";

export const getServerSideProps = async () => {
  try {
    const users = await API.get(`users`);

    return {
      props: {
        users: users.data.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: { error: typeof error },
      },
    };
  }
};

const Index = ({ error, users }) => {
  const history = useRouter();

  const { session } = useSelector((state) => state);

  useEffect(() => {
    if (!session) history.push("/auth");
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
      await API.delete(`users/${username}`);

      setOpenAdd(false);
      createSnack("کاربر با موفقیت حذف شد", "success");

      history.replace(history.asPath);
    } catch (error) {
      createSnack(error.message, "error");
    }
  };

  const addUser = async (data) => {
    data.isAdmin = false;

    try {
      await API.post("users", data);

      setOpenAdd(false);
      createSnack("کاربر با موفقیت ساخته شد", "success");

      history.replace(history.asPath);
    } catch (error) {
      createSnack(error.message, "error");
    }
  };

  return (
    <Container sx={{ my: 3 }}>
      <Table
        table="users"
        data={users.filter((user) => user.isAdmin === 0)}
        add={() => setOpenAdd(true)}
        del={(user) => delUser(user.username)}
        addText="افزودن کاربر جدید"
      />

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>افزودن کاربر</DialogTitle>
        <DialogContent>
          <DialogContentText>
            در این بخش میتوانید کاربر جدید اضافه نمایید{" "}
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
