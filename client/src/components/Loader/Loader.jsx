import DotLoader from "react-spinners/DotLoader";

const override = {
    display: "block",
    margin: "0 auto",
  };

export const Loader = () => {
    return (
        <DotLoader
        color="#303a63"
        cssOverride={override}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
}

