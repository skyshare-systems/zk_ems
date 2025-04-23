import { cn, formatDateRanges } from "@/lib/utils";
import { UpcomingProgram } from "@/store/create-email";
import {
  Row,
  Column,
  Img,
  Text,
  Section,
  Link,
  Hr,
} from "@react-email/components";

interface UpcomingProgramsSectionProps {
  upcomingPrograms: UpcomingProgram[];
}

export const UpcomingProgramsSection = ({
  upcomingPrograms,
}: UpcomingProgramsSectionProps) => {
  return (
    <Section className="p-4 bg-[#fff9e6]">
      <Row className="rounded-2xl bg-[#fff] p-16">
        <Column>
          <Row>
            <Column>
              <Text className="text-black font-semibold text-[48px]">2025</Text>
            </Column>
            <Column align="right">
              <Text className="font-weight text-[20px] text-[#02060A]">
                Upcoming Programs
              </Text>
            </Column>
          </Row>
          <Hr className="my-6" />
          {upcomingPrograms.map((program, index) => (
            <Row key={index} className="mb-3">
              <Column valign="middle" className="">
                <Text className="text-black text-[14px] font-normal p-0 m-0">
                  {formatDateRanges(program.dates)}
                </Text>
              </Column>
              <Column
                className={cn(
                  "pl-[16px] w-[330px] b rounded-[10px] p-4",
                  index % 2 === 0 ? "bg-[#ED8606]" : "bg-[#00A19B]",
                )}
              >
                <Text className="text-[20px] font-semibold text-center">
                  {program.title}
                </Text>
              </Column>
            </Row>
          ))}
        </Column>
      </Row>
    </Section>
  );
};
