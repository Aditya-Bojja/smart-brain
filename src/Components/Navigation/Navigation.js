import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn){
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className = 'f5 fw9 grow no-underline br-pill ba bw1 ph3 pv2 mt3 mr3 black pointer'>Sign Out</p>
            </nav>
        );
    } else {
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className = 'f5 fw9 grow no-underline br-pill ba bw1 ph3 pv2 mt3 mr3 black pointer'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className = 'f5 fw9 grow no-underline br-pill ba bw1 ph3 pv2 mt3 mr3 black pointer'>Register</p>
            </nav>
        );
    }
}

export default Navigation;