import React from "react";
import Navigation from '../nav/navigation';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Navigation />
        </div>
        <div className="col">
          Admin dashboard page
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
