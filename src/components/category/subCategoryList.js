import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../util/api/sub-apis";

const SubCategoryList = () => {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSubs().then((res) => {
            setSubs(res.data);
            setLoading(false);
        });
    }, []);

    const showSubs = () =>
        subs.map((sub) => (
            // <div
            //     key={sub._id}
            //     className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
            // >
            //     <Link to={`/sub/${sub.slug}`}>{sub.name}</Link>
            // </div>
            <button key={sub._id} type="button" class="btn btn-success btn-lg btn3d m-3"><span class="glyphicon glyphicon-ok"></span><Link to={`/sub/${sub.slug}`}> {sub.name}</Link></button>
        ));

    return (
        <div className="container">
            <div className="row">
                {loading ? (
                    <h4 className="text-center">Loading...</h4>
                ) : (
                    showSubs()
                )}
            </div>
        </div>
    );
};

export default SubCategoryList;
