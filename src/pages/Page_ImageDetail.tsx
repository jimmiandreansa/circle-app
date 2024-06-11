import { getThreadById } from "@/libs/api/call/thread";
import { Box, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { SlClose } from "react-icons/sl";
import { IThread, IThreadImage } from "@/type/app";

const Page_ImageDetail: React.FC = () => {
  const navigate = useNavigate();
  const [threadUser, setThreadUser] = useState<IThread | null>(null);
  const { threadId } = useParams();

  const getThreadByUserIdFunc = async () => {
    try {
      const res = await getThreadById(Number(threadId));
      setThreadUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getThreadByUserIdFunc();
  }, []);

  return (
    <div style={{ height: "100vh", overflow: "hidden", position: "relative" }}>
      <Box
        cursor={"pointer"}
        fontSize={"44px"}
        zIndex={9999}
        position={"absolute"}
        top={6}
        left={8}
        borderRadius={50}
        _hover={{ backgroundColor: "#424242" }}
        onClick={() => navigate(-1)}
      >
        <SlClose color={"gray"} />
      </Box>
      <AwesomeSlider style={{ height: "100vh" }}>
        {threadUser?.image?.map((img: IThreadImage, index: number) => (
          <Box key={index} height="100vh">
            <Image key={img.id} src={img.image} />
          </Box>
        ))}
      </AwesomeSlider>
    </div>
  );
};

export default Page_ImageDetail;
