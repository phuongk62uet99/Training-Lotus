import React , { Component } from "React";
import ReactDOM from "React-dom";
import fetchHelper from "./fetch-helper";

class Editor extends Component{
    constructor(props){
        super(props);
        var self = this;
        this.state = {
            editorId: new Date().getTime(),
            editorInstance: null,
            answer: self.props.answer,
            percent: -1
        }
    }
    componentDidMount(){
        var self = this;

        setTimeout(()=>{
            self.initEditor();
        },300);
    }
    createUploadRequest = (options) => {
        var self = this;
        var { percent } = this.state;
        var xhr = new XMLHttpRequest();
        
        xhr.withCredentials = true;

        // Update progress bar
        xhr.upload.addEventListener("progress", function (evt) {
            const { loaded , total } = evt;
            if (evt.lengthComputable) {
                let percent = (loaded / total) * 100;
                self.setState({
                    percent: percent
                });
                options.onProgress(percent);
            }
        }, false);

        // File uploaded
        xhr.addEventListener("load", function (evt) {
            if (xhr.status == 200) {
                var url = "public/images/"+options.name;
                var obj = [ url ];
                options.callback(obj);
            }
            else {
                console.log("An error occurred while transferring the file.", evt);
            }
        }, false);

        xhr.open("POST", options.url, true);
        xhr.send(options.body);

    };
    initEditor = () => {
        var self = this;
        var answer = self.state.answer;
        var plugins = [];
        plugins.push({ name: 'group1', items: ['photo', 'contentbox','link','table','insertembedcode','sortblock'] });
        VCEDITOR.$("#test").vceditor({
            namespace: "demo",
            toolbar: plugins,
            html: answer,
            width: '100%',
            height: 'auto',
            maxImageWidth: 640,
            widgets: [],
            actionbar: [
                {
                    name: 'bold',
                    aria: 'Chữ in đậm',
                    contentDefault: '<i class="fi fi-bold"></i>'
                },
                {
                    name: 'italic',
                    aria: 'Chữ nghiêng',
                    contentDefault: '<i class="fi fi-italic"></i>'
                },
                {
                    name: 'underline',
                    aria: 'Chữ gạch chân',
                    contentDefault: '<i class="fi fi-underline"></i>'
                },
                {
                    name: 'link',
                    aria: 'Chèn đường dẫn',
                    contentDefault: '<i class="fi fi-link"></i>'
                },
                "highlighttext",
                {
                    name: 'justifyLeft',
                    aria: 'Căn trái',
                    contentDefault: '<i class="fi fi-align-left"/>'
                },
                {
                    name: 'justifyCenter',
                    aria: 'Căn giữa',
                    contentDefault: '<i class="fi fi-align-justify"/>'
                },
                {
                    name: 'justifyRight',
                    aria: 'Căn phải',
                    contentDefault: '<i class="fi fi-align-right"/>'
                },
                {
                    name: 'h2',
                    aria: 'Heading H2',
                    contentDefault: '<i class="fi fi-header"><sub>2</sub></i>'
                },                
                {
                    name: 'orderedlist',
                    aria: 'Danh sách có thứ tự',
                    contentDefault: '<i class="fi fi-list-ol"/>'
                },
                {
                    name: 'unorderedlist',
                    aria: 'Danh sách không thứ tự',
                    contentDefault: '<i class="fi fi-list-ul"/>'
                },
                {
                    name: 'removeFormat',
                    aria: 'Khôi phục mặc định'
                }
            ],
            paragraphFunctions: [
                {name:'photo'},
                {name:'insertembedcode', contentDefault:'<i class="fi fi-code"/>'},
                {name:'inserthrtag'}
            ],
            acceptImageTypes: ['.jpg', '.jpeg', '.png', '.gif'],
            acceptVideoTypes: ['.mov', '.wmv', '.mpg', '.avi', '.flv', '.3gp', '.mp4'],
            cleanAttrs: ["onabort", "onafterprint", "onbeforeprint", "onbeforeunload", "onblur", "oncanplay", "oncanplaythrough", "onchange", "onclick", "oncontextmenu", "oncopy", "oncuechange", "oncut", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "onhashchange", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onoffline", "ononline", "onpagehide", "onpageshow", "onpaste", "onpause", "onplay", "onplaying", "onpopstate", "onprogress", "onratechange", "onreset", "onresize", "onscroll", "onsearch", "onseeked", "onseeking", "onselect", "onstalled", "onstorage", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onunload", "onvolumechange", "onwaiting", "onwheel"],
            onChange: function () {
                self.props.onChange();
            },
            handleUploadImage: function (imgObj, callback, onProgress){
                console.log(callback);
                // var imgSrc = imgObj.type;
                // name = (typeof imgObj.name != "undefined" && imgObj.name ? imgObj.name : "");
                // var fname = imgSrc;
                // if(fname.lastIndexOf('image') != -1){
                //     var _dateTime = new Date().getTime();
                //     if(fname.lastIndexOf('image/jpeg') != -1) {
                //         fname = 'photo-' + _dateTime + '.jpeg';
                //     }else if (fname.lastIndexOf('image/jpg') != -1) {
                //         fname = 'photo-' + _dateTime + '.jpg';
                //     }else if (fname.lastIndexOf('image/png') != -1) {
                //         fname = 'photo-' + _dateTime + '.png';
                //     }else if (fname.lastIndexOf('image/gif') != -1) {
                //         fname = 'photo-' + _dateTime + '.gif';
                //     }else {
                //         try {
                //             var regex = /image\/([^/]+);(.+)/ig;
                //             var m = null;
                //             if ((m = regex.exec(imgSrc)) !== null && m.length > 1) {
                //                 fname = 'photo-' + _dateTime + '.' + m[1];
                //             }
                //             else
                //                 fname = 'photo-' + _dateTime + '.jpg';
                //         }
                //         catch (ex) {
                //             fname = 'photo-' + _dateTime + '.jpg';
                //         }
                //     }
                // } else {
                //     var ext = '.' + imgSrc.split('.').pop().toLowerCase();
                //     fname = imgSrc.substr(imgSrc.lastIndexOf("/") + 1).replace(/.[^.]+$/, '') +'-'+ _dateTime + ext;

                //     if(fname.length > 190){
                //         fname = fname.substr(fname.length - 190);
                //     }
                // }
                // if(name == ""){
                //     name = fname.split(".")[0];
                // }

                var formData = new FormData();
                formData.append('image', imgObj);
                var uploadOpts = {
                    url: "controllers/UploadImage.php",
                    name: imgObj.name,
                    body: formData,
                    callback: function (arrImageClient) {
                        callback(arrImageClient);
                    },
                    onProgress: function(percent){
                        onProgress(percent);
                    },
                };
                self.createUploadRequest(uploadOpts);
            },

            cleanTags: ['meta', 'body', 'script', 'noscript', 'form', 'object', 'applet', 'input', 'button', 'checkbox', 'radio', 'select', 'textarea'],
            forcePastePlainText: false,
            showUploadBar: false,
            autoLink: false,
            targetBlank: true,
            placeholder: "Nhập nội dung câu trả lời...",
            layoutType: "lotus-blog",
            load: function (instance) {
                self.editorInstance = instance;
            },
        });
    }

    getContentData = () => {
        var self = this
        var { answer } = this.state;
        let _answer;
        var self = this;
        if (self.editorInstance != null && typeof self.editorInstance.GetDataForSave == "function") {
            _answer = self.editorInstance.GetDataForSave();
        }
        else if (typeof $ != 'undefined') {
            _answer = $("#id").vceditor('GetDataForSave');
        }
        this.setState({answer: _answer});
        return _answer;
    }
    
    render(){
        var self = this;
        const { refPropsTest } = this.props;
        return(
            <textarea id="test" ref={refPropsTest} onChange={self.props.onChange} value={self.state.answer}>{self.state.answer}</textarea>
        );
    }
}

export default Editor;
