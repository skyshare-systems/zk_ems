import { FromThePeople } from "@/store/create-email";
import { Column, Img, Row, Text, Section } from "@react-email/components";

export const FromThePeopleCard = ({ people }: { people: FromThePeople }) => {
  const {
    reviewerImage = "https://new.email/static/app/placeholder.png",
    review = "Thank you Avian sa stress-free Japan tour! As someone na occupied na talaga most of the time, hindi na namin keri mag organize pa, ang convenient ng mga tours niyo. ‘Til our next tour!",
    reviewerName = "Paula Christianne Del Rio & Edward darren Sarroca",
    location = "Tokyo - Osaka, Japan",
    date = "January 25 - January 31, 2024",
  } = people;

  return (
    <Section className="border-[1px] border-solid border-[#Dfd8e9] bg-4 bg-white rounded-[16px] mb-4 p-4">
      <Row className="m-0">
        {/* Left side - Image */}
        <Column valign="top" className="w-[190px] pr-[20px]">
          <div
            style={{ height: "100%", minHeight: "300px", position: "relative" }}
          >
            <Img
              src={reviewerImage}
              alt="Travel Image"
              width="190"
              className="w-full rounded-[12px] object-cover"
              style={{
                display: "block",
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </Column>

        {/* Right side - Content */}
        <Column valign="top">
          <div className="mb-3">
            <Img
              src={
                "https://avian-summit-travel-corporation.sgp1.cdn.digitaloceanspaces.com/quote.png"
              }
              alt="Quote icon"
              className="object-cover w-[32px] h-auto"
            />
          </div>

          <div className="mb-3">
            <Text className="text-[14px] text-[#18181b] font-normal">
              {review}
            </Text>
          </div>

          <div className="mb-3">
            <Text className="text-[10.24px] text-[#070e17] font-medium mb-2">
              {location as string}
            </Text>
            <Text className="text-[20px] text-[#18181b] font-semibold mb-2">
              {reviewerName}
            </Text>

            <Text className="text-[10.25px] font-medium text-black/50">
              {date as string}
            </Text>
          </div>
        </Column>
      </Row>
    </Section>
  );
};
