function setCount(counter, count) {
  counter.innerHTML = count > 0 ? count : ''
}

exports.start = (counter, downFrom, done) => {
  for (let i = 0; i <= downFrom; ++i) {
    setTimeout(_ => {
      const count = downFrom - i
      setCount(counter, count)
      if (i === downFrom)
        done()
    }, i * 1000)
  }
}
