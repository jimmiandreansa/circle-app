import { getThreadByUserId} from "@/libs/api/call/thread";
import { IThread } from "@/type/app";
import { AspectRatio, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Component_ProfileMedia : React.FC = () => {
  const [threadUser, setThreadUser] = useState<IThread[]>([]);
  const { userId } = useParams();

  const getThreadByUserIdFunc = async () => {
    try{
      const res = await getThreadByUserId(Number(userId))
      setThreadUser(res.data.data)
    }catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getThreadByUserIdFunc()
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
          {post.image &&
            post.image.map((img) => (
              <AspectRatio ratio={1 / 1}>
                <Image src={img.image} />
              </AspectRatio>
            ))}
        </>
      ))}
    </div>
  );
};

export default Component_ProfileMedia;
