import React, { Component } from "React";
import ReactDOM from "React-dom";

class DialogPassWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
        };
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        var { isOpenForm, onCloseForm, isOpenFormPass, onSubmitUpdatePassWordAccount, taskAccount } = this.props;
        var form =
            <div className="Container-form-questions show" style={{ top: "0px", height: "100%" }}>
                <div className="overlay"></div>
                <div className="dialogConfirm-Account">
                    <div className="header">
                        <div className="title">Đổi mật khẩu cho tài khoản {taskAccount.username}</div>
                        <div className="closeForm" onClick={onCloseForm}></div>
                    </div>
                    <div className="modal-content">
                        <div className="reset-password-panel">
                            <div className="row">
                                <div className="label">
                                    <p>Mật khẩu mới</p>
                                </div>
                                <div className="content">
                                    <input type="password" placeholder="Nhập mật khẩu mới " className="textbox" name="password"
                                        value={this.state.password} onChange={this.onChange}>
                                    </input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="footer-password">
                        <div className="conten-footer">
                            <span className="btn btn-primary" onClick={() => onSubmitUpdatePassWordAccount(taskAccount, this.state.password)}>Lưu</span>
                            <span className="btn" onClick={onCloseForm}>Đóng </span>
                        </div>
                    </footer>
                </div>
            </div>

        if (!isOpenFormPass) {
            form = null;
        }
        return (

            <div>
                {form}
            </div>
        );
    }
}

export default DialogPassWord;