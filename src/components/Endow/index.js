import React from 'react';

import './_endow.scss';

export default function Endow(props) {
    return (
        <div className="endow-item">
            <div className="endow-item-img">
                <img src={props.url} alt={props.mainText} />
            </div>
            <div className="endow-item-text">
                <p>
                    <strong>{props.mainText}</strong>
                </p>
                <span>{props.subText}</span>
            </div>
        </div>
    );
}
