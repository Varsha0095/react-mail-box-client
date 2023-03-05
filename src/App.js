import { Fragment } from "react-bootstrap/dist/react-bootstrap";
import "./App.css";
import Header from "./components/Layout/Header";
import React, { useEffect } from "react";
import Auth from "./components/Auth/Auth";
import Mailbox from "./components/page/Mail/Mailbox";
import { Route, Switch } from "react-router-dom";
import MessageInbox from "./components/page/MessageInbox/MessageInbox";
import { ActionForSentMail } from "./store/storeActions";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreator } from "./store/storeActions";
import SentBox from "./components/page/SentBox/SentBox";

const App = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.MailBoxId);

  useEffect(() => {
    const rel = setInterval(() => {
      dispatch(ActionCreator(userEmail));
      dispatch(ActionForSentMail(userEmail));
    }, 1000);
    return () => clearInterval(rel);
  }, []);

  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>

        <Route path="/mailbox/:id">
          <Mailbox />
        </Route>

        <Route path="/receivemessage/:id">
          <MessageInbox />
        </Route>

        <Route path="/sentmessage/:id">
          <SentBox />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
