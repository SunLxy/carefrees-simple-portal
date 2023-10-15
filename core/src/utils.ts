import { cloneElement, isValidElement } from 'react';
import { Portal } from '.';
let OpenRootDom: Map<string, Portal> = new Map([]);
export const OpenPortal = (options: {
  rootName: string;
  children: React.ReactNode;
  isOnly?: boolean;
  timeout?: number;
}) => {
  const { rootName, children, isOnly = true, timeout = 0 } = options;
  let rootDOM = OpenRootDom.get(rootName);
  /**仅展示一个节点*/
  if (!isOnly) {
    rootDOM = new Portal();
  }
  /**判断节点是否存在，不存在则进行新增一个*/
  if (!rootDOM) {
    rootDOM = new Portal();
  }
  OpenRootDom.set(rootName, rootDOM);
  const onRequestClose = () => {
    rootDOM?.hide();
  };
  rootDOM.setOptions({
    id: rootName,
    children: isValidElement(children) ? cloneElement(children, { onRequestClose } as any) : children,
    timeout,
  });
  rootDOM.show();
  return rootDOM;
};
