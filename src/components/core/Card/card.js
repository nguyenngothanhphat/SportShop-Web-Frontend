import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from '../showImage/showImage';

const Card = ({ product }) => {
    // console.log("🚀 ~ file: card.js ~ line 5 ~ Card ~ product", product)
    return (
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header">
                    {product.productName}
                </div>
                <div className="card-body">
                    {/* {console.log(product)} */}
                    <ShowImage item={product} url="product" />
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <Link to="/">
                        <button className="btn btn-outline-primary mt-2 mb-2 mr-2">View Product</button>
                    </Link>
                    <button className="btn btn-outline-warning mt-2 mb-2">Add to Card</button>
                </div>
            </div>
        </div>
    )
}

export default Card;