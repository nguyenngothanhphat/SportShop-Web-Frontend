import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { getUsers, removeUser } from "../../../util/api/user-apis";
import Navigation from "../nav/navigation";
import HeaderAdmin from "../header/headerAdmin";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    getUsers().then((data) => setUsers(data.data));
  };

  const handleRemove = (userId) => {
    if (window.confirm("Are you delete ?")) {
      setLoading(true);
      removeUser(userId, user.token).then(res => {
          getUsers().then(res => setUsers(res.data));
          setLoading(false);
          toast.error(`${res.data.name} was deleted`)
      }).catch(err => {
          console.log("🚀 ~ file: createCoupon.js ~ line 51 ~ removeCoupon ~ err", err)
      })
  }
  }

  return (
    <>
      <HeaderAdmin />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 pl-0">
            <Navigation />
          </div>
          <div className="col">
            <h4>Show {users.length} users</h4>
            <table className="table table-bordered table-strip">
              <thead>
                <tr>
                  <td scope="col">Name</td>
                  <td scope="col">Email</td>
                  <td scope="col">Role</td>
                  <td scope="col">Address</td>
                  <td scope="col">Action</td>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.address}</td>
                      <td>
                        <Link to={`/admin/user/${user._id}`}>
                          <span className="btn btn-sm float-right">
                            <EditOutlined className="text-danger pointer" />
                          </span>
                        </Link>
                        <DeleteOutlined onClick={() => handleRemove(user._id)} className="text-danger pointer" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
