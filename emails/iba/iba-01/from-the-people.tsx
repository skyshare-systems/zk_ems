import { FromThePeople } from "@/store/create-email";
import { Column, Img, Row, Section, Text } from "@react-email/components";

export const FromThePeopleCard = ({ people }: { people: FromThePeople }) => {
  const { review, reviewerImage, reviewerName } = people;
  return (
    <Section className="border-[1px] border-solid border-[#Dfd8e9] bg-4 bg-white rounded-[16px] mb-4">
      <Row align="center" className="  p-[16px] text-center">
        <Column className="w-fit" valign="middle" align="center">
          <Img
            src={reviewerImage}
            width={164}
            alt="Placeholder"
            className="w-[164px] h-auto object-cover rounded-[4px] mx-auto"
          />
        </Column>
        <Column className="p-[8px]" valign="middle" align="left">
          <Img
            src="https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/quote.png"
            alt="Quote icon"
            className="w-[32px] h-auto object-cover mb-[8px]"
          />

          <Text className="mx-auto text-black">{review}</Text>

          <Text className="mx-auto font-semibold text-black">
            {reviewerName}
          </Text>
        </Column>
      </Row>
    </Section>
  );
};
