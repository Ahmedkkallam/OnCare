import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { deleteById } from "../store/actions/user";

const useStyles = makeStyles((theme) => ({
  alert: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "red",
    padding: "10px",
  },
}));

const DeleteDialog = ({ open, handleClose, selectedRow }) => {
  const classes = useStyles();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);

  const handleSubmit = async () => {
    setErrors([]);
    try {
      await dispatch(deleteById(selectedRow));
      handleClose();
    } catch (error) {
      console.log(error);
      const errors = [];
      if (error.errors) {
        errors.push(...error.errors);
      } else errors.push({ param: "noparam", message: error.message });
      setErrors(errors);
      console.log(errors);
    }
  };

  const hasError = (param) => {
    const error = errors.find((error) => error.param === param);
    return error ? error.message : undefined;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Delete User #{selectedRow.id}
      </DialogTitle>
      <DialogContent>
        {hasError("noparam") && (
          <Typography className={classes.alert} variant="h6" component="h6">
            {hasError("noparam")}
          </Typography>
        )}
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this item? This action is permenant
          and there is no way to undo it.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="secondary"
          disabled={isLoading}
          startIcon={<DeleteIcon />}
        >
          {isLoading ? (
            <CircularProgress color="inherit" size="1.25rem" />
          ) : (
            "Delete"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteDialog;
