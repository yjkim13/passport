var f = function f1(){
  console.log(1+1);
  console.log(2+1);
}
var a = [f];
a[0]();

var o = { //객체에 함수 넣기
  func : f
}
o.func();
