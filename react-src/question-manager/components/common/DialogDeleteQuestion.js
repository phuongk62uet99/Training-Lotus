import React, { Component } from "React";
import ReactDOM from "React-dom";

class DialogDeleteQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        var { closeForm, onSubmitDelete } = this.props;

        return (
            <div className="Container-form-questions show" style={{ top: "0px", height: "100%" }}>
                <div className="overlay"></div>
                <div className="dialogConfirm">
                    <div className="header">
                        <div className="title">Xác nhận</div>
                        <div className="closeForm" onClick={closeForm}><i className="fi fi-close"></i></div>
                    </div>
                    <div className="modal-content">
                        <div className="message">
                            <i className="icons confirm"></i>
                                Bạn có chắc chắn muốn xóa câu hỏi này?
                            </div>
                    </div>
                    <footer>
                        <span className="btn btn-primary" onClick={onSubmitDelete}>Có</span>
                        <span className="btn" onClick={closeForm}>Không</span>
                    </footer>
                </div>
            </div>
        );
    }
}

export default DialogDeleteQuestion;