import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const ForgotPassPage = () => {
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Use Firebase to sign in with email and password
  const passwordResetEmail = async () => {
    setIsSending(true);
    setErrorMessage("");

    await sendPasswordResetEmail(auth, email)
      .then(() => {
        toast("Password reset link sent. Please check your email.", {
          position: "top-center",
          className: "justify-center",
        });
        setTimeout(() => {
          setIsSending(false);
          setIsEmailSent(true);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
        setIsSending(false);
      });
  };

  return (
    <div className="flex-center h-full">
      <Toaster />
      <div className="w-3/4 sm:w-1/2 xl:w-1/4 p-5 border border-primary rounded-xl">
        <div className="flex flex-col gap-3">
          <a href="/" className="text-2xl mb-5">
            <span className="text-foreground">OP</span>
            <span className="text-primary">ERRANDS</span>
          </a>
          <span className="mb-5">
            <span className="text-primary">Forgot password?</span>
            <br />
            <span className="text-2xl text-foreground">
              Reset your password
            </span>
            <br />
            <span className="text-sm text-foreground">
              We will send an email containing the link to change your password.
            </span>
          </span>
          <form
            onSubmit={() => passwordResetEmail()}
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

            {errorMessage && (
              <span className="text-destructive text-xs">{errorMessage}</span>
            )}

            <Button
              type="submit"
              className="mt-5"
              disabled={isSending}
              onClick={passwordResetEmail}
            >
              {isSending ? "Sending Email..." : "Send Link To Email"}
            </Button>

            {emailSent && (
              <a
                href="/signin"
                className="text-primary underline mt-3 self-center"
              >
                Back to login page
              </a>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
