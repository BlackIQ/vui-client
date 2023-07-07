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
} from "@mui/material";

import { Delete, Edit } from "@mui/icons-material";

import { tables } from "@/config";

import { useEffect, useState } from "react";

const TableComponent = ({ table, data, del, upd, add, addText, clk }) => {
  const tbl = tables[table];

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowPerPage] = useState(10);

  const [renderRows, setRenderRows] = useState([]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
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

    setRenderRows(data.slice((page - 1) * rowsPerPage, page * rowsPerPage));
  }, [data, page, rowsPerPage]);

  const renderSwitch = (d, i) => {
    const props = i.split(".");

    const v = props.reduce((acc, prop) => acc[prop], d);

    switch (i) {
      case "createdAt":
        const td = new Date(d[i]);

        return `${td.getFullYear()}/${td.getMonth()}/${td.getDay()} ${td.getHours()}:${td.getMinutes()}`;
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

  return data.length > 0 ? (
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
                onClick={() => clk && clk(d._id)}
                sx={{
                  "&:hover": { cursor: "pointer", background: "#fafafa" },
                }}
              >
                {Object.keys(tbl.fields).map((item) => (
                  <TableCell
                    sx={{ textAlign: "center", color: renderColor(d, item) }}
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
        <Typography variant="h6">متاسفانه اطلاعاتی در جدول پیدا نشد</Typography>
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
  );
};

export default TableComponent;
