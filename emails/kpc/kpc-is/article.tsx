import { Article } from "@/store/create-email";
import { Column, Section, Row, Link, Text, Img } from "@react-email/components";
import React from "react";

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Row key={article.heading} className="mt-[24px]">
      <Column>
        <Text className="text-[20px] font-semibold break-words">
          {article.heading}
        </Text>
        <Text className="text-[14px] break-words">{article.content}</Text>
        <Link
          href={article.articleLink}
          className="text-black block mt-[8px] mx-auto w-fit bg-[#F3BC30] px-4 py-3 text-[14px] font-bold"
        >
          Read Article
        </Link>
      </Column>
    </Row>
  );
};

export default ArticleCard;
