var bizlogic = {
  // 是否是本地
  isLocal: true,
  // 是否是正式
  isFormal: false, // isLocal:false 时才有效
 
  // 本地测试地址 
  local_update_avatar: 'https://10.25.205.153:443/user/person-info/update-avatar', 
  local_update_person_info: 'https://10.25.205.153:443/user/person-info/update',
  local_query: 'https://10.25.205.153:443/user/person-info/query',
  local_login: 'https://10.25.205.153:443/user/index/login',
 
  // 服务器地址 
  formal_update_avatar: '', 
  formal_update_person_info: '',
  formal_query: '',
  formal_login: '',
};
var update_avatar= '',
update_person_info = '',
query ='',
login = ''
;
 
// 判断是否是本地
if (bizlogic.isLocal == true) {
  update_avatar = bizlogic.local_update_avatar;
  update_person_info = bizlogic.local_update_person_info;
  query = bizlogic.local_query;
  login = bizlogic.local_login;
} else {
  update_avatar = bizlogic.formal_update_avatar;
  update_person_info = bizlogic.formal_update_person_info;
  query = bizlogic.formal_query;
  login = bizlogic.formal_login;
};
 
 
module.exports = {
  update_avatar : update_avatar,
  update_person_info : update_person_info,
  query : query,
  login :login
};