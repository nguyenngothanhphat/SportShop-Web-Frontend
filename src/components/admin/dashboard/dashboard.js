import React from "react";

import Navigation from '../nav/navigation';
import HeaderAdmin from '../header/headerAdmin'

const Dashboard = () => {
  return (
    <>
    <HeaderAdmin />
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 pl-0">
          <Navigation />
        </div>

        <div className="col">
          <h4>Admin Dashboard</h4>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
