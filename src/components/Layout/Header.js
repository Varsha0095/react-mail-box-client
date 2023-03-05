import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
//   const history = useHistory();
    const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.auth.MailBoxId);
  console.log(loggedInUser);

  const bannerFunction = () => {
    // history.replace("/mailbox/welcome");
    navigate.replace("/mailbox/welcome");
  };

  const logoutFunction = () => {
    localStorage.clear();
    // history.replace("/");
    navigate.replace("/");
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark" style={{ marginBottom: "10px" }}>
        <Container>
          <Navbar.Brand onClick={bannerFunction} style={{ cursor: "pointer" }}>
            Signed In As : {loggedInUser}
          </Navbar.Brand>
        </Container>
        <Container>
          <Button
            variant="danger"
            style={{ marginLeft: "auto" }}
            onClick={logoutFunction}
          >
            Logout
          </Button>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default Header;
