import React from "react";
import Navigation from '../nav/navigation';

import Header from '../nav/header'

const History = () => (
  <>
  <Header />
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <Navigation />
      </div>
      <div className="col">user history page</div>
    </div>
  </div>
  </>
);

export default History;
