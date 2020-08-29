import React , { createContext } from 'react';

export const AccountContext = React.createContext({
    Account:{
        id: "",
        fullname: "",
        email: "",
        password: "",
        username : "",
    }
});