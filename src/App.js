import "./App.css";
import { Route, Switch } from "react-router-dom";
import UploadFile from "./components/upload-file/upload-file";
import CatsPage from "./components/cats-page/cats-page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const MyHeader = styled.header`
//   border: solid red 1px;
// `;

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={CatsPage} />
        <Route path="/upload" component={UploadFile} />
        <Route path="" component={CatsPage} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
