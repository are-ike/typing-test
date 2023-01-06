import React from 'react';

const Result = ({resultData}) => {
    return (
        <div>
            <div>
                <div>
                    <h6>wpm</h6>
                    <p>{resultData.wpm}</p>
                </div>
                <div>
                    <h6>accuracy</h6>
                    <p>{Math.ceil(resultData.accuracy)}%</p>

                </div>
            </div>
        </div>
    );
};

export default Result;