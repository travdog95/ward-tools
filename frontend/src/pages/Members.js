import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { calculateAge, formatDate } from "../utils/helpers";

import Spinner from "../components/Spinner";
import { getMembers } from "../features/members/memberSlice";

const Members = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { members, isLoading, isError, message, isSuccess } = useSelector((state) => state.member);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && message) {
      toast.success(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getMembers());

    // return () => {
    //   dispatch(reset())
    // }
  }, [user, navigate, message, isError, dispatch, isSuccess]);

  if (isLoading) {
    return <Spinner />;
  }
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
      <div>Members</div>
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

export default Members;
