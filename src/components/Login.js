import React, { useState } from "react";
import { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authAction } from "../store/AuthReducer";

const Login = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const switchLoginModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!isLogin) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;

      if (email === "" || password === "" || confirmPassword === "") {
        alert("Enter all fields");
      } else if (confirmPassword !== password) {
        alert("Password does not match");
      } else {
        try {
          const res = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTWU2o3tXnfhv_ZSTUQAE4pvM9aVyYB38`,
            {
              method: "POST",
              body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res.ok) {
            setIsLoading(false);
            console.log("SignUp Successful !");
          } else {
            const data = await res.json();
            console.log(data.error.message);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      }
    } else {
      try {
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTWU2o3tXnfhv_ZSTUQAE4pvM9aVyYB38`,
          {
            method: "POST",
            body: JSON.stringify({
              email: emailRef.current.value,
              password: passwordRef.current.value,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          setIsLoading(false);
          console.log("User authentication successful!");
          const data = await res.json();

          dispatch(
            authAction.updateAuthInfo({
              token: data.idToken,
              email: emailRef.current.value,
            })
          );
        } else {
          const data = await res.json();
          console.log(data.error.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email"
            ref={emailRef}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            ref={passwordRef}
          />
        </Form.Group>
        {!isLogin && (
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter password"
              ref={confirmPasswordRef}
            />
          </Form.Group>
        )}
        {!isLoading && (
          <Button variant="info" type="submit" onSubmit={submitHandler}>
            {isLogin ? "Login" : "Create new account"}
          </Button>
        )}
        {isLoading && <p>Sending Request...</p>}
        <Button variant="info" onClick={switchLoginModeHandler}>
          {isLogin ? "Create Account" : "Login with existing account"}
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
