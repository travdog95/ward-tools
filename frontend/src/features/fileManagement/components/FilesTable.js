import FileTableRow from "./FileTableRow";

const FilesTable = (props) => {
  const files = props.files;
  return (
    <div>
      <div>Files</div>
      {files.forEach((file) => {
        <FileTableRow file={file} />;
      })}
    </div>
  );
};

export default FilesTable;
