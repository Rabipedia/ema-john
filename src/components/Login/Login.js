import { useContext, useState } from "react";
import './loginManager'
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn } from "./loginManager";


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });

  initializeLoginFramework();  
  
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" }};

  const googleSignIn = () => {
    handleGoogleSignIn().then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }

  const fbSignIn = () => {
    handleFbSignIn().then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }

  const signOut = () => {
    handleSignOut().then(res => {
      setUser(res);
      setLoggedInUser(res);
    })
  }
  
 
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      
    }
    if (!newUser && user.email && user.password) {
      
    }
    e.preventDefault();
  };

  
  return (
    <div style={{textAlign: 'center'}}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}
      <button onClick={fbSignIn}>Sign in Using Facebook</button>
      {user.isSignedIn && (
        <div>
          <p>WelCome, {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt=""></img>
        </div>
      )}
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            typr="text"
            onBlur={handleBlur}
            name="name"
            placeholder="Enter Your Name"
            required
          ></input>
        )}
        <br />
        <input
          type="text"
          onBlur={handleBlur}
          name="email"
          placeholder="Enter Your Email"
          required
        ></input>
        <br />
        <input
          type="password"
          onBlur={handleBlur}
          name="password"
          placeholder="Your Password"
          required
        ></input>
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged In"} successfully
        </p>
      )}
    </div>
  );
}

export default Login;