import React, { useState, useEffect } from 'react';
import Card from '../core/Card/card';
import CheckBox from '../core/checkBox/checkBox';

import { getCategories } from '../../util/api/category-apis';

import Header from '../header/index'

const Filter = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }

    useEffect(() => {
        init();
    }, [])
    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <h4>Filter by Categories</h4>
                        {/* {categories ? console.log(categories) : null} */}
                        <ul>
                            <CheckBox categories={categories} />
                        </ul>
                    </div>
                    <div className="col-8">
                        right
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter;