import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { calculateAge, formatDate } from "../utils/helpers";

const WardList = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { members } = useSelector((state) => state.members);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const columns = [
    { field: "preferredName", headerName: "Preferred Name", width: 250 },
    { field: "gender", headerName: "Gender", width: 75 },
    { field: "age", headerName: "Age", width: 75 },
    { field: "birthday", headerName: "Birthday", width: 100 },
    { field: "phone", headerName: "Phone Number", width: 150 },
    { field: "email", headerName: "E-mail", width: 300 },
  ];

  const rows = members.map((member, index) => {
    //Calculate age
    const age = calculateAge(member.birthDate);

    //format birthday
    const birthday = formatDate(member.birthDate, "LLL d");

    return { ...member, ...{ id: index, age, birthday } };
  });

  const handleRowClick = (params) => {
    navigate("/member/" + params.row._id);
  };

  return (
    <>
      <div style={{ height: 820, width: "100%" }}>
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
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WardList;
