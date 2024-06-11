import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Component_Sidebar from "@/components/Component_Sidebar";
import Component_ProfileSide from "@/components/Component_ProfileRightSide";
import Component_Suggested from "@/components/Component_Suggested";

interface LayoutProps {
  isFull: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isFull }): React.ReactElement => {
  return (
    <Box bg={"brand.900"}>
      <Component_Sidebar />
      <Box marginLeft="22%" width="45%">
        <Outlet />
      </Box>
      {isFull ? <Component_ProfileSide /> : <Component_Suggested />}
    </Box>
  );
};

export default Layout;
