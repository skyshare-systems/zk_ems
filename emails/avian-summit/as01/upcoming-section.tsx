import { formatDateRanges } from "@/lib/utils";
import { UpcomingPrograms } from "@/store/create-email";
import { Row, Column, Img, Text, Section, Link } from "@react-email/components";
import { date } from "zod";

interface UpcomingProgramsSectionProps {
  upcomingPrograms: UpcomingPrograms[];
}

export const UpcomingProgramsSection = ({
  upcomingPrograms,
}: UpcomingProgramsSectionProps) => {
  return (
    <Section
      className="w-full"
      style={{
        backgroundImage:
          "url(https://avian-summit-travel-corporation.sgp1.cdn.digitaloceanspaces.com/upcoming-program.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div className="p-[16px]">
        <Text className="text-[20px] font-medium text-white text-left my-[16px]">
          Upcoming Programs
        </Text>

        {upcomingPrograms.map((program, index) => (
          <div className="p-2" key={index}>
            <Link
              href={program.externalLink}
              className="text-[14px] font-semibold underline text-white text-left mb-[8px]"
            >
              {program.title}
            </Link>
            <Text className="text-[14px] text-white m-0">
              March 26-28, 2025 • April 23-25, 2025
            </Text>
          </div>
        ))}
      </div>
    </Section>
  );
};
