/**
 * 用于挂载dom节点
 */
import ReactDOMClient from 'react-dom/client';

export interface SimplePortalProps {
  /**父节点id*/
  id?: string;

  /**渲染内容*/
  children: React.ReactNode;
  /**自动移除dom时间 当设为 0 时不自动关闭*/
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

const rootSimpleMap: Map<string, HTMLDivElement> = new Map([]);

/**用于添加渲染dom节点操作*/
export class SimplePortal {

  /**父节点id*/
  id: string = 'root-simple-portal';
  /**渲染内容*/
  children: React.ReactNode = '';
  /**自动移除dom时间*/
  timeout?: number = 3000;
  /**子节点渲染*/
  child?: HTMLDivElement;
  timer?: NodeJS.Timeout;
  root?: ReactDOMClient.Root;
  /**根节点className*/
  rootClassName?: string
  /**节点className*/
  className?: string;
  /**根节点样式*/
  rootStyles?: string
  /**节点样式*/
  style?: string

  setOptions(props: SimplePortalProps) {
    if (props?.id) {
      this.id = props.id;
    }
    if (props?.rootClassName) {
      this.rootClassName = props.rootClassName;
    }
    if (props?.className) {
      this.className = props.className;
    }
    if (props?.rootStyles) {
      this.rootStyles = props.rootStyles;
    }
    if (props?.style) {
      this.style = props.style;
    }
    this.children = props.children;
    this.timeout = typeof props.timeout === 'number' ? props.timeout : 3000;
  }

  private setDOMAttribute(dom: HTMLElement, name: string, value: string) {
    if (value)
      dom.setAttribute(name, value)
  }

  /**创建子节点*/
  private createChildDOM() {
    const dom = document.getElementById(this.id);
    /**
     * 如果存在 dom 则创建一个子dom节点用于渲染
     * 如果不存在则创建一个父节点和子节点  父节点添加body中，子节点添加到父节点里面
     */
    if (!dom) {
      // 创建父节点
      const newDom = document.createElement('div');
      this.setDOMAttribute(newDom, "id", this.id)
      this.setDOMAttribute(newDom, "class", this.rootClassName)
      /**创建挂载渲染内容的子节点*/
      this.child = document.createElement('div');
      this.setDOMAttribute(this.child, "class", this.className)
      // 把子节点放入父节点中
      newDom.appendChild(this.child);
      // 把节点放入body中
      document.body.appendChild(newDom);
      /**重新存储节点*/
      rootSimpleMap.set(this.id, newDom);
    } else {
      /**创建子节点*/
      this.child = document.createElement('div');
      /**把子节点放入父节点中*/
      dom.appendChild(this.child);
      this.setDOMAttribute(dom, "class", this.rootClassName)
      this.setDOMAttribute(this.child, "class", this.className)
    }
    return this.child;
  }
  /**挂载*/
  mount() {
    /**判断是否已经存在节点*/
    if (!this.child) {
      this.createChildDOM();
    } else {
      clearTimeout(this.timer);
    }
    if (this.child) {
      // 使用子节点进行挂载渲染
      if (!this.root) {
        this.root = ReactDOMClient.createRoot(this.child!);
      }
      this.root.render(this.children);
      if (this.timeout !== 0) {
        this.close();
      }
    }
  }
  /**卸载*/
  unmount() {
    if (this.child) {
      // 卸载创建的Root
      this.root?.unmount();
      // 移除子节点
      this.child.remove();
      // 子节点置空
      this.child = undefined;
      // 挂载置空
      this.root = undefined;
      // 获取挂载父节点
      const root = rootSimpleMap.get(this.id);
      // 移除挂载节点
      if (root && root.childNodes.length === 0) {
        root.remove();
      }
    }
  }
  /**自动关闭*/
  private close() {
    this.timer = setTimeout(() => {
      this.unmount();
    }, this.timeout);
  }
}
