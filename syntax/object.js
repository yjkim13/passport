var members = ['kim', 'lee', 'park'];
console.log(members[1]);
var i = 0;
while(i < members.length){
  console.log('array loop :', members[i]);
  i = i + 1;
} // array는 대괄호

var roles = {
  'programmer' : 'kim',
  'designer' : 'lee',
  'manager' : 'park'
}
//object(객체)는 중괄호

console.log(roles.designer);
console.log(roles['designer']);


for(var name in roles){//객체는 in을 필수로 쓰기
  console.log('object : ', name, 'value : ', roles[name]);

}
