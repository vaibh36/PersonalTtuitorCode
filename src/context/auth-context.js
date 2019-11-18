import React from 'react';

const authContext = React.createContext({
   loginTutor:()=>{},
   loginStudent:()=>{}
});

export default authContext;