import { DataGrid } from "@mui/x-data-grid";

const PreviewFile = ({ file }) => {
  const columns = [
    { field: "PreferredName", headerName: "Preferred Name", width: 150 },
    { field: "Address-Street1", headerName: "Address", width: 150 },
    { field: "Age", headerName: "Age", width: 150 },
    { field: "BirthDate", headerName: "Birth Date", width: 150 },
  ];

  const rows = file.data.map((row, index) => {
    return { ...{ id: index }, ...row };
  });
  // const columns = [
  //   { field: "col1", headerName: "Column 1", width: 150 },
  //   { field: "col2", headerName: "Column 2", width: 150 },
  // ];

  // const rows = [
  //   { id: 1, col1: "Hello", col2: "World" },
  //   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  //   { id: 3, col1: "MUI", col2: "is Amazing" },
  // ];
  return (
    <>
      <div>{file.filename}</div>
      {/* <div>
        {file.data.map((data, index) => {
          return <div key={index}>{data.PreferredName}</div>;
        })}
      </div> */}

      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </>
  );
};

export default PreviewFile;
