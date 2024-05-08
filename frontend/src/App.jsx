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
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="*" element={<Home />}></Route>
        <Route path="/" element={<Home />}>
          <Route path="rmissue" element={<RMIssue />}></Route>
          <Route path="rmcheck" element={<RMCheck />}></Route>
          <Route path="dailyTnx" element={<RMTnxView />}></Route>
          <Route path="adduser" element={<AddUser />}></Route>
          <Route path="userlist" element={<ViewUser />}></Route>
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
