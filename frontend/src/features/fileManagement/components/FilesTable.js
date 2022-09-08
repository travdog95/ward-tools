import FileTableRow from "./FileTableRow";

const FilesTable = (props) => {
  const { files } = props;
  return (
    <>
      <div>Files</div>
      {files.map((file, index) => {
        return <FileTableRow key={index} file={file} />;
      })}
    </>
  );
};

export default FilesTable;
