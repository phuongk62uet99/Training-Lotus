import React , { Component } from "React";
import ReactDOM from "React-dom";

class SideBar extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div className="sidebar-left">
                <ul className="list-items">
                    <li className="config">
                        <a href="" title="Thêm bài">
                            
                        </a>
                    </li>
                    <li className="config">
                        <a href="" title="Thêm bài">
                            
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default SideBar;