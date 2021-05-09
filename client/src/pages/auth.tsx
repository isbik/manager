import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Alert } from "@material-ui/lab";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { ManageIcon } from "../components/icons/ManageIcon";
import Empty from "../layouts/Empty";
import { GoogleAuth } from "../modules/user/GoogleAuth";
import mainApi from "../services/APIService";
import JWTService from "../services/JWTService";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  paper: {
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.spacing(4),
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    justifyContent: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Auth = () => {
  const classes = useStyles();
  const [signIn, setSignIn] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter();
  const [form, setForm] = React.useState({
    email: "",
    user_name: "",
    password: "",
  });

  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
  };

  const setTokens = useCallback((response) => {
    JWTService.setToken(response.data.access);
    JWTService.setRefreshToken(response.data.refresh);

    mainApi.defaults.headers["Authorization"] = "JWT" + JWTService.getToken();
    // router.push("/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!signIn) {
      mainApi
        .post("/user/create/", form)
        .then((response) => {
          setTokens(response);
        })
        .catch((err) => {
          setError(err);
          setError("Введите форму правильно");
        });
    } else {
      mainApi
        .post("token/", form)
        .then((response) => {
          setTokens(response);
        })
        .catch((err) => {
          setLoading(false);
          setError("Неверный пароль или логин");
        });
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item sm={6} className={classes.image}>
        <ManageIcon />
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className={classes.paper}>
          <Typography style={{ marginBottom: 50 }} component="h1" variant="h4">
            {signIn ? "Добро пожаловать" : "Готовы присоедениться?"}
          </Typography>
          <Typography component="h2" variant="h5">
            Твой органайзер
          </Typography>
          <Fade in={true} key={signIn + "test"}>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              {error && (
                <Alert severity="error" onClose={() => setError("")}>
                  {error}
                </Alert>
              )}
              {!signIn && (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  size="small"
                  fullWidth
                  id="user_name"
                  label="Как вас зовут?"
                  name="user_name"
                  autoComplete="user_name"
                  value={form.user_name}
                  onChange={handelChange}
                />
              )}

              <TextField
                variant="outlined"
                margin="normal"
                required
                size="small"
                fullWidth
                id="email"
                label="Ваша почта"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handelChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                size="small"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handelChange}
              />
              <Box display="flex" alignItems="center" marginY={1}>
                <GoogleAuth />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    ></CircularProgress>
                  )}
                  Войти
                </Button>
              </Box>

              <Grid container>
                <Grid item xs>
                  <Link color="initial" href="#" variant="body2">
                    Забыли пароль?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    onClick={() => setSignIn(!signIn)}
                    color="initial"
                    href="#"
                    variant="body2"
                  >
                    {signIn
                      ? "Ещё не с нами? Присоединиться"
                      : "Уже были здесь? Войти"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Fade>
        </div>
      </Grid>
    </Grid>
  );
};

Auth.Layout = Empty;

export default Auth;
