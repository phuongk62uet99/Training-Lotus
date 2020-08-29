import React, { Component } from "React";
import ReactDOM from "React-dom";
import PropTypes from 'prop-types';

class Pagging extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    onClickLeft = () => {
        if (this.props.onClickLeft && typeof this.props.onClickLeft === 'function') {
            this.props.onClickLeft();
        }
    }
    onChange = (e) => {
        if (this.props.onChange && typeof this.props.onChange === 'function') {
            this.props.onChange(e);
        }
    }
    onClickPagination = () => {
        if (this.props.onClickPagination && typeof this.props.onClickPagination === 'function') {
            this.props.onClickPagination();
        }
    }
    onKeyPress = (e) => {
        if (this.props.onKeyPress && typeof this.props.onKeyPress === 'function') {
            this.props.onKeyPress(e);
        }
    }
    onClickRight = () => {
        if (this.props.onClickRight && typeof this.props.onClickRight === 'function') {
            this.props.onClickRight();
        }
    }
    render() {
        var {  pageIndex, begin, end, taskQAPage } = this.props;
        var classLeft = (begin === 1) ?
            "prev opacityPagingFalse" : "prev opacityPagingTrue";
        var classRight = (end === taskQAPage) ? "prev opacityPagingFalse" : "prev opacityPagingTrue";
        return (
            <div className="pagination">
                <div className="pagination-in">
                    {
                        (taskQAPage === 0) ? <label className="info-text"> Không có dữ liệu </label> :
                            <label className="info-text">Từ câu hỏi {begin} đến câu {end} trong số {taskQAPage}</label>
                    }
                    <div className={classLeft} onClick={this.onClickLeft}>
                        <i className="fi fi-chevron-left" style={{ marginTop: "4px" }}></i>
                    </div>
                    <input
                        onChange={this.onChange} onClick={this.onClickPagination} value={pageIndex}
                        onKeyPress={this.onKeyPress} className="page-index" name="pageIndex" type="text"
                    />
                    <div className={classRight} onClick={this.onClickRight}>
                        <i className="fi fi-chevron-right" style={{ marginTop: "4px" }}></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pagging;