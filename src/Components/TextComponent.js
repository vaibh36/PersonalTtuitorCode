import React from 'react';

const textcomponent = (props)=>{

    const {
        children
    } = props

    return(
        <span>{children}</span>
    )

};

export default textcomponent;