const SelectedFile = (props) => {
  return (
    <div className="form-group">
      <button className="btn btn-block" onClick={props.onClick}>
        Upload File
      </button>
    </div>
  );
};

export default SelectedFile;
