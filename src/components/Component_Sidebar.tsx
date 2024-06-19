import { Box, Flex, Text, Link, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { FaHome, FaRegHeart } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useAppDispatch } from "@/store";
import { SET_LOGOUT } from "@/store/slice/auth";
import PostThreadModal from "./Modals/Modal_PostThread";
import { getThreads } from "@/libs/api/call/thread";
import { IThread } from "@/type/app";

const Component_Sidebar = (): React.JSX.Element => {
  const MENU = [
    {
      title: "Home",
      link: "/",
      icon: <FaHome />,
    },
    {
      title: "Search",
      link: "/search",
      icon: <MdPersonSearch />,
    },
    {
      title: "Follow",
      link: "/follow",
      icon: <FaRegHeart />,
    },
    {
      title: "Profile",
      link: `/my-profile`,
      icon: <BsPersonCircle />,
    },
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
      width={"22%"}
      position={"fixed"}
      paddingLeft={"24px"}
      paddingRight={"24px"}
      paddingTop={"16px"}
      height={"100vh"}
      borderRight={"1px solid #424242"}
    >
      <Flex flexDir="column" gap={4}>
        <ChakraLink
          as={ReactRouterLink}
          to="/"
          ml={"12px"}
          display={"flex"}
          gap={2}
          alignItems={"center"}
          fontWeight={"bold"}
          color="#028311"
          fontSize={"52px"}
          _hover={{ textDecoration: "none" }}
        >
          <Image
            boxSize="48px"
            src="https://gcdnb.pbrd.co/images/IjucgOcWuO1g.png?o=1"
            alt="Circle Logo"
          />
          circle
        </ChakraLink>
        {MENU.map((menu) => (
          <ChakraLink
            key={menu.title}
            as={ReactRouterLink}
            to={menu.link}
            ml={"12px"}
            display={"flex"}
            alignItems={"center"}
            fontWeight={"semibold"}
            fontSize={"18px"}
            color={"white"}
            _hover={{ color: "#949494" }}
          >
            {menu.icon}
            <Text marginLeft={"8px"}>{menu.title}</Text>
          </ChakraLink>
        ))}
        <PostThreadModal callback={getThread} />
      </Flex>
      <Box position={"absolute"} bottom={"32px"}>
        <Link
          ml={"12px"}
          display={"flex"}
          alignItems={"center"}
          fontWeight={"semibold"}
          fontSize={"18px"}
          color={"white"}
          _hover={{ color: "#949494" }}
          onClick={handleLogout}
        >
          <BiLogOut />
          <Text marginLeft={"8px"}>Logout</Text>
        </Link>
      </Box>
    </Box>
  );
};

export default Component_Sidebar;
