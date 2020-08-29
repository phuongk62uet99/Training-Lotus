import React, { Component } from "React";
import ReactDOM from "React-dom";
// import Pagging from "../../question-manager/components/common/Pagging";
import Pagging from "./common/Pagging";

class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            isStatus: 1,
            isAccount: 1
        }
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    render() {
        var { onOpenFormCreateAccount, onCheckAll, checkedAll, onChange, onOpenFormCreateAdd, onClickLeft, deletingTaskAccounts,
            onChange, onClickPagination, onKeyPress, onClickRight, pageIndex, taskAccounts, onSearchAccountName, onSubmitAccount,
            statusSlect, perPage, TotalRow, createAccount, lockAccount
        } = this.props;
        var { isStatus } = this.state;
        var idNew = (deletingTaskAccounts.length == 0) ? "" : "opacity";
        var pageMax = Math.ceil(TotalRow / perPage);
        var begin, end;
        if (pageMax === 1) {
            begin = 1;
            end = TotalRow;
        } else {
            if (pageIndex === 1) {
                begin = (pageIndex - 1) * perPage + 1;
                end = perPage;
            } else if (pageIndex > 1 && pageIndex < pageMax) {
                begin = (pageIndex - 1) * perPage + 1;
                end = begin + perPage - 1;
            } else if (pageIndex === pageMax) {
                begin = (pageIndex - 1) * perPage + 1;
                end = TotalRow;
            }
        }
        return (

            <div style={{ display: "flex", flexDirection: "column" }}>
                {
                    !createAccount ? null :
                        <div className="top-bar-account" >
                            <div className="button-add" onClick={() => onOpenFormCreateAdd("Add", null)} >
                                <i className="fi fi-plus-circle" aria-hidden="true"></i>
                                <div className="text-add">Thêm người dùng mới</div>
                            </div>
                        </div>
                }
                <div className="account-content">
                    {
                        !lockAccount ? null :
                            <div className="checkbox-All">
                                <input onClick={(e) => onCheckAll(e, taskAccounts)} type="checkbox" checked={checkedAll || false} onChange={onChange} />
                            </div>
                    }
                    {
                        !lockAccount ? null :
                            <div className="option-action-select">
                                <select className="groud" name="isAccount" value={this.state.isAccount} onChange={this.onChange}>
                                    <option value={1}>Mở tài khoản</option>
                                    <option value={0}> khóa tài khoản</option>
                                </select>
                            </div>
                    }
                    {
                        !lockAccount ? null :
                            <div className="filter-div-child" onClick={() => onSubmitAccount(this.state.isAccount)} >
                                <input
                                    type="submit" id={idNew}
                                    className="jsx-btn-2 disabled account "
                                    value="Thực hiện "
                                />
                            </div>

                    }
                    {
                        !lockAccount ? null :
                            <div className="div-line"></div>
                    }

                    <div style={{ marginRight: "10px" }}>
                        <input className="sarch-account keyword-filter-input" type="text" placeholder="Từ khóa"
                            value={this.state.keyword} onChange={this.onChange} name="keyword"
                        />
                    </div>
                    <div className="option-action-select">
                        <select className="groud" name="isStatus" value={this.state.isStatus} onChange={this.onChange} >
                            <option value={1}>Tất cả</option>
                            <option value={0}>Đang hoạt động</option>
                            <option value={-1}>Đã khóa</option>
                        </select>
                    </div>
                    <div className="div-loc">
                        <div className="jsx-btn-2" onClick={() => onSearchAccountName(this.state.keyword, this.state.isStatus)} >
                            Lọc
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
                        pageIndex={pageIndex}
                        isStatus={isStatus}
                        TotalRow={TotalRow}
                    />
                </div>
            </div>
        );
    }
}

export default Topbar;