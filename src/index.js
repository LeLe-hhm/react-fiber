

// import React from 'react'
// import ReactDom from 'react-dom'

/**
 * 
 * Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。
 * 
 * 
 * 
 */

import React from './mini'

let ReactDom = React

let App = <div id="root">
  <h2 data-title='MINI'>REACT-SLOWER</h2>
  <div className='text-firx'><span>嵌套</span></div>
  <a href="https://www.baidu.com">go</a>
</div>

ReactDom.render(App, document.getElementById('root'))