import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import { readAll } from "../store/actions/user";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  loading: {
    margin: "0px auto",
    display: "block",
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const users = useSelector((state) => state.users);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  useEffect(() => {
    (async () => {
      try {
        await dispatch(readAll());
      } catch (error) {}
    })();
  }, [dispatch]);

  const handleOpenDeleteDialog = (row) => {
    setSelectedRow(row);
    setDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog(false);
  };

  const handleOpenEditDialog = (row) => {
    setSelectedRow(row);
    setEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialog(false);
  };

  return (
    <>
      <Typography variant="h3" component="h2" gutterBottom>
        Users Dashboard
      </Typography>
      {isLoading ? (
        <CircularProgress
          className={classes.loading}
          color="primary"
          size="1.25rem"
        />
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          handleOpenEditDialog(row);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          handleOpenDeleteDialog(row);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <DeleteDialog
        open={deleteDialog}
        handleClose={handleCloseDeleteDialog}
        selectedRow={selectedRow}
      />

      <EditDialog
        open={editDialog}
        handleClose={handleCloseEditDialog}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default Dashboard;
