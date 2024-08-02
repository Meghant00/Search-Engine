import "./assets/styles/index.css";
import SearchBar from "./components/SearchBar";
import logo from "./assets/img/logo-primary.svg";
function App() {
  return (
    <>
      <div className="tw-w-screen tw-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center">
        <div className="tw-w-full tw-px-3 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-12 md:tw-w-1/2 md:tw-px-6">
          <img src={logo} alt="Logo" width="450px" height="140px" />

          <SearchBar />
        </div>
      </div>
    </>
  );
}

export default App;
