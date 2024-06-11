import { getMyThreads } from "@/libs/api/call/thread";
import { AspectRatio, Image} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  userId: number;
  image?: [];
}

interface IImage {
  image: string;
}

const Component_MyProfileMedia: React.FC<IProps> = () => {
  const [threadUser, setThreadUser] = useState<IProps[]>([]);
  const navigate = useNavigate();

  const getThreadByUserIdFunc = async () => {
    try {
      const res = await getMyThreads();
      setThreadUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getThreadByUserIdFunc();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        gap: "4px",
      }}
    >
      {threadUser?.map((post) => (
        <>
          {post &&
            post.image &&
            post.image.map((img: IImage) => (
              <AspectRatio ratio={1 / 1}>
                <Image
                  cursor={"pointer"}
                  src={img.image}
                  onClick={() => navigate(`../image/${post.userId}`)}
                />
              </AspectRatio>
            ))}
        </>
      ))}
    </div>
  );
};

export default Component_MyProfileMedia;
