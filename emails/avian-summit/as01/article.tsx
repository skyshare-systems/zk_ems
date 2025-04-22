import { chunkArray } from "@/emails/utils";
import { Article } from "@/store/create-email";
import { Row, Column, Img, Text, Link } from "@react-email/components";

export const ArticleCard = ({ articles }: { articles: Article[] }) => {
  const articleRows = chunkArray(articles, 2);

  return (
    <>
      {articleRows.map((row, rowIndex) => (
        <Row key={`row-${rowIndex}`} className="mb-[32px]">
          {row.map((article, colIndex) => (
            <Column
              key={article.heading}
              className={colIndex === 0 ? "pr-[8px]" : "pl-[8px]"}
              style={{ width: "50%" }}
            >
              <div className="border-[1px] p-4 border-solid border-gray-200 rounded-[8px] overflow-hidden">
                <Img
                  src={article.image as string}
                  alt={article.heading}
                  width="100%"
                  height="auto"
                  className="object-cover w-full h-[128px] rounded-[12px] overflow-hidden"
                />
                <div className="mt-2">
                  <Text className="text-[16px] text-black font-semibold m-0 mb-[4px]">
                    {article.heading}
                  </Text>
                  <Text className="text-gray-600 text-[14px] m-0 mb-[4px]">
                    {article.content}
                  </Text>
                  <Link
                    href={`https://example.com/articles/${article.id}`}
                    className="text-black/40 font-bold rounded-[4px] text-[14px] box-border bg-[#18365A] w-fit px-6 py-4 text-white"
                    style={{ display: "block" }}
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            </Column>
          ))}

          {/* If there's only one product in the row, add an empty column */}
          {row.length === 1 && (
            <Column style={{ width: "50%" }} className="pl-[8px]">
              <div></div>
            </Column>
          )}
        </Row>
      ))}
    </>
  );
};
