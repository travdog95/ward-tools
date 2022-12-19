// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";

import { calculateAge, formatDate, isYouth, calcAndFormatDuration } from "../../utils/helpers";
// import { updateMember } from "../members/membersSlice";

const SpeakerTrackerTable = (props) => {
  const { speakers } = props;

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { isUpdating } = useSelector((state) => state.members);

  // const handleWillingUpdate = (row) => {
  //   dispatch(updateMember({ id: row._id, isWillingToSpeak: !row.isWillingToSpeak }));
  // };

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
      width: 100,
      valueFormatter: (params) => {
        return calculateAge(params.value);
      },
      headerClassName: "data-grid-header",
    },
    {
      field: "type",
      headerName: "Adult/Youth",
      width: 130,
      valueGetter: (params) => {
        return isYouth(params.row.birthDate) ? "Youth" : "Adult";
      },
      headerClassName: "data-grid-header",
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
      headerClassName: "data-grid-header",
    },
    {
      field: "talkCount",
      headerName: "Talks Given",
      width: 100,
      headerClassName: "data-grid-header",
    },
    {
      field: "isWillingToSpeak",
      headerName: "Willing",
      width: 120,
      renderCell: (params) => {
        const label = params.value ? "Yes" : "No";
        return (
          <>
            <div className="switch-label">{label}</div>
            {/* <button className="btn btn-small" onClick={() => handleWillingUpdate(params.row)}>
              Toggle
            </button> */}
          </>
        );
      },
      headerClassName: "data-grid-header",
    },
  ];

  const rows = speakers.map((member, index) => {
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
                pagination: { pageSize: 50 },
                sorting: { sortModel: [{ field: "lastTalkDate", sort: "asc" }] },
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

export default SpeakerTrackerTable;
