import { useState } from "react";
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
import { create as createUser } from "../store/actions/user";
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

const RegisterDialog = ({ open, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState([]);
  const isLoading = useSelector((state) => state.isLoading);

  const reset = () => {
    setData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
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

    if (!validator.isLength(data.password, { min: 8 }))
      errors.push({
        param: "password",
        message: "Your password must be at least 8 characters long.",
      });

    if (
      validator.isEmpty(data.passwordConfirmation) ||
      data.password !== data.passwordConfirmation
    )
      errors.push({
        param: "passwordConfirmation",
        message: "Password confirmation doesn't match password.",
      });

    if (errors.length) setErrors(errors);

    return !errors.length;
  };

  const handleSubmit = async () => {
    if (handleDataValidation()) {
      setErrors([]);
      try {
        await dispatch(createUser(data));
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
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Register
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

        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          required
          value={data.password}
          onChange={handleDataChange}
          className={classes.formControl}
          error={Boolean(hasError("password"))}
          helperText={hasError("password")}
        />

        <TextField
          name="passwordConfirmation"
          label="Confirm Password"
          type="password"
          fullWidth
          required
          value={data.passwordConfirmation}
          onChange={handleDataChange}
          className={classes.formControl}
          error={Boolean(hasError("passwordConfirmation"))}
          helperText={hasError("passwordConfirmation")}
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
            "Register"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
