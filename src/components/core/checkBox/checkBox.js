import React, {useState, useEffect} from 'react';

const CheckBox = ({categories}) => {
    return (
        categories.data.map((category, index) => (
            <li key={index} className="list-unstyled">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label">{category.categoryName}</label>
            </li>
        ))
    )
}

export default CheckBox;