// import React, { Component } from "React";
// import ReactDOM from "React-dom";

// class DialogEditRight extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     render() {
//         var { isOpenFormEdit, post } = this.props;
//         var edit_profile =
//             <div className="scrollbar-account-edit-right" id="my-style">
//                 <div className="edit-detail">
//                     <i className="icon_edit" />
//                     <div className="edit-avatar-info" style={{ background: 'url("http://demoims2.cnnd.vn/Statics/images/avatar.png") center center / cover no-repeat white' }}>
//                     </div>
//                     <div className="edit-username">
//                         TrangnvEdit
//                 </div>
//                     <div className="edit-info-item">
//                         <div className="edit-info-item-left">Họ tên</div>
//                         <div className="right">:<span className="ims-input"><input type="text" defaultValue="Ngô văn Tráng" /></span></div>
//                     </div>
//                     <div className="edit-info-item">
//                         <div className="edit-info-item-left">Email</div>
//                         <div className="right">:<span className="ims-input"><input type="text" defaultValue="" /></span></div>
//                     </div>
//                     <div className="edit-info-item">
//                         <div className="edit-info-item-left">Địa chỉ</div>
//                         <div className="right">:<span className="ims-input"><input type="text" defaultValue="" /></span></div>
//                     </div>
//                     <div className="edit-info-item">
//                         <div className="edit-info-item-left">Điện thoại</div>
//                         <div className="right">:<span className="ims-input"><input type="text" defaultValue="0392483272" /></span></div>
//                     </div>
//                 </div>
//             </div>
//         if (isOpenFormEdit && post) {
//             edit_profile = null;
//             var edit_Power =
//                 <div className="config-modal-main-section usermodal-main-section">
//                     <div className="permissions" >
//                         <div className="content">
//                             <div className="col_left active">
//                                 <div className="title">
//                                     Quản lý bài viết
//                                 </div>
//                                 <div className="scroll-wrapper">
//                                     <div className="scroll-wrapper-view">
//                                         <div className="conten2">
//                                             <div className="list">
//                                                 <div className="noselect item active">
//                                                     <div className="col_name">Phóng viên </div>
//                                                     <div className="col_extra">
//                                                         <span className="ims-checkbox noselect">
//                                                             <input type="checkbox" name="" value=""></input>
//                                                             <label className="checkbox-label" for="checkbox_a2nn" title="Gửi vượt cấp" >
//                                                                 Gửi vượt cấp
//                                                             </label>
//                                                         </span>
//                                                     </div>
//                                                     <div className="jsx-flipswitch on">
//                                                         <i></i>
//                                                         <input type="checkbox" className="display-none" value="on"></input>
//                                                     </div>
//                                                 </div>
//                                                 <div className="noselect item">
//                                                     <div className="col_name" >Bien tap vien</div>
//                                                     <div className="jsx-flipswitch on">
//                                                         <i></i>
//                                                         <input type="checkbox" className="display-none" value="on"></input>
//                                                     </div>
//                                                 </div>
//                                                 <div className="noselect item">
//                                                     <div className="col_name" >Thu ky</div>
//                                                     <div className="jsx-flipswitch on">
//                                                         <i></i>
//                                                         <input type="checkbox" className="display-none" value="on"></input>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="list special"></div>
//                                         </div>
//                                     </div>
//                                     <div className="scroll-wrapper-2">
//                                     </div>
//                                     <div className="scroll-wrapper-3">
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col_right active">
//                                 <div className="col_header"> Biên tập viên</div>
//                                 <div className="list">

//                                     <div className="item">
//                                         <input type="checkbox" className="ims-checkbox IMSSmall" id="PermissionZoneCheckAll" value="on"></input>
//                                         <label className="ims-checkboxlabel ims-checkall" for="PermissionZoneCheckAll">Tat ca cac chuyen muc</label>
//                                     </div>
//                                     <div className="item">
//                                         <input type="checkbox" className="ims-checkbox IMSSmall" id="PermissionZone_13" value="on"></input>
//                                         <label className="ims-checkboxlabel " title for="PermissionZone_13">Me va be</label>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//         }
//         return (
//             <div className="edit-detail">
//                 <i className="icon_edit" />
//                 <div className="edit-avatar-info" style={{ background: 'url("http://demoims2.cnnd.vn/Statics/images/avatar.png") center center / cover no-repeat white' }}>
//                 </div>
//                 <div className="edit-username">
//                     TrangnvEdit
//                         </div>
//                 <div className="edit-info-item">
//                     <div className="edit-info-item-left">Họ tên</div>
//                     <div className="right">:<span className="ims-input"><input type="text" defaultValue="Ngô văn Tráng" /></span></div>
//                 </div>
//                 <div className="edit-info-item">
//                     <div className="edit-info-item-left">Email</div>
//                     <div className="right">:<span className="ims-input"><input type="text" defaultValue="" /></span></div>
//                 </div>
//                 <div className="edit-info-item">
//                     <div className="edit-info-item-left">Địa chỉ</div>
//                     <div className="right">:<span className="ims-input"><input type="text" defaultValue="" /></span></div>
//                 </div>
//                 <div className="edit-info-item">
//                     <div className="edit-info-item-left">Điện thoại</div>
//                     <div className="right">:<span className="ims-input"><input type="text" defaultValue="0392483272" /></span></div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default DialogEditRight;