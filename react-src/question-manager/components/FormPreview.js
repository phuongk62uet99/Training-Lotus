import React, { Component } from "React";
import ReactDom from "React-dom";
import { UserContext } from "../../common/UserContext";

class FormPreview extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        var { isAddClassDiv , isOpenFormPreview , isOpenFormCreateQuestion , onOpenFormCreateQuestion , closeForm } = this.props;
        var { taskQA } = this.context;

        let className = 'item';
        let transform = '';
        (isAddClassDiv) ? className += ' show' : '';
        (isOpenFormPreview && isOpenFormCreateQuestion) ? transform = 'translateX(0%)' : transform = '';

        return(
            <div className="Container-form-questions">
                <div className="overlay"></div>
                <div className={className} style={{transform: transform}}>
                    <div className="form-add">
                        <span className="close" onClick={closeForm}>Đóng</span>
                        <form className="form" method="post">
                            <div className="top">
                                <div className="center">
                                    <div className="scroll">
                                        <div className="scroll-view">
                                            <div className="form-container">
                                                <div className="previewContainer">
                                                    <div className="theme previewTitle">
                                                        {taskQA.question}
                                                    </div>
                                                    <div className="content" dangerouslySetInnerHTML={{__html: taskQA.answer}}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-actions">
                                <span className="btn btn-cancel" onClick={closeForm}>
                                    <i className="fi fi-ban" aria-hidden="true"></i>
                                    Đóng
                                </span>
                                <span className="btn btn-cancel" onClick={() => onOpenFormCreateQuestion(taskQA)}>
                                    <i className="fi fi-pencil" aria-hidden="true"></i>
                                    Sửa
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

FormPreview.contextType = UserContext;

export default FormPreview;