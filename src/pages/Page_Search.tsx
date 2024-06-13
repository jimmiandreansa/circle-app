import SearchIcon from "@/assets/iconsSvg/SearchIcon";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { searchUsers } from "@/libs/api/call/user";
import Component_UserCard from "@/components/Component_UserCard";
import { IUser } from "@/type/app";

const Page_Search = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<IUser[]>([])
  const [searchStatus, setSearchStatus] = useState("");

  const handleSearch = async (searchQuery: string) => {
    try {
      console.log(searchQuery);
      const foundUsers = await searchUsers(query);
      if (foundUsers.data.length === 0) {
        setSearchStatus("User tidak ditemukan");
        setUsers([]);
      } else {
        setUsers(foundUsers.data.data);
        setSearchStatus("");
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  console.log("INI USERSSSS DARI SEARCH", users)

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    if (searchQuery === "") {
      setSearchStatus("Silahkan cari user");
      setUsers([]);
    } else {
      await handleSearch(searchQuery);
    }
  };

  return (
    <Box minHeight={"100vh"} bg={"brand.900"}>
      <Box padding="24px 16px 4px">
        <InputGroup marginBottom={"20px"}>
          <InputLeftElement pointerEvents="none" paddingLeft="12px">
            <SearchIcon />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search"
            color={"white"}
            borderRadius={"24px"}
            border={"none"}
            bg={"#424242"}
            paddingLeft="48px"
            focusBorderColor={"transparent"}
            value={query}
            onChange={handleChange}
          />
        </InputGroup>

        {searchStatus && <Text color="gray">{searchStatus}</Text>}

        <Box>
          {users.map((user) => (
            <Component_UserCard
              fullname={user.fullname}
              username={user.username}
              avatar={user.profile?.avatar || ""}
              followingId={user.id}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Page_Search;
