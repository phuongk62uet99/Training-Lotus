import React , { Component } from "React";
import ReactDOM from "React-dom";
import Editor from "../../../common/Editor"; 
import DialogListQuestionPR from "./DialogListQuestionPR";
import DialogConfirmClose from "./DialogConfirmClose";

class AddQuestion extends Component{
    constructor(props, ref){
        super(props, ref);
        this.state = {
            listQuestionPr: [],
            isDialogConfirmClose: false,
        }
    }
    onOpenDialogConfirm = () => {
        this.setState({
            isDialogConfirmClose: true,
        })
    }
    onCloseDialogConfirm = () => {
        this.setState({
            isDialogConfirmClose: false
        })
    }
    onCloseForm = () => {
        this.setState({
            isDialogConfirmClose: false
        })
        this.props.closeForm();
    }

    
    render(){
        var self = this;
        var { listQuestionPr , isDialogConfirmClose } = this.state;
        var { isOpenFormAdd , onChange , onChangeContentQuestion , onSubmitAdd , refProps , onOpenformQSPR, 
            onCloseFormQSPR , isOpenFormQSPR , onChangeQSPR , question_id , isAddClassDiv ,
            question_name , question , answer , question_idError , questionError , answerError
        } = this.props;
        let className = 'item';
        if (isAddClassDiv) {
            className += ' show';
        }
        let dialogAdd = (
            <div className="Container-add-questions">
                <div className="overlay"></div>
                <div className={className}>
                    <div className="form-add">
                        <span className="close" onClick={this.onOpenDialogConfirm}>Đóng</span>
                        <form className="form" method="post">
                            <div className="top">
                                <div className="center">
                                    <div className="scroll">
                                        <div className="scroll-view">
                                            <div className="title">Nội dung câu hỏi</div>
                                            <textarea className="questionName" onChange={onChange} value={question} name="question" placeholder="Nhập nội dung câu hỏi..."></textarea>
                                            <div className="error">{questionError}</div>
                                            <div className="title">Nôi dung câu trả lời</div>
                                            <Editor
                                                answer = {answer}
                                                onChange = {onChangeContentQuestion}
                                                ref = {refProps}
                                                refPropsTest={function(el) {
                                                    self.EditorComp  = el
                                                }}
                                            />
                                            <div className="error">{answerError}</div>
                                            <DialogListQuestionPR
                                                onCloseFormQSPR = {onCloseFormQSPR}
                                                onChangeQSPR = {onChangeQSPR}
                                                isOpenFormQSPR = {isOpenFormQSPR}
                                            />
                                            <div style={{paddingTop: "10px"}}>
                                                {(question_name == '') ? <a className="titleQSPR" onClick={onOpenformQSPR}>Click để lựa chọn câu hỏi cha: </a> : <a className="titleQSPR" onClick={onOpenformQSPR}>Thay đổi câu hỏi cha: </a>}
                                                <input onChange={onChange} type="hidden" className="questionName" name="question_id" />
                                                <a className="QSPR">{(question_name == '') ? "Chưa có câu hỏi!" : question_name}</a>
                                            </div>
                                            <div className="error">{question_idError}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-actions">
                                <span className="btn btn-cancel" onClick={onSubmitAdd}>
                                    <i className="fi fi-plus" aria-hidden="true"></i>
                                    Thêm
                                </span> 
                                <span className="btn btn-cancel" onClick={this.onOpenDialogConfirm}>
                                    <i className="fi fi-ban" aria-hidden="true"></i>
                                    Đóng
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
        if(!isOpenFormAdd){
            dialogAdd = null;
        }
        return(
            <div>
                {dialogAdd}
                <DialogConfirmClose
                    onCloseForm = {this.onCloseForm}
                    onCloseDialogConfirm = {this.onCloseDialogConfirm}

                    isDialogConfirmClose = {isDialogConfirmClose}
                />
            </div>
        );
    }
}

export default AddQuestion;