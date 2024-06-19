import { Box, Flex, Link, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useAppDispatch } from "@/store";
import { SET_LOGOUT } from "@/store/slice/auth";
import PostThreadModal from "./Modals/Modal_PostThread";
import { getThreads } from "@/libs/api/call/thread";
import { IThread } from "@/type/app";
import { IoHeartOutline, IoHomeOutline, IoLogOutOutline, IoPersonOutline, IoSearchOutline } from "react-icons/io5";

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

  const [threads, setThreads] = useState<IThread[] | []>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  console.log(threads);
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(SET_LOGOUT());
    navigate("/login");
  };

  async function getThread() {
    try {
      const res = await getThreads();
      setThreads(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getThread();
  }, []);

  return (
    <Box
      bg={"brand.900"}
      position={"fixed"}
      padding={"16px"}
      height={"100vh"}
      borderRight={"1px solid #424242"}
    >
      <Flex flexDir="column" gap={6}>
        <ChakraLink
          as={ReactRouterLink}
          to="/"
          alignItems={"center"}
          fontWeight={"bold"}
          color="#028311"
          fontSize={"52px"}
          _hover={{ textDecoration: "none" }}
        >
          <Image
            boxSize="28px"
            src="https://gcdnb.pbrd.co/images/IjucgOcWuO1g.png?o=1"
            alt="Circle Logo"
          />
        </ChakraLink>
        {MENU.map((menu) => (
          <ChakraLink
            key={menu.link}
            as={ReactRouterLink}
            to={menu.link}
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

        <PostThreadModal callback={getThread} />
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
