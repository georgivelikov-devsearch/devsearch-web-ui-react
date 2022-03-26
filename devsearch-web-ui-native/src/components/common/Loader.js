import { Oval } from "react-loader-spinner";

function Loader() {
  return (
    <div
      style={{
        position: "absolute",
        left: "45%",
        top: "45%",
        width: "100%",
        height: "100%",
        margin: "auto",
      }}
    >
      <Oval height="5%" width="5%" color="black" secondaryColor="grey">
        Loading...
      </Oval>
    </div>
  );
}

export default Loader;
