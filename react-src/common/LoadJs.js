import React from 'react';

export function LoadJs(jsUrl){
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('script');
    link.type = 'text/javascript';
    link.src = jsUrl;
    head.appendChild(link);
}