const res = (value) => value
const rej = (value) => value
const run = (fn) => fn(res, rej)
const PromiseTest = (fn) => {
  let res = {}
  fn((value) => {
    res['value'] = value;
  })
  
  return {getValue: () => res['value']}
}


const defer = (res) => (callback) => (p) => {
  if (p.getValue()) {
    res(callback(p.getValue()))
  } else {
    setTimeout(() => defer(res)(callback)(p), 100);
  }
}

const then = (p) => (callback) => {
  return PromiseTest((res, rej) => {
    if (p.getValue()) {
        res(callback(p.getValue()))
    } else {
        setTimeout(() => defer(res)(callback)(p), 100);
    }
    
  })
}
                                
                                
const data = PromiseTest((res, rej) => {
  console.log('execute')
  // res(1)
  setTimeout(() => res(1), 100);
    });

then(data)(e => console.log(e))
then(data)(e => console.log(e))

then(then(data)(e => e * 4))(e => console.log(e))
