export function handleChildTextNodeType (childNode) {
  return typeof childNode === 'object' ? childNode : {
    tag: 'textNode',
    props: {
      nodeValue: childNode,
      children: []
    }
  }
}