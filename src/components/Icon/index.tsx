import classnames from "classnames";

//字体图标名字

interface InconProps {
  //要显示的字体图标名字
  name: string;
  //自定义的class样式类
  className?: string;
  //点击事件监听函数
  onclick?: () => void;
}
// props: InconProps结构成{className,onclick,name}


const Icon = ({className,onclick,name}: InconProps) => {

  return (
    
    // <svg className={"icon" + props.className} aria-hidden="true" onClick={props?.onclick}>
    //   <use xlinkHref={`#${props.name}`}></use>
    // </svg>
    <svg
      className={classnames("icon", className)}
      aria-hidden="true"
      onClick={onclick}
    >
      <use xlinkHref={`#${name}`}></use>
     
    </svg>
  );
};
export default Icon;
