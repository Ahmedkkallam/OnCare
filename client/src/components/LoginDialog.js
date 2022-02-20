import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import validator from "validator";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { logIn } from "../store/actions/user";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: "12px",
  },
  button: {
    marginTop: "1rem",
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

const LoginDialog = ({ open, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const isLoading = useSelector((state) => state.isLoading);

  const reset = () => {
    setData({
      email: "",
      password: "",
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

    if (validator.isEmpty(data.email))
      errors.push({ param: "email", message: "Email can't be blank." });
    if (!validator.isEmail(data.email))
      errors.push({ param: "email", message: "Email is invalid." });

    if (!validator.isLength(data.password, { min: 8 }))
      errors.push({
        param: "password",
        message: "Your password must be at least 8 characters long.",
      });

    if (errors.length) setErrors(errors);

    return !errors.length;
  };

  const handleSubmit = async () => {
    if (handleDataValidation()) {
      setErrors([]);
      try {
        await dispatch(logIn(data));
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
        Login
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
            "Login"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
