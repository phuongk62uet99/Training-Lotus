import React, { Component } from "React";
import ReactDOM from "React-dom";
import FetchHelper from '../../../common/fetch-helper';
import Loader from './Loader';

class DialogListQuestionPR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listQuestionPr: [],
            listEmpty: [],
            TotalRow: '',
            isStatusSearch: false,
            isLoading: false,
            minPage: false,
            maxPage: true,
            pageIndex: 1,
            perPage: 10,
            indexID: "",
            questionName: "",
        }
    }
    componentDidMount() {
        var { pageIndex, perPage } = this.state;
        var self = this;
        self.setState({
            isLoading: true,
        })
        setTimeout(() => {
            FetchHelper.fetchData({
                url: 'controllers/question/GetDBQuestionParent.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
            }).then((jsonData) => {
                self.setState({
                    listQuestionPr: jsonData.Data.Questions,
                    TotalRow: jsonData.Data.TotalRow
                })
            }, err => {
                console.log(err || "Xảy ra lỗi trong quá trình xử lý")
            });
        }, 250)
        this.setLoading();
    }
    setLoading = () => {
        setTimeout(() => { this.setState({ isLoading: false }) }, 100);
    }
    setUpdatePagination = (pageIndex, perPage) => {
        var self = this;
        setTimeout(() => {
            FetchHelper.fetchData({
                url: 'controllers/question/GetDBQuestionParent.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
            }).then((jsonData) => {
                self.setState({
                    listQuestionPr: jsonData.Data.Questions
                })
            }, err => {
                console.log(err || "Xảy ra lỗi trong quá trình xử lý")
            });
        }, 150)
    }
    onClickItemQSPR = (item) => {
        var { listQuestionPr, indexID } = this.state;
        var indexID = "";
        listQuestionPr.map((list) => {
            if (item.id === list.id) {
                indexID = list.id;
            }
        });
        this.setState({
            indexID: indexID,
        })
    }
    onAddQSPR = () => {
        var { indexID } = this.state;
        this.props.onChangeQSPR(indexID);
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    apiSearchQSPR = (questionName, pageIndex, perPage, callback) => {
        var self = this;
        FetchHelper.fetchData({
            url: 'controllers/question/SearchDBQuestionParent.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
            params: {
                questionName: self.state.questionName,
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
    onSearchQSPR = (e) => {
        e.preventDefault();
        var self = this;
        var { questionName, pageIndex, perPage, TotalRow } = this.state;
        var countPage = Math.ceil(TotalRow / perPage);
        if (questionName == '') {
            this.setState({
                isStatusSearch: false,
                minPage: false,
                maxPage: true,
                pageIndex: pageIndex - (pageIndex - 1),
                isLoading: true,
            })
            this.setUpdatePagination((pageIndex - (pageIndex - 1)), perPage);
        } else {
            this.setState({
                isStatusSearch: true,
                minPage: false,
                maxPage: true,
                isLoading: true,
                pageIndex: pageIndex - (pageIndex - 1)
            })
            this.apiSearchQSPR(questionName, (pageIndex - (pageIndex - 1)), perPage, function (data, err) {
                if (data) {
                    if (data.Data.Questions.length == 0) {
                        self.setState({
                            listQuestionPr: data.Data.Questions,
                            maxPage: false,
                            minPage: false,
                            isLoading: true,
                        })
                    } else {
                        if (data.Data.Questions.length < perPage) {
                            self.setState({
                                listQuestionPr: data.Data.Questions,
                                maxPage: false,
                                isLoading: true,
                            })
                        } else {
                            self.setState({
                                listQuestionPr: data.Data.Questions,
                                maxPage: true,
                                isLoading: true,
                            })
                        }
                    }
                } else {
                    alert(err || "Xảy ra lỗi trong quá trình xử lý");
                }
            });
        }
        this.setLoading();
    }
    onClickLeft = () => {
        var { pageIndex, perPage, isStatusSearch, questionName } = this.state;
        if (pageIndex > 1) {
            this.setState({
                pageIndex: pageIndex - 1,
                maxPage: true,
                isLoading: true,
            })
            if (isStatusSearch) {
                this.onPaginationSearch(questionName, pageIndex - 1, perPage);
            } else {
                this.onPagination(pageIndex - 1, perPage);
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
    onClickRight = () => {
        var { pageIndex, perPage, isStatusSearch, questionName } = this.state;
        this.setState({
            pageIndex: pageIndex + 1,
            minPage: true,
            isLoading: true,
        })
        if (isStatusSearch) {
            this.onPaginationSearch(questionName, pageIndex + 1, perPage);
        } else {
            this.onPagination(pageIndex + 1, perPage);
        }
        this.setLoading();
    }
    onPagination = (pageIndex, perPage) => {
        var self = this;
        var { perPage, TotalRow } = this.state;
        var countPage = Math.ceil(TotalRow / perPage);
        FetchHelper.fetchData({
            url: 'controllers/question/GetDBQuestionParent.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
        }).then((jsonData) => {
            if (pageIndex == countPage) {
                setTimeout(() => {
                    self.setState({
                        maxPage: false,
                        listQuestionPr: jsonData.Data.Questions,
                    });
                }, 150)
            } else {
                setTimeout(() => {
                    self.setState({
                        listQuestionPr: jsonData.Data.Questions,
                    });
                }, 150)
            }
        }, err => {
            console.log(err || "Xảy ra lỗi trong quá trình xử lý")
        });
    }
    onPaginationSearch = (questionName, pageIndex, perPage) => {
        var self = this;
        var { perPage, TotalRow } = this.state;
        var countPage = Math.ceil(TotalRow / perPage);
        FetchHelper.fetchData({
            url: 'controllers/question/SearchDBQuestionParent.php?pageIndex=' + pageIndex + '&perPage=' + perPage,
            params: {
                questionName: this.state.questionName,
            }
        }).then((jsonData) => {
            if (pageIndex === countPage) {
                setTimeout(() => {
                    self.setState({
                        maxPage: false,
                        listQuestionPr: jsonData.Data.Questions
                    })
                }, 150)
            } else {
                setTimeout(() => {
                    self.setState({
                        listQuestionPr: jsonData.Data.Questions
                    });
                }, 150)
            }
        }, err => {
            console.log(err || "Xảy ra lỗi trong quá trình xử lý")
        });
    }
    render() {
        var { isOpenFormQSPR, onCloseFormQSPR } = this.props;
        var { listQuestionPr, indexID, questionName, isLoading, maxPage, minPage } = this.state;
        var listQuestionPr = listQuestionPr.map((item) => {
            return <div key={item.id} onClick={() => this.onClickItemQSPR(item)} className={(indexID == item.id) ? "list-item-main active" : "list-item-main"}>{item.name}</div>
        });

        let left = '';
        let right = '';
        let opacityL = '';
        let opacityR = '';
        (minPage == false) ? (left = 'none', opacityL = '.3') : (left = 'visible', opacityL = '1');
        (maxPage == false) ? (right = 'none', opacityR = '.3') : (right = 'visible', opacityR = '1');

        return (
            <div className="dialogQSPR">
                <div className="overlay QSPR"></div>
                <div className="dialogOption">
                    <div className="header">
                        <div className="title-L">
                            Chọn câu hỏi cha
                        </div>
                        <div className="closeForm" onClick={onCloseFormQSPR}><i className="fi fi-close"></i></div>
                    </div>
                    <div className="content">
                        <div className="main">
                            <div className="topbar">
                                <div className="filters">
                                    <div className="box-filter">
                                        <div className="box-filter filter">
                                            <input onChange={this.onChange} value={questionName} name="questionName" type="text" placeholder="Từ khóa" className="keyword-filter-input" />
                                        </div>
                                        <div className="box-filter-child" onClick={this.onSearchQSPR}>
                                            <input type="submit" className="button" value="LỌC" />
                                        </div>
                                    </div>
                                </div>
                                <div className="pagination">
                                    <div className="pagination-in">
                                        <div className="prev opacityPaging" style={{ pointerEvents: left, opacity: opacityL }} onClick={this.onClickLeft}><i className="fi fi-chevron-left" style={{ marginTop: "4px" }}></i></div>
                                        <div className="prev opacityPaging" style={{ pointerEvents: right, opacity: opacityR }} onClick={this.onClickRight}><i className="fi fi-chevron-right" style={{ marginTop: "4px" }}></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="listQSPR-container">
                                <div className="scroll-list">
                                    <div className="scroll-list-view">
                                        <div className="list-group">
                                            <div className="list-item">
                                                {listQuestionPr}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer" style={{ zIndex: "9999999" }}>
                        <div className="bottom-actions">
                            <span className="btn btn-cancel" onClick={onCloseFormQSPR}>
                                <i className="fi fi-ban" aria-hidden="true"></i>
                                Đóng
                            </span>
                            <span className="btn btn-cancel" onClick={this.onAddQSPR}>
                                <i className="fi fi-plus" aria-hidden="true"></i>
                                Chèn
                            </span>
                        </div>
                    </div>
                </div>
                {(!isLoading) ? '' : <Loader
                    isOpenFormQSPR={isOpenFormQSPR}
                />}
            </div>
        );
    }
}

export default DialogListQuestionPR;