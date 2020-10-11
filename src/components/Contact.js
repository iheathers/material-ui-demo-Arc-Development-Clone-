import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import Icon from "@material-ui/core/Icon";
import SendIcon from "@material-ui/icons/Send";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";

import background from "../assets/background.jpg";
import ButtonArrow from "./ui/ButtonArrow";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "60em",
  },
  estimateButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 60,
    widht: 205,
    marginRight: "5em",
    marginLeft: "2em",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.75rem",
    height: 35,
    padding: 5,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  message: {
    marginTop: "5em",
    borderRadius: 5,
    border: `2px solid ${theme.palette.common.blue}`,
  },
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 245,
    fontSize: "1rem",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  textField: {
    maxWidth: "20em",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const Contact = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [phoneHelper, setPhoneHelper] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const onChange = (event) => {
    let valid;

    switch (event.target.id) {
      case "email":
        setEmail(event.target.value);
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          event.target.value
        );

        if (!valid) {
          setEmailHelper("Invalid Email");
        } else {
          setEmailHelper("");
        }
        break;

      case "phone":
        setPhone(event.target.value);
        valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
          event.target.value
        );
        if (!valid) {
          setPhoneHelper("Invalid Email");
        } else {
          setPhoneHelper("");
        }
        break;
      default:
        break;
    }
  };

  const onConfirm = () => {
    setLoading(true);
    axios
      .get(
        "https://us-central1-material-ui-c7d5f.cloudfunctions.net/sendMail",
        {
          params: {
            name: name,
            email: email,
            phone: phone,
            message: message,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        setEmail("");
        setMessage("");
        setPhone("");
        setAlert({
          open: true,
          message: "Message sent successfully!",
          backgroundColor: "#4BB543",
        });
      })
      .catch((err) => {
        setLoading(false);
        setAlert({
          open: true,
          message: "Something went wrong, please try again!",
          backgroundColor: "#FF3232",
        });
      });
  };

  return (
    <>
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={5000}
      />
      <Grid container direction="row">
        <Grid
          item
          container
          direction="column"
          lg={4}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h2">Contact Us</Typography>
                <Typography variant="body1" color="primary">
                  We're waiting.
                </Typography>
              </Grid>
              <Grid item container alignItems="center" spacing={1}>
                <Grid item>
                  <PhoneIcon color="primary" />
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="primary">
                    <a href="tel:5555555555" className={classes.link}>
                      (555) 555-5555
                    </a>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container alignItems="center" spacing={1}>
                <Grid item>
                  <EmailIcon color="primary" />
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="primary">
                    <a
                      href="mailto: testingmaterial0@gmail.com"
                      className={classes.link}
                    >
                      testingmaterial0@gmail.com
                    </a>
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="column"
                className={classes.textField}
              >
                <Grid item>
                  <TextField
                    fullWidth
                    label="Name"
                    id="name"
                    value={name}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    error={emailHelper.length !== 0}
                    helperText={emailHelper}
                    label="Email"
                    id="email"
                    value={email}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    helperText={phoneHelper}
                    error={phoneHelper.length !== 0}
                    label="Phone"
                    id="phone"
                    value={phone}
                    onChange={onChange}
                  />
                </Grid>
              </Grid>
              <Grid item className={classes.textField}>
                <TextField
                  fullWidth
                  id="message"
                  multiline
                  variant="outlined"
                  rows={10}
                  value={message}
                  className={classes.message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.sendButton}
                  endIcon={loading ? null : <SendIcon />}
                  onClick={onConfirm}
                >
                  {loading ? <CircularProgress size={30} /> : "Send Message"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          className={classes.background}
          lg={8}
          alignItems="center"
        >
          <Grid
            item
            style={{
              marginLeft: matchesSM ? 0 : "5em",
              textAlign: matchesSM ? "center" : "inherit",
            }}
          >
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h2">
                  Simple Software. <br /> Revolutionary Results.
                </Typography>
                <Typography variant="subtitle2" style={{ fontSize: "1.5rem" }}>
                  Take advantage of the 21st Century.
                </Typography>
                <Button variant="outlined" className={classes.learnButton}>
                  <span style={{ marginRight: 10 }}> Learn More</span>
                  <ButtonArrow
                    width={10}
                    height={10}
                    fill={theme.palette.common.blue}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="contained" className={classes.estimateButton}>
              Free Estimate
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Contact;
