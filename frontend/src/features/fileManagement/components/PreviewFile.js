import { DataGrid } from "@mui/x-data-grid";

const PreviewFile = ({ file }) => {
  const columns = [
    { field: "PreferredName", headerName: "Preferred Name", width: 250 },
    { field: "Gender", headerName: "Gender", width: 75 },
    { field: "Age", headerName: "Age", width: 75 },
    { field: "BirthDate", headerName: "Birth Date", width: 150 },
    { field: "IndividualPhone", headerName: "Phone Number", width: 150 },
    { field: "IndividualE-mail", headerName: "E-mail", width: 250 },
  ];

  const rows = file.data.map((row, index) => {
    return { ...{ id: index }, ...row };
  });

  return (
    <div style={{ height: 820, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            density="compact"
            rowsPerPageOptions={[20, 50, 100]}
            initialState={{
              pagination: { pageSize: 20 },
              sorting: { sortModel: [{ field: "preferredName", sort: "asc" }] },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewFile;
