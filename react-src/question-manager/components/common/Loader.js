import React , { Component } from "React";
import ReactDOM from "React-dom";
class Loader extends Component{
    constructor(props){
        super(props);
    }
    render(){
        var marginTop = '';
        (this.props.isOpenFormQSPR) ? marginTop = '-100px' : marginTop = '';
        return(
            <div className="loader">
                <div className="loader-content" style={{marginTop: marginTop}}>
                    <div className="loaderCT"></div>
                    <p className="loading">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }
}

export default Loader