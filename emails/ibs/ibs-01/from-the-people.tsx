import { FromThePeople } from "@/store/create-email";
import { Column, Img, Row, Section, Text } from "@react-email/components";

export const FromThePeopleCard = ({ people }: { people: FromThePeople }) => {
  const { review, reviewerImage, reviewerName } = people;
  return (
    <Section className="border-[1px] border-solid border-[#08306F29] bg-4 bg-white rounded-[16px] mb-4">
      <Row align="left" className="  p-[16px] text-center">
        <Column className="w-fit pr-4" valign="middle" align="left">
          <Img
            src={reviewerImage}
            width={164}
            alt={reviewerName}
            className="w-[164px] h-auto object-cover mx-auto rounded-full"
          />
        </Column>
        <Column className="p-[8px] w-fit" valign="middle" align="left">
          <Img
            src="https://innovated-business-solutions.sgp1.cdn.digitaloceanspaces.com/quote.png"
            alt="Quote icon"
            className="w-[44px] h-[44px] object-cover mb-[8px]"
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
