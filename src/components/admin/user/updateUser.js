import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

import { getUser, updateUser } from "../../../util/api/user-apis";

import Navigation from "../nav/navigation";
import HeaderAdmin from "../header/headerAdmin";
const initialState = {
  name: "",
  email: "",
  role: "",
  address: "",
};
const UpdateUser = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const {userId} = match.params

  const { name, email, role, address } = values;

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    getUser(match.params.userId).then((u) => {
      setValues({ ...values, ...u.data });
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    updateUser(userId, values, user.token)
    .then((res) => {
      setLoading(false);
      toast.success('Update success');
      history.push("/admin/users");
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
      toast.error(err.response.data.err);
    })
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  return (
    <>
      <HeaderAdmin />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 pl-0">
            <Navigation />
          </div>
          <div className="col-md-10">
            {loading ? (
              <LoadingOutlined className="text-danger h1" />
            ) : (
              <h4>User update</h4>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={name}
                  disabled
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={email}
                  disabled
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  className="form-control"
                  value={role}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={address}
                  disabled
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-outline-warning">Update User</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
