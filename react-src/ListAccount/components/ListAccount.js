import React, { Component } from "React";
import ReactDOM from "React-dom";

class ListAccount extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var { onOpenDialogPass, onOpenFormCreateAdd, taskAccount, onCheckList, index, editAccount,
            permissionAcount, lockAccount
        } = this.props;
        var class_background = (index % 2 == 0) ? "account-item  background-true" : "account-item  background-false";
        if (taskAccount.status == 1) {
            status = "Đang hoạt động";
            var icon = <i className="status-icon active"></i>
            var stattusText = "status-text-true"
        } else {
            status = "Đã khóa";
            var icon = <i className="status-icon"></i>
            var stattusText = "status-text-false"
        }
        return (
            <div className="table-account">
                <div className={class_background}>
                    {
                        !lockAccount ? null :
                            <div className="checkbox-account-list">
                                <input onChange={(e) => onCheckList(taskAccount, e)} name="check"
                                    checked={taskAccount.statusCheckBox || false} type="checkbox" style={{ width: "25px" }} />
                            </div>
                    }

                    <div className="icon-avatart-list">
                        <div className="list-avatar-info" style={{
                            background:
                                'url("http://demoims2.cnnd.vn/Statics/images/avatar.png") center center / cover no-repeat white'
                        }}>
                        </div>
                        <div className="name-account">{taskAccount.username} </div>
                    </div>
                    <div className="user-name"> {taskAccount.fullname} </div>
                    <div className="gmail-account">{taskAccount.email}</div>
                    <div className="status-account">
                        {icon}
                        <p className={stattusText}>
                            {status}
                        </p>
                    </div>
                    <div className="icon-account">
                        {
                            editAccount ? <div className="icon-edit">
                                <i className="sprite-icon icon-pencil" onClick={() => onOpenFormCreateAdd("Edit", taskAccount)}>
                                </i>
                                <div className="title"><i className="fi fi-caret-up"></i><span>Chỉnh sửa</span></div>
                            </div> : ""
                        }

                        <div className="icon-lock">
                            <i className="sprite-icon icon-lock" onClick={() => onOpenDialogPass(taskAccount)} aria-hidden="true">
                            </i>
                            <div className="title"><i className="fi fi-caret-up"></i><span>Đổi mật khẩu</span></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListAccount;