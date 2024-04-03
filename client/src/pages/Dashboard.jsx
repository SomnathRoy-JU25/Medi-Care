import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SidebarFour from "../components/Dashboard/UserDashboard";

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] mt-24 overflow-y-auto">
      <SidebarFour />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto overflow-y-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
