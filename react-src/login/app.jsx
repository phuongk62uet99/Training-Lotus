import React,{ Component } from 'React';
import ReactDOM from 'React-dom';
import Login from './components/Login';
var Recaptcha = require('react-recaptcha');
import FetchHelper from '../common/fetch-helper';

class App extends Component{    
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            usernameError: "",
            passwordError: "",
            isVerified: false,
            isLogin: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    isValidate(){
        let usernameError = "";
        let passwordError = "";
        if(this.state.username.length < 5 || this.state.username.length > 20 || !/^[a-zA-Z0-9]+$/.test(this.state.username)){
            usernameError = "Tài khoản không tồn tại";
        }else{
            this.setState({
                usernameError: ''
            });
        }
        if(this.state.password.length < 5 || this.state.password.length > 20){
            passwordError = "Sai mật khẩu";
        }else{
            this.setState({
                passwordError: ''
            });
        }
        
        if(usernameError || passwordError){
            this.setState({
                usernameError,
                passwordError
            });
            return false;
        }
        return true;
    }
    verifyCallback = () => {
        this.setState({
            isVerified: true,
        })
    }
    apiLogIn(username , password){
        var self = this;
        var usernameError = "";
        FetchHelper.fetchData({
            url: 'controllers/LogIn.php',
            params:{
                username: self.state.username,
                password: self.state.password
            }
        }).then((jsonData)=>{
            if(jsonData){
                if(self.state.isVerified === true){
                    window.location.href = 'question.php';
                }else{
                    usernameError = "Hãy tích robot";
                    if(usernameError){
                        self.setState({
                            usernameError,
                        });
                        return false;
                    }
                    return true;
                }
            }else{
                if(self.state.isVerified === true){
                    usernameError = "Tài khoản không tồn tại";
                    if(usernameError){
                        self.setState({
                            usernameError,
                        });
                        return false;
                    }
                }else{
                    usernameError = "Hãy tích robot";
                    if(usernameError){
                        self.setState({
                            usernameError,
                        });
                        return false;
                    }
                }
                
                return true;
            }
        }, err =>{
            console.log(err || "Đã có lỗi xảy ra");
        });
    }
    onSubmitLogin(e){
        e.preventDefault();
        var { username , password } = this.state;
        var self = this;
        var usernameError = "";
        var isValid = this.isValidate();
        if(isValid){
            self.apiLogIn(username , password);
        }
    }
    render(){
        return(
            <Login 
                onChange = {this.onChange}
                onSubmitLogin = {this.onSubmitLogin}
                verifyCallback = {this.verifyCallback}
                callback = {this.callback}
                expiredCallback = {this.expiredCallback}
                username = {this.state.username}
                password = {this.state.password}
                usernameError = {this.state.usernameError}
                passwordError = {this.state.passwordError}
            />
        );
    }
}

ReactDOM.render(<App/>,document.getElementById("ims"));