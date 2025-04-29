import { chunkArray } from "@/emails/utils";
import { cn } from "@/lib/utils";
import { Post } from "@/store/create-email";
import { Column, Img, Link, Row, Text } from "@react-email/components";

export const OurRecentPosts = ({ posts }: { posts: Post[] }) => {
  const postRows = chunkArray(posts, 3);

  return (
    <>
      {postRows.map((row, rowIndex) => (
        <Row key={`row-${rowIndex}`} className="mb-[16px]">
          {row.map((post, colIndex) => (
            <Column
              key={colIndex}
              className={cn(
                "border-[1px] w-full p-4 border-solid border-gray-200 rounded-[8px] overflow-hidden",
                colIndex === 0
                  ? "pr-[8px]"
                  : colIndex === 1
                    ? "px-[4px]"
                    : "pl-[8px]",
              )}
              style={{ width: "33.33%" }}
            >
              <Link href={post.link}>
                <Img
                  src={post.image}
                  alt={post.description.substring(0, 10)}
                  width="100%"
                  height="auto"
                  className="object-cover rounded-[8px] w-full h-[180px]"
                />

                <div className="mt-[8px]">
                  <Img
                    src="https://innovated-business-solutions.sgp1.cdn.digitaloceanspaces.com/favourite.png"
                    width={16}
                    height={16}
                    className="inline-block mr-2"
                  />
                  <Img
                    src="https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/navigation.png"
                    width={16}
                    height={16}
                    className="inline-block"
                  />
                </div>
                <div className="mt-[8px]">
                  <Text className="text-[12px] leading-normal text-black/50 m-0 mb-[4px]">
                    {post.description.substring(0, 60)}
                    {post.description.length > 60 && "..."}
                  </Text>
                </div>
              </Link>
            </Column>
          ))}

          {/* If there are fewer than 3 products in a row, add empty columns */}
          {row.length < 3 &&
            Array.from({ length: 3 - row.length }).map((_, index) => (
              <Column
                key={`empty-${index}`}
                style={{ width: "33.33%" }}
                className={cn(
                  row.length === 1 && index === 0 ? "px-[4px]" : "pl-[8px]",
                )}
              >
                <div></div>
              </Column>
            ))}
        </Row>
      ))}
    </>
  );
};
