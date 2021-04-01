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
    const [newUser, setNewUser] = useState (false);
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

const handaleBlur = (e) => {
  let isFieldValid = true ;
  
  if(e.target.name === 'email'){
    isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      
  } if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value)
      isFieldValid= isPasswordValid && passwordHasNumber ;
  } if(isFieldValid){
    const newUserInfo = {...user};
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo)
  }
}

const handaleSubmit = (e) => {
//  console.log(user.email , user.password)
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then( res => {
              // Signed in 
              const newUserInfo = {...user};
              newUserInfo.error = ' ';
              newUserInfo.success = true;
              setUser(newUserInfo);
              
              updateUserName(user.name);
              // ...
            })
            .catch((error) => {
              const newUserInfo = {...user};
              newUserInfo.error = error.message;
              newUserInfo.success = false;
              setUser(newUserInfo)
            });
    }
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then( res => {
  // Signed in
             const newUserInfo = {...user};
              newUserInfo.error = ' ';
              newUserInfo.success = true;
              setUser(newUserInfo);
              setLoggedInUser(newUserInfo);
              history.replace(from);
              console.log('sign in user info', res.user);
  // ...
})
.catch((error) => {
              const newUserInfo = {...user};
              newUserInfo.error = error.message;
              newUserInfo.success = false;
              setUser(newUserInfo)
});
    }
    e.preventDefault();
}

const updateUserName= name => {
              const user = firebase.auth().currentUser;

               user.updateProfile({
                displayName: name,
                
              }).then(function() {
                console.log ('Update successful')
              }).catch(function(error) {
              
                console.log ('An error happened')
              });
            }
    return (
        <div className="body">
    <div className="login-box">
        <h1>Login</h1>
        
        <form onSubmit={handaleSubmit}>
        <div className="textbox">
        {newUser &&<input type="text" onBlur={handaleBlur} name="name" placeholder="Your Name" required/>}
        </div>
        <div className="textbox">
        <input type="text" onBlur={handaleBlur} name="email" placeholder="Your Email" required></input> <br/>
        </div>
        <div className="textbox">
        <input type="password" onBlur={handaleBlur} name="password" placeholder="Password" required></input> <br/>
        
      </div>
      <input className="btn" type="submit" value= {newUser?'Sign Up' : 'Sign In'}/>
      </form>
      
        <label htmlFor="newUser">Don't Have Account ? <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/> Create Account</label>
        <h4 style={{textAlign:'center'}}>OR</h4>
      {
          user.isSignedIn ? <button onClick={handaleSignOut}>Sign Out</button>:
          <Button onClick={handaleSignIn}>Sign In With Google</Button>
        } <br />
    </div>
    <p style={{color: 'red'}}>{user.error}</p>
        {
          user.success && <p style={{color: 'green'}}>User {newUser ? 'created ' : 'logged In'} successfully</p>
        }
    </div>
    );
};

export default Login;