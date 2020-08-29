import React , { Component } from "React";
import ReactDOM from "React-dom";

class DialogNoti extends Component{
    constructor(props){
        super(props);
    }
    render(){
        var { isAddClassDivNoti , contentNoti , backgroundNoti } = this.props;
        let className = 'dialog-noti';
        if(backgroundNoti === 0){
            className += ' noti-delete';
        }else{
            className += ' noti-update';
        }
        (isAddClassDivNoti) ? className += ' noti-show' : '';
        return(
            <div className={className}>
                {contentNoti}
            </div>
        );
    }
}

export default DialogNoti;