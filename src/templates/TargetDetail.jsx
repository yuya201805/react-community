import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { db, FirebaseTimestamp, auth } from "../firebase";
import { addTargetToJoin } from "../reducks/users/operations";
import HTMLReactParser from "html-react-parser";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import NoImage from "../assets/img/src/no_image.png";
import AddCircle from "@material-ui/icons/AddCircle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { addMessageInTarget } from "../reducks/targets/operations";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import SendIcon from "@material-ui/icons/Send";
import { getUserId, getUserName } from "../reducks/users/selectors";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import { push } from "connected-react-router";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 24px auto",
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 16px auto",
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: "auto",
      width: 400,
    },
  },
  root: {
    maxWidth: 600,
    margin: "0 auto",
    backgroundColor: "#F5F5F5",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  avatar: {
    backgroundColor: red[500],
  },
  messages: {
    width: "100%",
    margin: "0 auto",
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    color: "red",
  },
  messagelists: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  messageRoot: {
    maxWidth: 350,
    margin: "0 auto",
  },
  commentRoot: {
    maxWidth: 450,
    margin: "0 auto",
  },
  icon: {
    backgroundColor: "#F0E68C",
    justify: "center",
  },
  header: {
    width: "100%",
    margin: "0 auto",
    maxWidth: 200,
  },
  messageInput: {
    maxWidth: 250,
    margin: "0 auto",
  },
  chip: {
    margin: "10px",
  },
}));

export const returnCodeToBr = (text) => {
  if (text === "") {
    return text;
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, "<br/>"));
  }
};

const TargetDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const id = path.split("/target/detail/")[1];
  const userId = getUserId(selector);
  const userName = getUserName(selector);
  const [target, setTarget] = useState(null);
  const [messages, setMessages] = useState([]);
  const [comments, setComments] = useState([]);
  const [smessage, setSmessage] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const images =
    target && target.images.length > 0 ? target.images : [{ path: NoImage }];

  const inputSmessage = useCallback(
    (event) => {
      setSmessage(event.target.value);
    },
    [setSmessage]
  );

  const goToConfirm = useCallback((target) => {
    dispatch(push(`/complete/confirm/${target.id}`));
  }, []);

  const addTarget = useCallback(() => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(
      addTargetToJoin({
        added_at: timestamp,
        description: target.description,
        images: target.images,
        name: target.name,
        targetId: target.id,
      })
    );
  }, [target]);

  const addMessage = useCallback(
    (smessage) => {
      const text = smessage;
      const timestamp = FirebaseTimestamp.now();
      const targetId = target.id;

      dispatch(addMessageInTarget(targetId, text, timestamp));
      setSmessage("");
    },
    [target]
  );

  useEffect(() => {
    db.collection("targets")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        setTarget(data);
      });

    const targetRef = db.collection("targets").doc(id);
    targetRef
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

    db.collection("users")
      .doc(userId)
      .collection("target")
      .doc(id)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        if (data != undefined) {
          setIsJoined(true);
        }
      });

    const targetInRef = db.collection("targets").doc(id);
    targetInRef
      .collection("comments")
      .orderBy("created_at", "desc")
      .limit(50)
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <section className="c-section-wrapin">
      {target && (
        <Card className={classes.root}>
          <CardHeader
            className={classes.header}
            avatar={
              <Avatar
                className={classes.avatar}
                alt={userName}
                src="/static/images/avatar/1.jpg"
              />
            }
            title={userName + "さんが作成"}
            subheader="2022"
          />
          <div>
            <CardMedia
              className={classes.media}
              image={images[0].path}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {target.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {returnCodeToBr(target.description)}
              </Typography>
            </CardContent>
          </div>

          {isJoined ? (
            <>
              <Chip
                size="large"
                icon={<FaceIcon />}
                label="目標達成した方はこちら！"
                clickable
                color="primary"
                onClick={() => {
                  goToConfirm(target);
                }}
                deleteIcon={<DoneIcon />}
              />
              <Typography variant="overline" display="block" gutterBottom>
                今後同じ目標を目指す人のために一言アドバイスしましょう！
              </Typography>
              <Chip
                size="small"
                icon={<AccessibilityNewIcon />}
                label="参加しました！"
                className={classes.chip}
              />
              <br />
            </>
          ) : (
            <>
              <Chip
                size="large"
                icon={<AddCircle />}
                label="ここから参加してみましょう！"
                color="secondary"
                onClick={() => {
                  addTarget();
                }}
              />
              <br />
              <Typography variant="overline" display="block" gutterBottom>
                参加すると、コメント機能や過去のアドバイスなどが閲覧できます。
              </Typography>
            </>
          )}
        </Card>
      )}

      <div className={classes.messageRoot}>
        <div>
          <div className={classes.messageInput}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="コメント"
                  type={"text"}
                  onChange={inputSmessage}
                  rows={1}
                  value={smessage}
                />
              </Grid>
              <Grid item>
                <SendIcon
                  onClick={() => {
                    addMessage(smessage);
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="msg">
          {messages.length > 0 &&
            messages.map((message) => (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      className={classes.avatar}
                      alt={message.userName}
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={message.userName + "さん"}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        {message.text}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            ))}
        </div>
      </div>
      <div className={classes.commentRoot}>
        {comments.length > 0 &&
          comments.map((comment) => (
            <List className={classes.root}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={comment.user_name}
                    src="/static/images/avatar/2.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.user_name + "さんからのアドバイス"}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {comment.comment}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Chip
                size="small"
                color="secondary"
                className={classes.chip}
                icon={<AccessibilityNewIcon />}
                label={comment.user_name + "さんが達成しました！"}
              />
              <Divider variant="inset" component="li" />
            </List>
          ))}
      </div>
    </section>
  );
};
export default TargetDetail;
