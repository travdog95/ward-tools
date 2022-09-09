const FileRowButtons = (props) => {
  const { onClickDelete, onClickPreview } = props;
  return (
    <div className="file-row-buttons">
      <button onClick={onClickPreview}>Preview</button>
      <button onClick={onClickDelete}>Delete</button>
    </div>
  );
};

export default FileRowButtons;
