import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import Component_Sidebar from "@/components/Component_Sidebar";
import Component_ProfileSide from "@/components/Component_ProfileRightSide";
import Component_Suggested from "@/components/Component_Suggested";
import Component_SidebarMobile from "@/components/Component_SidebarMobile";

const Layout: React.FC = (): React.ReactElement => {
  const isLargeScreen = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });
  const location = useLocation();
  const isMyProfile = location.pathname === "/my-profile";

  const paddingLeft = useBreakpointValue({
    base: "52px",
    md: 0,
    lg: 0,
  });

  return (
    <Box
      bg={"brand.900"}
      padding={0}
      display="flex"
      flexDirection={["column", null, "row"]}
    >
      <Box>
        {isLargeScreen ? <Component_Sidebar /> : <Component_SidebarMobile />}
      </Box>
      <Box
        marginLeft={[0, 0, "22%"]}
        width={["100%", "100%", "45%"]}
        style={{ paddingLeft }}
      >
        <Outlet />
      </Box>
      <Box display={isLargeScreen ? "block" : "none"}>
        {isMyProfile ? <Component_Suggested /> : <Component_ProfileSide />}
      </Box>
    </Box>
  );
};

export default Layout;
