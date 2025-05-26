import { formatDateRanges } from "@/lib/utils";
import { UpcomingProgram } from "@/store/create-email";
import { Link, Section, Text } from "@react-email/components";

interface UpcomingProgramsSectionProps {
  upcomingPrograms: UpcomingProgram[];
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
          Upcoming Departures
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
              {formatDateRanges(program.dates)}
            </Text>
          </div>
        ))}
      </div>
    </Section>
  );
};
