import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { DeleteOutlined } from '@ant-design/icons';
import { getCoupons, removeCoupon, createCoupon } from '../../../util/api/coupon-apis';
import Navigation from "../nav/navigation";
import HeaderAdmin from '../header/headerAdmin'

import "react-datepicker/dist/react-datepicker.css";

const CreateCoupon = () => {
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [discount, setDiscount] = useState("");
    const [loading, setLoading] = useState("");
    const [coupons, setCoupons] = useState([]);

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        getCoupons().then(res => setCoupons(res.data))
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();

        setLoading(true)
        createCoupon({ name, expiry, discount }, user.token)
            .then(res => {
                setLoading(false)
                getCoupons().then(res => setCoupons(res.data))
                setName('')
                setDiscount('')
                setExpiry('')
                toast.success(`${res.data.name} is created`);
            })
            .catch(err => {
                console.log("🚀 ~ file: createCoupon.js ~ line 34 ~ handleSubmit ~ err", err)
            })
    }

    const handleRemove = (couponId) => {
        if (window.confirm("Are you delete ?")) {
            setLoading(true);
            removeCoupon(couponId, user.token).then(res => {
                getCoupons().then(res => setCoupons(res.data));
                setLoading(false);
                toast.error(`Coupon${res.data.name} deleted`)
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
                    <div className="col-md-10">
                        {loading ? (
                            <h4 className="text-danger">Loading ...</h4>
                        ) : (
                            <h4>Coupon</h4>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="text-muted">Name:</label>
                                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} autoFocus required />
                            </div>

                            <div className="form-group">
                                <label className="text-muted">Discount %:</label>
                                <input type="text" className="form-control" onChange={(e) => setDiscount(e.target.value)} value={discount} autoFocus required />
                            </div>

                            <div className="form-group">
                                <label className="text-muted">Expiry:</label><br />
                                <DatePicker className="form-control" selected={new Date()} value={expiry} onChange={(date) => setExpiry(date)} />
                            </div>

                            <button className="btn btn-outline-primary">Add Coupon</button>
                        </form>

                        <br />

                        <h4>{coupons.length} Coupons</h4>

                        <table className="table table-bordered table-strip">
                            <thead>
                                <tr>
                                    <td scope="col">Name</td>
                                    <td scope="col">Expiry</td>
                                    <td scope="col">Discount</td>
                                    <td scope="col">Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map((coupon, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{coupon.name}</td>
                                            <td>{new Date(coupon.expiry).toLocaleDateString()}</td>
                                            <td>{coupon.discount}%</td>
                                            <td>
                                                <DeleteOutlined onClick={() => handleRemove(coupon._id)} className="text-danger pointer" />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateCoupon;
