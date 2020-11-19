import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {

    const [services, setServices] = useState([])

	const getServices = () => {
		axios.get('http://localhost:5000/getservices/').then(res => {
            setServices([...res.data]);
		}).catch((err) => {
			console.log(err);
		});
	};

	useEffect(() => {
		getServices();
	},[]);

    const renderedServices = services.length > 0 ? (
        services.map((c) => {
            return (
                <div key={c.name} className="item">
                    <div className="content">
                        <div className="header">
                            {c.name}
                        </div>
                    </div>
                </div>
            );
        })
    ) : (<></>);

    return (
        <div className="ui middle aligned animated list">
				{renderedServices}
	    </div>);
}

export default Services;