import React, { Component } from "React";
import ReactDOM from "React-dom";
// import DialogEditRight from "./DialogEditRight";
import DialogOptionPermission from "./DialogOptionPermission";
import { AccountContext } from "../../../common/AccountContext";
import FetchHelper from '../../../common/fetch-helper';

class FormCreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dowup: false,
            taskAccount: '',
            dialogPermission: false,
            isCloseEditDetail: false,
            idPermiss: null,
            isOnCreateAcc: false,
            isOnLockAcc: false,
            isOnUpdateAcc: false,
            isOnPermissAcc: false,
            isOnCreateQs: false,
            isOnLockQs: false,
            isOnUpdateQs: false,
            isOnPermissQs: false,
            permissionsNew: '',
            isFormEditProfile: false,
        }
    }

    componentWillMount() {
        var self = this;
        FetchHelper.fetchData({
            url: 'controllers/GetSession.php',
        }).then((jsonData) => {
            self.setState({
                permissionsNew: jsonData.permission,
                isFormEditProfile: true,
                isCloseEditDetail: false,
                dialogPermission: false,
            })
        }, err => {
            console.log(err || "Xảy ra lỗi trong quá trình xử lý")
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.taskAccount != this.state.taskAccount) {
            if (nextProps.taskAccount != null) {
                var taskAccount = JSON.parse(nextProps.taskAccount.permissions);
                var permission = "";
                taskAccount.map(function(item)  {
                    permission = permission + item.id;
                })
                this.setState({
                    taskAccount: permission,
                })
            }
        }
    }
    onClickDialogPermissAccount = (permissions) => {
        this.setState({
            isCloseEditDetail: true,
            dialogPermission: true,
            idPermiss: 1,
            permissionsNew: permissions,
            isFormEditProfile: false,
        })
    }
    onClickDialogPermissQuestion = (permissions) => {
        this.setState({
            isCloseEditDetail: true,
            dialogPermission: true,
            idPermiss: 2,
            permissionsNew: permissions,
            isFormEditProfile: false,
        })
    }
    onClickCloseDialogPermiss = () => {
        this.setState({
            isCloseEditDetail: false,
            dialogPermission: false,
        })
    }
    clickOnCreateAcc = (e, permissions) => {
        var permissionsNew = permissions + "1";
        this.setState({
            isOnCreateAcc: true,
            taskAccount: permissionsNew,
        })
    }
    clickOnLockAcc = (e, permissions) => {
        var permissionsNew = permissions + "2";
        this.setState({
            isOnLockAcc: true,
            taskAccount: permissionsNew,
        })
    }
    clickOnUpdateAcc = (e, permissions) => {
        var permissionsNew = permissions + "3";
        this.setState({
            isOnUpdateAcc: true,
            taskAccount: permissionsNew,
        })
    }
    clickOnPermissAcc = (e, permissions) => {
        var permissionsNew = permissions + "4";
        this.setState({
            isOnPermissAcc: true,
            taskAccount: permissionsNew,
        })
    }
    clickOffCreateAcc = (e, permissions) => {
        var permissionsNew = permissions.replace("1", "");
        this.setState({
            isOnCreateAcc: false,
            taskAccount: permissionsNew,
        })
    }
    clickOffLockAcc = (e, permissions) => {
        var permissionsNew = permissions.replace("2", "");
        this.setState({
            isOnLockAcc: false,
            taskAccount: permissionsNew,
        })
    }
    clickOffUpdateAcc = (e, permissions) => {

        var permissionsNew = permissions.replace("3", "");
        this.setState({
            isOnUpdateAcc: false,
            taskAccount: permissionsNew,
        })

    }
    clickOffPermissAcc = (e, permissions) => {
        var permissionsNew = permissions.replace("4", "");
        this.setState({
            isOnPermissAcc: false,
            taskAccount: permissionsNew,
        })
    }
    clickOnCreateQs = (e, permissions) => {
        var permissionsNew = permissions + "5";
        this.setState({
            isOnCreateQs: true,
            taskAccount: permissionsNew,
        })
    }
    clickOnLockQs = (e, permissions) => {
        var permissionsNew = permissions + "6";
        this.setState({
            isOnLockQs: true,
            taskAccount: permissionsNew,
        })
    }
    clickOnUpdateQs = (e, permissions) => {
        var permissionsNew = permissions + "7";
        this.setState({
            isOnUpdateQs: true,
            taskAccount: permissionsNew,
        })
    }

    clickOffCreateQs = (e, permissions) => {
        var permissionsNew = permissions.replace("5", "");
        this.setState({
            isOnCreateQs: false,
            taskAccount: permissionsNew,
        })
    }
    clickOffLockQs = (e, permissions) => {
        var permissionsNew = permissions.replace("6", "");
        this.setState({
            isOnLockQs: false,
            taskAccount: permissionsNew,
        })
    }
    clickOffUpdateQs = (e, permissions) => {
        var permissionsNew = permissions.replace("7", "");
        this.setState({
            isOnUpdateQs: false,
            taskAccount: permissionsNew,
        })
    }

    onClickMenu = () => {
        var { dowup } = this.state;
        this.setState({
            dowup: !dowup,
        })
    }


    render() {
        var { dowup, dialogPermission, isCloseEditDetail, idPermiss, isOnCreateAcc, isOnLockAcc, isOnUpdateAcc, isOnPermissAcc,
            isOnCreateQs, isOnLockQs, isOnUpdateQs, isOnPermissQs, permissionsNew, taskAccount, isFormEditProfile
        } = this.state;
        var { isOpenFormCreateAccount, onCloseDialogConfirm, isStatusForm, isOpenFormEdit, post, handleSubmit,
            onChange, username, fullname, email, address, phone, password, onEditAccount, usernameError,
            fullnameError, emailError, passwordError, isCheckValid, isAddClass, permissionAcount, createAccount, lockAccount,
            editAccount, permissionAcount, creactQA, deleteQA, editQA,
        } = this.props;
        var { Account } = this.context;
        var permissions =  taskAccount;
        var checkAccount = null, checkQA = null;
        if ((permissions.indexOf("1") != -1) || (permissions.indexOf("2") != -1) || (permissions.indexOf("3") != -1) || (permissions.indexOf("3") != -1)) {
            checkAccount =
                <div className="indicator">
                    <div className="checked"></div>
                </div>
        }
        if ((permissions.indexOf("5") != -1) || (permissions.indexOf("6") != -1) || (permissions.indexOf("7") != -1)) {
            checkQA =
                <div className="indicator">
                    <div className="checked"></div>
                </div>
        }
        var ArrayPermissionQAs = [];
        var ArrayPermissionAccounts = [];
        var icon = (!dowup) ? <i className="fi fi-sort-down down-up" aria-hidden="true"></i> : <i className="fi fi-sort-up down-up dow-up-up" aria-hidden="true"></i>
        var className = "dialog-content";
        (isAddClass) ? className += " show" : "";
        var dialog =
            <div className="Container-form-questions">
                <div className="overlay"></div>
                <div className={className}>
                    <span className="close-account" onClick={onCloseDialogConfirm}>Đóng</span>
                    <div className="top-edit">
                        {
                            (isStatusForm === true) ?
                                <div className="content-right">
                                    <div className="edit-detail">
                                        <i className="icon_edit" />
                                        <div className="edit-avatar-info" style={{ background: 'url("http://demoims2.cnnd.vn/Statics/images/avatar.png") center center / cover no-repeat white' }}>
                                        </div>
                                        <div className="content-edit">
                                            <div className="row_username" >
                                                <span className="ims-input">
                                                    <input value={username} name="username" onChange={onChange} type="text" placeholder="Nhập tên tài khoản" aria-autocomplete="off"></ input>
                                                </span>
                                                <div className="username-bottom-border" ></div>
                                            </div>
                                            <div className="error"> {usernameError} </div>
                                            <div className="edit-info-item">
                                                <div className="edit-info-item-left">Họ tên</div>
                                                <div className="right">:<span className="ims-input"><input value={fullname} name="fullname" onChange={onChange} type="text" /></span></div>
                                            </div>
                                            <div className="error"> {fullnameError} </div>
                                            <div className="edit-info-item">
                                                <div className="edit-info-item-left">Email</div>
                                                <div className="right">:<span className="ims-input"><input value={email} name="email" onChange={onChange} type="text" /></span></div>
                                            </div>
                                            <div className="error"> {emailError} </div>
                                            <div className="edit-info-item">
                                                <div className="edit-info-item-left">Mật khẩu</div>
                                                <div className="right">:<span className="ims-input"><input value={password} name="password" onChange={onChange} type="password" /></span></div>
                                            </div>
                                            <div className="error"> {passwordError} </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="top-edit-content">
                                    {/* Ben trai */}
                                    <div className="dialog-left ">
                                        <div className="scrollbar-account" id="my-style">
                                            <div className="content-left">
                                                <div className="title-left">Thông tin tài khoản</div>
                                                <div className="content-info">
                                                    {
                                                        (dialogPermission) ?
                                                            <i onClick={this.onClickCloseDialogPermiss} className="icon_edit" data-tooltip="Chỉnh sửa thông tin"></i>
                                                            : null
                                                    }
                                                    <div className="avatar-info" />
                                                    <div className="info-username">{Account.username}</div>
                                                    <span>{Account.fullname}</span>
                                                </div>
                                                <div className="permission-groups">
                                                    <div className="groups-title">Danh sách quyền</div>
                                                    <div className="groups-body">
                                                        <ul className="list-ds">
                                                            <li onClick={!permissionAcount ? null : () => this.onClickDialogPermissAccount(permissions)}>
                                                                <i className="fi fi-calendar" aria-hidden="true"></i>
                                                                <div className="name">Quản lý tài khoản</div>
                                                                {checkAccount}
                                                            </li>
                                                            <li onClick={!permissionAcount ? null : () => this.onClickDialogPermissQuestion(permissions)}>
                                                                <i className="fi fi-lock" aria-hidden="true"></i>
                                                                <div className="name">Quản lý câu hỏi</div>
                                                                {checkQA}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* BenPhai */}
                                    <div className="scrollbar-account-edit-right">
                                        {/* Moi vao isCloseEditDetail false dialogPermission : false */}
                                        {
                                            (isCloseEditDetail && dialogPermission) ? null :
                                                <div className="edit-detail" id="my-style">
                                                    <i className="icon_edit" />
                                                    <div className="edit-avatar-info" style={{ background: 'url("http://demoims2.cnnd.vn/Statics/images/avatar.png") center center / cover no-repeat white' }}>
                                                    </div>
                                                    <div className="edit-username">
                                                        {Account.username}
                                                    </div>
                                                    <div className="edit-info-item">
                                                        <div className="edit-info-item-left">Họ tên</div>
                                                        <div className="right">:<span className="ims-input"><input value={fullname} name="fullname" onChange={onChange} type="text" /></span></div>
                                                    </div>
                                                    <div className="edit-info-item">
                                                        <div className="edit-info-item-left">Email</div>
                                                        <div className="right">:<span className="ims-input"><input value={email} name="email" onChange={onChange} type="text" /></span></div>
                                                    </div>
                                                </div>
                                        }

                                        {
                                            (!dialogPermission && !isCloseEditDetail) ? null
                                                :
                                                <DialogOptionPermission
                                                    taskAccount={taskAccount}
                                                    idPermiss={idPermiss}
                                                    isOnCreateAcc={isOnCreateAcc}
                                                    isOnLockAcc={isOnLockAcc}
                                                    isOnUpdateAcc={isOnUpdateAcc}
                                                    isOnPermissAcc={isOnPermissAcc}

                                                    isOnCreateQs={isOnCreateQs}
                                                    isOnLockQs={isOnLockQs}
                                                    isOnUpdateQs={isOnUpdateQs}
                                                    isOnPermissQs={isOnPermissQs}

                                                    ArrayPermissionQAs={ArrayPermissionQAs}
                                                    ArrayPermissionAccounts={ArrayPermissionAccounts}
                                                    permissions={permissions}

                                                    clickOnCreateAcc={(e) => this.clickOnCreateAcc(e, permissions)}
                                                    clickOnLockAcc={(e) => this.clickOnLockAcc(e, permissions)}
                                                    clickOnUpdateAcc={(e) => this.clickOnUpdateAcc(e, permissions)}
                                                    clickOnPermissAcc={(e) => this.clickOnPermissAcc(e, permissions)}
                                                    clickOffCreateAcc={(e) => this.clickOffCreateAcc(e, permissions)}
                                                    clickOffLockAcc={(e) => this.clickOffLockAcc(e, permissions)}
                                                    clickOffUpdateAcc={(e) => this.clickOffUpdateAcc(e, permissions)}
                                                    clickOffPermissAcc={(e) => this.clickOffPermissAcc(e, permissions)}
                                                    clickOnCreateQs={(e) => this.clickOnCreateQs(e, permissions)}
                                                    clickOnLockQs={(e) => this.clickOnLockQs(e, permissions)}
                                                    clickOnUpdateQs={(e) => this.clickOnUpdateQs(e, permissions)}
                                                    clickOffCreateQs={(e) => this.clickOffCreateQs(e, permissions)}
                                                    clickOffLockQs={(e) => this.clickOffLockQs(e, permissions)}
                                                    clickOffUpdateQs={(e) => this.clickOffUpdateQs(e, permissions)}
                                                />
                                        }
                                    </div>
                                </div>
                        }
                    </div>

                    <div className="footer">
                        <div className="jsx-btn-3" onClick={onCloseDialogConfirm}>
                            <i className="fi fi-ban" aria-hidden="true"></i>
                            <span className="text-delete">Hủy</span>
                        </div>
                        {
                            (isStatusForm === true) ?
                                <div className="jsx-btn-3" onClick={handleSubmit}>
                                    <i className="fi fi-check" aria-hidden="true"></i>
                                    <span className="text-delete">Tạo tài khoản </span>
                                </div>
                                :
                                <div className="jsx-btn-3" onClick={(e) => onEditAccount(e, Account.id, permissions)}>
                                    <i className="fi fi-check" aria-hidden="true"></i>
                                    <span className="text-delete">Lưu thông tin </span>
                                </div>
                        }
                    </div>
                </div>
            </div>
        if (!isOpenFormCreateAccount) {
            dialog = null;
        }
        return (
            <div>
                {dialog}
            </div>
        );
    }
}

FormCreateAccount.contextType = AccountContext;
export default FormCreateAccount;