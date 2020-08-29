import React, { Component } from "React";
import ReactDOM from "React-dom";

class DialogOptionPermission extends Component {
    constructor(props) {
        super(props);
        this.refCreateAccount = React.createRef();
        this.refLockAccount = React.createRef();
        this.refUpdateAccount = React.createRef();
        this.refPermissAccount = React.createRef();
        this.state = {
        }
    }

    componentDidMount() {
        var { taskAccount } = this.props;
    }

    render() {
        var { idPermiss,  clickOnCreateAcc, clickOnLockAcc,
            clickOnUpdateAcc, clickOnPermissAcc, clickOffCreateAcc, clickOffLockAcc, clickOffUpdateAcc, clickOffPermissAcc,
            isOnCreateQs, isOnLockQs, isOnUpdateQs, isOnPermissQs, clickOnCreateQs, clickOnLockQs,
            clickOnUpdateQs, clickOnPermissQs, clickOffCreateQs, clickOffLockQs, clickOffUpdateQs, clickOffPermissQs,
            ArrayPermissionQAs, ArrayPermissionAccounts, taskAccount,permissions
        } = this.props;
        var classNameCreate = "jsx-flipswitch";
        var classNameLock = "jsx-flipswitch";
        var classNameUpdate = "jsx-flipswitch";
        var classNamePermiss = "jsx-flipswitch";

        var classNameCreateQs = "jsx-flipswitch";
        var classNameLockQs = "jsx-flipswitch";
        var classNameUpdateQs = "jsx-flipswitch";
        var classNamePermissQs = "jsx-flipswitch";

        var ArrayPermissionAccount = "";
        var ArrayPermissionQA = "";
        var isOnCreateAcc = (permissions.indexOf("1") != - 1) ? true : false;
        var isOnLockAcc = (permissions.indexOf("2") != - 1) ? true : false;
        var isOnUpdateAcc = (permissions.indexOf("3") != - 1) ? true : false;
        var isOnPermissAcc = (permissions.indexOf("4") != - 1) ? true : false;
        (isOnCreateAcc) ? classNameCreate += " on" : classNameCreate;
        (isOnLockAcc) ? classNameLock += " on" : classNameLock;
        (isOnUpdateAcc) ? classNameUpdate += " on" : classNameUpdate;
        (isOnPermissAcc) ? classNamePermiss += " on" : classNamePermiss;
        if (!isOnCreateAcc) {
            var onClickCreateAcc = clickOnCreateAcc;
        } else {
            onClickCreateAcc = clickOffCreateAcc;
        }
        if (!isOnLockAcc) {
            var onClickLockAcc = clickOnLockAcc;
        } else {
            var onClickLockAcc = clickOffLockAcc;
            ArrayPermissionAccount = ArrayPermissionAccount + "2";
        }
        if (!isOnUpdateAcc) {
            var onClickUpdateAcc = clickOnUpdateAcc;
        } else {
            onClickUpdateAcc = clickOffUpdateAcc;
            ArrayPermissionAccount = ArrayPermissionAccount + "3";
        }
        if (!isOnPermissAcc) {
            var onClickPermissAcc = clickOnPermissAcc;
        } else {
            onClickPermissAcc = clickOffPermissAcc;
            ArrayPermissionAccount = ArrayPermissionAccount + "4";
        }
        var isOnCreateQs = (permissions.indexOf("5") != - 1) ? true : false;
        var isOnLockQs = (permissions.indexOf("6") != - 1) ? true : false;
        var isOnUpdateQs = (permissions.indexOf("7") != - 1) ? true : false;
        (isOnCreateQs) ? classNameCreateQs += " on" : classNameCreateQs;
        (isOnLockQs) ? classNameLockQs += " on" : classNameLockQs;
        (isOnUpdateQs) ? classNameUpdateQs += " on" : classNameUpdateQs;

        if (!isOnCreateQs) {
            var onClickCreateQs = clickOnCreateQs;
        } else {
            onClickCreateQs = clickOffCreateQs;
            ArrayPermissionAccount = ArrayPermissionAccount + "5";
        }
        if (!isOnLockQs) {
            var onClickLockQs = clickOnLockQs;
        } else {
            var onClickLockQs = clickOffLockQs;
            ArrayPermissionAccount = ArrayPermissionAccount + "6";
        }
        if (!isOnUpdateQs) {
            var onClickUpdateQs = clickOnUpdateQs;
        } else {
            onClickUpdateQs = clickOffUpdateQs;
            ArrayPermissionAccount = ArrayPermissionAccount + "7";
        }
        
    
        for (var i = 0; i < ArrayPermissionQA.length; i++) {
            ArrayPermissionQAs.push(parseInt(ArrayPermissionQA.slice(i, i + 1)));
        }
        for (var i = 0; i < ArrayPermissionAccount.length; i++) {
            ArrayPermissionAccounts.push(parseInt(ArrayPermissionAccount.slice(i, i + 1)));
        }
        return (
            <div className="permissions">
                <div className="content">
                    <div className="col_left active">
                        <div className="title">
                            {(idPermiss === 1) ? "Quản lý tài khoản" : "Quản lý câu hỏi"}
                        </div>
                        <div className="scroll-wrapper">
                            <div className="scroll-wrapper-view">
                                <div className="content2">
                                    <div className="list">
                                        <div className="col_name">
                                            {(idPermiss == 1) ? "Tạo user" : "Tạo câu hỏi"}
                                        </div>
                                        <div className={(idPermiss == 1) ? classNameCreate : classNameCreateQs} onClick={(idPermiss == 1) ? onClickCreateAcc : onClickCreateQs}>
                                            <i></i>
                                            <input ref={this.refCreateAccount} type="checkbox" name="createAccount" className="display-none" value="off" />
                                        </div>
                                    </div>
                                    <div className="list">
                                        <div className="col_name">
                                            {(idPermiss === 1) ? "Khóa user" : "Xóa câu hỏi"}
                                        </div>
                                        <div className={(idPermiss == 1) ? classNameLock : classNameLockQs} onClick={(idPermiss == 1) ? onClickLockAcc : onClickLockQs}>
                                            <i></i>
                                            <input ref={this.refLockAccount} type="checkbox" name="lockAccount" className="display-none" value="off" />
                                        </div>
                                    </div>
                                    <div className="list">
                                        <div className="col_name">
                                            {(idPermiss === 1) ? "Sửa user" : "Sửa câu hỏi"}
                                        </div>
                                        <div className={(idPermiss == 1) ? classNameUpdate : classNameUpdateQs} onClick={(idPermiss == 1) ? onClickUpdateAcc : onClickUpdateQs}>
                                            <i></i>
                                            <input ref={this.refUpdateAccount} type="checkbox" name="updateAccount" className="display-none" value="off" />
                                        </div>
                                    </div>
                                    {(idPermiss === 1) ?
                                        <div className="list">
                                            <div className="col_name">Phân quyền</div>
                                            <div className={(idPermiss == 1) ? classNamePermiss : ""} onClick={(idPermiss == 1) ? onClickPermissAcc : ""}>
                                                <i></i>
                                                <input ref={this.refPermissAccount} type="checkbox" name="permissAccount" className="display-none" value="off" />
                                            </div>
                                        </div>
                                        : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DialogOptionPermission