
import React, { Component } from "React";
import ReactDOM from "React-dom";
import Header from './Header';
import SideBar from './SideBar';
import TopBar from './TopBar';
import ListQA from './ListQA';
import App from '../../ListAccount/app';


class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowManage: false,
        };
    }

    onClickTabManage = () => {
        this.setState({
            isShowManage: true,
        });
    }

    render() {
        var { usernameAccount, onOpenFormCreateQuestion, formEdit, taskQAs, onOpenDialogDelete, onSubmitDelete, onClickPagination,
            onChange, pageIndex, onClickLeft, onClickRight, onKeyPress, isStatus, onSearch, deleteAll,
            questionNameChild, minPage, maxPage, onCheckAll, checkedAll, onCheckList, onOpenFormPreview,
            deletingTaskQA, taskQATrue, taskQAFalse, pageMaxFalse, pageMaxTrue, perPage, onOpenDialogRecovery, isStatusChecked,
            onChangeCheck, checkedList, isCheckDeleteAndDisplay, createAccount, lockAccount, editAccount, permissionAcount,
            creactQA, deleteQA, editQA, permissionPage
        } = this.props;
        var { isShowManage } = this.state;
        const list = taskQAs.map((taskQA, index) => {
            return <ListQA
                key={taskQA.id}
                taskQA={taskQA}
                onChangeCheck={onChangeCheck}
                formEdit={() => formEdit(taskQA)}
                onOpenFormCreateQuestion={() => onOpenFormCreateQuestion(taskQA)}
                onSubmitDelete={() => onSubmitDelete(taskQA)}
                onOpenDialogDelete={() => onOpenDialogDelete(taskQA)}
                onOpenFormPreview={() => onOpenFormPreview(taskQA)}
                onOpenDialogRecovery={() => onOpenDialogRecovery(taskQA)}
                onCheckList={onCheckList}
                isStatus={isStatus}
                checkedList={checkedList}
                isStatusChecked={isStatusChecked}
                deleteQA={deleteQA}
                editQA={editQA}
            />
        });
        const contentQA =
            <div className="content-list">
                <TopBar
                    onChange={onChange}
                    onClickPagination={onClickPagination}
                    onClickLeft={onClickLeft}
                    onClickRight={onClickRight}
                    onKeyPress={onKeyPress}
                    taskQAs={taskQAs}
                    pageIndex={pageIndex}
                    isStatus={isStatus}
                    onSearch={onSearch}
                    questionNameChild={questionNameChild}
                    minPage={minPage}
                    maxPage={maxPage}
                    onCheckAll={onCheckAll}
                    checkedAll={checkedAll}
                    deleteAll={deleteAll}
                    taskQATrue={taskQATrue}
                    taskQAFalse={taskQAFalse}
                    pageMaxFalse={pageMaxFalse}
                    pageMaxTrue={pageMaxTrue}
                    perPage={perPage}
                    deletingTaskQA={deletingTaskQA}
                    isCheckDeleteAndDisplay={isCheckDeleteAndDisplay}
                    deleteQA={deleteQA}
                />
                <div className="list-container">
                    <div className="scroll-list">
                        <div className="scroll-list-view">
                            <div className="list">
                                <div className="list-group">
                                    <div className="list-item">
                                        {list}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        const contentAccount = <div className="test1">Trang tai khoan</div>
        const content = isShowManage ? null
            // <App
            //     createAccount={createAccount}
            //     lockAccount={lockAccount}
            //     editAccount={editAccount}
            //     permissionAcount={permissionAcount}
            // /> 
            : contentQA;

        return (
            <div className="Container">
                <Header
                    onOpenFormCreateQuestion={onOpenFormCreateQuestion}
                    usernameAccount={usernameAccount}
                    usernameAccount={usernameAccount}
                    onClickTabManage={this.onClickTabManage}
                    creactQA={creactQA}
                    permissionPage  = {permissionPage}
                />
                <div className="MainContent">
                    <SideBar />
                    <div className="content">
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;