import { Box, Flex, Link, Image } from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink, useLocation, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useAppDispatch } from "@/store";
import { SET_LOGOUT } from "@/store/slice/auth";
import PostThreadModal from "./Modals/Modal_PostThread";
// import { IThread } from "@/type/app";
import {
  IoHeartOutline,
  IoHomeOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoSearchOutline,
} from "react-icons/io5";
import LogoCircle from "@/assets/images/circle.png";
import { useQueryClient } from "@tanstack/react-query";

const Component_SidebarMobile = (): React.JSX.Element => {
  const MENU = [
    {
      link: "/",
      icon: <IoHomeOutline />,
    },
    {
      link: "/search",
      icon: <IoSearchOutline />,
    },
    {
      link: "/follow",
      icon: <IoHeartOutline />,
    },
    {
      link: `/my-profile`,
      icon: <IoPersonOutline />,
    },
    // {
    //   link: "",
    //   icon: <IoLogOutOutline />,
    // },
  ];

  // const [threads, setThreads] = useState<IThread[] | []>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const location = useLocation();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(SET_LOGOUT());
    navigate("/login");
  };

  const invalidateThreads = async () => {
    await queryClient.invalidateQueries({ queryKey: ["threads"] });
  };

  return (
    <Box
      bg={"brand.900"}
      position={"fixed"}
      padding={"12px"}
      height={"100vh"}
      borderRight={"1px solid #424242"}
    >
      <Flex flexDir="column" gap={6}>
        <ChakraLink
          as={ReactRouterLink}
          to="/"
          onClick={(e) => {
            if (location.pathname === "/") e.preventDefault();
          }}
          alignItems={"center"}
          fontWeight={"bold"}
          color="#028311"
          fontSize={"52px"}
          _hover={{ textDecoration: "none" }}
        >
          <Image boxSize="28px" src={LogoCircle} alt="Circle Logo" />
        </ChakraLink>
        {MENU.map((menu) => (
          <ChakraLink
            key={menu.link}
            as={ReactRouterLink}
            to={menu.link}
            onClick={(e) => {
              if (location.pathname === menu.link) e.preventDefault();
            }}
            display={"flex"}
            alignItems={"center"}
            fontWeight={"semibold"}
            fontSize={"28px"}
            color={"white"}
            _hover={{ color: "#949494" }}
          >
            {menu.icon}
          </ChakraLink>
        ))}

        <PostThreadModal callback={invalidateThreads} />
        <Link
          display={"flex"}
          alignItems={"center"}
          fontWeight={"semibold"}
          fontSize={"28px"}
          color={"#f31f1f"}
          _hover={{ color: "#f52f5f" }}
          onClick={handleLogout}
        >
          <IoLogOutOutline />
        </Link>
      </Flex>
    </Box>
  );
};

export default Component_SidebarMobile;
