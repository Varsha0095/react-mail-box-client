import { Card, Container } from "react-bootstrap";
import { Fragment } from "react-bootstrap/dist/react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { manageEmailActions } from "../../../store/ManageEmailReducer";
import useHttp from "../../Hook/useHttp";

const Inbox = (prop) => {
  console.log(prop);
  const [error, sendRequest] = useHttp();
  const userMail = useSelector((state) => state.auth.MailBoxId);
  const dispatch = useDispatch();

  const removeSeenHandler = () => {
    const dataObj = {
      seen: true,
    };

    const responseHandler = (res) => {
      if (prop.type === "receive") {
        dispatch(manageEmailActions.seenSentMessageHandler(prop.mails.id));
      } else {
        dispatch(manageEmailActions.seenSentMessageHandler(prop.mails.id));
      }
    };

    sendRequest(
      {
        request: "PATCH",
        url: `https://mailbox-client-dd027-default-rtdb.firebaseio.com/${prop.type}${userMail}/${prop.mails.id}.json`,
        data: dataObj,
        header: { "Content-type": "application/json" },
      },
      responseHandler
    );
  };

  const bgColor = prop.mails.seen === false ? "red" : "skyblue";
  console.log(bgColor);

  return (
    <Fragment>
      <h6></h6>
      <Container
        style={{ display: "flex", justifyContent: "", padding: "10px" }}
      >
        <Card
          bg="secondary"
          style={{
            marginLeft: "10%",
            height: "60px",
            width: "600px",
            padding: "10px",
            color: "white",
          }}
        >
          <NavLink
            onClick={removeSeenHandler}
            style={{
              fontWeight: "bold",
              color: "white",
              backgroundColor: `${bgColor}`,
              height: "60px",
              padding: "10px",
            }}
            to={`/${prop.type}message/${prop.mails.id}`}
          >
            {prop.mails.message}
          </NavLink>
        </Card>
      </Container>
    </Fragment>
  );
};


export default Inbox;