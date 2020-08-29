import React, { Component } from "React";
import ReactDOM from "React-dom";
import Content from "./components/Content";
import FormCreateQuestion from "./components/FormCreateQuestion";
import DialogDeleteQuestion from "./components/common/DialogDeleteQuestion";
import FormPreview from "./components/FormPreview";
import Loader from './components/common/Loader';
import DialogNoti from './components/common/DialogNoti';
import DialogRecoveryQuestion from "./components/common/DialogRecoveryQuestion";
import { UserContext } from "../common/UserContext";
import FetchHelper from '../common/fetch-helper';
import { LoadJs } from "../common/LoadJs";
import { LoadCss } from "../common/LoadCss";
import fetchHelper from "../common/fetch-helper";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameAccount: '',
            isAddClassDiv: false,
            isAddClassDivNoti: false,
            isOpenFormCreateQuestion: false,
            isOpenFormQSPR: false,
            isOpenFormPreview: false,
            isDialog: false,
            isChecked: false,
            isLoading: false,
            isStatusSearch: false,
            isStatusDelete: false,
            isStatus: 1,
            isStatusChecked: 1,

            isNoti: false,
            contentNoti: '',
            backgroundNoti: 1,

            taskQAs: [],
            editingTaskQA: {},
            deletingTaskQA: [],
            checkedAll: false,
            id: null,
            question_id: '',
            question: '',
            answer: '',
            questionError: '',
            answerError: '',
            questionNameChild: '',
            TotalRow: '',
            pageIndex: 1,
            perPage: 4,
            minPage: false,
            maxPage: true,
            taskQATrue: 1,
            taskQAFalse: 1,
            pageMaxTrue: 1,
            pageMaxFalse: 1,
            isDialogRecovery: false,
            isCheckDeleteAndDisplay: 1,
            checkedList: false,
            permission: '',
            createAccount: false,
            lockAccount: false,
            editAccount: false,
            permissionAcount: false,
            creactQA: false,
            deleteQA: false,
            editQA: false,
            permissionPage  : true
            
        }

        this.onOpenFormCreateQuestion = this.onOpenFormCreateQuestion.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onOpenDialogDelete = this.onOpenDialogDelete.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onClickPagination = this.onClickPagination.bind(this);
        this.onClickLeft = this.onClickLeft.bind(this);
        this.onClickRight = this.onClickRight.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.onOpenformQSPR = this.onOpenformQSPR.bind(this);
        this.onCloseFormQSPR = this.onCloseFormQSPR.bind(this);
        this.onChangeQSPR = this.onChangeQSPR.bind(this);

        this.onSubmitAdd = this.onSubmitAdd.bind(this);
        this.onSubmitUpdate = this.onSubmitUpdate.bind(this);
        this.onSubmitDelete = this.onSubmitDelete.bind(this);
    }

    componentWillMount() {
        LoadCss('public/css/question.css');
        LoadCss('public/css/formCreateQuestion.css');
        LoadCss('public/css/loader.css');
        LoadCss('public/css/dialog.css');
        LoadCss('public/css/noti.css');

        var srcEditor = EDITOR_CONFIG_PATH;
        setTimeout(() => {
            LoadJs(srcEditor);
        }, 300);

        var self = this;
        FetchHelper.fetchData({
            url: 'controllers/GetSession.php',
        }).then((jsonData) => {
            var permissionNew = jsonData.permission;
            var permissionNew = JSON.parse(permissionNew);
            var permission = "";
            permissionNew.map((item, index) => {
                permission = permission + item.id;
            })
            var createAccount = (permission.indexOf("1") !== - 1) ? true : false;
            var lockAccount = (permission.indexOf("2") !== - 1) ? true : false;
            var editAccount = (permission.indexOf("3") !== - 1) ? true : false;
            var permissionAcount = (permission.indexOf("4") !== - 1) ? true : false;
            var creactQA = (permission.indexOf("5") !== - 1) ? true : false;
            var deleteQA = (permission.indexOf("6") !== - 1) ? true : false;
            var editQA = (permission.indexOf("7") !== - 1) ? true : false;
            var permissionPage = true;
            if (!creactQA && !deleteQA && !editQA) {
                permissionPage = false;
            }
            if (!permissionPage) {
                window.location.href = 'account.php';
            }
            self.setState({
                usernameAccount: jsonData.username,
                permission: permission,
                createAccount: createAccount,
                lockAccount: lockAccount,
                editAccount: editAccount,
                permissionAcount: permissionAcount,
                creactQA: creactQA,
                deleteQA: deleteQA,
                editQA: editQA,
            })
        }, err => {
            console.log(err || "Xảy ra lỗi trong quá trình xử lý")
        });

    }
    componentDidMount() {
        var self = this;
        var { pageIndex, perPage } = self.state;

        FetchHelper.fetchData({
            url: 'controllers/question/GetDBQuestion.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
        }).then((jsonData) => {
            var StatusTrue = parseInt(jsonData.Data.StatusTrue);
            var StatusFalse = parseInt(jsonData.Data.StatusFalse);
            var TotalRow = parseInt(jsonData.Data.TotalRow);
            self.setState({
                taskQAs: jsonData.Data.Questions,
                taskQATrue: StatusTrue,
                taskQAFalse: StatusFalse,
                pageMaxTrue: Math.ceil(StatusTrue / perPage),
                pageMaxFalse: Math.ceil(StatusFalse / perPage),
                statusCheckBox: false
            })
        }, err => {
            console.log(err || "Xảy ra lỗi trong quá trình xử lý")
        });
    }
    apiGetDeletedQS() {
        var { pageIndex, perPage } = this.state;
        var self = this;
        FetchHelper.fetchData({
            url: 'controllers/question/GetDeletedDBQuestion.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
        }).then((jsonData) => {
            var StatusFalse = jsonData.Data.TotalRow;
            if (jsonData.Data.TotalRow <= perPage) {
                setTimeout(() => {
                    self.setState({
                        taskQAFalse: jsonData.Data.TotalRow,
                        pageMaxFalse: Math.ceil(jsonData.Data.TotalRow / perPage),
                        statusCheckBox: false,
                        taskQAs: jsonData.Data.Questions,
                        TotalRow: jsonData.Data.TotalRow,
                        maxPage: false,
                    })
                }, 250)
            } else {
                setTimeout(() => {
                    self.setState({
                        taskQAFalse: jsonData.Data.TotalRow,
                        pageMaxFalse: Math.ceil(jsonData.Data.TotalRow / perPage),
                        statusCheckBox: false,
                        taskQAs: jsonData.Data.Questions,
                        TotalRow: jsonData.Data.TotalRow,
                        maxPage: false,
                    })
                }, 250)
            }

        }, err => {
            console.log(err || "Xảy ra lỗi trong quá trình xử lý")
        });
    }

    apiInsertTaskQA(question_id, question, answer, CreatedDate, usernameAccount, callback) {
        var self = this;
        var content = this.EditorComp.getContentData();
        FetchHelper.fetchData({
            url: 'controllers/question/InsertDBQuestion.php',
            params: {
                question_id: self.state.question_id,
                question: self.state.question,
                answer: content,
                CreatedDate,
                usernameAccount: self.state.usernameAccount,
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

    apiUpdateTaskQA(id, question_id, question, answer, CreatedDate, usernameAccount, callback) {
        var self = this;
        var content = this.EditorComp.getContentData();
        FetchHelper.fetchData({
            url: 'controllers/question/UpdateDBQuestion.php',
            params: {
                id: this.state.id,
                question_id: self.state.question_id,
                question: self.state.question,
                answer: content,
                CreatedDate,
                usernameAccount: self.state.usernameAccount
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
    apiDeleteTaskQA(id, CreatedDate, usernameAccount, callback) {

        var self = this;
        FetchHelper.fetchData({
            url: 'controllers/question/DeleteDBQuestion.php',
            params: {
                id: self.state.id,
                CreatedDate,
                usernameAccount: self.state.usernameAccount

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

    apiDeleteAllTaskQA(deleteTaskQA, CreatedDate, usernameAccount, callback) {
        var self = this;
        FetchHelper.fetchData({
            url: 'controllers/question/DeleteDBAllQuestion.php',
            params: {
                deleteTaskQA,
                CreatedDate,
                usernameAccount
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
    apiSearchTaskQA(questionNameChild, pageIndex, perPage, callback) {
        var self = this;
        var { isStatus } = this.state;
        FetchHelper.fetchData({
            url: 'controllers/question/SearchDBQuestion.php?pageIndex=' + pageIndex + '&perPage=' + perPage + '&status=' + isStatus,
            params: {
                questionNameChild: self.state.questionNameChild,
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
    apiOnPagination(pageIndex) {
        var { isStatus, perPage, perPage, TotalRow } = this.state;
        var self = this;
        var countPage = null;
        if (isStatus == 1) {
            countPage = Math.ceil(TotalRow / perPage);
            FetchHelper.fetchData({
                url: 'controllers/question/GetDBQuestion.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
            }).then((jsonData) => {
                if (pageIndex == countPage) {
                    setTimeout(() => {
                        self.setState({
                            maxPage: false,
                            taskQAs: jsonData.Data.Questions,
                        })
                    }, 250)
                } else {
                    setTimeout(() => {
                        self.setState({
                            taskQAs: jsonData.Data.Questions,
                        });
                    }, 250)
                }
            }, err => {
                console.log(err || "Xảy ra lỗi trong quá trình xử lý")
            });
        } else {
            countPage = Math.ceil(TotalRow / perPage);
            FetchHelper.fetchData({
                url: 'controllers/GetDeletedDBQuestion.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
            }).then((jsonData) => {
                if (pageIndex == countPage) {
                    setTimeout(() => {
                        self.setState({
                            maxPage: false,
                            taskQAs: jsonData.Data.Questions,
                        })
                    }, 250)
                } else {
                    setTimeout(() => {
                        self.setState({
                            taskQAs: jsonData.Data.Questions,
                        });
                    }, 250)
                }
            }, err => {
                console.log(err || "Xảy ra lỗi trong quá trình xử lý")
            });
        }
    }
    apiOnPaginationSearch(questionNameChild, pageIndex, perPage) {
        var { isStatus, perPage, perPage, TotalRow } = this.state;
        var countPage = Math.ceil(TotalRow / perPage);
        var self = this;
        FetchHelper.fetchData({
            url: 'controllers/question/SearchDBQuestion.php?pageIndex=' + pageIndex + '&perPage=' + perPage + '&status=' + isStatus,
            params: {
                questionNameChild: self.state.questionNameChild,
            }
        }).then((jsonData) => {
            if (pageIndex == countPage) {
                self.setState({
                    maxPage: false,
                    taskQAs: jsonData.Data.Questions,
                })
            } else {
                if (jsonData.Data.Questions.length == 0) {
                    self.setState({
                        taskQAs: jsonData.Data.Questions,
                        maxPage: false,
                        minPage: false,
                    })
                } else {
                    if (jsonData.Data.Questions.length < perPage) {
                        self.setState({
                            taskQAs: jsonData.Data.Questions,
                            maxPage: false,
                        })
                    } else {
                        self.setState({
                            taskQAs: jsonData.Data.Questions,
                            maxPage: true,
                        })
                    }
                }
            }
        }, err => {
            console.log(err || "Xảy ra lỗi trong quá trình xử lý")
        });
    }
    apiRecoveryTaskQA(id, callback) {
        var self = this;
        FetchHelper.fetchData({
            url: 'controllers/question/RecoveryDBQuestion.php',
            params: {
                id: self.state.id,
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

    setUpdateData(pageIndex, perPage) {
        var self = this;
        FetchHelper.fetchData({
            url: 'controllers/question/GetDBQuestion.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
        }).then((jsonData) => {
            var StatusTrue = parseInt(jsonData.Data.StatusTrue);
            var StatusFalse = parseInt(jsonData.Data.StatusFalse);
            setTimeout(() => {
                self.setState({
                    taskQAs: jsonData.Data.Questions,
                    taskQATrue: StatusTrue,
                    taskQAFalse: StatusFalse,
                    pageMaxTrue: Math.ceil(StatusTrue / perPage),
                    pageMaxFalse: Math.ceil(StatusFalse / perPage),
                    statusCheckBox: false
                })
            }, 250)
        }, err => {
            console.log(err || "Xảy ra lỗi trong quá trình xử lý")
        });
    }
    setUpdateDataDeleted(pageIndex, perPage) {
        var self = this;
        FetchHelper.fetchData({
            url: 'controllers/question/getDeletedDBQuestion.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
        }).then((jsonData) => {
            setTimeout(() => {
                self.setState({
                    taskQAs: jsonData.Data.Questions,
                    taskQAFalse: jsonData.Data.TotalRow,
                    pageMaxFalse: Math.ceil(jsonData.Data.TotalRow / perPage),
                })
            }, 250)
        }, err => {
            console.log(err || "Xảy ra lỗi trong quá trình xử lý")
        });
    }
    setLoading() {
        setTimeout(() => { this.setState({ isLoading: false }) }, 200);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    onChangeContentQuestion = () => {
        //this.EditorComp.getContentData();
    }
    onOpenDialogDelete(taskQA) {
        this.setState({
            id: taskQA.id,
            isDialog: true,
            isStatusDelete: true,
        })
    }

    onSearch(e) {
        e.preventDefault();
        var self = this;
        var { questionNameChild, pageIndex, perPage, isStatus } = this.state;
        if (questionNameChild == '') {
            self.setState({
                isStatusSearch: false,
                isLoading: true,
                minPage: false,
                maxPage: true,
                pageIndex: pageIndex - (pageIndex - 1)
            })
            if (isStatus == 1) {
                self.setUpdateData((pageIndex - (pageIndex - 1)), perPage);
                self.setState({
                    isStatusChecked: 1,
                    isCheckDeleteAndDisplay: 1,
                })
            } else {
                self.apiGetDeletedQS();
                self.setState({
                    isStatusChecked: 0,
                    isCheckDeleteAndDisplay: 0,
                })
            }
            self.setLoading();
        } else {
            self.setState({
                isStatusSearch: true,
                isLoading: true,
                pageIndex: pageIndex - (pageIndex - 1)
            })
            self.apiSearchTaskQA(questionNameChild, (pageIndex - (pageIndex - 1)), perPage, function (data, err) {
                if (data) {
                    if (data.Data.Questions.length == 0) {
                        setTimeout(() => {
                            self.setState({
                                taskQAFalse: data.Data.Questions.length,
                                taskQATrue: data.Data.Questions.length,
                                pageMaxTrue: Math.ceil(data.Data.Questions.length / perPage),
                                pageMaxFalse: Math.ceil(data.Data.Questions.length / perPage),
                                taskQAs: data.Data.Questions,
                                maxPage: false,
                                minPage: false,
                            })
                        }, 200)
                    } else {
                        if (data.Data.Questions.length < perPage) {
                            setTimeout(() => {
                                self.setState({
                                    taskQAFalse: data.Data.Questions.length,
                                    taskQATrue: data.Data.Questions.length,
                                    pageMaxTrue: Math.ceil(data.Data.Questions.length / perPage),
                                    pageMaxFalse: Math.ceil(data.Data.Questions.length / perPage),
                                    taskQAs: data.Data.Questions,
                                    maxPage: false,
                                    minPage: false,
                                })
                            }, 200)
                        } else {
                            setTimeout(() => {
                                self.setState({
                                    taskQAFalse: data.Data.Questions.length,
                                    taskQATrue: data.Data.Questions.length,
                                    pageMaxTrue: Math.ceil(data.Data.Questions.length / perPage),
                                    pageMaxFalse: Math.ceil(data.Data.Questions.length / perPage),
                                    taskQAs: data.Data.Questions,
                                    maxPage: false,
                                    minPage: false,
                                })
                            }, 200)
                        }
                    }

                    self.setLoading();
                } else {
                    alert(err || "Xảy ra lỗi trong quá trình xử lý");
                }
            });
        }
    }
    onClickPagination(e) {
        var { pageIndex } = this.state;
        this.setState({
            pageIndex: pageIndex
        })
    }
    onClickLeft() {
        var { pageIndex, perPage, isStatusSearch, questionNameChild } = this.state;
        if (pageIndex > 1) {
            this.setState({
                pageIndex: pageIndex - 1,
                maxPage: true,
                isLoading: true,
            })
            if (isStatusSearch) {
                this.apiOnPaginationSearch(questionNameChild, pageIndex - 1, perPage);
            } else {
                this.apiOnPagination(pageIndex - 1, perPage);
            }
            this.setLoading();
        }
        if (pageIndex == 2) {
            this.setState({
                minPage: false,
                maxPage: true,
            })
        }
    }
    onClickRight() {
        var { pageIndex, perPage, isStatusSearch, questionNameChild, isStatus, pageMaxTrue, pageMaxFalse } = this.state;
        var self = this;
        if (isStatus == 1) {
            if (pageIndex < pageMaxTrue) {
                pageIndex = parseInt(pageIndex);
                this.setState({
                    pageIndex: pageIndex + 1,
                    isLoading: true,
                })
                this.apiOnPaginationSearch(questionNameChild, pageIndex + 1, perPage);
            }
        } else if (isStatus == 0) {
            if (pageIndex < pageMaxFalse) {
                pageIndex = parseInt(pageIndex);
                this.setState({
                    pageIndex: pageIndex + 1,
                    isLoading: true
                })
                this.apiOnPaginationSearch(questionNameChild, pageIndex + 1, perPage);
            }
        }

        this.setLoading();

        //code nguyễn thành
        // var { pageIndex , perPage , isStatusSearch , questionNameChild , isStatus, pageMaxTrue, pageMaxFalse } = this.state;
        // this.setState({
        //     pageIndex: pageIndex + 1,
        //     minPage: true,
        //     isLoading: true,
        // })
        // if(isStatusSearch){
        //     this.apiOnPaginationSearch(questionNameChild , pageIndex + 1 , perPage);
        // }else{
        //     this.apiOnPagination(pageIndex + 1 , perPage);
        // }
        // this.setLoading();
    }
    handleKeyPress(e) {
        var { pageIndex, pageMaxTrue, pageMaxFalse, isStatus, perPage } = this.state;
        this.setState({
            pageIndex: pageIndex,
        })
        if (e.charCode == 13) {
            if (isStatus === 1) {
                if (pageIndex <= pageMaxTrue) {
                    this.apiOnPagination(pageIndex, perPage);
                    this.setState({
                        pageIndex: pageIndex,
                        isLoading: true,
                    })
                } else if ((pageIndex > pageMaxTrue)) {
                    this.apiOnPagination(pageMaxTrue, perPage);
                    this.setState({
                        pageIndex: pageMaxTrue,
                        isLoading: true,
                    })
                }
            }
            if (isStatus == 0) {
                if (pageIndex <= pageMaxFalse) {
                    this.apiOnPagination(pageIndex, perPage);
                    this.setState({
                        pageIndex: pageIndex,
                        isLoading: true,
                    })
                } else if ((pageIndex > pageMaxFalse)) {
                    this.apiOnPagination(pageMaxFalse, perPage);
                    this.setState({
                        pageIndex: pageMaxFalse,
                        isLoading: true,
                    })
                }
            }
        }
        this.setLoading();
    }
    // them moi 
    onOpenFormCreateQuestion(taskQA) {
        if (taskQA.id) {
            this.setState({
                isOpenFormCreateQuestion: true,
                isAddClassDiv: true,
                id: taskQA.id,
                question_id: taskQA.question_id,
                question: taskQA.question,
                answer: taskQA.answer,
                editingTaskQA: taskQA,
            });
        } else {
            this.setState({
                isOpenFormCreateQuestion: true,
                isAddClassDiv: true,
                id: null,
                question_id: '',
                question: '',
                answer: '',
            })
        }
        this.onAddClassDiv();
    }
    onOpenFormPreview = (taskQA) => {
        this.setState({
            isOpenFormPreview: true,
            isAddClassDiv: false,
            id: taskQA.id,
            question_id: taskQA.question_id,
            question: taskQA.question,
            answer: taskQA.answer,
            editingTaskQA: taskQA
        })
        this.onAddClassDiv();
    }
    closeForm() {
        var { isStatusDelete, isDialogRecovery } = this.state;
        this.onRemoveClassDiv();
        if (isStatusDelete || isDialogRecovery) {
            this.setState({
                isOpenFormCreateQuestion: false,
                isOpenFormPreview: false,
                isDialogRecovery: false,
                isDialog: false,
                isAddClassDiv: true,
                id: null,
                question_id: '',
                question: '',
                answer: '',
                questionError: '',
                answerError: '',
            })
        } else {
            setTimeout(() => {
                this.setState({
                    isOpenFormCreateQuestion: false,
                    isOpenFormPreview: false,
                    isDialogRecovery: false,
                    isDialog: false,
                    isAddClassDiv: true,
                    id: null,
                    question_id: '',
                    question: '',
                    answer: '',
                    questionError: '',
                    answerError: '',
                })
            }, 250)
        }

    }
    closeFormCreatePrevPreview = () => {
        this.onRemoveClassDiv();
        setTimeout(() => {
            this.setState({
                isOpenFormCreateQuestion: false,
                isOpenFormPreview: true,
                isDialog: false,
                isAddClassDiv: true,
            })
        }, 250)
    }
    onAddClassDiv() {
        setTimeout(() => { this.setState({ isAddClassDiv: true }) }, 300);
    }
    onRemoveClassDiv() {
        this.setState({
            isAddClassDiv: false,
        })
    }
    onOpenformQSPR() {
        this.setState({
            isOpenFormQSPR: true,
        })
    }
    deleteQuestionId = () => {
        this.setState({
            question_id: null,
        })
    }
    onCloseFormQSPR() {
        this.setState({
            isOpenFormQSPR: false,
        })
    }
    onNoti() {
        setTimeout(() => {
            this.setState({ isAddClassDivNoti: true })
        }, 300);
    }
    offNoti() {
        setTimeout(() => {
            this.setState({
                isAddClassDivNoti: false,
            })
        }, 2000);
        setTimeout(() => {
            this.setState({
                isNoti: false,
            })
        }, 2500)
    }
    onOpenDialogRecovery = (taskQA) => {
        this.setState({
            id: taskQA.id,
            isDialogRecovery: true,
        })
    }

    onChangeQSPR(id) {
        var { question_id } = this.state;
        question_id = id;
        this.setState({
            question_id: question_id,
        })
        this.onCloseFormQSPR();
    }
    findIndex = (arr, index) => {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === index) {
                return i;
            }
        }
        return -1;
    }
    onCheckAll = (checkName, e) => {
        var { taskQAs, deletingTaskQA, checkedAll } = this.state;
        if (taskQAs && taskQAs.length > 0) {
            var listTasks = taskQAs.map((item, index) => {
                item.statusCheckBox = e.target.checked;
                if (item.statusCheckBox) {
                    var check = this.findIndex(deletingTaskQA, item.id);
                    if (check === -1) {
                        deletingTaskQA.push(item.id);
                    }
                } else if (!item.statusCheckBox) {
                    var checkDelete = this.findIndex(deletingTaskQA, item.id);
                    if (checkDelete !== -1) {
                        deletingTaskQA.splice(checkDelete, 1);
                    }
                }
                return item
            });
            if (deletingTaskQA.length === taskQAs.length) {
                this.setState({
                    taskQAs: listTasks,
                    deletingTaskQA: deletingTaskQA,
                    checkedAll: !checkedAll,
                })
            } else if (deletingTaskQA.length !== taskQAs.length) {
                this.setState({
                    checkedAll: false,
                })
            }
        }
    }
    onCheckList = (id, e) => {
        var { taskQAs, deletingTaskQA } = this.state;
        if (taskQAs && taskQAs.length > 0) {
            var listTask = taskQAs.map((item, index) => {
                if (item.id === id) {
                    item.statusCheckBox = !item.statusCheckBox;
                }
                if (item.statusCheckBox) {
                    var check = this.findIndex(deletingTaskQA, item.id);
                    if (check === -1) {
                        deletingTaskQA.push(item.id);
                    }

                } else if (!item.statusCheckBox) {
                    var checkDelete = this.findIndex(deletingTaskQA, item.id);
                    if (checkDelete !== -1) {
                        deletingTaskQA.splice(checkDelete, 1);
                    }
                }
                return item;
            })

            this.setState({
                taskQAs: listTask,
                deletingTaskQA: deletingTaskQA,
            })
            if (deletingTaskQA.length !== taskQAs.length) {
                this.setState({
                    checkedAll: false,
                })
            } else if (deletingTaskQA.length === taskQAs.length) {
                this.setState({
                    checkedAll: true,
                })
            }
        }
    }

    onChangeCheck = (e) => {
        var { deletingTaskQA } = this.state;
        var obj = {
            id: ''
        }
        if (e.target.checked) {
            obj.id = e.target.value;
            deletingTaskQA.push(obj.id);
        } else {
            var index = deletingTaskQA.indexOf(e.target.value);
            deletingTaskQA.splice(index, 1);
        }
    }

    isValidate() {
        var questionError = "";
        var answerError = "";
        var content = this.EditorComp.getContentData();
        var { question, answer } = this.state;
        answer = content;
        if (question == '') {
            questionError = "Bạn chưa nhập nội dung câu hỏi";
        } else {
            this.setState({
                questionError: ''
            });
        }
        if (answer == '') {
            answerError = "Bạn chưa nhập nội dung câu trả lời";
        } else {
            this.setState({
                answerError: ''
            });
        }
        if (questionError || answerError) {
            this.setState({
                questionError,
                answerError
            });
            return false;
        }
        return true;
    }
    onSubmitAdd(e) {
        var self = this;
        var { pageIndex, perPage, question_id, question, answer, usernameAccount } = this.state;

        var today = new Date();
        var CreatedDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var today = new Date();
        var CreatedDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var isValid = this.isValidate();
        if (isValid) {
            self.setState({
                isLoading: true,
            })
            self.apiInsertTaskQA(question_id, question, answer, CreatedDate, usernameAccount, function (data, err) {
                self.setLoading();
                if (data) {
                    if (data.Success) {
                        self.setUpdateData(pageIndex, perPage);
                        self.closeForm();
                        self.setState({
                            isNoti: true,
                            contentNoti: 'Thêm mới câu hỏi thành công !',
                            backgroundNoti: 1
                        })
                        self.onNoti();
                    } else {
                    }
                }
                else {
                    alert(err || "Xảy ra lỗi trong quá trình xử lý");
                }
                self.offNoti();
            });
        }
    }
    onSubmitUpdate(editingTaskQA) {
        var self = this;
        var { pageIndex, perPage, id, question_id, question, answer, usernameAccount } = this.state;
        var taskQA = {
            id: id,
            question_id: question_id,
            question: question,
            answer: answer
        };
        var today = new Date();
        var CreatedDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var isValid = this.isValidate();
        if (isValid) {
            self.setState({
                isLoading: true,
            })
            this.apiUpdateTaskQA(taskQA.id, taskQA.question_id, taskQA.question, taskQA.answer, CreatedDate, usernameAccount, function (data, err) {
                self.setLoading();
                if (data) {
                    if (data.Success) {
                        self.setUpdateData(pageIndex, perPage);
                        self.closeForm();
                        self.setState({
                            isNoti: true,
                            contentNoti: 'Sửa câu hỏi thành công !',
                            backgroundNoti: 2
                        })
                        self.onNoti();
                    } else {
                    }
                }
                else {
                    alert(err || "Xảy ra lỗi trong quá trình xử lý");
                }
                self.offNoti();
            });
        }
    }
    onSubmitDelete() {
        var { id, pageIndex, perPage, usernameAccount } = this.state;
        var self = this;
        var today = new Date();
        var CreatedDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        self.setState({
            isLoading: true,
        })

        this.apiDeleteTaskQA(id, CreatedDate, usernameAccount, function (data, err) {

            if (data) {
                self.setLoading();
                self.closeForm();
                self.setUpdateData(pageIndex, perPage);
                self.setState({
                    isNoti: true,
                    contentNoti: 'Xóa thành công !',
                    backgroundNoti: 0
                })
                self.onNoti();
            } else {
                alert(err || "Xảy ra lỗi trong quá trình xử lý");
            }
            self.offNoti();
        });

    }
    deleteAll = () => {

        var { deletingTaskQA, pageIndex, perPage, usernameAccount } = this.state;

        var self = this;
        var today = new Date();
        var CreatedDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        if (deletingTaskQA.length > 0) {
            self.setState({
                isLoading: true,
            })
            this.apiDeleteAllTaskQA(deletingTaskQA, CreatedDate, usernameAccount, function (data, err) {
                if (data) {
                    self.setLoading();
                    self.setUpdateData(pageIndex, perPage);
                    deletingTaskQA.splice(0, deletingTaskQA.length);
                    self.setState({
                        isNoti: true,
                        contentNoti: 'Xóa câu hỏi thành công !',
                        backgroundNoti: 0,
                        checkedAll: false,
                        checkedList: false,
                    })
                    self.onNoti();
                } else {
                    console.log(err);
                }
            })
            self.offNoti();
        }

    }
    onSubmitRecovery = () => {
        var { id, pageIndex, perPage } = this.state;
        var self = this;
        self.setState({
            isLoading: true,
            isStatus: 0,
        });
        self.apiRecoveryTaskQA(id, function (data, err) {
            if (data) {
                self.setLoading();
                self.closeForm();
                self.setState({
                    isStatus: 0,
                    isNoti: true,
                    contentNoti: 'Khôi phục thành công !',
                    backgroundNoti: 0
                })
                self.setUpdateDataDeleted(pageIndex, perPage);
                self.onNoti();
            } else {
                alert(err || "Xảy ra lỗi trong quá trình xử lý");
            }
            self.offNoti();
        });
    }
    render() {
        var self = this;
        var { usernameAccount, listQuestionPr, taskQAs, isAddClassDiv, isOpenFormCreateQuestion, isDialog, isLoading, question_id,
            question, answer, isOpenFormQSPR, questionError, answerError, pageIndex, isStatus, checkedAll, deletingTaskQA,
            questionNameChild, minPage, maxPage, isOpenFormPreview, isNoti, isAddClassDivNoti, contentNoti, backgroundNoti,
            taskQATrue, taskQAFalse, pageMaxFalse, pageMaxTrue, perPage, isDialogRecovery, isStatusChecked, isStatusSearch,
            isCheckDeleteAndDisplay, checkedList, permission, createAccount, lockAccount, editAccount, permissionAcount,
            creactQA, deleteQA, editQA, permissionPage 
        } = this.state;
        let FormCreateQuestionShow = (
            <FormCreateQuestion
                closeForm={this.closeForm}
                onChange={this.onChange}
                onOpenformQSPR={this.onOpenformQSPR}
                onChangeQSPR={this.onChangeQSPR}
                onCloseFormQSPR={this.onCloseFormQSPR}
                onSubmitAdd={this.onSubmitAdd}
                onSubmitUpdate={() => this.onSubmitUpdate(this.state.editingTaskQA)}
                deleteQuestionId={this.deleteQuestionId}

                // username={username}
                isOpenFormCreateQuestion={isOpenFormCreateQuestion}
                isAddClassDiv={isAddClassDiv}
                isOpenFormQSPR={isOpenFormQSPR}
                listQuestionPr={listQuestionPr}
                question_id={question_id}
                question={question}
                answer={answer}
                questionError={questionError}
                answerError={answerError}
                refProps={function (comp) {
                    self.EditorComp = comp;
                }}
            />
        );
        if (!isOpenFormCreateQuestion) {
            FormCreateQuestionShow = null;
        }
        return (
            <UserContext.Provider
                value={{
                    taskQA: {
                        id: self.state.id,
                        question_id: self.state.question_id,
                        question: self.state.question,
                        answer: self.state.answer
                    }
                }}
            >
                {
                   !permissionPage ? null :
                        <div className="Container">
                            {
                                (!isOpenFormCreateQuestion) ? '' :
                                    <FormCreateQuestion
                                        closeForm={this.closeForm}
                                        onChange={self.onChange}
                                        onChangeContentQuestion={this.onChangeContentQuestion}
                                        onOpenformQSPR={this.onOpenformQSPR}
                                        onChangeQSPR={this.onChangeQSPR}
                                        onCloseFormQSPR={this.onCloseFormQSPR}
                                        closeFormCreatePrevPreview={this.closeFormCreatePrevPreview}
                                        onSubmitAdd={this.onSubmitAdd}
                                        onSubmitUpdate={() => this.onSubmitUpdate(this.state.editingTaskQA)}
                                        deleteQuestionId={this.deleteQuestionId}

                                        usernameAccount={usernameAccount}
                                        isOpenFormCreateQuestion={isOpenFormCreateQuestion}
                                        isAddClassDiv={isAddClassDiv}
                                        isOpenFormQSPR={isOpenFormQSPR}
                                        isOpenFormPreview={isOpenFormPreview}
                                        listQuestionPr={listQuestionPr}
                                        question_id={question_id}
                                        question={question}
                                        answer={answer}
                                        questionError={questionError}
                                        answerError={answerError}
                                        refProps={function (comp) {
                                            self.EditorComp = comp;
                                        }}
                                    />
                            }
                            {(!isOpenFormPreview) ? null :
                                <FormPreview
                                    closeForm={this.closeForm}
                                    onOpenFormCreateQuestion={this.onOpenFormCreateQuestion}

                                    isAddClassDiv={isAddClassDiv}
                                    isOpenFormPreview={isOpenFormPreview}
                                    isOpenFormCreateQuestion={isOpenFormCreateQuestion}
                                />}
                            {(!isLoading) ? '' : <Loader isLoading={isLoading} />}
                            {(!isDialog) ? '' :
                                <DialogDeleteQuestion
                                    closeForm={this.closeForm}
                                    onSubmitDelete={this.onSubmitDelete}
                                    isDialog={isDialog}
                                />}

                            {(!isDialogRecovery) ? '' :
                                <DialogRecoveryQuestion
                                    closeForm={this.closeForm}
                                    onSubmitRecovery={this.onSubmitRecovery}
                                    isDialogRecovery={isDialogRecovery}
                                />}

                            {
                                (!isNoti) ? '' : <DialogNoti
                                    isAddClassDivNoti={isAddClassDivNoti}
                                    contentNoti={contentNoti}
                                    backgroundNoti={backgroundNoti}
                                />
                            }

                            <Content
                                onOpenFormCreateQuestion={this.onOpenFormCreateQuestion}
                                onSubmitDelete={this.onSubmitDelete}
                                onOpenDialogDelete={this.onOpenDialogDelete}
                                onChange={this.onChange}
                                onClickPagination={this.onClickPagination}
                                onClickLeft={this.onClickLeft}
                                onClickRight={this.onClickRight}
                                onKeyPress={this.handleKeyPress}
                                onSearch={this.onSearch}
                                deleteAll={this.deleteAll}
                                onOpenFormPreview={this.onOpenFormPreview}
                                onCheckAll={this.onCheckAll}
                                onCheckList={this.onCheckList}
                                onClickBoxList={this.onClickBoxList}
                                onOpenDialogRecovery={this.onOpenDialogRecovery}
                                onChangeCheck={this.onChangeCheck}

                                checkedAll={checkedAll}
                                deletingTaskQA={deletingTaskQA}
                                taskQAs={taskQAs}
                                pageIndex={pageIndex}
                                isStatus={isStatus}
                                isStatusChecked={isStatusChecked}
                                usernameAccount={usernameAccount}
                                questionNameChild={questionNameChild}
                                minPage={minPage}
                                maxPage={maxPage}

                                perPage={perPage}
                                taskQATrue={taskQATrue}
                                taskQAFalse={taskQAFalse}
                                pageMaxFalse={pageMaxFalse}
                                pageMaxTrue={pageMaxTrue}
                                isStatusSearch={isStatusSearch}
                                isCheckDeleteAndDisplay={isCheckDeleteAndDisplay}
                                checkedList={checkedList}
                                createAccount={createAccount}
                                lockAccount={lockAccount}
                                editAccount={editAccount}
                                permissionAcount={permissionAcount}
                                creactQA={creactQA}
                                deleteQA={deleteQA}
                                editQA={editQA}
                                permissionPage = {permissionPage}
                            />
                        </div>
                }
            </UserContext.Provider>
        );
    }
}


ReactDOM.render(<App />, document.getElementById("ims"));