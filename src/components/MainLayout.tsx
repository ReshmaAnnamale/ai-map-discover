import { Outlet } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Main Content */}
      <main className="pb-20 custom-scrollbar overflow-y-auto max-h-screen">
        <Outlet />
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default MainLayout;