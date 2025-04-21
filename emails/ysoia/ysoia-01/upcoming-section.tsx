import { UpcomingPrograms } from "@/store/create-email";
import { Row, Column, Img, Text, Section } from "@react-email/components";

interface UpcomingProgramsSectionProps {
  upcomingPrograms: UpcomingPrograms[];
}

export const UpcomingProgramsSection = ({
  upcomingPrograms,
}: UpcomingProgramsSectionProps) => {
  return (
    <Section className="text-black">
      <Row>
        {/* Left side - Title and programs with borders */}
        <Column valign="top" className="w-[50%] pr-[16px]">
          {/* Title with star beside it */}
          <Row>
            <Column className="align-middle">
              <Text className="text-[24px] font-medium m-0 inline">
                Upcoming Programs
              </Text>
            </Column>
          </Row>

          {/* Programs with borders */}
          <div className="mt-[16px] ">
            <div className="border-[1px] border-solid border-[#Dfd8e9] bg-4 bg-white rounded-[16px] mb-4 p-4">
              <Text className="font-bold text-[14px] m-0 underline">
                3-Day Corporate Finance Management Program
              </Text>
              <Text className="text-[14px] text-gray-700 m-0 mt-[4px] underline">
                March 26-28, 2025 • April 23-25, 2025
              </Text>
            </div>

            <div className="border-[1px] border-solid border-[#Dfd8e9] bg-4 bg-white rounded-[16px] mb-4 p-4">
              <Text className="font-bold text-[14px] m-0 underline">
                3-Day Corporate Finance Management Program
              </Text>
              <Text className="text-[14px] text-gray-700 m-0 mt-[4px]">
                March 26-28, 2025 • April 23-25, 2025
              </Text>
            </div>
          </div>
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
