import { handleChildTextNodeType } from './until'
function createElement (type, props, ...children) {
  delete props.__source
  delete props.__self
  return {
    tag: type,
    props: {
      ...props,
      children: children.map(child => handleChildTextNodeType(child))
    }
  }
}
/**
 *  fiber: 异步队列调用，提高用户体验。
 *  把任务拆分,执行优先级高的任务（用户手势、动画等）
 *  
 * callback： 浏览器空闲时间执行回调函数
 * optiosn: object类型，参数timeout
 *  window.requestIdleCallback(callback,[options])
 * 
 */
let nextUnitOfWork = null
function workLoop (dealine) {
  while (nextUnitOfWork /** && dealine.timeRemaining() > 1*/) {
    nextUnitOfWork = prefromUnitOFWork(nextUnitOfWork)
  }
  requestIdleCallback(workLoop)
}
/**
 * 根据当前任务，获取下一个任务
 * @param {*} fiber 
 */
function prefromUnitOFWork (fiber) {
  // render 函数初始化是有dom的。其他要创建dom
  if (!fiber.dom) {
    // 以虚拟vdom来创建真实dom
    fiber.dom = createDom(fiber)
  }
  if (fiber.parent) {
    // 添加dom到页面
    fiber.parent.dom.appendChild(fiber.dom)
  }
  /** -------------  fiber构建  ------------- */
  let nextFiber = null
  let index = 0
  let elements = fiber.props.children
  let prevSibling = null
  while (index < elements.length) {
    // 根据vdom创建fiber链表结构的vdom
    let element = elements[index]
    nextFiber = {
      dom: null,
      tag: element.tag,
      parent: fiber,
      props: element.props
    }
    // 父元素的子元素（只有一个并且是第一个children）
    if (index === 0) {
      fiber.child = nextFiber
    } else {
      prevSibling.sibling = nextFiber
    }
    prevSibling = nextFiber
    index++
  }
  /** -------------  fiber构建完毕 ------------- */

  // 查找任务
  // fiber 遍历 
  // 子 =》 兄弟 =》 没有兄弟了 =》 
  if (fiber.child) {
    return fiber.child
  }
  let nexrWork = fiber
  while (nexrWork) {
    if (nexrWork.sibling) {
      return nexrWork.sibling
    }
    // 再到父元素中查找一遍，形成了向上循环
    nexrWork = nexrWork.parent
  }
}
// fiber = {
//   dom:
//   child:
//   parent:
//   sibling:
// }
requestIdleCallback(workLoop)
/**
 * 
 * @param {虚拟dom} vdom 
 * 
 * tag是textNode 创建文本
 */
function createDom (vdom) {
  let { tag, props } = vdom
  // 创建元素
  let dom = vdom.tag === 'textNode'
    ? document.createTextNode('')
    : document.createElement(tag)
  // 元素属性创建
  Object.keys(props)
    .filter(key => key !== 'children')
    .forEach(key => {
      dom[key] = props[key]
      // dom && dom.setAttribute([key], props[key])
    })
  return dom
}
function render (vdom, container) {

  // 递归子元素
  // props.children.forEach(child => {
  //   render(child, dom)
  // })
  // container.appendChild(dom)
  // container.innerHTML = `<pre>${JSON.stringify(vdom)}</pre>`

  //  初始化一个任务
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [vdom]
    }
  }
}



export default {
  createElement,
  render
}