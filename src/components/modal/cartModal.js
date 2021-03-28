import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons'

const CartModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => ({ ...state }));

    let history = useHistory();

    const handleShowModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        dispatch({
            type: "SET_VISIBLE",
            payload: false,
        })
        history.push("/cart")
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        dispatch({
            type: "SET_VISIBLE",
            payload: false,
        })
    };

    const imageStyle = {
        width: '100%',
        height: '50%',
        objectFit: 'cover'
    }

    return (
        <>
            <div onClick={handleShowModal}>
                <ShoppingCartOutlined className="text-success" /> <br /> Add to Cart
            </div>
            <Modal title="Added to cart" centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className="text-center">
                {cart.map((p) => {
                    return (
                        <div key={p._id} className="row">
                            <div className="col">
                                {p.images[0] ? (
                                    <>
                                        <img src={p.images[0].url} style={imageStyle} />
                                        <p className="text-center bg-secondary text-light">
                                            {p.title} x {p.count}
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-center bg-secondary text-light">
                                        {p.title} x {p.count}
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                })}
            </Modal>
        </>
    )
}

export default CartModal;