import classnames from "classnames";
import { useEffect, useRef, useState } from "react";
import Icon from "../../../components/Icon";
import styles from "./index.module.scss";
// import { entries } from "lodash";

type Props = {
  src: string;
  className?: string;
};
/**
 * 拥有懒加载特性的图片组件
 * @param {String} props.src 图片地址
 * @param {String} props.className 样式类
 */
const Image = ({ src, className }: Props) => {
  // 记录图片加载是否出错的状态
  const [isError, setIsError] = useState<boolean>(false);

  // 记录图片是否正在加载的状态
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 对图片元素的引用
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    //创建IntersectionObserver，监听当前组件的img标签
    const observer = new IntersectionObserver((entries) => {
      console.log(entries);

      for (const entry of entries) {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;

          //判断当前img是否已经有src属性了，如果有了，则不再进行设置
          // if (!img.src) {

          img.src = img.dataset.src || "";
          // }

          // observer.disconnect();

          return () => {
            observer.disconnect();
          };
        }
      }
    });

    //在组件销毁时，关闭监听
    observer.observe(imgRef.current!);
  }, []);

  return (
    <div className={classnames(styles.root, className)}>
      {/* 正在加载时显示的内容 */}
      {isLoading && (
        <div className="image-icon">
          <Icon name="iconphoto" />
        </div>
      )}

      {/* 加载出错时显示的内容 */}
      {isError && (
        <div className="image-icon">
          <Icon name="iconphoto-fail" />
        </div>
      )}

      {/* 加载成功时显示的内容 */}
      {!isError && (
        <img
          alt=""
          data-src={src}
          ref={imgRef}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsError(true)}
        />
      )}
    </div>
  );
};

export default Image;
