var M = {
  v:'v',
  f:function() {
    console.log(this.v);
  }
}

module.exports = M; // 밖에서 M을 사용가능하게 한다.
