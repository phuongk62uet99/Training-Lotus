	
import React , { createContext } from 'react';

export const UserContext = React.createContext({
    taskQA:{
        id: "",
        question_id: "",
        question: "",
        answer: "",
    }
});