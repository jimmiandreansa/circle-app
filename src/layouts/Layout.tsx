import React from "react";
import { Outlet } from "react-router-dom";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import Component_Sidebar from "@/components/Component_Sidebar";
import Component_ProfileSide from "@/components/Component_ProfileRightSide";
import Component_Suggested from "@/components/Component_Suggested";
import Component_SidebarMobile from "@/components/Component_SidebarMobile";

interface LayoutProps {
  isFull: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isFull }): React.ReactElement => {
  const isLargeScreen = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
  });

  const paddingLeft = useBreakpointValue({
    base: "60px",
    md: "60px",
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
        marginLeft={[0, null, "22%"]}
        width={["100%", "100%", "45%"]}
        style={{ paddingLeft }}
      >
        <Outlet />
      </Box>
      <Box display={isLargeScreen ? "block" : "none"}>
        {isFull ? <Component_ProfileSide /> : <Component_Suggested />}
      </Box>
    </Box>
  );
};

export default Layout;
