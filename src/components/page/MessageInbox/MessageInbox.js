import { Card, Container, Button } from "react-bootstrap";
import { Fragment } from "react-bootstrap/dist/react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { manageEmailActions } from "../../../store/ManageEmailReducer";
import useHttp from "../../Hook/useHttp";

const MessageInbox = (props) => {
  const mails = useSelector((state) => state.mailmanager.receive);
  const userMail = useSelector((state) => state.auth.MailBoxId);
  console.log(mails);
  const { id } = useParams();

  const [error, sendRequest] = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   const history = useHistory();

  let arr = mails.find((index) => index.id === id);

  //Delete email function

  const deleteMailHandler = () => {
    const responseHandler = () => {
      dispatch(manageEmailActions.deleteMail(arr.id));
      alert("Message deleted successfully");
    //   history.replace("/mailbox/receiveinbox");
    navigate.replace("/mailbox/receiveinbox")
    };

    sendRequest(
      {
        request: "DELETE",
        url: ``,
        header: { "Content-type": "application/json" },
      },
      responseHandler
    );
  };
  return (
    <Fragment>
      <Card
        bg="secondary"
        style={{
          marginTop: "3%",
          width: "399px",
          marginLeft: "35%",
          color: "white",
          padding: "20px",
        }}
      >
        {error && <h2>{error}</h2>}
        <Container>
          <span></span>
          <p>Subject = {arr ? arr.subject : "loading... "}</p>
          <p>{arr ? arr.message : " laoding... "}</p>
        </Container>
        <Button variant="danger" onClick={deleteMailHandler}>
          Delete Mail
        </Button>
      </Card>
    </Fragment>
  );
};

export default MessageInbox;
