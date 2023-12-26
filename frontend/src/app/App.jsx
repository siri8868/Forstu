import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import Login from "./pages/Login/Login";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ROLES from "./helpers/Roles";
import UserDashboard from "./pages/User/UserDashboard";
import YearAndCourses from "./pages/YearAndCourses/YearAndCourses";

function App() {
  return (
    <>
      <Switch>
        {/* //common */}

        <Route exact path="/">
          <Redirect to="/signin" />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route exact path="/profile">
          {/* <Profile /> */}
        </Route>

        {/* //admin */}

        <ProtectedRoute
          exact
          path="/dashboard/admin"
          component={AdminDashboard}
          role={ROLES.ADMIN}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/dashboard/admin/users"
          component={UserDashboard}
          role={ROLES.ADMIN}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/dashboard/admin/year_course"
          component={YearAndCourses}
          role={ROLES.ADMIN}
        ></ProtectedRoute>
        {/* <Route path="/dashboard/admin">
          <AdminDashboard />
        </Route>
        <Route path="/dashboard/admin/users">
          <UserDashboard />
        </Route> */}

        {/* 404 */}
        {/* <Route path="*">
          <PageNotFound />
        </Route> */}
      </Switch>
    </>
  );
}

export default App;