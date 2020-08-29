import React, { Component } from "React";
import ReactDOM from "React-dom";

class Header extends Component {
    constructor(props) {
        super(props);
    }
    onClickTabManage = () => {
        this.props.onClickTabManage();
    }


    render() {
        var { onOpenFormCreateQuestion, usernameAccount, creactQA, permissionPage, pagePermission } = this.props;
        console.log("Case 1 : ", pagePermission);
        return (
            <div className="Header">
                <div className="Logo">
                    <a href="" title="Dashboard">
                        <h1 className="lg"></h1>
                    </a>
                </div>
                <ul className="TopMenu">
                    {
                        !creactQA ? "" : <li className="WriteArticle">
                            <a onClick={onOpenFormCreateQuestion}>
                                <i className="menu-icons icon-editnews"></i>
                            </a>
                            <div className="title">
                                <i className="fi fi-caret-up"></i>
                                <span>Thêm mới</span>
                            </div>
                        </li>
                    }
                    {
                        pagePermission ? null :
                            <li className="manager" title="Quản lý hỏi - đáp">
                                <a href="question.php">
                                    <i className="menu-icons icon-news"></i>
                                    <label>Quản lý hỏi - đáp</label>
                                </a>
                            </li>
                    }

                    <li className="manager" title="Quản lý tài khoản">
                        <a href="account.php">
                            <i className="menu-icons icon-accounts" aria-hidden="true"></i>
                            <label>Quản lý tài khoản</label>
                        </a>
                    </li>
                </ul>
                <div className="logged-info">
                    <div className="info-box">
                        <div className="col">
                            <label>{usernameAccount}</label>
                        </div>
                        <img src="public/images/admin.png" />
                    </div>
                    <div className="dropdown-actions">
                        <div className="avatar-box">
                            <img src="public/images/admin.png" />
                        </div>
                        <div className="actions-box">
                            <p><a href="">Sửa profile</a></p>
                            <p><a href="">Đổi mật khẩu</a></p>
                            <p><a href="controllers/LogOut.php">Đăng xuất</a></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;