import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import RMIssue from "./pages/RMIssue";
import RMCheck from "./pages/RMCheck";
import RMTnxView from "./pages/RMTnxView";
import AddUser from "./pages/AddUser";
import ViewUser from "./pages/ViewUser";
import Login from "./pages/Login";
import LoginUserRouter from "./PrivateRouter/LoginUserRouter";
import AddItem from "./pages/AddItem";
import ViewItemList from "./pages/ViewItemList";
import AddLot from "./pages/AddLot";
import ViewLot from "./pages/ViewLot";
import AddBOM from "./pages/AddBOM";
import ViewBOM from "./pages/ViewBOM";
import AddBOMItem from "./pages/AddBOMItem";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="*" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<LoginUserRouter />}>
          <Route path="/" element={<Home />}>
            <Route path="rmissue" element={<RMIssue />}></Route>
            <Route path="rmcheck" element={<RMCheck />}></Route>
            <Route path="dailyTnx" element={<RMTnxView />}></Route>
            <Route path="adduser" element={<AddUser />}></Route>
            <Route path="userlist" element={<ViewUser />}></Route>
            <Route path="additem" element={<AddItem />}></Route>
            <Route path="itemlist" element={<ViewItemList />}></Route>
            <Route path="addlot" element={<AddLot />}></Route>
            <Route path="lotdetails" element={<ViewLot />}></Route>
            <Route path="addbom" element={<AddBOM />}></Route>
            <Route path="bomdetails" element={<ViewBOM />}></Route>
            <Route path="addbomitem" element={<AddBOMItem />}></Route>
          </Route>
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
