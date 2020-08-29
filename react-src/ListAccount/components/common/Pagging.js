import React, { Component } from "React";
import ReactDOM from "React-dom";
import PropTypes from 'prop-types';

class Pagging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyworkSearch: '1',
        };
    }
    onClickLeft = (isStatus) => {
        if (this.props.onClickLeft && typeof this.props.onClickLeft === 'function') {
            this.props.onClickLeft(isStatus);
        }
    }
    onChange = (e) => {
        if (this.props.onChange && typeof this.props.onChange === 'function') {
            this.props.onChange(e);
        }
    }
    onChangeKeywork = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    onClickPagination = (e, pageIndex) => {
        if (this.props.onClickPagination && typeof this.props.onClickPagination === 'function') {
            this.props.onClickPagination(e, pageIndex);
        }
    }
    onKeyPress = (e) => {
        if (this.props.onKeyPress && typeof this.props.onKeyPress === 'function') {
            this.props.onKeyPress(e);
        }
    }
    onClickRight = (isStatus) => {
        if (this.props.onClickRight && typeof this.props.onClickRight === 'function') {
            this.props.onClickRight(isStatus);
        }
    }


    render() {
        var { perPage, pageIndex, begin, end, taskQAPage, isStatus, TotalRow } = this.props;
        var classLeft = (begin === 1) ?
            "prev opacityPagingFalse" : "prev opacityPagingTrue";
        var classRight = (end === TotalRow) ? "prev opacityPagingFalse" : "prev opacityPagingTrue";
        return (
            <div className="pagination">
                <div className="pagination-in">
                    {(TotalRow != 0) ? <label className="info-text"> {begin} đến {end} trong {TotalRow}</label>
                        : <label className="info-text"> Không có dữ liệu </label>
                    }
                    <div className={classLeft} onClick={() => this.onClickLeft(isStatus)}>
                        <i className="fi fi-chevron-left" style={{ marginTop: "4px" }}></i>
                    </div>
                    <input
                        onChange={this.onChange} onClick={(e) => this.onClickPagination(e, pageIndex)} value={pageIndex}
                        onKeyPress={this.onKeyPress} className="page-index" name="pageIndex" type="text"
                    />
                    <div className={classRight} onClick={() => this.onClickRight(isStatus)}>
                        <i className="fi fi-chevron-right" style={{ marginTop: "4px" }}></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pagging;