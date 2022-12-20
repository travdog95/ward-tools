import { useSelector } from "react-redux";

// import { importPrayerData } from "../importDataSlice";
// const prayersDataFile = require("./MC6Prayers.json");
const ImportPrayerData = () => {
  // const dispatch = useDispatch();

  const { isLoading, message, isError, prayerData } = useSelector((state) => state.importData);

  // const handleImportClick = () => {
  //   dispatch(importPrayerData(prayersDataFile));
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error(message);
    return <div>Error importing Prayer Data!</div>;
  }

  return (
    <>
      {/* <button onClick={handleImportClick}>Import Prayer Tracker Data</button> */}
      {prayerData.data &&
        prayerData.data.map((data, index) => {
          return (
            <div key={index}>
              <div>{data.Name}</div>
              {data.prayerDates.map((prayerDate, index) => {
                return <div key={index}>{prayerDate}</div>;
              })}
            </div>
          );
        })}
    </>
  );
};

export default ImportPrayerData;
