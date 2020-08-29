import React , { createContext } from 'react';

export const UserContext = React.createContext({
    taskQA:{
        question_id: "",
        question_name: "",
        question: "",
        answer: "",
    }
});