const PromiseTest = (fn) => {
  let res = {}
  fn((value) => {
    res['value'] = value;
  }, (err) => {
    res['error'] = err;
  })
  
  return {getValue: () => res['value'], getError: () => res['error']}
}


const defer = (res) => (rej) => (callback) => (error) => (p) => {
  if (p.getValue()) {
    res(callback(p.getValue()))
  } else if (p.getError()) {
      error ? rej(error(p.getError())): rej(p.getError());
  } else {
    setTimeout(() => defer(res)(rej)(callback)(error)(p), 100);
  }
}

const then = (p) => (callback, error) => {
  return PromiseTest((res, rej) => {
    if (p.getValue()) {
      res(callback(p.getValue()))
    } else if (p.getError()) {
      error ? rej(error(p.getError())): rej(p.getError());
    } else {
        setTimeout(() => defer(res)(rej)(callback)(error)(p), 100);
    }
    
  })
}
                                
                                
const data = PromiseTest((res, rej) => {
  console.log('execute')
  res(1)
  setTimeout(() => res(1), 100);
    });

then(data)(e => console.log(e))
then(data)(e => console.log(e))

then(then(data)(e => e * 4, e => "test"))(e => console.log(e), e => console.log("Error " + e))
