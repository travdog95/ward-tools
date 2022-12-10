import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";

import { calculateAge, formatDate, isYouth, calcAndFormatDuration } from "../../utils/helpers";

const SpeakerTrackerTable = (props) => {
  const { speakers } = props;

  const columns = [
    { field: "preferredName", headerName: "Preferred Name", width: 250 },
    { field: "gender", headerName: "Gender", width: 75 },
    {
      field: "birthDate",
      headerName: "Age",
      width: 75,
      valueFormatter: (params) => {
        return calculateAge(params.value);
      },
    },
    {
      field: "type",
      headerName: "Adult/Youth",
      width: 100,
      valueGetter: (params) => {
        return isYouth(params.row.birthDate) ? "Youth" : "Adult";
      },
    },
    {
      field: "lastTalkDate",
      headerName: "Last Spoke",
      width: 280,
      type: "date",
      valueFormatter: (params) => {
        if (params.value) {
          const formattedDate = formatDate(params.value, "LLL d yyyy");
          const itHasBeen = calcAndFormatDuration(params.value);
          return `${formattedDate} (${itHasBeen})`;
        } else {
          return "";
        }
      },
    },
    {
      field: "isWillingToSpeak",
      headerName: "Willing",
      width: 75,
      valueFormatter: (params) => {
        return params.value ? "Yes" : "No";
      },
    },
  ];

  const rows = speakers.map((member, index) => {
    return { ...member, ...{ id: index } };
  });

  return (
    <>
      <div style={{ height: 820, width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              // onRowClick={handleRowClick}
              components={{ Toolbar: GridToolbarQuickFilter }}
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
    </>
  );
};

export default SpeakerTrackerTable;
