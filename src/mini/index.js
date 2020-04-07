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

function render (vdom, container) {
  let { tag, props } = vdom
  // 创建元素
  let dom = vdom.type === 'textNode' ? document.createTextNode('') : document.createElement(tag)
  // 元素属性创建
  Object.keys(props)
    .filter(key => key !== 'children')
    .forEach(key => {
      dom[key] = props[key]
      // dom && dom.setAttribute([key], props[key])
    })
  // 递归子元素
  props.children.forEach(child => {
    render(child, dom)
  })
  container.appendChild(dom)
  // container.innerHTML = `<pre>${JSON.stringify(vdom)}</pre>`
}



export default {
  createElement,
  render
}