import React from 'react';

const Notfound = () => {
    return (
        <div style={{backgroundColor:"#352333"}} className='vh-100 d-flex justify-content-center'>
                <img src={require("../../images/notFoung.jpg")} className='w-100' alt="not Foung" />
        </div>
    );
}

export default Notfound;
