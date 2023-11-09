import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Loading } from "./index";

const Protected = ({ children, authentication = true }) => {
  const [loader, setLoader] = useState(true);

  const navigate = useNavigate();

  const authStatus = useSelector((state) => state?.auth?.status);

  console.log({authStatus});

  useEffect(() => {
    // if (authStatus) {
    //   navigate("/");
    // } else {
    //   navigate("/login");
    // }

    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    setLoader(false);
  }, [authStatus, navigate]);

  return loader ? <Loading /> : <>{children}</>;
};

export default Protected;
