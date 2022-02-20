import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Chip,
} from "@material-ui/core";
import { Face as FaceIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import { logOut } from "../store/actions/user";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    fontSize: "0.875rem",
    fontWeight: "500",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const me = useSelector((state) => state.me);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const handleLogout = async () => {
    await dispatch(logOut());
  };

  const handleOpenLogin = () => {
    setLogin(true);
    setRegister(false);
  };

  const handleCloseLogin = () => {
    setLogin(false);
  };

  const handleOpenRegister = () => {
    setRegister(true);
    setLogin(false);
  };

  const handleCloseRegister = () => {
    setRegister(false);
  };

  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              OnCare
            </Typography>
            {me ? (
              <>
                <Chip
                  className={classes.avatar}
                  color="primary"
                  label={`Hello! ${me.firstName}`}
                  icon={<FaceIcon />}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={handleOpenLogin}>
                  Login
                </Button>
                <Button color="inherit" onClick={handleOpenRegister}>
                  Register
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <LoginDialog open={login} handleClose={handleCloseLogin} />
      <RegisterDialog open={register} handleClose={handleCloseRegister} />;
    </>
  );
};

export default Navbar;
