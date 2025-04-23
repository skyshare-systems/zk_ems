import { FromThePeople } from "@/store/create-email";
import { Column, Img, Row, Text, Section } from "@react-email/components";

export const FromThePeopleCard = ({ people }: { people: FromThePeople }) => {
  const { reviewerImage, review, reviewerName } = people;

  return (
    <Section className="border-[1px] border-solid border-[#ED860652] bg-4 bg-white rounded-[16px] mb-4 p-4">
      <Row className="m-0">
        <Column valign="top" align="center">
          <div className="mb-3">
            <Img
              src={
                "https://kids-learning-ville.sgp1.cdn.digitaloceanspaces.com/quote.png"
              }
              alt="Quote icon"
              className="object-cover w-[32px] h-auto"
            />
          </div>

          <Section>
            <Row>
              <Column valign="middle" align="center">
                <Img
                  src={reviewerImage}
                  width={32}
                  height={32}
                  alt="Reviewer"
                  className="w-[32px] aspect-square inline-block rounded-full h-auto align-middle mr-4"
                />
                <Text className="text-[#000205] font-bold m-0 inline-block align-middle">
                  {reviewerName}
                </Text>
              </Column>
            </Row>

            <Row>
              <Column>
                <Text className="text-[#040C1A] text-[14px] font-normal text-center">
                  {`"` + review + `"`}
                </Text>
              </Column>
            </Row>
          </Section>
        </Column>
      </Row>
    </Section>
  );
};
