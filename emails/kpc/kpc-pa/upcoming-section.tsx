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
    <Section className="p-4">
      <Row className="bg-[#0002050A] p-4">
        <Column className="p-4" align="center">
          <Text className="text-black/50 font-bold uppercase mb-3 p-0">
            Upcoming Programs
          </Text>

          {upcomingPrograms.map((program) => (
            <div key={program.title} className="p-2">
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
