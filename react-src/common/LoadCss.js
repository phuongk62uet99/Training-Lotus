import React from 'react';

export function LoadCss(cssUrl){
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    head.appendChild(link);
}