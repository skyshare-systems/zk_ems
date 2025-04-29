import { formatDateRanges, shortenMonth } from "@/lib/utils";
import { Article } from "@/store/create-email";
import {
  Column,
  Hr,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { formatDate } from "date-fns";

export const ArticleCard = ({ article }: { article: Article }) => {
  const { articleLink, content, heading, date, image } = article;

  return (
    <Section className="border-[1px] w-full border-solid border-[#Dfd8e9] bg-4 bg-white rounded-[16px] mb-4">
      <Row align="center" className="p-[16px] text-center">
        <Column
          valign="top"
          align="center"
          className="ml-[24px]"
          style={{ paddingRight: "24px" }}
        >
          <Img
            src={image as string}
            width={280}
            alt="Placeholder"
            className="w-[280px] aspect-square object-cover rounded-[4px] mx-auto"
          />
        </Column>
        <Column className="p-[8px] ml-[24px]" valign="top" align="left">
          <Text className="m-0 p-0 mb-[3px] text-black mx-auto font-semibold text-[20px]">
            {heading}
          </Text>

          <div className="">
            <Img
              src={
                "https://innovated-business-solutions.sgp1.cdn.digitaloceanspaces.com/calendar.png"
              }
              height={14}
              width={14}
              alt="Calendar icon"
              className="w-[14px] h-[14px] object-cover inline-block mr-1 align-middle"
            />

            <Text className="text-black p-0 m-0 font-normal text-[12px] inline-block">
              {formatDate(date as Date, "MMMM dd, yyyy")}
            </Text>
          </div>

          <Text className=" p-0 mx-auto text-black line-clamp-6 text-ellipsis">
            {content}
          </Text>

          <Link
            href={articleLink}
            className="p-0 px-4 py-3 bg-[#08306F]  rounded-[4px]"
          >
            <Text className="inline-block mt-4 mb-0 p-0 text-white font-bold text-[14px]">
              Learn More
            </Text>
          </Link>
        </Column>
      </Row>
    </Section>
  );
};
