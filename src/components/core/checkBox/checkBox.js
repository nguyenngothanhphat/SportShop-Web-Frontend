import React, { useState } from 'react';

const CheckBox = ({ categories }) => {
    console.log("🚀 ~ file: checkBox.js ~ line 4 ~ CheckBox ~ categories", categories)
    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c)
        const newCheckedCategoryId = [...checked]

        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }

        console.log("🚀 ~ file: checkBox.js ~ line 9 ~ CheckBox ~ newCheckedCategoryId", newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
    }
    return (
        <div>
            {categories.data && categories.data.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type="checkbox" className="form-check-input" />
                    <label className="form-check-label">{c.categoryName}</label>
                </li>
            ))}
        </div>
    )
}

export default CheckBox;