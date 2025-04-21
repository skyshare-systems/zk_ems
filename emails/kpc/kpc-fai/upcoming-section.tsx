import { formatDateRanges } from "@/lib/utils";
import { UpcomingProgram } from "@/store/create-email";
import { Column, Link, Row, Section, Text } from "@react-email/components";

interface UpcomingProgramsSectionProps {
  upcomingPrograms: UpcomingProgram[];
}

export const UpcomingProgramsSection = ({
  upcomingPrograms,
}: UpcomingProgramsSectionProps) => {
  return (
    <Section className="">
      <Row className="border-l-[32px] bg-[#f5f5f5] border-solid border-[#Dfd8e9] bg-4 mb-4 inline-block border-l-[#F3BC30]">
        <Column className="p-4 ">
          <Text className="text-black/50 font-bold uppercase mb-3 p-0">
            Upcoming Programs
          </Text>

          {upcomingPrograms.map((program) => (
            <div key={program.title}>
              <Link className="text-[14px] font-semibold text-[#000205] underline">
                {program.title}
              </Link>
              <Text className="m-0 p-0 text-[#000205] text-[14px] font-normal">
                {formatDateRanges(program.dates)}
              </Text>
            </div>
          ))}
        </Column>
      </Row>
    </Section>
  );
};
