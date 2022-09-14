const FileRowButtons = (props) => {
  const { onClickDelete, onClickPreview, onClickConfirmImport } = props;
  return (
    <div className="file-row-buttons">
      <button onClick={onClickPreview}>Preview</button>
      <button onClick={onClickConfirmImport}>Import</button>
      <button onClick={onClickDelete}>Delete</button>
    </div>
  );
};

export default FileRowButtons;
