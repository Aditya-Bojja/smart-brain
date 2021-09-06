import React from 'react';

const Rank = ({name, entries}) => {
    return(
        <div className='tc f2 fw8 white'>
            <div>{`${name}! your current entries count is...`}</div>
            <div>{entries}</div>
        </div>
    );
}

export default Rank;