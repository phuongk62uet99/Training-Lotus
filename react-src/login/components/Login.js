
import React, { Component } from "React";
import ReactDOM from "React-dom";
var Recaptcha = require('react-recaptcha');

const recaptchaRef = React.createRef();
class Login extends Component{
    constructor(props) {
        super(props);
    }
    callback = () => {
        console.log("OK");
    }
    render(){
        var {
            onChange , onSubmitLogin , verifyCallback ,
            username , password , usernameError , passwordError 
        } = this.props;
        return(
            <div className="login theme">
                <form method="POST" action="controllers/LogIn.php" onSubmit={onSubmitLogin}>
                    <div className="space"></div>
                    <div className="logo"></div>
                    <div className="break-line"></div>
                    <div className="form">
                        <div className="Message">Chào bạn,
                            <br /> Mời bạn đăng nhập thông tin
                            <div className="validation-summary-errors">
                                {
                                    (usernameError && passwordError) ? 'Sai thông tin đăng nhập' : ((usernameError) ? usernameError : '' || (passwordError) ? passwordError : '')
                                }
                            </div>
                        </div>
                        <div className="info-wrap">
                            <input onChange={onChange} value={username} type="text" placeholder="Tên đăng nhập" name="username" required/>
                            <input onChange={onChange} value={password} type="password" placeholder="Mật khẩu" name="password" required />
                        </div>
                        <div className="captcha-wrap">
                            <Recaptcha
                                sitekey="6LdeerUZAAAAABsLaFkh421oZFHnep6U3gree0Q9"
                                render="explicit"
                                verifyCallback={verifyCallback}
                                onloadCallback={this.callback}
                            />
                        </div>
                        <div className="Options">
                            <input type="checkbox" id="chkSavePassword" value="on" />
                            <label>Ghi nhớ mật khẩu</label>
                        </div>
                        <input type="submit" className="btn-submit" value="Đăng nhập" />
                    </div>
                    <div className="space"></div>
                    <div className="copyright">© ChannelVN</div>
                </form>
            </div>
        );
    }
}

export default Login;