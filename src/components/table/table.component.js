import {
  Table,
  TableContainer,
  Paper,
  Box,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  Button,
  TextField,
  Pagination,
  colors,
  Snackbar,
  Alert,
} from "@mui/material";

import { format } from "date-fns-jalali";

import { CopyAll, Delete, Edit } from "@mui/icons-material";

import { tables } from "@/config";

import { useEffect, useState } from "react";

const TableComponent = ({ table, data, del, upd, add, addText, clk }) => {
  const tbl = tables[table];

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowPerPage] = useState(10);

  const [renderRows, setRenderRows] = useState([]);

  // Snackbar
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [typeSnack, setTypeSnack] = useState("");

  const createSnack = (message, type) => {
    setMessageSnack(message);
    setTypeSnack(type);

    setOpenSnack(true);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const copyToClipBoard = (d) => {
    const crds = [
      `Host: ssh.amirhossein.info`,
      `Port: 22`,
      `Username: ${d.username}`,
      `Password: ${d.password}`,
    ];
    const textToCopy = crds.join("\n");

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        createSnack("کانفیگ کپی شد", "success");
      })
      .catch((error) => {
        createSnack("Faild to copy", "error");
      });
  };

  useEffect(() => {
    if (del) {
      data.map(
        (d, index) =>
          (d["delete"] = (
            <Box sx={{ w: "100%", textAlign: "center" }}>
              <IconButton key={`Del-${index}`} onClick={() => del(d)}>
                <Delete color="error" />
              </IconButton>
            </Box>
          ))
      );
    }

    if (upd) {
      data.map(
        (d, index) =>
          (d["update"] = (
            <Box sx={{ w: "100%", textAlign: "center" }}>
              <IconButton key={`Upd-${index}`} onClick={() => upd(d)}>
                <Edit color="info" />
              </IconButton>
            </Box>
          ))
      );
    }

    data.map(
      (d, index) =>
        (d["copy"] = (
          <Box sx={{ w: "100%", textAlign: "center" }}>
            <IconButton key={`Upd-${index}`} onClick={() => copyToClipBoard(d)}>
              <CopyAll color="secondary" />
            </IconButton>
          </Box>
        ))
    );

    setRenderRows(data.slice((page - 1) * rowsPerPage, page * rowsPerPage));
  }, [data, page, rowsPerPage]);

  const renderSwitch = (d, i) => {
    const props = i.split(".");

    const v = props.reduce((acc, prop) => acc[prop], d);

    switch (i) {
      case "timestamp":
        return format(new Date(d["timestamp"]), "yyyy/MM/dd");
      case "remind":
        const thirtyDaysLater = new Date(d["timestamp"]);
        thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);

        const current = new Date();
        const timeDifferenceMs = thirtyDaysLater - current;
        const daysRemaining = Math.ceil(
          timeDifferenceMs / (1000 * 60 * 60 * 24)
        );

        return daysRemaining;
      default:
        return v;
    }
  };

  const renderColor = (d, i) => {
    switch (d.type) {
      case "low":
        return colors.red[500];
      case "add":
        return colors.green[500];
      default:
        return "black";
    }
  };

  return (
    <>
      {data.length > 0 ? (
        <Box>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight={500} color="primary" fontSize={25}>
              {tbl.title}
            </Typography>
            {add && (
              <Button
                onClick={add}
                variant="contained"
                size="large"
                disableElevation
              >
                {addText}
              </Button>
            )}
          </Box>
          {add && <br />}
          {!add && <br />}
          <TableContainer
            variant="outlined"
            sx={{ borderColor: "primary.main", w: "100%" }}
            component={Paper}
          >
            <Table id={table}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  {Object.entries(tbl.fields).map(([key, item]) => (
                    <TableCell
                      sx={{
                        color: "white",
                        textAlign: "center",
                      }}
                      key={item}
                      head
                    >
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {renderRows.map((d) => (
                  <TableRow
                    key={d}
                    onClick={() => clk && clk(d)}
                    sx={{
                      "&:hover": { cursor: "pointer", background: "#fafafa" },
                    }}
                  >
                    {Object.keys(tbl.fields).map((item) => (
                      <TableCell
                        sx={{
                          textAlign: "center",
                          color: renderColor(d, item),
                        }}
                        key={item}
                      >
                        {renderSwitch(d, item)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 3,
                px: 3,
              }}
            >
              <TextField
                variant="outlined"
                placeholder="تعداد در هر صفحه"
                label="تعداد در هر صفحه"
                value={String(rowsPerPage)}
                onChange={(e) => setRowPerPage(Number(e.target.value))}
              />
              <Pagination
                sx={{ direction: "ltr" }}
                count={Math.ceil(data.length / rowsPerPage)}
                size="large"
                color="primary"
                page={page}
                onChange={handleChangePage}
              />
            </Box>
          </TableContainer>
        </Box>
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            py: 10,
          }}
        >
          <Box>
            <Typography variant="h6">
              متاسفانه اطلاعاتی در جدول پیدا نشد
            </Typography>
            <br />
            {add && (
              <Button
                onClick={add}
                variant="contained"
                size="large"
                disableElevation
              >
                {addText}
              </Button>
            )}
          </Box>
        </Box>
      )}

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
    </>
  );
};

export default TableComponent;
