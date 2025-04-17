import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "@/lib/firebase/auth";

const SignInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signInWithGoogle = async () => {
    // Use Firebase to sign in with Google
    await doSignInWithGoogle()
      .then(() => {
        navigate("/app");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Use Firebase to sign in with email and password
  const signInWithEmail = async () => {
    setIsSigningIn(true);
    const resp = await doSignInWithEmailAndPassword(email, password);
    setIsSigningIn(false);
    resp === "SUCCESS" ? navigate("/app") : setErrorMessage(resp);
  };

  return (
    <div className="flex-center h-full">
      <div className="w-3/4 sm:w-1/2 xl:w-1/4 p-5 border border-primary rounded-xl">
        <div className="flex flex-col gap-3">
          <a href="/" className="text-2xl mb-5">
            <span className="text-foreground">OP</span>
            <span className="text-primary">ERRANDS</span>
          </a>
          <span className="mb-5">
            <span className="text-primary">Welcome back!</span>
            <br />
            <span className="text-2xl text-foreground">
              Sign in to your account
            </span>
          </span>
          <form
            onSubmit={() => signInWithEmail()}
            className=" flex flex-col gap-3"
          >
            <label htmlFor="email" className="text-foreground">
              Email
            </label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-between items-end">
              <label htmlFor="password" className="text-foreground">
                Password
              </label>
              <a href="/forgotpass" className="text-primary underline text-xs">
                Forgot your password?
              </a>
            </div>

            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && (
              <span className="text-destructive text-xs">{errorMessage}</span>
            )}
            <Button
              type="submit"
              className="mt-5"
              disabled={isSigningIn}
              onClick={signInWithEmail}
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <div className="flex-center gap-3">
            <div className="w-1/2 h-0 border border-foreground/50" />
            <span className="text-foreground/50">or</span>
            <div className="w-1/2 h-0 border border-foreground/50" />
          </div>
          <Button
            className="gap-1"
            variant={"outline"}
            onClick={signInWithGoogle}
          >
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="google-logo"
            />
            <span>Sign in via Google</span>
          </Button>
          <span className="self-center mt-10 text-foreground">
            New to Operrands?{" "}
            <a href="/signup" className="text-primary underline">
              Create an account
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
