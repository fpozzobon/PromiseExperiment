const PromiseTest = (fn) => {
  let res = {successFn: (value) => null, errorFn: (value) => null}
  fn((value) => {
    res['value'] = value;
    res.successFn(value)
  }, (err) => {
    res['error'] = err;
    res.errorFn(err)
  })
  
  const nestFn = (propertyName) => (_fn) => (_cbk) => {
    const prev = res[propertyName]
    res[propertyName] = (value) => {
      prev(value);
      _cbk ? _fn(_cbk(value)) : _fn(value);
    }
  }
  
  const resolve = (_res) => (_rej) => (_callback) => (_error) => {
    if(res['value']) {
      _res(_callback(res['value']));
    } else if(res['error']) {
      _error ? _rej(_error(res['error'])) : _rej(res['error']);
    } else {
      nestFn('successFn')(_res)(_callback)
      nestFn('errorFn')(_rej)(_error)
    }
  }
  
  return {resolve: resolve}
}


const then = (p) => (callback, error) => {
  return PromiseTest((res, rej) => {
    p.resolve(res)(rej)(callback)(error)
  })
}
                                
                                
const data = PromiseTest((res, rej) => {
  console.log('execute')
  // res(1)
  setTimeout(() => res(1), 100);
    });

then(data)(e => console.log(e))
then(data)(e => console.log(e))

then(then(data)(e => e * 4, e => "test"))(e => console.log(e), e => console.log("Error " + e))
