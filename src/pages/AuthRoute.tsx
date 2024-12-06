import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase/config";

export interface IAuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        navigate("/app");
      } else {
        console.log("unauthorized");
        setLoading(false);
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  if (loading) return <p>loading</p>;

  return <div>{children}</div>;
};

export default AuthRoute;
