import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";


export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        console.log(result);
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        return signedInUser;
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };

 export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential; 
    var user = result.user; 
    return user;
    var accessToken = credential.accessToken;
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
  }

 export const handleSignOut = () => {
    return firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          photo: "",
          email: "",
        };
        return signedOutUser;
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
// export const createUserWithEmailAndPassword = () => {
//    firebase
//        .auth()
//        .createUserWithEmailAndPassword(user.email, user.password)
//        .then((res) => {
//          const newUserInfo = { ...user };
//          newUserInfo.error = "";
//          newUserInfo.success = true;
//         setUser(newUserInfo);
//         updateUserName(user.name);
//        })
//        .catch((error) => {
//          const newUserInfo = { ...user };
//          newUserInfo.error = error.message;
//          newUserInfo.success = false;
//          setUser(newUserInfo);
//        });
// }

// export const signInWithEmailAndPassword = () => {
//    firebase
//        .auth()
//        .signInWithEmailAndPassword(user.email, user.password)
//        .then((res) => {
//          const newUserInfo = { ...user };
//          newUserInfo.error = "";
//          newUserInfo.success = true;
//          setUser(newUserInfo);
//          setLoggedInUser(newUserInfo);     
//          history.replace(from);
//        })
//        .catch((error) => {
//          const newUserInfo = { ...user };
//          newUserInfo.error = error.message;
//         newUserInfo.success = false;
//          setUser(newUserInfo);
//        });
// }

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
      })
      .then(function () {
      })
      .catch(function (error) {
      });
  };
 
 