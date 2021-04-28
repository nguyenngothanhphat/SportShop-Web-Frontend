import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../admin/header/headerAdmin"
import Navigation from "../admin/nav/navigation"

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && history.push("/");
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <>
    <Header />
 
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 pl-0">
            <Navigation />
          </div>

          <div className="col-md-10">
            <p className="text-center">Redirecting you in {count} seconds</p>
          </div>
        </div>
      </div>

    </>
  );
};

export default LoadingToRedirect;
