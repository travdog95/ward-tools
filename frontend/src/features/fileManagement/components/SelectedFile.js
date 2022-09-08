const SelectedFile = (props) => {
  return (
    <div>
      <h2>File Details:</h2>

      <p>File Name: {props.data.name}</p>

      <p>File Type: {props.data.type}</p>

      <p>Last Modified: {props.data.lastModifiedDate.toDateString()}</p>
    </div>
  );
};

export default SelectedFile;
