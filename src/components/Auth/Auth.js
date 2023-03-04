import { useRef, useState } from "react"
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Form } from "react-router-dom";
import { authAction } from "../../store/AuthReducer";

const Auth = () => {
    const[isLogin, setLogin] = useState(true);

    const[error, sendRequest] = useHttp();

    const enteredEmailRef = useRef();
    const enteredPasswordRef = useRef();
    const enteredConfirmPasswordRef = useRef();

    const history = useHistory();

    const dispatch = useDispatch();

    const formSubmitHandler = async(event) => {
        event.preventDefault();

        const enteredMail = enteredEmailRef.current.value;
        const enteredPassword = enteredPasswordRef.current.value;
        const enteredConfirmPassword = !isLogin ? enteredConfirmPasswordRef.current.value : null;

        const authObj = {
            email: enteredMail,
            password: enteredPassword,
            returnSecureToken: true,
        };
        if(isLogin){
            if(enteredMail.trim().length === 0 || enteredPassword.trim().length === 0) {
                alert("Please enter all inputs");
            } else { 
                const resData = (res) => {
                    console.log(res.data);
                    dispatch(authAction.setToken(res.data.idToken));
                    let mail1 = enteredMail.replace('@','').replace('.','');
                    dispatch(authAction.setEmailId(mail1));

                    history.replace("/mailbox/compose");
                    window.location.reload();
                };

                sendRequest(
                    {
                        request: 'POST',
                        url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTWU2o3tXnfhv_ZSTUQAE4pvM9aVyYB38',
                        data: authObj,
                        header: {"Content-Type": "application/json"},
                    },
                    resData
                )
            }
        }else{
            console.log(authObj);

            if(
                enteredMail.trim().length === 0 ||
                enteredPassword.trim().length === 0 ||
                enteredConfirmPassword.trim().length === 0
            ) {
                alert("Please enter all inputs");
            }else if (enteredPassword !== enteredConfirmPassword) {
                alert("Password Mismatch")
            }else{
                const resData = () => {
                    enteredEmailRef.current.value = "";
                    enteredPasswordRef.current.value = "";
                    enteredConfirmPasswordRef.current.value = "";
                    alert("Your Account Created Successfully!");
                    setLogin(false);
                };
                sendRequest(
                    {
                        request: "POST",
                        url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTWU2o3tXnfhv_ZSTUQAE4pvM9aVyYB38",
                        data: authObj,
                        header: {"Content-Type": "application/json"},
                    },
                    resData
                )
            }
        }
    }

    const toggleButtonHandler = (event) => {
        event.preventDefault();
        setLogin(!isLogin);
    };

    return (
        <Card>
            {error && <h2>{`${error}`}</h2>}
            <Form>
                <Form.Group>
                    <h3>{isLogin ? "Login" : "Sign Up"}</h3>
                    <Form.Control ref={enteredEmailRef} type="email" autoComplete="on" placeholder="Email" />
                    <br/>
                    <Form.Control ref={enteredPasswordRef}
                    type="password"
                    autoComplete="on"
                    placeholder="Password" />
                    <br />
                    {!isLogin && (
                        <Form.Control ref={enteredConfirmPasswordRef}
                        type="password"
                        autoComplete="on"
                        placeholder="Confirm Password"
                        />
                    )}
                    <br />
                    <Button onClick={formSubmitHandler}>
                        {isLogin ? "Login" : "Sign Up"}
                    </Button>
                    <br />
                    <br />
                    <Button variant="danger" onClick={toggleButtonHandler}>
                        {isLogin ? "Click here for Sign Up" : "Already Registered ?"}
                    </Button>
                </Form.Group>
            </Form>
        </Card>
    )
};

export default Auth;