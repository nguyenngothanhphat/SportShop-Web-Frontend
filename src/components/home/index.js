import React from 'react';
import Kitechen from './kitechen-info/index';
import Header from '../header/index';
import Footer from '../footer/index';
import ListProduct from './listProduct/listProduct';

const home = () => {
    return (
        <div>
            <Header />
            <ListProduct />
            {/* <Kitechen /> */}
            {/* <Footer /> */}
        </div>
    )
}

export default home;