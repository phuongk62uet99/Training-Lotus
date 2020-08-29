import React, { Component } from "React";
import ReactDOM from "React-dom";
import Editor from "../../common/Editor";
import FetchHelper from '../../common/fetch-helper'
import { UserContext } from "../../common/UserContext";
import DialogListQuestionPR from "./common/DialogListQuestionPR";
import DialogConfirmClose from "./common/DialogConfirmClose";

class FormCreateQuestion extends Component {
    constructor(props, ref) {
        super(props, ref);
        this.state = {
            checkId: null,
            listQuestionPr: [],
            isDialogConfirmClose: false,
        }
    }
    componentDidMount() {
        var self = this;
        FetchHelper.fetchData({
            url: 'controllers/question/GetDBQuestionParent.php',
        }).then((jsonData) => {
            self.setState({
                listQuestionPr: jsonData.Data.Questions
            })
        }, err => {
            alert(err || "Xảy ra lỗi trong quá trình xử lý")
        });
    }
    onOpenDialogConfirm = () => {
        var { isOpenFormPreview } = this.props;
        if (isOpenFormPreview) {
            this.setState({
                isDialogConfirmClose: true,
            })
        } else {
            this.setState({
                isDialogConfirmClose: true,
            })
        }

    }
    onCloseDialogConfirm = () => {
        this.setState({
            isDialogConfirmClose: false,
        })
    }
    onCloseForm = () => {
        this.setState({
            isDialogConfirmClose: false,
        })
        this.props.closeForm();
    }
    textAreaAdjust = (e) => {
        e.target.style.height = "1px";
        e.target.style.height = (10 + e.target.scrollHeight) + "px";
    }
    textRef = (c) => {
        var self = this;
        self.inputEl = c;
        if (!self.inputEl) return;
        self.inputEl.style.height = "1px";
        self.inputEl.style.height = (10 + self.inputEl.scrollHeight) + "px";
    }
    onChange = (e) => {
        
    }

    render() {
        var self = this;
        var { listQuestionPr, isDialogConfirmClose } = this.state;
        var { taskQA } = this.context;
        var { onChange,  onSubmitAdd, onSubmitUpdate, refProps, onOpenformQSPR, onCloseFormQSPR, isOpenFormQSPR, onChangeQSPR,
            isAddClassDiv, deleteQuestionId, question, answer, questionError, answerError, closeFormCreatePrevPreview,
            isOpenFormPreview
        } = this.props;
        var parent_idQuestion = '';
        listQuestionPr.map((item) => {
            if (item.id === taskQA.question_id) {
                parent_idQuestion = item.parent_id;
            }
        });
        var listQSPR = listQuestionPr.map((item) => {
            if (parent_idQuestion == item.id) {
                return <a key={item.id} className="QSPR" style={{ marginTop: "3px", marginLeft: "10px" }}>{item.name}</a>
            } else if (item.parent_id == 0 && taskQA.question_id == item.id) {
                return <a key={item.id} className="QSPR" style={{ marginTop: "3px", marginLeft: "10px" }}>{item.name}</a>
            }
        });
        let className = 'item';
        (isAddClassDiv) ? className += ' show' : '';
        return (
            <div style={{ zIndex: "99999999" }}>
                <div className="Container-form-questions">
                    <div className="overlay"></div>
                    <div className={className}>
                        <div className="form-add">
                            <span className="close" onClick={this.onOpenDialogConfirm}>Đóng</span>
                            <form className="form" method="post" encType="multipart/form-data">
                                <div className="top">
                                    <div className="center">
                                        <div className="scroll">
                                            <div className="scroll-view">
                                                <div className="form-container">
                                                    <div className="theme">
                                                        <textarea ref={self.textRef} className="questionName" onKeyUp={self.textAreaAdjust} onChange={onChange} value={question} name="question" placeholder="Nhập nội dung câu hỏi..."></textarea>
                                                    </div>
                                                    <div className="error">{questionError}</div>
                                                    <div className="title">
                                                        <span>Câu hỏi cha: </span>
                                                        {
                                                            (taskQA.question_id == null || taskQA.question_id == '') ?
                                                                <div className="formDialog" onClick={onOpenformQSPR}>
                                                                    <i className="fi fi-plus"></i>
                                                                    <div className="hoverTitle">
                                                                        <i className="fi fi-caret-up"></i>
                                                                        <span>Thêm</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div style={{ display: "flex" }}>
                                                                    {listQSPR}
                                                                    <div className="formDialog" onClick={onOpenformQSPR}>
                                                                        <i className="fi fi-pencil" style={{ marginLeft: "5px" }}></i>
                                                                        <div className="hoverTitle" style={{ right: "-45px", left: "auto" }}>
                                                                            <i className="fi fi-caret-up"></i>
                                                                            <span>Thay đổi</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="formDialog" onClick={deleteQuestionId}>
                                                                        <i className="fi fi-trash"></i>
                                                                        <div className="hoverTitle" style={{ right: "-45px", left: "auto" }}>
                                                                            <i className="fi fi-caret-up"></i>
                                                                            <span>Xóa</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>
                                                    <Editor
                                                        answer={answer}
                                                        onChange={this.onChange}
                                                        ref={refProps}
                                                        refPropsTest={function (el) {
                                                            self.EditorComp = el
                                                        }}
                                                    />
                                                    <div className="error">{answerError}</div>
                                                    {(!isOpenFormQSPR) ? '' :
                                                        <DialogListQuestionPR
                                                            onCloseFormQSPR={onCloseFormQSPR}
                                                            onChangeQSPR={onChangeQSPR}
                                                            isOpenFormQSPR={isOpenFormQSPR}
                                                        />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-actions">
                                    <span className="btn btn-cancel" onClick={this.onOpenDialogConfirm}>
                                        <i className="fi fi-ban" aria-hidden="true"></i>
                                        Đóng
                                    </span>
                                    {
                                        (taskQA.id != null) ?
                                            <span className="btn btn-cancel" onClick={onSubmitUpdate}>
                                                <i className="fi fi-save" aria-hidden="true"></i>
                                                Lưu
                                            </span>
                                            :
                                            <span className="btn btn-cancel" onClick={onSubmitAdd}>
                                                <i className="fi fi-save" aria-hidden="true"></i>
                                                Lưu
                                            </span>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {
                    (!isDialogConfirmClose) ? '' : <DialogConfirmClose
                        onCloseForm={this.onCloseForm}
                        onCloseDialogConfirm={this.onCloseDialogConfirm}

                        isDialogConfirmClose={isDialogConfirmClose}
                        isOpenFormPreview={isOpenFormPreview}
                        closeFormCreatePrevPreview={closeFormCreatePrevPreview}
                    />
                }
            </div>
        );
    }
}

FormCreateQuestion.contextType = UserContext;

export default FormCreateQuestion;