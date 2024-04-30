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
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="*" element={<Home />}></Route>
        <Route path="/" element={<Home />}>
          <Route path="rmissue" element={<RMIssue />}></Route>
          <Route path="rmcheck" element={<RMCheck />}></Route>
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
