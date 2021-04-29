import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Navigation from "../nav/navigation";
import HeaderAdmin from "../header/headerAdmin";
import Orders from "../orders/orders";

import { getOrders, changeStatus } from "../../../util/api/admin-apis";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated", {position: "top-center"});
      loadOrders();
    });
  };

  return (
    <>
      <HeaderAdmin />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 pl-0">
            <Navigation />
          </div>

          <div className="col-md-10">
            {user && user.role === "admin" && (
              <h4>Admin Dashboard - {user.name}</h4>
            )}

            {user && user.role === "seller" && (
              <h4>Seller Dashboard - {user.name}</h4>
            )}

            {/* {JSON.stringify(orders)} */}
            <Orders orders={orders} handleStatusChange={handleStatusChange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
