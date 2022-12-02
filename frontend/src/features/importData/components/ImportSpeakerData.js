import { useSelector } from "react-redux";

// import { importSpeakerData } from "../importDataSlice";
// const speakerDataFile = require("./speakerTrackerData.json");

const ImportSpeakerData = () => {
  // const dispatch = useDispatch();

  const { isLoading, message, isError } = useSelector((state) => state.importData);

  // const handleSpeakerDataImportClick = () => {
  //   dispatch(importSpeakerData(speakerDataFile));
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error(message);
  }

  return (
    <>
      {/* <button onClick={handleSpeakerDataImportClick}>Import Speaker Tracker Data</button> */}
      {isError && <div>Error importing Speaker Data!</div>}
    </>
  );
};

export default ImportSpeakerData;
