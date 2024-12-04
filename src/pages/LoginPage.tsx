import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <div className="flex-center h-full">
      <div className="w-1/4 p-5 border border-primary rounded-xl">
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

          <label htmlFor="email" className="text-foreground">
            Email
          </label>
          <Input id="email" placeholder="Input email..." />
          <label htmlFor="password" className="text-foreground">
            Password
          </label>
          <Input
            id="password"
            placeholder="Input password..."
            type="password"
          />
          <Button className="mt-5">Sign in</Button>

          <div className="flex-center gap-3">
            <div className="w-1/2 h-0 border border-foreground/50" />
            <span className="text-foreground/50">or</span>
            <div className="w-1/2 h-0 border border-foreground/50" />
          </div>
          <Button className="gap-1" variant={"outline"}>
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

export default LoginPage;
