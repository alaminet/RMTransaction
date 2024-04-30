import {Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Home from './pages/Home';
import RMIssue from './pages/RMIssue';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='*' element={<Home/>}></Route>
        <Route path='/' element={<Home />}>
          <Route path='rmissue' element={<RMIssue/>}></Route>
        </Route>
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
