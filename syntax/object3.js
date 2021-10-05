var q = {
  v1 : 'v1',
  v2 : 'v2',
  f1:function () {
    console.log(this.v1); // 자기 자신이 속해있는 함수의 값을 불러올 수 있도록
  },
  f2:function () {
    console.log(this.v2);
  }
}

q.f1();
q.f2();
