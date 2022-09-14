import { DataGrid } from "@mui/x-data-grid";

const PreviewFile = ({ file }) => {
  const columns = [
    { field: "PreferredName", headerName: "Preferred Name", width: 200 },
    { field: "Address-Street1", headerName: "Address", width: 200 },
    { field: "Age", headerName: "Age", width: 50 },
    { field: "BirthDate", headerName: "Birth Date", width: 120 },
  ];

  const rows = file.data.map((row, index) => {
    return { ...{ id: index }, ...row };
  });

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[25, 50, 100]}
        initialState={{
          pagination: { pageSize: 25 },
        }}
      />
    </div>
  );
};

export default PreviewFile;
