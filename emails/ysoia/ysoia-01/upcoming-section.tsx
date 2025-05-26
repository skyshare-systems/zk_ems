import { formatDateRanges } from "@/lib/utils";
import { UpcomingProgram } from "@/store/create-email";
import { Row, Column, Img, Text, Section } from "@react-email/components";

interface UpcomingProgramsSectionProps {
  upcomingPrograms: UpcomingProgram[];
}

export const UpcomingProgramsSection = ({
  upcomingPrograms,
}: UpcomingProgramsSectionProps) => {
  return (
    <Section className="text-black">
      <Row>
        {/* Left side - Title and programs with borders */}
        <Column valign="top" className="w-[50%] pr-[16px]">
          <Row>
            <Column className="align-middle">
              <Text className="text-[24px] font-medium m-0 inline">
                Upcoming Courses Schedule
              </Text>
            </Column>
          </Row>

          {/* Programs with borders */}
          {upcomingPrograms.map((program) => (
            <div className="mt-[16px]" key={program.title}>
              <div className="border-[1px] border-solid border-[#Dfd8e9] bg-4 bg-white rounded-[16px] mb-4 p-4">
                <Text className="font-bold text-[14px] m-0 underline">
                  {program.title}
                </Text>

                <Text className="text-[14px] text-gray-700 m-0 mt-[4px] underline">
                  {formatDateRanges(program.dates)}
                </Text>
              </div>
            </div>
          ))}
        </Column>

        {/* Right side - Full image */}
        <Column valign="top" className="w-[50%]">
          <Img
            src="https://your-skin.sgp1.cdn.digitaloceanspaces.com/programs.png"
            alt="Featured image"
            className="w-full h-auto object-cover rounded-[8px]"
          />
        </Column>
      </Row>
    </Section>
  );
};
