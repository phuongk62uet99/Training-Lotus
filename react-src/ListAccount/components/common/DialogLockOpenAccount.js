import React, { Component } from "React";
import ReactDOM from "React-dom";

class DialogLockOpenAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        var { isOpenForm, onCloseFormDialog, deletingTaskAccounts, statusLockOrOpen, countLock, countOpen, statusSelect } = this.props;
        var text = "";
        if (deletingTaskAccounts.length > 0) {
            if (statusSelect == 1) {
                if (countOpen > 0) {
                    if (deletingTaskAccounts.length === countOpen) {
                        if (countOpen === 1) {
                            text = "Mở khóa tài khoản thành công"
                        } else {
                            text = "Mở khóa " + countOpen + " tài khoản thành công ";
                        }
                    } else {
                        text = "Đã mở khóa " + countOpen + "/" + deletingTaskAccounts.length + " tài khoản";
                    }
                } else {
                    if (deletingTaskAccounts.length == 1) {
                        text = "Mở khóa tài khoản thất bại";
                    } else {
                        text = "Mở khóa " + deletingTaskAccounts.length + " tài khoản thất bại";
                    }
                }
            } else if (statusSelect == 0) {
                if (countLock > 0) {
                    if (deletingTaskAccounts.length === countLock) {
                        if (countLock === 1) {
                            text = "Khóa tài khoản thành công";
                        } else {
                            text = "Khóa " + countLock + " tài khoản thành công";
                        }
                    } else {
                        text = "Đã khóa " + countLock + "/" + deletingTaskAccounts.length + " tài khoản";
                    }
                } else {
                    if (deletingTaskAccounts.length === 1) {
                        text = "Khóa tài khoản thất bại";
                    } else {
                        text = "Khóa " + deletingTaskAccounts.length + " tài khoản thất bại";
                    }
                }
            }
        }

        var form =
            <section data-reactroot className="ims-modal error">
                <div className="ims-modal-overlay"> </div>
                <div className="ims-modal-wrapper">
                    <header>
                        <div className="text-message">
                            Thông báo
                        </div>
                        <span onClick={onCloseFormDialog} className="btn_close"></span>
                    </header>
                    <div className="modal-conten">
                        <div className="message">
                            <i className="icons success-account"></i>
                            {text}
                        </div>
                    </div>
                    <footer>
                        <span onClick={onCloseFormDialog} className="btn-close-ims">Đóng</span>
                    </footer>
                </div>
            </section>
      
        if (!isOpenForm) {
            form = null;
        }
        return (
            <div>
                {form}
            </div>
        );
    }
}

export default DialogLockOpenAccount;