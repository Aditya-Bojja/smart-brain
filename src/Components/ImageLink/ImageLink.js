import React from 'react';
import './ImageLink.css';

const ImageLink = ({onInputChange, onButtonSubmit}) => {
    return(
        <div className='tc'>
            <p className='f3 fw6 mt3 mb2'>
                {"This Smart Brain will detect faces in your image. Give it a try!"}
            </p>
            <div className='form br3 pa4 shadow-5 center'>
                <input className='pa2 fw8 w-70' type='text' placeholder = 'Paste image URL' onChange={onInputChange} />
                <button className='pa2 fw8 ba bw1 grow w-30 pointer custom' onClick={onButtonSubmit} >Detect</button>
            </div>
        </div>
    );
}

export default ImageLink;