import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState} from "react";
import './Login.css';
import firebaseConfig from "./firebase.config"
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from "../../App";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


const Login = () => {
    
  const [user,setUser] = useState({
    isSignedIn:false,
    newUser: false,
    name:" ",
    email:" ",
    photo:" ",
    password:" ",
    error:" ",
    success: false,
  });

  const [loggInUser,setLoggedInUser] = useContext(UserContext);
  console.log(loggInUser);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  
 
  const handaleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      
      const {displayName,photoURL,email} = res.user
      const signInUser = {
        isSignedIn:true,
        name:displayName,
        photo:photoURL,
        email:email
      }
      setUser(signInUser);
      console.log(displayName,photoURL,email);
      setLoggedInUser(signInUser);
      history.replace(from);
    })
    .catch(err => {
      console.log(err)
      console.log(err.message)
    })
  }
  const handaleSignOut = () =>{
    firebase.auth().signOut()
    .then(res => {
      
      
      const signedOutUser = {
        isSignedIn:false,
        name:"",
        photo:"",
        email:""
  }
      setUser(signedOutUser);
}) 
.catch(err => {
  console.log(err)
  console.log(err.message)
})
}


    return (
        <div className="body">
    <div className="login-box">
        <h1>Login</h1>
        
        
      
        
      {
          user.isSignedIn ? <button onClick={handaleSignOut}>Sign Out</button>:
          <Button onClick={handaleSignIn}>Sign In With Google</Button>
        } <br />
    </div>
    
        
    </div>
    );
};

export default Login;