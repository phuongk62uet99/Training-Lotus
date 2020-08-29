import React, { Component } from "React";
import ReactDOM from "React-dom";
import Topbar from "./Topbar";
import ListAccount from "./ListAccount";

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        var { onOpenFormCreateAdd, taskAccounts, onOpenDialogPass, onCheckAll, onCheckList, checkedAll, onChange,
            pageIndex, onClickRight, onClickLeft, onClickPagination, onKeyPress, onSearchAccountName, deletingTaskAccounts,
            onSubmitAccount, statusSlect, perPage, TotalRow, createAccount, lockAccount, editAccount, permissionAcount
        } = this.props;
        var classIms = (false) ? "list-account" : "list-account-edit";
        var classScroll = (createAccount) ? "scroll-list" : "scroll-list-edit";
         var listAccount = taskAccounts.map((taskAccount, index) => {
            return <ListAccount
                index={index}
                key={taskAccount.id}
                taskAccount={taskAccount}
                onOpenDialogPass={onOpenDialogPass}
                onOpenFormCreateAdd={onOpenFormCreateAdd}
                onCheckList={onCheckList}
                editAccount = {editAccount}
                lockAccount = {lockAccount}
                permissionAcount = {permissionAcount}
            />
        });
        return (
            <div style={{display: "flex",flexDirection: "column",height:"100%"}}>
                <Topbar
                    onOpenFormCreateAdd={onOpenFormCreateAdd}
                    onCheckAll={onCheckAll}
                    checkedAll={checkedAll}
                    onChange={onChange}
                    pageIndex={pageIndex}
                    onClickRight={onClickRight}
                    onClickLeft={onClickLeft}
                    onClickPagination={onClickPagination}
                    onKeyPress={onKeyPress}
                    taskAccounts={taskAccounts}
                    onSearchAccountName={onSearchAccountName}
                    deletingTaskAccounts={deletingTaskAccounts}
                    onSubmitAccount={onSubmitAccount}
                    statusSlect={statusSlect}
                    perPage = {perPage}
                    TotalRow = {TotalRow}
                    createAccount = {createAccount}
                    lockAccount = {lockAccount}
                    
                />
                <div className="ims-container-wrapper">
                    <div className="list-account">
                        <div className={classScroll}>
                            <div className="scroll-list-view">
                                <div className="table-account-wrapper">
                                    {listAccount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;