import React , { Component } from "React";
import ReactDOM from "React-dom";

class DialogListQuestionPR extends Component{
    constructor(props){
        super(props);
        this.state = {
            listQuestionPr: [],
            isStatusSearch: false,
            isStatusClickRight: false,
            pageIndex: 1,
            indexID: "",
            indexName: "",
            questionName: "",
        }
    }
    componentDidMount() {
        var { listQuestionPr , pageIndex } = this.state;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch("controllers/GetDBQuestionParent.php?pageIndex="+pageIndex , requestOptions)
        .then(res => res.json())
        .then((result) => {
                this.setState({
                    listQuestionPr: result.Data.Questions,
                });
            },
            (error) => {
                this.setState({
                    error
                });
            }
        )
    }
    setUpdatePagination = (pageIndex) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch("controllers/GetDBQuestionParent.php?pageIndex="+pageIndex , requestOptions)
        .then(res => res.json())
        .then((result) => {
                this.setState({
                    listQuestionPr: result.Data.Questions,
                });
            },
            (error) => {
                this.setState({
                    error
                });
            }
        )
    }
    onClickItemQSPR = (item) => {
        var { listQuestionPr , indexID } = this.state;
        var indexID = "";
        var indexName = "";
        listQuestionPr.map((list) =>{
            if(item.id === list.id){
                indexID = list.id;
                indexName = list.name;
            }
        });
        this.setState({
            indexID: indexID,
            indexName: indexName
        })
    }
    onAddQSPR = () => {
        var { indexID , indexName } = this.state;
        this.props.onChangeQSPR(indexID, indexName);
    }
    onChangeFilter = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    apiSearchQSPR = (questionName , pageIndex) => {
        fetch('controllers/SearchDBQuestionParent.php?pageIndex='+pageIndex, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: JSON.stringify({
                questionName: this.state.questionName,
            })
        })
        .then(response => response.json())
        .then(result => {
            this.setState({
                result: result,
                listQuestionPr: result.Data.Questions
            });
        })
        .catch(error => {
        });
    }
    onSearchQSPR = (e) => {
        var { questionName , pageIndex } = this.state;
        e.preventDefault();
        if(questionName==''){
            this.setState({
                isStatusSearch: false,
                pageIndex: pageIndex - (pageIndex-1)
            })
            this.setUpdatePagination(pageIndex - (pageIndex-1));
        }else{
            this.setState({
                isStatusSearch: true,
                pageIndex: pageIndex - (pageIndex-1)
            })
            this.apiSearchQSPR(questionName , (pageIndex - (pageIndex-1)));
        }
    }
    onClickLeft = () => {
        var { pageIndex , isStatusSearch , questionName } = this.state;
        if (pageIndex > 1) {
            this.setState({
                pageIndex: pageIndex - 1
            })
            if(isStatusSearch){
                this.onPaginationSearch(questionName , pageIndex - 1);
            }else{
                this.onPagination(pageIndex - 1);
            }
        }
    }
    onClickRight = () => {
        var { pageIndex , isStatusSearch , questionName } = this.state;
        this.setState({
            isStatusClickRight: true,
            pageIndex: pageIndex + 1
        })
        if(isStatusSearch){
            this.onPaginationSearch(questionName , pageIndex + 1);
        }else{
            this.onPagination(pageIndex + 1);
        }
    }
    onPagination = (pageIndex) => {
        const { listQuestionPr } = this.state;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch("controllers/GetDBQuestionParent.php?pageIndex=" + pageIndex , requestOptions)
            .then(res => res.json())
            .then((result) => {
                if(result.Data.Questions.length === 0){
                    this.setState({
                        pageIndex: pageIndex - 1,
                    })
                    alert('Không còn câu hỏi nào nữa!');
                }else{
                    this.setState({
                        listQuestionPr: result.Data.Questions,
                    });
                }
            },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    onPaginationSearch = (questionName , pageIndex) => {
        fetch('controllers/SearchDBQuestionParent.php?pageIndex='+pageIndex, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: JSON.stringify({
                questionName: this.state.questionName,
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result.Data.Questions.length === 0){
                this.setState({
                    pageIndex: pageIndex - 1,
                })
                alert('Không còn câu hỏi nào nữa!');
            }else{
                this.setState({
                    result: result,
                    listQuestionPr: result.Data.Questions
                });
            }
        })
        .catch(error => {
        });
    }
    render(){
        var { isOpenFormQSPR , onCloseFormQSPR } = this.props;
        var { listQuestionPr , indexID , questionName , pageIndex } = this.state;
        var listQuestionPr = listQuestionPr.map((item) => {
            return <div key={item.id} onClick={() => this.onClickItemQSPR(item)} className={(indexID == item.id) ? "list-item-main active" : "list-item-main"}>{item.name}</div>
        });
        let dialogListQSPR = (
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
                                            {/* <input onChange={this.onChangeFilter} value={questionName} name="indexName"  type="text" placeholder="Từ khóa" className="keyword-filter-input" /> */}
                                            <input onChange={this.onChangeFilter} value={questionName} name="questionName"  type="text" placeholder="Từ khóa" className="keyword-filter-input" />
                                        </div>
                                        <div className="box-filter-child" onClick={this.onSearchQSPR}>
                                            <input type="submit" className="button" value="LỌC" />
                                        </div>
                                    </div>
                                </div>
                                <div className="pagination">
                                    <div className="pagination-in">
                                        <div style={{marginRight:"7px"}}>Trang {pageIndex}</div>
                                        <div className="prev opacityPaging" onClick={this.onClickLeft}><i className="fi fi-chevron-left" style={{marginTop: "4px"}}></i></div>
                                        <div className="prev opacityPaging" onClick={this.onClickRight}><i className="fi fi-chevron-right" style={{marginTop: "4px"}}></i></div>
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
                    <div className="footer" style={{zIndex: "9999999"}}>
                        <div className="bottom-actions">
                            <span className="btn btn-cancel" onClick={this.onAddQSPR}>
                                <i className="fi fi-plus" aria-hidden="true"></i>
                                Chèn
                            </span> 
                            <span className="btn btn-cancel" onClick={onCloseFormQSPR}>
                                <i className="fi fi-ban" aria-hidden="true"></i>
                                Đóng
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
        if(!isOpenFormQSPR){
            dialogListQSPR = null;
        }
        return(
            <div>
                {dialogListQSPR}
            </div>
        );
    }
}

export default DialogListQuestionPR;