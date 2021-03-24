import React, { useState, useEffect } from 'react';
import { Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { getProduct, getProductsCount, productStar, getRelated } from '../../util/api/product-apis';
import StarRating from 'react-star-ratings'
import RatingModal from '../modal/rating'
import ShowAverageRating from './showAverageRating';
import CardProduct from '../card/cardProduct';
import Header from '../nav/header'

const { Meta } = Card;
const { TabPane } = Tabs;

const DetailProduct = ({ match }) => {
    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);
    const [star, setStar] = useState(0);

    const { _id, title, description, images, category, price, subs, shipping, color, brand, quantity, sold, ratings } = product;

    const { slug } = match.params;

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadSingleProduct();
    }, [slug]);

    useEffect(() => {
        if (product.ratings && user) {
            let exsitingRatingObject = product.ratings.find(
                (el) => el.postedBy.toString() === user._id.toString()
            )
            exsitingRatingObject && setStar(exsitingRatingObject.star)
        }
    })

    const loadSingleProduct = () => {
        getProduct(slug).then(res => {
            setProduct(res.data);

            /* Load related */
            getRelated(res.data._id).then(res => setRelated(res.data))
        }
        );
    }

    const onStarClick = (newRating, name) => {
        setStar(newRating);
        productStar(name, newRating, user.token).then(res => {
            console.log("🚀 ~ file: detail.js ~ line 36 ~ productStar ~ res", res.data)
            loadSingleProduct();
        })
    }

    return (
        <>
        <Header />
        <div className="container-fluid">
            <div className="row pt-4">
                <div className="col-md-5">
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                        {images && images.map((image) => {
                            return (
                                <img src={image.url} key={image.public_id} />
                            )
                        })}
                    </Carousel>
                    <Tabs type="card">
                        <TabPane tab="Description" key="1">
                            {description && description}
                        </TabPane>
                        <TabPane tab="More" key="2">
                            Call use on xxxx xxx xxx to learn more about this product
                        </TabPane>
                    </Tabs>
                </div>
                <div className="col-md-7">
                    <h3>{title}</h3>
                    {product && product.ratings && product.ratings.length > 0 ? ShowAverageRating(product) : <div className="text-center pt-1 pb-3">No rating yet</div>}
                    <Card actions={[
                        <>
                            <ShoppingCartOutlined className="text-success" /> <br />
                            Add to Cart
                        </>,
                        <Link to="/">
                            <HeartOutlined className="text-info" /><br /> Add to Wishlist
                        </Link>,
                        <RatingModal>
                            <StarRating
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="blue"
                                starHoverColor="blue"
                                starDimension="40px"
                                starSpacing="15px"
                            />
                        </RatingModal>
                    ]}>
                        <ul className="list-group">
                            <li className="list-group-item">
                                Price{" "}
                                <span className="label label-default label-pill pull-xs-right">
                                    $ {price}
                                </span>
                            </li>
                            {category && (
                                <li className="list-group-item">
                                    Category{" "}
                                    <Link to={`/category/${category.slug}`} className="label label-default label-pill pull-xs-right">
                                        {category.name}
                                    </Link>
                                </li>
                            )}

                            {subs && (
                                <li className="list-group-item">
                                    Sub Categories
                                    {subs.map((sub, index) => {
                                        return (
                                            <Link key={index} to={`/sub/${sub.slug}`} className="label label-default label-pill pull-xs-right">
                                                {sub.name}
                                            </Link>
                                        )
                                    })}
                                </li>
                            )}

                            <li className="list-group-item">
                                Shipping{" "}
                                <span className="label label-default label-pill pull-xs-right">
                                    {shipping}
                                </span>
                            </li>
                            <li className="list-group-item">
                                Smell {" "}
                                <span className="label label-default label-pill pull-xs-right">
                                    {color}
                                </span>
                            </li>
                            <li className="list-group-item">
                                Brand {" "}
                                <span className="label label-default label-pill pull-xs-right">
                                    {brand}
                                </span>
                            </li>
                            <li className="list-group-item">
                                Avaliable {" "}
                                <span className="label label-default label-pill pull-xs-right">
                                    {quantity}
                                </span>
                            </li>
                            <li className="list-group-item">
                                Sold {" "}
                                <span className="label label-default label-pill pull-xs-right">
                                    {sold}
                                </span>
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
            <div className="row p-5">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                    <h4>Relate products</h4>
                    <hr />
                    <div className="row pb-5">
                        {related.length > 0 ? related.map((relate, index) => {
                            return (
                                <div key={index} className="col-md-4">
                                    <CardProduct product={relate} />
                                </div>
                            )
                        }) : (
                            <div className="text-center col">
                                No Products Found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default DetailProduct;