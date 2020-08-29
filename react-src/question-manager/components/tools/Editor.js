import React , { Component } from "React";
import ReactDOM from "React-dom";

class Editor extends Component{
    constructor(props){
        super(props);
        var self = this;
        this.state = {
            editorId: new Date().getTime(),
            editorInstance: null,
            answer: self.props.answer,
        }
    }
    componentDidMount(){
        this.initEditor();
    }
    initEditor = () => {
        var self = this;
        var answer = self.state.answer;
        var plugins = [];
        plugins.push({ name: 'group1', items: ['photo', 'video', 'contentbox', 'sortblock'] });
        plugins.push({ name: 'group2', items: ['simplequote', 'beforeafter', 'layoutalbum','test'] });
        plugins.push({ name: 'group3', items: ['importword', 'crawl']});
        plugins.push({ name: 'Chức năng khác', type: 'dropdown', items: ['multipart', 'profilebox', 'credit', 'firstcharacterv2', 'table', 'insertembedcode', 'toc', 'inserthrtag',"test", 'html'] });

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
                    contentDefault: '<i class="fa fa-bold"></i>'
                },
                {
                    name: 'italic',
                    aria: 'Chữ nghiêng',
                    contentDefault: '<i class="fa fa-italic"></i>'
                },
                {
                    name: 'underline',
                    aria: 'Chữ gạch chân',
                    contentDefault: '<i class="fa fa-underline"></i>'
                },
                {
                    name: 'link',
                    aria: 'Chèn đường dẫn',
                    contentDefault: '<i class="fa fa-link"></i>'
                },
                "highlighttext",
                {
                    name: 'justifyLeft',
                    aria: 'Căn trái',
                    contentDefault: '<i class="fa fa-align-left"/>'
                },
                {
                    name: 'justifyCenter',
                    aria: 'Căn giữa',
                    contentDefault: '<i class="fa fa-align-justify"/>'
                },
                {
                    name: 'justifyRight',
                    aria: 'Căn phải',
                    contentDefault: '<i class="fa fa-align-right"/>'
                },
                {
                    name: 'h2',
                    aria: 'Heading H2',
                    contentDefault: '<i class="fa fa-header"><sub>2</sub></i>'
                },
                'bigtext',
                'unbigtext',
                {
                    name: 'orderedlist',
                    aria: 'Danh sách có thứ tự',
                    contentDefault: '<i class="fa fa-list-ol"/>'
                },
                {
                    name: 'unorderedlist',
                    aria: 'Danh sách không thứ tự',
                    contentDefault: '<i class="fa fa-list-ul"/>'
                },
                {
                    name: 'removeFormat',
                    aria: 'Khôi phục mặc định'
                }
            ],
            paragraphFunctions: [
                {name:'photo'},
                {name:'video'},
                {name:'blockquote'},
                {name:'contentbox'},
                {name:'layoutalbum'},
                {name:'insertembedcode', contentDefault:'<i class="fa fa-code"/>'},
                {name:'inserthrtag'}
            ],
            acceptImageTypes: ['.jpg', '.jpeg', '.png', '.gif'],
            acceptVideoTypes: ['.mov', '.wmv', '.mpg', '.avi', '.flv', '.3gp', '.mp4'],
            cleanAttrs: ["onabort", "onafterprint", "onbeforeprint", "onbeforeunload", "onblur", "oncanplay", "oncanplaythrough", "onchange", "onclick", "oncontextmenu", "oncopy", "oncuechange", "oncut", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "onhashchange", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onoffline", "ononline", "onpagehide", "onpageshow", "onpaste", "onpause", "onplay", "onplaying", "onpopstate", "onprogress", "onratechange", "onreset", "onresize", "onscroll", "onsearch", "onseeked", "onseeking", "onselect", "onstalled", "onstorage", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onunload", "onvolumechange", "onwaiting", "onwheel"],
            onChange: function () {
                self.props.onChange();
            },
            cleanTags: ['meta', 'body', 'script', 'noscript', 'form', 'object', 'applet', 'input', 'button', 'checkbox', 'radio', 'select', 'textarea'],
            forcePastePlainText: true,
            showUploadBar: false,
            autoLink: true,
            targetBlank: true,
            placeholder: "Nhập nội dung bài viết...",
            layoutType: "lotus-blog",
        });
    }

    getAnswerData = (isUpdateState) => {
        var _answer = this.state.answer;

        var self = this;
        if (self.editorInstance != null && typeof self.editorInstance.GetDataForSave == "function") {
            _answer = self.editorInstance.GetDataForSave();
        }
        else if (typeof $ != 'undefined') {
            _answer = $("#id").vceditor('GetDataForSave');
        }

        if (isUpdateState) {
            this.setState({answer: _answer});
        }
        return _answer;
    }
    
    render(){
        var self = this;
        return(
            <textarea id="test" ref={function (el) { self.txtContent = el }}>{this.state.answer}</textarea>
        );
    }
}

export default Editor;