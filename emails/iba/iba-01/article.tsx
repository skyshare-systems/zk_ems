import { shortenMonth } from "@/lib/utils";
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

export const ArticleCard = ({ article }: { article: Article }) => {
  const { articleLink, content, heading, date: isoDate, image } = article;

  const date = new Date(isoDate as Date);
  const day = date.getDate();

  return (
    <Section className="border-[1px] border-solid border-[#Dfd8e9] bg-4 bg-white rounded-[16px] mb-4">
      <Row align="center" className="p-[16px] text-center">
        <Column
          align="left"
          valign="top"
          className="mr-6 w-fit"
          style={{ paddingRight: "24px" }}
        >
          <Text className="text-black text-[14px] font-semibold">
            {shortenMonth(date as Date)}
          </Text>
          <Img
            src="https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/line.png"
            width={"100%"}
            height={"100%"}
            className="h-full w-full object-cover"
          />
          <Text className="text-black text-[20px] font-semibold">{day}</Text>
        </Column>
        <Column
          valign="top"
          align="center"
          className="ml-[24px]"
          style={{ paddingRight: "24px" }}
        >
          <Img
            src={image as string}
            width={250}
            alt="Placeholder"
            className="w-[250px] aspect-square object-cover rounded-[4px] mx-auto"
          />
        </Column>
        <Column className="p-[8px] ml-[24px]" valign="top" align="left">
          <Text className="text-black mx-auto font-semibold text-[20px]">
            {heading}
          </Text>

          <Text className="mx-auto text-black line-clamp-6 text-ellipsis">
            {content}
          </Text>

          <Hr />

          <Link href={articleLink}>
            <Text className="inline-block text-black">Read more</Text>

            <Img
              src="https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/arrow-right.png"
              width={10}
              height={10}
              className="inline-block ml-2"
            />
          </Link>
        </Column>
      </Row>
    </Section>
  );
};
