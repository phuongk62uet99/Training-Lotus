import React, { Component } from "React";
import ReactDOM from "React-dom";
import Pagging from "./common/Pagging";

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        var { onChange, onClickPagination, pageIndex, onClickRight, onClickLeft, onKeyPress, deletingTaskQA,
            isStatus, onSearch, deleteAll, questionNameChild, minPage, maxPage, onCheckAll, checkedAll, taskQATrue,
            taskQAFalse, pageMaxFalse, pageMaxTrue, perPage, isCheckDeleteAndDisplay, deleteQA
        } = this.props;

        let left = '';
        let right = '';
        let opacityL = '';
        let opacityR = '';
        (minPage == false) ? (left = 'none', opacityL = '.3') : (left = 'visible', opacityL = '1');
        (maxPage == false) ? (right = 'none', opacityR = '.3') : (right = 'visible', opacityR = '1');




        var className = (deletingTaskQA.length !== 0) ? "jsx-btn-2" : "jsx-btn-2 disabled";
        var taskQAPage = (isCheckDeleteAndDisplay === 1) ? taskQATrue : taskQAFalse;
        var begin, end;
        if (isCheckDeleteAndDisplay === 1) {
            if (pageIndex >= 1 && pageIndex < pageMaxTrue) {
                begin = (pageIndex - 1) * perPage + 1;
                end = begin + perPage - 1;
            } else if (pageIndex > pageMaxTrue) {
                begin = (pageMaxTrue - 1) * perPage + 1;
                end = taskQATrue;
            } else if (pageIndex === pageMaxTrue) {
                begin = (pageIndex - 1) * perPage + 1;
                end = taskQATrue;
            }
        } else {
            if (pageIndex >= 1 && pageIndex < pageMaxFalse) {
                begin = (pageIndex - 1) * perPage + 1;
                end = begin + perPage - 1;
            } else if (pageIndex > pageMaxFalse) {
                begin = (pageMaxFalse - 1) * perPage + 1;
                end = taskQAFalse;
            } else if (pageIndex === pageMaxFalse) {
                begin = (pageMaxFalse - 1) * perPage + 1;
                end = taskQAFalse;
            }
        }
        return (
            <div className="top-bar">
                <div className="filters">
                    <div className="filter-div">
                        {
                            !deleteQA ? null :
                                <div className="checkbox">
                                    <input onClick={(e) => onCheckAll("checkBoxAll", e)} onChange={onChange} checked={checkedAll || false} type="checkbox" className="checkbox-list" value="" name={"checkBoxList"} />
                                </div>

                        }
                        {
                            !deleteQA ? null :
                                <div className="filter-div-child" onClick={deleteAll}>
                                    <input type="button" className={className} value="Xóa" />
                                </div>
                        }
                        {
                            !deleteQA ? null :
                                <div className="division-line"></div>
                        }
                        <div className="filter-div-child">
                            <div className="option-action-select">
                                <select className="groud" name="isStatus" onChange={onChange}
                                    value={isStatus}>
                                    <option value="1">Đang hiển thị</option>
                                    <option value="0">Đã xóa</option>
                                </select>
                            </div>
                        </div>
                        <form onSubmit={onSearch}>
                            <div className="box-filter">
                                <div className="box-filter filter">
                                    <input
                                        onChange={onChange}
                                        value={questionNameChild}
                                        name="questionNameChild"
                                        type="text"
                                        placeholder="Từ khóa"
                                        className="keyword-filter-input" />
                                </div>
                                <div className="box-filter-child">
                                    <input type="submit" className="button" value="LỌC" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Pagging
                    onClickLeft={onClickLeft}
                    onChange={onChange}
                    onClickPagination={onClickPagination}
                    onKeyPress={onKeyPress}
                    onClickRight={onClickRight}
                    begin={begin}
                    end={end}
                    taskQAPage={taskQAPage}
                    pageIndex={pageIndex}

                    perPage={perPage}
                />
                {/* <div className="pagination">
                    <div className="pagination-in">
                        <label className="info-text">Không có dữ liệu</label>
                        <div className="prev opacityPaging" style={{ pointerEvents: left, opacity: opacityL }} onClick={onClickLeft}>
                            <i className="fi fi-chevron-left" style={{ marginTop: "4px" }}></i>
                        </div>
                        <input onChange={onChange} onClick={onClickPagination} value={pageIndex} onKeyPress={onKeyPress} className="page-index" name="pageIndex" type="text" />
                        <div className="prev opacityPaging" style={{ pointerEvents: right, opacity: opacityR }} onClick={onClickRight}>
                            <i className="fi fi-chevron-right" style={{ marginTop: "4px" }}></i>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default TopBar;