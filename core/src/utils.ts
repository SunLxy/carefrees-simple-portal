import { cloneElement, isValidElement } from 'react';
import { SimplePortal } from './portal';

const OpenRootDom: Map<string, SimplePortal> = new Map([]);

export interface OpenSimplePortalOption {
  /**根节点id*/
  rootId?: string;
  children: React.ReactNode;
  /**是否只把展示内容进行替换，不显示多个弹框之类的*/
  isOnly?: boolean;
  /**自动移除dom时间*/
  timeout?: number;
  /**根节点className*/
  rootClassName?: string
  /**节点className*/
  className?: string;
  /**根节点样式*/
  rootStyles?: string
  /**节点样式*/
  style?: string
}

export const openSimplePortal = (options: OpenSimplePortalOption) => {
  const { rootId, children, isOnly = true, timeout = 0, ...rest } = options;
  let rootDOM = OpenRootDom.get(rootId);
  /**仅展示一个节点*/
  if (!isOnly) {
    rootDOM = new SimplePortal();
  }
  /**判断节点是否存在，不存在则进行新增一个*/
  if (!rootDOM) {
    rootDOM = new SimplePortal();
  }
  OpenRootDom.set(rootId, rootDOM);
  const onRequestClose = () => {
    rootDOM?.unmount();
  };
  rootDOM.setOptions({
    ...rest,
    id: rootId,
    children: isValidElement(children) ? cloneElement(children, { onRequestClose } as any) : children,
    timeout,
  });
  rootDOM.mount();
  return rootDOM;
};
