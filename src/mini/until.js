export function handleChildTextNodeType (childNode) {
  return typeof childNode === 'object' ? childNode : {
    type: 'textNode',
    props: {
      nodeValue: childNode,
      children: []
    }
  }
}