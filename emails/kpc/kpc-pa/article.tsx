import { Article } from "@/store/create-email";
import { Img, Link, Row, Text } from "@react-email/components";

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Row key={article.heading}>
      <Img
        src={article.image as string}
        width={"100%"}
        height={128}
        className="h-32 w-full object-cover rounded-lg"
      />
      <Text className="text-[20px] font-semibold break-words">
        {article.heading}
      </Text>
      <Text className="text-[14px] break-words">{article.content}</Text>
      <Link
        href={article.articleLink}
        className=" block mt-[8px] w-fit bg-[#000205] px-4 py-2 text-[14px] font-bold text-white rounded-lg"
      >
        Read Article
      </Link>
    </Row>
  );
};

export default ArticleCard;
