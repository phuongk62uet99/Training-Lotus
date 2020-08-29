import React, { Component } from "React";
import ReactDOM from "React-dom";
import Header from './Header';

class Question extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { formAdd, onChange } = this.props;
        return (
            <div className="Container">
                <Header
                    formAdd={formAdd}
                />
                <div className="MainContent">
                    <div className="sidebar-left">
                        <ul className="list-items">
                            <li className="config">
                                <a href="" title="Thêm bài">
                                    <i className="fas fa-pencil-alt fa-fw"></i>
                                </a>
                            </li>
                            <li className="config">
                                <a href="" title="Thêm bài">
                                    <i className="fas fa-pencil-alt fa-fw"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="content">

                        <div className="content-list">
                            <div className="top-bar">
                                <div className="filters">
                                    <div className="filter-div">
                                        <div className="filter-div-child">
                                            <input type="submit" className="jsx-btn-2 disabled" value="Xóa" />
                                        </div>
                                        <div className="division-line"></div>
                                        <div className="filter-div-child">
                                            <div className="option-action-select">
                                                <select className="groud" name="fillterStatus">
                                                    <option>Tất cả</option>
                                                    <option>Đang hoạt động</option>
                                                    <option>Đã khóa</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="box-filter">
                                            <div className="box-filter filter">
                                                <input onChange={onChange} type="text" placeholder="Từ khóa" className="keyword-filter-input" value="" />
                                            </div>
                                            <div className="box-filter-child">
                                                <input type="submit" className="button" value="LỌC" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="pagination">
                                    <div className="pagination-in">
                                        <label className="info-text">Không có dữ liệu</label>
                                        <div className="prev opacityPaging"><i className="fa fa-chevron-left"></i></div>
                                        <input type="text" className="page-index" value="1" disabled></input>
                                        <div className="prev opacityPaging"><i className="fa fa-chevron-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="list-container">
                                <div className="scroll-list">
                                    <div className="scroll-list-view">
                                        <div className="list">
                                            <div className="list-group">
                                                <div className="list-item">
                                                    <div className="list-item-main">
                                                        <div className="checkbox">
                                                            <input type="checkbox" className="checkbox-list" />
                                                        </div>
                                                        <div className="post">
                                                            <div className="question-answer">
                                                                <div className="question-child">
                                                                    Account Cá nhân
                                                                </div>
                                                                <div className="answer">
                                                                    <p>Là các tài khoản Cá nhân tham gia Lotus có nội dung hay hoặc KOL, Sao, chuyên gia, blogger.. (VD: Chipu, Bác sĩ Trần Quốc Khánh...).</p>
                                                                    <p>Account Cá nhân có thể hoạt động/sản xuất nội dung trên CMS một mình hoặc tạo team làm việc (thêm người vào cùng sản xuất nội dung mang tên cá nhân nào đó).</p>
                                                                </div>
                                                                <div className="answer-actions">
                                                                    <div className="answer-action">
                                                                        <i className="fa fa-pencil-alt"></i>
                                                                    </div>
                                                                    <div className="answer-action">
                                                                        <i className="fa fa-trash-alt"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="list-item-main">
                                                        <div className="checkbox">
                                                            <input type="checkbox" className="checkbox-list" />
                                                        </div>
                                                        <div className="post">
                                                            <div className="question-answer">
                                                                <div className="question-child">
                                                                    Account Cá nhân
                                                                </div>
                                                                <div className="answer">
                                                                    <p>Là các tài khoản Cá nhân tham gia Lotus có nội dung hay hoặc KOL, Sao, chuyên gia, blogger.. (VD: Chipu, Bác sĩ Trần Quốc Khánh...).</p>
                                                                    <p>Account Cá nhân có thể hoạt động/sản xuất nội dung trên CMS một mình hoặc tạo team làm việc (thêm người vào cùng sản xuất nội dung mang tên cá nhân nào đó).</p>
                                                                </div>
                                                                <div className="answer-actions">
                                                                    <div className="answer-action">
                                                                        <i className="fa fa-pencil-alt"></i>
                                                                    </div>
                                                                    <div className="answer-action">
                                                                        <i className="fa fa-trash-alt"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Question;