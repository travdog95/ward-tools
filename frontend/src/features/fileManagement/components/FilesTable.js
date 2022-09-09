import FileTableRow from "./FileTableRow";

const FilesTable = (props) => {
  const { files } = props;
  return (
    <>
      <h2>Files</h2>
      {files.map((file, index) => {
        return <FileTableRow key={index} file={file} />;
      })}
    </>
  );
};

export default FilesTable;
