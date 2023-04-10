var prefix = 'https://10.25.205.153:443'

var bizlogic = {
  // 是否是本地
  isLocal: true,
  // 是否是正式
  isFormal: false, // isLocal:false 时才有效
  // 本地测试地址 

  local_update_avatar: prefix + '/user/person-info/update-avatar', 
  local_update_person_info: prefix + '/user/person-info/update',
  local_query: prefix + '/user/person-info/query',
  local_login: prefix + '/user/index/login',
  local_appointment_add: prefix + '/appointment/add',
  local_appointment_query: prefix + '/appointment/query',
  local_appointment_justify: prefix + '/appointment/justify',
 
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
  appointment_add = bizlogic.local_appointment_add;
  appointment_query = bizlogic.local_appointment_query;
  appointment_justify = bizlogic.local_appointment_justify;
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
  login :login,
  appointment_add : appointment_add,
  appointment_query : appointment_query,
  appointment_justify : appointment_justify
}