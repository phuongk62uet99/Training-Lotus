import React , { Component } from "React";
import ReactDOM from "React-dom";

class DialogConfirmClose extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    onClose = () => {
        var { onCloseDialogConfirm , isOpenFormPreview , closeFormCreatePrevPreview , onCloseForm } = this.props;
        if(isOpenFormPreview){
            closeFormCreatePrevPreview();
            onCloseDialogConfirm();
        }else{
            onCloseForm();
        }
    }
    render(){
        var {  onCloseDialogConfirm } = this.props;
        return(
            <div className="Container-form-questions show" style={{top: "0px",height: "100%"}}>
                <div className="overlay"></div>
                <div className="dialogConfirm">
                    <div className="header">
                        <div className="title">Xác nhận</div>
                        <div className="closeForm" onClick={onCloseDialogConfirm}><i className="fi fi-close"></i></div>
                    </div>
                    <div className="modal-content">
                        <div className="message">
                            <i className="icons confirm"></i>
                            Bạn có chắc chắn muốn đóng form này?
                        </div>
                    </div>
                    <footer>
                        <span className="btn btn-primary" onClick={this.onClose}>Có</span>
                        <span className="btn" onClick={onCloseDialogConfirm}>Không</span>
                    </footer>
                </div>
            </div>
        );
    }
}

export default DialogConfirmClose;