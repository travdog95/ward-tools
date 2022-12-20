import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";

import { calculateAge } from "../../utils/helpers";

const MissionariesTable = (props) => {
  const { missionaries } = props;

  const navigate = useNavigate();

  const handleRowClick = (params) => {
    navigate("/member/" + params.row._id);
  };

  const columns = [
    {
      field: "preferredName",
      headerName: "Preferred Name",
      width: 250,
      headerClassName: "data-grid-header",
    },
    { field: "gender", headerName: "Gender", width: 100, headerClassName: "data-grid-header" },
    {
      field: "birthDate",
      headerName: "Age",
      width: 75,
      valueFormatter: (params) => {
        return calculateAge(params.value);
      },
      headerClassName: "data-grid-header",
    },
  ];

  const rows = missionaries.map((member, index) => {
    return { ...member, ...{ id: index } };
  });

  return (
    <>
      <div style={{ height: 850, width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick}
              components={{ Toolbar: GridToolbarQuickFilter }}
              density="compact"
              rowsPerPageOptions={[20, 50, 100]}
              initialState={{
                pagination: { pageSize: 20 },
                sorting: { sortModel: [{ field: "preferredName", sort: "asc" }] },
              }}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MissionariesTable;
