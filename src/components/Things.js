import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Things = () => {

    const [things, setThings] = useState([])

	const getThings = () => {
		axios.get('http://localhost:5000/getthings/').then(res => {
			setThings([...res.data]);
		}).catch((err) => {
			console.log(err);
		});
	};

	useEffect(() => {
		getThings();
	},[]);

    const renderedThings = things.length > 0 ? (
        things.map((c) => {
            return (
                <div key={c.name} className="item">
                    <div className="content">
                        <div className="header">
                            {c.OS}
                        </div>
                    </div>
                </div>
            );
        })
    ) : (<></>);

    return (
        <div className="ui middle aligned animated list">
				{renderedThings}
	    </div>);
}

export default Things;