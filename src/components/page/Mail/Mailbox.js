import { Badge, Button } from "react-bootstrap";
import { Fragment } from "react-bootstrap/dist/react-bootstrap";
import { useSelector } from "react-redux";
import { Route, useHistory, useParams } from "react-router-dom";
import Inbox from "../Inbox/Inbox";
import Welcome from "../Welcome";
import classes from "./Mailbox.module.css";
import ComposeMail from "../ComposeMail/ComposeMail";

const Mailbox = () => {
  const history = useHistory();

  const receiveMail = useSelector((state) => state.mailmanager.receive);
  const sentMail = useSelector((state) => state.mailmanager.sent);
  const { id } = useParams();

  let unSeen = receiveMail.length;

  return (
    <Fragment>
      <main className={classes.main}>
        <section className={classes.section}>
          <h4 style={{ marginBottom: "40px" }}></h4>
          <Button
            variant="danger"
            style={{ marginBottom: "30px" }}
            onClick={() => {
              history.push("/mailbox/compose");
            }}
          >
            Compose
          </Button>
          <Button
            variant="danger"
            style={{ marginBottom: "30px" }}
            onClick={() => {
              history.push("/mailbox/receiveinbox");
            }}
          >
            Inbox{" "}
            <Badge bg="light" style={{ color: "black" }}>
              {unSeen}
            </Badge>
          </Button>
          <Button
            variant="danger"
            style={{ marginBottom: "30px" }}
            onClick={() => {
              history.push("/mailbox/inbox");
            }}
          >
            Sent
          </Button>
        </section>
        <Route path="/mailbox/receiveinbox">
          <section
            class="border border-dark"
            style={{
              padding: "20px",
              marginLeft: "50px",
              width: "65%",
            }}
          >
            <h5
              style={{
                padding: "10px",
                backgroundColor: "black",
                color: "white",
                borderRadius: "10px",
              }}
            >
              INBOX
            </h5>
            {receiveMail.map((mail) => {
              return <Inbox key={mail.id} mails={mail} type={"receive"} />;
            })}
          </section>
        </Route>
        <Route path="/mailbox/compose">
          <ComposeMail />
        </Route>
        <Route path="/mailbox/welcome">
          <Welcome />
        </Route>
        <Route path="/mailbox/inbox">
          <section
            class="border border-dark"
            style={{
              padding: "20px",
              marginLeft: "50px",
              width: "65%",
              borderRadius: "10px",
            }}
          >
            <h5
              style={{
                padding: "10px",
                backgroundColor: "black",
                color: "white",
                borderRadius: "10px",
              }}
            >
              SEND BOX
            </h5>
            {sentMail.map((mail) => {
              return <Inbox key={mail.id} mails={mail} type={"sent"} />;
            })}
          </section>
        </Route>
      </main>
    </Fragment>
  );
};

export default Mailbox;
