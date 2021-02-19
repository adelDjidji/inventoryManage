import React, {useState, useEffect} from 'react'
import firebase from "firebase/app";
import "firebase/auth";


export default function Login() {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [username, setusername] = useState("")
const [signup, setsignup] = useState(false)
    /**
     * Handles the sign up button press.
     */
    function handleSignUp() {
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // Create user with email and pass.
        firebase.auth().createUserWithEmailAndPassword(email,password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
    }


    function handleSignIn(){
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
         // Sign in with email and pass.
         firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
          }).then(()=>{
              window.location= "/"
          })
    }
    return <div className="loginpage">
        <div className="container pb-5" >
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-7">
                    <div className="card bg-secondary border-0 mb-0">
                        <div className="card-header bg-transparent pb-5">
                            <div className="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
                            <div className="btn-wrapper text-center">
                                <a href="/auth" className="btn btn-neutral btn-icon" onClick={(e) => {
                                    e.preventDefault()
                                    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                                    firebase.auth().signInWithPopup(googleAuthProvider);
                                }}>
                                    <span className="btn-inner--icon"><img src="/assets/img/google.svg" alt="google icon" /></span>
                                    <span className="btn-inner--text">Google</span>
                                </a>
                            </div>
                        </div>
                        <div className="card-body px-lg-5 py-lg-5">
                            <div className="text-center text-muted mb-4">
                                <img src="https://image.flaticon.com/icons/png/512/1651/1651278.png" style={{ height: 200 }} />
                                <br />
                                <h2>Authentifier-vous</h2>
                            </div>



                            {
                                signup && <div className="form-group mb-3">
                                <div className="input-group input-group-merge input-group-alternative">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="ni ni-single-02"></i></span>
                                    </div>
                                    <input value={username} onChange={(e)=>setusername(e.target.value)} className="form-control" name="username" placeholder="Email" type="text" />
                                </div>
                            </div>}
                            <div className="form-group mb-3">
                                <div className="input-group input-group-merge input-group-alternative">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                                    </div>
                                    <input value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" name="username" placeholder="Email" type="text" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group input-group-merge input-group-alternative">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                                    </div>
                                    <input value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" name="password" placeholder="Password" type="password" />
                                </div>
                            </div>
                            
                            <div className="text-center">
                                <input onClick={handleSignIn} type="submit" className="btn btn-primary my-4" value="Connexion" />
                                <a href="/register" className="btn btn-neutral btn-icon">
                                    <span className="btn-inner--icon"><img src="https://image.flaticon.com/icons/png/512/1651/1651278.png" alt="register icon" /></span>
                                    <span className="btn-inner--text">Register</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-6">
                            <a href="#" className="text-light"><small>Mot de passe oublié?</small></a>
                        </div>
                        <div className="col-6 text-right">
                            <a href="/register" className="text-light"><small>Créer un nouveau compte</small></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
};
