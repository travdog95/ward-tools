const FileDetails = (props) => {
  return (
    <div>
      <h2>Uploaded File Details</h2>
      <p>New File Name: {props.file.filename}</p>
    </div>
  );
};

export default FileDetails;
