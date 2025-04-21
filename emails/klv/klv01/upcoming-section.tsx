import { formatDateRanges } from "@/lib/utils";
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

          <Row className="mb-3">
            <Column valign="middle">
              <Text className="text-black text-[14px] font-normal p-0 m-0">
                December 26-28
              </Text>
              <Text className="text-black text-[14px] font-normal p-0 m-0">
                April 23-25
              </Text>
            </Column>
            <Column className="w-[330px] bg-[#ed8606] rounded-[10px] p-4">
              <Text className="text-[20px] font-semibold text-center">
                3-Day Corporate Finance Management Program
              </Text>
            </Column>
          </Row>

          <Row>
            <Column valign="middle">
              <Text className="text-black text-[14px] font-normal p-0 m-0">
                December 26-28
              </Text>
              <Text className="text-black text-[14px] font-normal p-0 m-0">
                April 23-25
              </Text>
            </Column>
            <Column className="w-[330px] bg-[#00A19B] rounded-[10px] p-4">
              <Text className="text-[20px] font-semibold text-center">
                2-Day Accounting Program
              </Text>
            </Column>
          </Row>
        </Column>
      </Row>
    </Section>
  );
};
