import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  IconButton,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import validator from "validator";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { updateById } from "../store/actions/user";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: "12px",
  },
  button: {
    marginTop: "2rem",
    marginBottom: "1rem",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  alert: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "red",
    padding: "10px",
  },
}));

const EditDialog = ({ open, handleClose, selectedRow }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState([]);
  const isLoading = useSelector((state) => state.isLoading);
  useEffect(() => {
    if (selectedRow) {
      setData({
        firstName: selectedRow.firstName,
        lastName: selectedRow.lastName,
        email: selectedRow.email,
      });
    }
  }, [selectedRow]);
  const reset = () => {
    setData({
      firstName: "",
      lastName: "",
      email: "",
    });
  };
  const handleDataChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleDataValidation = () => {
    const errors = [];

    if (validator.isEmpty(data.firstName))
      errors.push({
        param: "firstName",
        message: "First name can't be blank.",
      });

    if (validator.isEmpty(data.lastName))
      errors.push({ param: "lastName", message: "Last name can't be blank." });

    if (validator.isEmpty(data.email))
      errors.push({ param: "email", message: "Email can't be blank." });
    if (!validator.isEmail(data.email))
      errors.push({ param: "email", message: "Email is invalid." });

    if (errors.length) setErrors(errors);

    return !errors.length;
  };

  const handleSubmit = async () => {
    if (handleDataValidation()) {
      setErrors([]);
      try {
        await dispatch(updateById({ ...data, id: selectedRow.id }));
        reset();
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
      fullWidth
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Edit User #{selectedRow.id}
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {hasError("noparam") && (
          <Typography className={classes.alert} variant="h6" component="h6">
            {hasError("noparam")}
          </Typography>
        )}

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              required
              value={data.firstName}
              onChange={handleDataChange}
              className={classes.formControl}
              error={Boolean(hasError("firstName"))}
              helperText={hasError("firstName")}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="lastName"
              label="Last Name"
              type="text"
              fullWidth
              required
              value={data.lastName}
              onChange={handleDataChange}
              className={classes.formControl}
              error={Boolean(hasError("lastName"))}
              helperText={hasError("lastName")}
            />
          </Grid>
        </Grid>

        <TextField
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          required
          value={data.email}
          onChange={handleDataChange}
          className={classes.formControl}
          error={Boolean(hasError("email"))}
          helperText={hasError("email")}
        />

        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          color="primary"
          className={classes.button}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress color="inherit" size="1.25rem" />
          ) : (
            "Edit"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
