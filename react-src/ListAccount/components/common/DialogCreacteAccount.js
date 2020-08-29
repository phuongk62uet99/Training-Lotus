import React, { Component } from "React";
import ReactDOM from "React-dom";

class DialogCreacteAccount extends Component {
    constructor(props) {
        super(props);
    }
 
    render() {
        var { onCloseFormCreateAccount } = this.props;
        return (
            <section data-reactroot className="ims-modal error">
                <div className="ims-modal-overlay"> </div>
                <div className="ims-modal-wrapper">
                    <header>
                        <div className="text-message">
                            Thông báo
                        </div>
                        <span onClick={onCloseFormCreateAccount} className="btn_close"></span>
                    </header>
                    <div className="modal-conten">
                        <div className="message">
                            <i className="icons success-account"></i>
                            Tạo tài khoản thành công
                        </div>
                    </div>
                    <footer>
                        <span onClick={onCloseFormCreateAccount} className="btn-close-ims">Đóng</span>
                    </footer>
                </div>
            </section>
        );
    }
}

export default DialogCreacteAccount;