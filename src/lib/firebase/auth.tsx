import { auth } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { onSignInUserInfo } from "./user";

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  let response = "";
  await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      response = "SUCCESS";
    })
    .catch((error) => {
      console.log(error);
      response = getErrorMessage(error.code);
    });

  return response;
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  let response = "";
  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userInfo) => {
      await onSignInUserInfo(userInfo.user.displayName, userInfo.user.email);
      response = "SUCCESS";
    })
    .catch((error) => {
      response = getErrorMessage(error.code);
    });

  return response;
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider)
    .then(async (userInfo) => {
      await onSignInUserInfo(userInfo.user.displayName, userInfo.user.email);
    })
    .catch((error) => {
      console.log(error);
    });
  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
  return updatePassword(auth.currentUser!, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser!, {
    url: `${window.location.origin}/home`,
  });
};

function getErrorMessage(errorCode: string) {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid email format.";
    case "auth/invalid-credential":
      return "Invalid username or password.";
    case "auth/weak-password":
      return "Password should be at least 6 characters";
    case "auth/email-already-in-use":
      return "This email is already used.";
    default:
      //return "Connection failed. Please try again later.";
      return errorCode;
  }
}
