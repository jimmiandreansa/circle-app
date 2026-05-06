import { getThreadByUserId} from "@/libs/api/call/thread";
import { IThread } from "@/type/app";
import { AspectRatio, Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Component_LoadingSpinner from "../Component_LoadingSpinner";

const Component_ProfileMedia : React.FC = () => {
  const { userId } = useParams();
  const numericUserId = Number(userId);

  const threadsQuery = useQuery({
    queryKey: ["user", numericUserId, "threads"],
    enabled: Number.isFinite(numericUserId) && numericUserId > 0,
    queryFn: async () => {
      const res = await getThreadByUserId(numericUserId);
      return res.data.data as IThread[];
    },
  });

  if (threadsQuery.isLoading) return <Component_LoadingSpinner minH="220px" />;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        gap: "4px",
      }}
    >
      {(threadsQuery.data ?? []).map((post) => (
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
