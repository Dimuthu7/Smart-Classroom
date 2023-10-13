import React from 'react';
import './SiteLoading.css';

const SiteLoading = () => {
    return (
        <div className="overlay" align="center" style={{overflow: "hidden"}}>
            <img className="logo" id="loading" src={require('./Loading_2.gif')} alt="inner" />
            <h1 className="txt-main" style={{height: "9vh"}}>Loading...</h1>
        </div>
    );
}

export default SiteLoading;