import { Article } from "@/store/create-email";
import { Column, Section, Row, Link, Text, Img } from "@react-email/components";
import React from "react";

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Section className="border-[1px] border-solid border-[#ED860652]  bg-white rounded-[16px] mb-4 p-4">
      <Row>
        <Column>
          <Text className="text-[#18181b] font-semibold text-[20px]">
            {article.heading.substring(0, 40)}
            {article.heading.length > 40 ? "..." : ""}
          </Text>
        </Column>
        <Column align="right">
          <Link
            href={article.articleLink}
            className="rounded-[12px] bg-[#00A19B] text-white px-3 py-2 text-[10px] font-semibold"
          >
            Read Article
          </Link>
        </Column>
      </Row>

      <Row>
        <Column>
          <Img
            src={article.image as string}
            width="100%"
            height={128}
            className="rounded-[8px] object-cover"
          />

          <Text className="text-[14px] text-[#18181b] leading-normal">
            {article.content.substring(0, 140)}
            {article.content.length > 140 ? "..." : ""}
          </Text>
        </Column>
      </Row>
    </Section>
  );
};

export default ArticleCard;
