import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import SellerNavigation from '../nav/sellerNavigation';
import HeaderAdmin from '../header/headerAdmin'
import Orders from '../orders/orders'

import { getOrders, changeStatus } from '../../../util/api/admin-apis';

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
      toast.success("Status updated");
      loadOrders();
    });
  };

  return (
    <>
      <HeaderAdmin />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 pl-0">
            <SellerNavigation />
          </div>

          <div className="col-md-10">
            <h4>Admin Dashboard</h4>
            {/* {JSON.stringify(orders)} */}
            <Orders orders={orders} handleStatusChange={handleStatusChange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
