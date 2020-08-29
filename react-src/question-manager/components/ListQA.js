import React, { Component } from "React";
import ReactDOM from "React-dom";

class ListQA extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { taskQA, onOpenFormCreateQuestion, onOpenDialogDelete, onOpenFormPreview, onCheckList,
            isStatus, onOpenDialogRecovery, checkedList, deleteQA, editQA
        } = this.props;
        var QA = (isStatus == 1) ? "Xóa câu hỏi" : "Khôi phục câu hỏi ";
        var onClick = (isStatus == 1) ? onOpenDialogDelete : onOpenDialogRecovery;
        var iCon = (isStatus == 1) ? "fi fi-trash" : "fi fi-repeat";
        return (
            <div className="list-item-main">
                {
                    !deleteQA ? null :
                        <div className="checkbox">
                            <input onChange={(e) => onCheckList(taskQA.id, e)} name="check" checked={taskQA.statusCheckBox || false || checkedList}
                                type="checkbox" className="checkbox-list" value={taskQA.id} />
                        </div>
                }
                <div className="post">
                    <div className="question-answer">
                        <div className="question-child">
                            {taskQA.question}
                        </div>
                        <div className="answer" dangerouslySetInnerHTML={{ __html: taskQA.answer.slice(0, 100) }}>
                        </div>
                        <div className="answer-actions">
                            <div className="answer-action update" onClick={onOpenFormPreview}>
                                <i className="fi fi-eye"></i>
                                <div className="title">
                                    <i className="fi fi-caret-up"></i>
                                    <span>Xem chi tiết</span>
                                </div>
                            </div>
                            {
                                editQA ? <div className="answer-action update" onClick={onOpenFormCreateQuestion}>
                                    <i className="fi fi-pencil"></i>
                                    <div className="title">
                                        <i className="fi fi-caret-up"></i>
                                        <span>Sửa câu hỏi</span>
                                    </div>
                                </div> : ""
                            }
                            {
                                deleteQA ? <div className="answer-action delete" onClick={onClick}>
                                    <i className={iCon}></i>
                                    <div className="title">
                                        <i className="fi fi-caret-up"></i>
                                        <span>{QA}</span>
                                    </div>
                                </div> : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListQA;