import styles from "./index.module.scss";

type EditListProps = {
  onCancel: () => void;
  type: "" | "gender" | "photo";
  onSelect: (type: string, val: number) => void;
};
const EditList = ({ type, onCancel, onSelect }: EditListProps) => {
  const editCancel = () => {
    onCancel();
  };

  

  return (
    <div className={styles.root}>
      {type === "photo" && (
        <>
          <div className="list-item" onClick={() => onSelect(type, 0)}>
            本地上传
          </div>
          <div className="list-item" onClick={() => onSelect(type, 1)}>
            拍照
          </div>
          {/* <div className="list-item" onClick={() => onSelect(type, 1)}>
            用小玉宝宝最喜欢的小猫头像
          </div> */}
          <div className="list-item" onClick={editCancel}>
            取消
          </div>
        </>
      )}

      {type === "gender" && (
        <>
          <div className="list-item" onClick={() => onSelect(type, 0)}>
            男
          </div>
          <div className="list-item" onClick={() => onSelect(type, 1)}>
            女
          </div>

          <div className="list-item" onClick={editCancel}>
            取消
          </div>
        </>
      )}
    </div>
  );
};

export default EditList;
