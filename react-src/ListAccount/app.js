import React, { Component } from "React";
import ReactDOM from "React-dom";
import FormCreateAccount from "./components/common/FormCreateAccount";
import FetchHelper from '../common/fetch-helper';
import ListAccount from "./components/ListAccount";
import Topbar from "./components/Topbar";
import DialogPassWord from "./components/common/DialogPassWord";
import DialogLockOpenAccount from "./components/common/DialogLockOpenAccount";
import Content from "./components/Content";
import { AccountContext } from "../common/AccountContext";
// import { UserContext } from "../common/UserContext";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pageIndex: 1,
            perPage: 20,
            isStatus: 1,
            taskAccounts: [],
            taskAccount: [],
            isAddClass: false,
            isCheckValid: false,
            isOpenFormCreateAccount: false,
            isOpenForm: false,
            isOpenFormPass: false,
            isOpenFormEdit: false,
            isStatusForm: false,
            deletingTaskAccounts: [],
            statusTaskAccounts: [],
            checkedAll: false,
            id: null,
            passWord: '',
            statusLockOrOpen: false,
            countLock: 0,
            countOpen: 0,
            statusSelect: 1,
            TotalRow: 0,
            username: '',
            usernameError: '',
            fullname: '',
            fullnameError: '',
            email: '',
            emailError: '',
            address: '',
            phone: '',
            password: '',
            passwordError: '',
            permissions : '',
        }
    }
    componentDidMount() {
        var { pageIndex, perPage } = this.state;
        var self = this;
        FetchHelper.fetchData({
            url: 'controllers/account/GetDBAccount.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
        }).then((jsonData) => {
            self.setState({
                taskAccounts: jsonData.Data.Accounts,
                statusCheckBox: false,
                TotalRow: jsonData.Data.TotalRow,
            })
        }, err => {
            console.log(err || "Xảy ra lỗi trong quá trình xử lý")
        });
    }

    apiInsertTaskQA = (user, password, fullname, email, permissions, callback) => {
        var self = this;
        return FetchHelper.fetchData({
            url: 'controllers/account/InsertDBAccount.php',
            params: {
                user: user,
                password: password,
                fullname: fullname,
                email: email,
                permissions: permissions,
                avatar: 'avatar',
            }
        }).then((jsonData) => {
            if (typeof callback == "function") {
                callback(jsonData);
            }
        }, err => {
            if (typeof callback == "function") {
                callback(err)
            }
        });
    }

    apiSearchAccount(keyWord, pageIndex, perPage, callback) {
        var self = this;
        return FetchHelper.fetchData({
            url: 'controllers/account/SearchDBAccount.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
            params: {
                keyWord: keyWord,
            }
        }).then((jsonData) => {
            if (typeof callback == "function") {
                callback(jsonData);
            }
        }, err => {
            if (typeof callback == "function") {
                callback(err)
            }
        });
    }

    apiLockAccount(id, callback) {
        var self = this;
        return FetchHelper.fetchData({
            url: 'controllers/account/LockDBAccount.php',
            params: {
                id: id,
            }
        }).then((jsonData) => {
            if (typeof callback == "function") {
                callback(jsonData);
            }
        }, err => {
            if (typeof callback == "function") {
                callback(err)
            }
        });
    }
    // api Mở tài khoản
    apiOpenAccount(id, callback) {
        var self = this;
        return FetchHelper.fetchData({
            url: 'controllers/account/OpenDBAccount.php',
            params: {
                id: id,
            }
        }).then((jsonData) => {
            if (typeof callback == "function") {
                callback(jsonData);
            }
        }, err => {
            if (typeof callback == "function") {
                callback(err)
            }
        });
    }
    // xem lai
    apiUpdatePassWordAccount(id, password) {
        var self = this;
        return FetchHelper.fetchData({
            url: 'controllers/account/UpdatePasswordAccount.php',
            params: {
                id: id,
                passWord: password,
            }
        })
    }

    apiStatusTrueDBAccount = (pageIndex, perPage, callback) => {
        return FetchHelper.fetchData({
            url: 'controllers/account/GetStatusTrueDBAccount.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
            params: {
                pageIndex: pageIndex,
                perPage: perPage,
            }
        }).then((jsonData) => {
            if (typeof callback == "function") {
                callback(jsonData);
            }
        }, err => {
            if (typeof callback == "function") {
                callback(err)
            }
        });
    }

    apiStatusFalseDBAccount = (pageIndex, perPage, callback) => {
        return FetchHelper.fetchData({
            url: 'controllers/account/GetStatusFalseDBAccount.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
            params: {
                pageIndex: pageIndex,
                perPage: perPage,
            }
        }).then((jsonData) => {
            if (typeof callback == "function") {
                callback(jsonData);
            }
        }, err => {
            if (typeof callback == "function") {
                callback(err)
            }
        });
    }

    apiStatusDBAccount = (pageIndex, perPage, selectStatus, callback) => {
        return FetchHelper.fetchData({
            url: 'controllers/account/GetStatusDBAccount.php?pageIndex=' + pageIndex + '&perPage=' + perPage + '&selectStatus=' + selectStatus,
            params: {
                pageIndex: pageIndex,
                perPage: perPage,
                selectStatus: selectStatus,
            }
        }).then((jsonData) => {
            if (typeof callback == "function") {
                callback(jsonData);
            }
        }, err => {
            if (typeof callback == "function") {
                callback(err)
            }
        });
    }

    apiStatusAllDBAccount = (pageIndex, perPage) => {
        var self = this;
        FetchHelper.fetchData({
            url: 'controllers/account/GetDBAccount.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
        }).then((jsonData) => {
            self.setState({
                taskAccounts: jsonData.Data.Accounts,
                statusCheckBox: false,
            })
        }, err => {
            console.log(err || "Xảy ra lỗi trong quá trình xử lý")
        });
    }
    /// xem hàm này : kiểm tra load data
    apiUpdateData = (pageIndex, perPage) => {
        var self = this;
        return FetchHelper.fetchData({
            url: 'controllers/account/GetDBAccount.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
        }).then((jsonData) => {
            self.setState({
                taskAccounts: jsonData.Data.Accounts,
                statusCheckBox: false,
                TotalRow: jsonData.Data.TotalRow,
            })
        }, err => {
            console.log(err || "Xảy ra lỗi trong quá trình xử lý")
        });
    }

    apiUpdateDataDialog = (pageIndex, perPage) => {
        var self = this;
        return FetchHelper.fetchData({
            url: 'controllers/account/GetDBAccount.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
        }).then((jsonData) => {
            self.setState({
                taskAccounts: jsonData.Data.Accounts,
                statusCheckBox: false,
                deletingTaskAccounts: [],
                statusTaskAccounts: [],
            })
        }, err => {
            console.log(err || "Xảy ra lỗi trong quá trình xử lý")
        });
    }

    apiOnPagination = (pageIndex, perPage) => {
        var self = this;
        return FetchHelper.fetchData({
            url: 'controllers/account/GetDBAccount.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
        }).then((jsonData) => {
            self.setState({
                taskAccounts: jsonData.Data.Accounts,
                statusCheckBox: false,
                deletingTaskAccounts: [],
            })
        }, err => {
            console.log(err || "Xảy ra lỗi trong quá trình xử lý")
        });
    }

    apiSearchSelect = (pageIndex, perPage, selectStatus, keyWord, callback) => {
        return FetchHelper.fetchData({
            url: 'controllers/account/SearchSelect.php?pageIndex=' + pageIndex + '&perPage=' + perPage + '&selectStatus=' + selectStatus + '&keyWord=' + keyWord,
            params: {
                pageIndex: pageIndex,
                perPage: perPage,
                selectStatus: selectStatus,
                keyWord: keyWord,
            }
        }).then((jsonData) => {
            if (typeof callback == "function") {
                callback(jsonData);
            }
        }, err => {
            if (typeof callback == "function") {
                callback(err)
            }
        });
    }

    apiUpdateDBAccount = (fullname, email, permissions, id, callback) => {
        return FetchHelper.fetchData({
            url: 'controllers/account/UpdateDBAccount.php?',
            params: {
                fullname: fullname,
                email: email,
                permissions: permissions,
                id: id,
            }
        }).then((jsonData) => {
            if (typeof callback == "function") {
                callback(jsonData);
            }
        }, err => {
            if (typeof callback == "function") {
                callback(err)
            }
        });
    }

    onEditAccount = (event, id) => {
        event.preventDefault();
        var { fullname, email, pageIndex, perPage } = this.state;
        if (fullname !== '' && email !== '') {
            this.apiUpdateDBAccount(fullname, email, '1', id, function (Message, err) {

            })
            this.apiUpdateData(pageIndex, perPage);
        }
        this.setState({
            isOpenFormCreateAccount: false,
            fullname: '',
            email: '',
        })
    }
    isValidate = () => {
        var { username, fullname, email, password } = this.state;
        let usernameError = null, fullnameError = null, emailError = null, passwordError = null;
        if (!/^[A-Za-z0-9_\.]{6,32}$/.test(username)) {
            usernameError = "Tên tài khoản không hợp lệ ";
        } else {
            this.setState({
                usernameError: "",
            })
        } if (fullname.length < 2) {
            fullnameError = "Hãy bổ sung họ tên";
        } else {
            this.setState({
                fullnameError: "",
            })
        } if (!/^[A-Za-z0-9_.]{6,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$/.test(email)) {
            emailError = "Email không đúng";
        } else {
            this.setState({
                emailError: "",
            })
        } if (!/^([A-Z]){1}([\w_\.!@#$%^&*()]+){5,31}$/.test(password)) {
            passwordError = "Mật khẩu không hợp lệ";
        } else {
            this.setState({
                passwordError: "",
            })
        }
        if (usernameError != null || fullnameError != null || emailError != null || passwordError != null) {
            this.setState({
                usernameError: usernameError,
                fullnameError: fullnameError,
                emailError: emailError,
                passwordError: passwordError
            })
            return false;
        }
        return true;
    }
    // Hàm thêm mới tài khoản
    onHandleSubmit = (event) => {
        event.preventDefault();
        var self = this;
        var { pageIndex, perPage, username, fullname, email, address, phone, password } = this.state;
        var { usernameError, fullnameError, emailError, passwordError } = this.state;
        var validate = self.isValidate();
        this.setState({
            isCheckValid: validate
        })
        self.apiInsertTaskQA(username, password, fullname, email, '1', function (data, err) {
            if (data) {
                alert(data.Message);
            } else {
                alert(err);
            }
        })
        self.setState({
            isOpenFormCreateAccount: false,
            username: '',
            password: '',
            fullname: '',
            email: '',
            usernameError: '',
            fullnameError: '',
            emailError: '',
            passwordError: '',
        })

        self.apiUpdateData(pageIndex, perPage);
    }

    onSearchAccountName = (keyWord, selectStatus) => {
        var { pageIndex, perPage } = this.state;
        selectStatus = parseInt(selectStatus);
        var self = this;
        if ((selectStatus === -1 || selectStatus === 1 || selectStatus === 0) && keyWord) {
            self.apiSearchSelect(pageIndex, perPage, selectStatus, keyWord, function (data, err) {
                self.setState({
                    taskAccounts: data.Data.Accounts,
                    TotalRow: data.Data.TotalRow,
                    pageIndex: 1,
                })
            })
        } else {
            if ((selectStatus === -1 || selectStatus === 1 || selectStatus === 0) || keyWord) {
                if (keyWord) {
                    self.apiSearchAccount(keyWord, pageIndex, perPage, function (data, err) {
                        self.setState({
                            taskAccounts: data.Data.Accounts,
                            TotalRow: data.Data.TotalRow,
                            pageIndex: 1,
                        })
                    })
                }
                if ((selectStatus === 0 || selectStatus === -1 || selectStatus === 1)) {
                    self.apiStatusDBAccount(pageIndex, perPage, selectStatus, function (data, er) {
                        self.setState({
                            taskAccounts: data.Data.Accounts,
                            TotalRow: data.Data.TotalRow,
                            pageIndex: 1,
                        })
                    })
                }
            }
        }
    }

    onSubmitUpdatePassWordAccount = (taskAccount, pass) => {
        this.apiUpdatePassWordAccount(taskAccount.id, pass).then(res => {
        });
    }

    onSubmitAccount = (status) => {
        var self = this;
        var { taskAccounts, deletingTaskAccounts, statusTaskAccounts, isOpenForm, pageIndex, perPage
        } = this.state;
        this.setState({
            statusSelect: status,
            checkedAll: false
        })
        var lockAccounts = [];
        var idLock = [];
        var oPenAccounts = [];
        var idOpen = [];
        if (deletingTaskAccounts.length > 0) {
            self.setState({
                isOpenForm: true,
            })
            if (status == 1) {
                var taskAccountIdDelete = [];
                var taskAccountsDelete2 = taskAccounts.map((item, index) => {
                    if (item.statusCheckBox && item.status != 1) {
                        taskAccountIdDelete.push(item.id);
                    }
                })
                for (var i = 0; i < statusTaskAccounts.length; i++) {
                    if (statusTaskAccounts[i] == 0) {
                        oPenAccounts.push(i);
                    }
                }
                for (var i = 0; i < oPenAccounts.length; i++) {
                    idOpen.push(deletingTaskAccounts[oPenAccounts[i]])
                }
                if (idOpen.length > 0) {
                    for (var i = 0; i < idOpen.length; i++) {
                        self.apiOpenAccount(idOpen[i], function (data, err) {
                            if (data) {
                            }
                        })
                    }
                    self.setState({
                        countOpen: idOpen.length
                    })
                } else if (taskAccountIdDelete.length > 0) {
                    for (var i = 0; i < taskAccountIdDelete.length; i++) {
                        self.apiOpenAccount(taskAccountIdDelete[i], function (data, err) {
                            if (data) {
                            }
                        })
                    }
                    self.setState({
                        countOpen: taskAccountIdDelete.length
                    })
                }
            }
            else if (status == 0) {
                var taskAccountIdDelete1 = [];
                var taskAccountsDelete = taskAccounts.map((item, index) => {
                    if (item.statusCheckBox && item.status != 0) {
                        taskAccountIdDelete1.push(item.id);
                    }
                })
                for (var i = 0; i < statusTaskAccounts.length; i++) {
                    if (statusTaskAccounts[i] == 1) {
                        lockAccounts.push(i);
                    }
                }
                for (var i = 0; i < lockAccounts.length; i++) {
                    idLock.push(deletingTaskAccounts[lockAccounts[i]])
                }
                if (idLock.length > 0) {
                    for (var i = 0; i < idLock.length; i++) {
                        self.apiLockAccount(idLock[i], function (data, err) {
                            if (data) {
                            }
                        })
                    }
                    self.setState({
                        countLock: idLock.length,
                    })
                } else if (taskAccountIdDelete1.length > 0) {
                    for (var i = 0; i < taskAccountIdDelete1.length; i++) {
                        self.apiLockAccount(taskAccountIdDelete1[i], function (data, err) {
                            if (data) {
                            }
                        })
                    }
                    self.setState({
                        countLock: taskAccountIdDelete1.length
                    })
                }
            }
            self.apiUpdateData(pageIndex, perPage);
        }

    }
    onAddClassDiv() {
        setTimeout(() => { this.setState({ isAddClass: true }) }, 300);
    }
    onRemoveClassDiv() {
        this.setState({
            isAddClass: false,
        })
    }
    onOpenFormCreateAdd = (Name, taskAccount) => {
        var { isStatusForm } = this.state;
        if (Name === "Add") {
            this.setState({
                isOpenFormCreateAccount: true,
                isAddClass: false,
                isStatusForm: true,
                taskAccount: taskAccount,
            })
            setTimeout(() => {
                this.onAddClassDiv();
            }, 250);
        } else if (Name === "Edit") {
            this.setState({
                isOpenFormCreateAccount: true,
                isStatusForm: false,
                username: taskAccount.username,
                fullname: taskAccount.fullname,
                email: taskAccount.email,
                id: taskAccount.id,
                password: taskAccount.password,
                permissions : taskAccount.permissions,
                taskAccount: taskAccount,
                isAddClass: false,
            })
            setTimeout(() => {
                this.onAddClassDiv();
            }, 250);
        }
    }
    onCloseDialogConfirm = () => {
        this.onRemoveClassDiv();
        setTimeout(() => {
            this.setState({
                isOpenFormCreateAccount: false,
                isAddClass: false
            })
        }, 250);
    }

    onOpenDialogPass = (taskAccount) => {
        this.setState({
            isOpenFormPass: true,
            taskAccount: taskAccount,
        })
    }

    onOpenDialogResetOTP = () => {
        this.setState({
            isOpenForm: true,
        })
    }
    onCloseFormPass = () => {
    }
    onCloseForm = () => {
        this.setState({
            isOpenForm: false,
            isOpenFormPass: false,
            isOpenFormEdit: false,
        })
    }

    onCloseFormDialog = () => {
        var { pageIndex, perPage } = this.state;
        this.setState({
            isOpenForm: false,
            isOpenFormPass: false,
            isOpenFormEdit: false,
        })
        this.apiUpdateDataDialog(pageIndex, perPage);
    }

    onOpenDialogEdit = (Name) => {

    }

    onOpenFormEditAccount = () => {
        this.setState({
            isOpenForm: true,
        })
    }

    onCloseFormEdit = () => {
        this.setState({
            isOpenFormEdit: false,
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        // var { username, fullname, email, password } = this.state;
        // let usernameError = null, fullnameError = null, emailError = null, passwordError = null;
        // if (e.target.name === 'username') {
        //     if (!/^[A-Za-z0-9_\.]{6,32}$/.test(username)) {
        //         usernameError = "Tên tài khoản không hợp lệ ";
        //     } else {
        //         this.setState({
        //             usernameError: "",
        //         })
        //     }
        // } else if (e.target.name === 'fullname') {
        //     if (fullname.length < 2) {
        //         fullnameError = "Hãy bổ sung họ tên";
        //     } else {
        //         this.setState({
        //             fullnameError: "",
        //         })
        //     }
        // } else if (e.target.name === 'email') {
        //     if (!/^[A-Za-z0-9_.]{6,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$/.test(email)) {
        //         emailError = "Email không đúng";
        //     } else {
        //         this.setState({
        //             emailError: "",
        //         })
        //     }
        // } else if (e.target.name === 'password') {
        //     if (!/^([A-Z]){1}([\w_\.!@#$%^&*()]+){5,31}$/.test(password)) {
        //         passwordError = "Mật khẩu không hợp lệ";
        //     } else {
        //         this.setState({
        //             passwordError: "",
        //         })
        //     }
        // }
        // if (usernameError != null || fullnameError != null || emailError != null || passwordError != null) {
        //     this.setState({
        //         usernameError: usernameError,
        //         fullnameError: fullnameError,
        //         emailError: emailError,
        //         passwordError: passwordError
        //     })
        // }
    }

    onClickPagination(e, pageIndex) {
        this.setState({
            pageIndex: pageIndex,
        })
    }

    onCheckList = (taskAccount, e) => {
        var id = taskAccount.id;
        var { taskAccounts, deletingTaskAccounts, statusTaskAccounts } = this.state;
        if (taskAccounts && taskAccounts.length > 0) {
            var listAccounts = taskAccounts.map((item, index) => {
                if (item.id === id) {
                    item.statusCheckBox = !item.statusCheckBox;
                }
                if (item.statusCheckBox) {
                    var check = this.findIndex(deletingTaskAccounts, item.id);
                    if (check === -1) {
                        deletingTaskAccounts.push(item.id);
                        statusTaskAccounts.push(taskAccount.status);
                    }
                } else if (!item.statusCheckBox) {
                    var checkDelete = this.findIndex(deletingTaskAccounts, item.id);
                    if (checkDelete !== -1) {
                        deletingTaskAccounts.splice(checkDelete, 1);
                        statusTaskAccounts.splice(checkDelete, 1);
                    }
                }
                return item;
            })
            this.setState({
                taskAccounts: listAccounts,
                deletingTaskAccounts: deletingTaskAccounts,
                statusTaskAccounts: statusTaskAccounts,
            })
            if (deletingTaskAccounts.length === taskAccounts.length) {
                this.setState({
                    checkedAll: true,
                })
            } else {
                this.setState({
                    checkedAll: false,
                })
            }
        }
    }

    onCheckAll = (e) => {
        var { taskAccounts, deletingTaskAccounts, perPage, checkedAll, statusTaskAccounts } = this.state;
        if (taskAccounts && taskAccounts.length > 0) {
            var listAccounts = taskAccounts.map((item, index) => {
                item.statusCheckBox = e.target.checked;
                if (item.statusCheckBox) {
                    var check = this.findIndex(deletingTaskAccounts, item.id);
                    if (check === -1) {
                        deletingTaskAccounts.push(item.id);
                    }
                } else if (!item.statusCheckBox) {
                    var checkDelete = this.findIndex(deletingTaskAccounts, item.id);
                    if (check !== -1) {
                        deletingTaskAccounts.splice(checkDelete, 1);
                    }
                }
                return item;
            })
            this.setState({
                taskAccounts: listAccounts,
                deletingTaskAccounts: deletingTaskAccounts,
                checkedAll: true,
            })
            if (deletingTaskAccounts.length === taskAccounts.length) {
                this.setState({
                    checkedAll: true,
                })
            } else if (deletingTaskAccounts.length !== taskAccounts.length) {
                this.setState({
                    checkedAll: false,
                })
            }

        }
    }

    onClickRight = (isAccount) => {
        var { pageIndex, perPage, TotalRow } = this.state;
        this.setState({
            pageIndex: pageIndex + 1
        })
        pageIndex = parseInt(pageIndex);
        var pageMax = Math.ceil(TotalRow / perPage);
        if (pageIndex < pageMax) {
            pageIndex = parseInt(pageIndex);
            this.setState({
                pageIndex: pageIndex + 1
            })
            this.apiOnPagination(pageIndex + 1, perPage);
        } else {
            this.setState({
                pageIndex: pageMax
            })
        }
    }

    onClickLeft = (isAccount) => {
        var { pageIndex, perPage } = this.state;
        if (pageIndex > 1) {
            var pageIndexnew = parseInt(pageIndex - 1);
            this.setState({
                pageIndex: pageIndexnew
            })
            this.apiOnPagination(pageIndex - 1, perPage);
        }
    }

    onKeyPress = (e) => {
        var { pageIndex, perPage, TotalRow } = this.state;
        var pageMax = Math.ceil(TotalRow / perPage);
        if (e.charCode == 13) {
            if (pageIndex <= pageMax && pageIndex > 0) {
                this.setState({
                    pageIndex: pageIndex
                })
                this.apiOnPagination(pageIndex, perPage);
            } else if (pageIndex > pageMax) {
                this.setState({
                    pageIndex: pageMax
                })
                this.apiOnPagination(pageMax, perPage);
            } else if (pageIndex < 1) {
                this.setState({
                    pageIndex: 1
                })
                this.apiOnPagination(1, perPage);
            }
        }
    }

    findIndex = (arr, index) => {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === index) {
                return i;
            }
        }
        return -1;
    }

    findAbs = (arr, j) => {
        for (var i = 0; i < arr.length; i++) {
            if (i === j) {
                return arr[i];
            }
        }
        return -1;
    }

    render() {
        var self = this;
        var { isOpenFormCreateAccount, isOpenForm, isOpenFormEdit, isOpenFormPass, taskAccounts, deletingTaskAccounts,
            isStatusForm, checkedAll, taskAccount, pageIndex, statusTaskAccounts, statusLockOrOpen, countLock, countOpen
            , statusSelect, perPage, TotalRow, username, fullname, email, address, phone, password, usernameError,
            fullnameError, emailError, passwordError, isCheckValid
        } = this.state;
        var { createAccount, lockAccount, editAccount, permissionAcount } = this.props;
        return (
            <AccountContext.Provider
                value={{
                    Account: {
                        id: self.state.id,
                        fullname: self.state.fullname,
                        email: self.state.email,
                        password: self.state.password,
                        username: self.state.username,
                        permissions : self.state.permissions,
                    }
                }}
            >

                <div className="lisAccount" style={{ width: "100%" }}>
                    <DialogPassWord
                        onCloseForm={this.onCloseForm}
                        onSubmitUpdatePassWordAccount={this.onSubmitUpdatePassWordAccount}
                        onChange={this.onChange}

                        isOpenFormPass={isOpenFormPass}
                        taskAccount={taskAccount}
                    />
                    <DialogLockOpenAccount
                        onCloseFormDialog={this.onCloseFormDialog}
                        isOpenForm={isOpenForm}
                        deletingTaskAccounts={deletingTaskAccounts}
                        statusLockOrOpen={statusLockOrOpen}
                        countLock={countLock}
                        countOpen={countOpen}
                        statusSelect={statusSelect}
                    />
                    <FormCreateAccount
                        onCloseDialogConfirm={this.onCloseDialogConfirm}
                        onCloseFormEdit={this.onCloseFormEdit}
                        handleSubmit={this.onHandleSubmit}
                        onChange={this.onChange}
                        onEditAccount={this.onEditAccount}

                        isCheckValid={isCheckValid}
                        isOpenFormEdit={isOpenFormEdit}
                        isOpenFormCreateAccount={isOpenFormCreateAccount}
                        taskAccount={taskAccount}
                        isStatusForm={isStatusForm}
                        // username,fullname, email, address, phone, password
                        username={username}
                        fullname={fullname}
                        email={email}
                        address={address}
                        password={password}
                        usernameError={usernameError}
                        fullnameError={fullnameError}
                        emailError={emailError}
                        passwordError={passwordError}

                        isAddClass={this.state.isAddClass}
                    />
                    <Content
                        onOpenFormCreateAdd={this.onOpenFormCreateAdd}
                        onOpenDialogEdit={this.onOpenDialogEdit}
                        onOpenDialogPass={this.onOpenDialogPass}
                        onCheckAll={this.onCheckAll}
                        onCheckList={this.onCheckList}
                        onChange={this.onChange}
                        onClickRight={this.onClickRight}
                        onClickLeft={this.onClickLeft}
                        onClickPagination={this.onClickPagination}
                        onKeyPress={this.onKeyPress}
                        onSearchAccountName={this.onSearchAccountName}
                        onSubmitAccount={this.onSubmitAccount}

                        pageIndex={pageIndex}
                        taskAccounts={taskAccounts}
                        checkedAll={checkedAll}
                        deletingTaskAccounts={deletingTaskAccounts}
                        statusSelect={statusSelect}
                        perPage={perPage}
                        TotalRow={TotalRow}
                        createAccount={createAccount}
                        lockAccount={lockAccount}
                        editAccount={editAccount}
                        permissionAcount={permissionAcount}
                    />
                </div>
            </AccountContext.Provider>
        );
    }
}


export default App;