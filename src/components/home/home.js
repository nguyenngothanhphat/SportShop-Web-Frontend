import React, { useState, useEffect } from 'react';
import { Card, Skeleton, Pagination, Layout } from "antd";
import { getProducts, getProductsCount } from '../../util/api/product-apis';
import CardProduct from '../card/cardProduct'
import CategoryList from '../category/index';
import SubCategoryList from '../category/subCategoryList';
import AppHeader from '../nav/header'
import Carousel from '../nav/carousel'
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

const Home = () => {
    const [productsArrivals, setProductsArrivals] = useState([]);
    const [productsSellers, setProductsSellers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageArrival, setPageArrival] = useState(1);
    const [pageSeller, setPageSeller] = useState(1);
    const [productsCountArrivals, setProductsCountArrivals] = useState(0);
    const [productsCountSellers, setProductsCountSellers] = useState(0);

    useEffect(() => {
        loadAllProductsArrival();
    }, [pageArrival])

    useEffect(() => {
        loadAllProductsSeller();
    }, [pageSeller])

    useEffect(() => {
        getProductsCount().then(res => setProductsCountArrivals(res.data))
    }, [])

    useEffect(() => {
        getProductsCount().then(res => setProductsCountSellers(res.data))
    }, [])

    const loadAllProductsArrival = () => {
        setLoading(true);
        getProducts("createAt", "desc", pageArrival).then((res) => {
            setProductsArrivals(res.data);
            setLoading(false);
        })
    }

    const loadAllProductsSeller = () => {
        setLoading(true);
        // sort, order, limit
        getProducts("sold", "desc", pageSeller).then((res) => {
            setProductsSellers(res.data);
            setLoading(false);
        });
    };

    const cards = (count = 5) => {
        let totalCards = [];

        for (let i = 0; i < count; i++) {
            totalCards.push(
                <Card className="col-md-4">
                    <Skeleton active></Skeleton>
                </Card>
            )
        }
        return totalCards;
    }

    return (
        <>
            <Layout className="mainLayout">
                <Header className="header-user">
                    <AppHeader />
                </Header>
                <Content>
                    <Carousel />
                    <div className="jumbotron">
                        {loading ? <h4 className="text-center p-3 mt-5 mb-5 display-3">Loading ...</h4> : <h4 className="text-center p-3 mt-5 mb-5 display-3">All Products</h4>}
                    </div>

                    <h4 className="text-center p-3 mt-5 mb-5 display-4">New Arrivals</h4>

                    <div className="container">
                        {loading ? (
                            <div className="row pb-5">
                                {cards()}
                            </div>
                        ) : (
                            <div className="row">
                                {productsArrivals.map((productsArrival) => {
                                    return (
                                        <div key={productsArrival._id} className="col-md-4">
                                            <CardProduct product={productsArrival} />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    <div className="row">
                        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                            <Pagination current={pageArrival} total={(productsCountArrivals / 3) * 10} onChange={value => setPageArrival(value)} />
                        </nav>
                    </div>

                    <h4 className="text-center p-3 mt-5 mb-5 display-4">Best Sellers</h4>

                    <div className="container">
                        {loading ? (
                            <div className="row pb-5">
                                {cards()}
                            </div>
                        ) : (
                            <div className="row">
                                {productsSellers.map((productsSeller) => {
                                    return (
                                        <div key={productsSeller._id} className="col-md-4">
                                            <CardProduct product={productsSeller} />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    <div className="row">
                        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                            <Pagination current={pageSeller} total={(productsCountSellers / 3) * 10} onChange={value => setPageSeller(value)} />
                        </nav>
                    </div>

                    <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                        Categories
            </h4>
                    <CategoryList />

                    <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                        Sub Category
            </h4>
                    <SubCategoryList />
                </Content>
            </Layout>
        </>
    )
}

export default Home;