import React , { Component } from "React";
import ReactDOM from "React-dom";
import Editor from "../../../common/Editor";
import { UserContext } from "./UserContext";
import DialogListQuestionPR from "./DialogListQuestionPR";
import DialogConfirmClose from "./DialogConfirmClose";

class EditQuestion extends Component{
    constructor(props){
        super(props);
        this.state = {
            listQuestionPr: [],
            isDialogConfirmClose: false,
        }
    }
    componentDidMount() {
        var { listQuestionPr , pageIndex } = this.state;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch("controllers/GetDBQuestionParent.php" , requestOptions)
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
        var { isOpenFormEdit , onChange , onChangeContentQuestion , onSubmitUpdate , editingTaskQA , isOpenFormQSPR ,
            onOpenformQSPR , onCloseFormQSPR , onChangeQSPR , question_idError , questionError , answerError , isAddClassDiv
        } = this.props;
        var { taskQA } = this.context;
        var qsID = taskQA.question_id;
        var editListQSPR = listQuestionPr.map((item) => {
            if(item.id === qsID){
                return <a className="QSPR" key={item.id}>{item.name}</a>
            }            
        });
        let className = 'item';
        if (isAddClassDiv) {
            className += ' show';
        }
        let dialogAdd = (
            <div className="Container-add-questions show">
                <div className="overlay"></div>
                <div className={className}>
                    <div className="form-add">
                        <span className="close" onClick={this.onOpenDialogConfirm}>Đóng</span>
                        <form className="form" method="post">
                            <div className="top">
                                <div className="center">
                                    <div className="scroll">
                                        <div className="scroll-view">
                                            <div className="title">Nội dung câu trả hỏi</div>
                                            <textarea className="questionName" onChange={onChange} defaultValue={taskQA.question} name="question" placeholder="Nhập nội dung câu hỏi..."></textarea>
                                            <div className="error">{questionError}</div>
                                            <div className="title">Nội dung câu trả lời</div>
                                            <Editor
                                                answer = {taskQA.answer}
                                                onChange = {onChangeContentQuestion}
                                                ref={this.props.refProps}
                                            />
                                            <div className="error">{answerError}</div>
                                            <DialogListQuestionPR
                                                onCloseFormQSPR = {onCloseFormQSPR}
                                                onChangeQSPR = {onChangeQSPR}
                                                isOpenFormQSPR = {isOpenFormQSPR}
                                            />
                                            <div style={{paddingTop: "10px"}}>
                                                {(taskQA.question_name == '') ? <a className="titleQSPR" onClick={onOpenformQSPR}>Click để lựa chọn câu hỏi cha: </a> : <a className="titleQSPR" onClick={onOpenformQSPR}>Thay đổi câu hỏi cha: </a>}
                                                <input onChange={onChange} type="hidden" className="questionName" name="question_id" />
                                                {editListQSPR}
                                            </div>
                                            <div className="error">{question_idError}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-actions">
                                <span className="btn btn-cancel" onClick={() => onSubmitUpdate(editingTaskQA)}>
                                    <i className="fi fi-save" aria-hidden="true"></i>
                                    Lưu
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
        if(!isOpenFormEdit){
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

EditQuestion.contextType = UserContext;

export default EditQuestion;