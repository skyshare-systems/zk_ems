import { formatDateRanges } from "@/lib/utils";
import { UpcomingProgram } from "@/store/create-email";
import {
  Column,
  Container,
  Row,
  Section,
  Text,
  Link,
} from "@react-email/components";
export const UpcomingProgramCard = ({
  program,
}: {
  program: UpcomingProgram;
}) => {
  const { dates, externalLink, title } = program;

  const year = new Date(dates[0].date).getFullYear(); // 2025

  return (
    <Section className="border-[1px] border-solid border-[#Dfd8e9] bg-4 bg-[#26487a]  rounded-[16px] mb-4">
      <Row align="center" className="p-[16px] text-center">
        <Column
          align="left"
          valign="middle"
          className="mr-4 w-fit"
          style={{ paddingRight: "24px" }}
        >
          <Text className="text-white text-[20px] font-semibold">{year}</Text>
        </Column>
        <Column valign="middle" align="left" className="ml-[16px] w-[120px]">
          <Text className="inline-block m-0 text-white">
            {formatDateRanges(dates)}
          </Text>
        </Column>
        <Column className="ml-[16px]" valign="middle" align="left">
          <div className="bg-white  rounded-2xl p-4 h-fit">
            <Link href={externalLink} className="">
              <Text className="font-bold text-center text-black p-0 m-0">
                {title}
              </Text>
            </Link>
          </div>
        </Column>
      </Row>
    </Section>
  );
};
