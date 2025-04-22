import { FromThePeople } from "@/store/create-email";
import { Column, Img, Row, Section, Text } from "@react-email/components";

export const FromThePeopleCard = ({ people }: { people: FromThePeople }) => {
  const { rating, reviewerImage, review, reviewerName, courseTaken } = people;

  return (
    <Section className="border-[1px] border-solid border-[#Dfd8e9] bg-4 bg-white rounded-[16px] mb-4 p-4">
      <Row className="m-0">
        {/* Left side - Image */}
        <Column valign="middle" className="w-[36px] pr-[20px]">
          <Img
            src={reviewerImage}
            alt="Profile image"
            className="object-cover w-full h-auto rounded-full"
          />
        </Column>

        {/* Right side - Content */}
        <Column>
          {/* Name and star in the same row, properly aligned */}
          <Row className="m-0">
            <Column className="p-0">
              <Text className="m-0 font-bold text-black">
                {reviewerName}

                {Array.from({
                  length:
                    Math.round(rating ?? 5) > 5 ? 5 : Math.round(rating ?? 5),
                }).map((_, index) => (
                  <Img
                    key={index}
                    src="https://your-skin.sgp1.cdn.digitaloceanspaces.com/star.png"
                    alt="Star"
                    width="20"
                    height="20"
                    className="ml-[8px] inline-block align-middle"
                  />
                ))}
              </Text>
            </Column>
          </Row>

          <Text className="m-0 text-[12.8px] text-black/50">
            {courseTaken as string}
          </Text>
        </Column>
      </Row>

      <Row className="m-0 mt-[16px]">
        <Column>
          <Text className="m-0 text-[14px] font-normal text-black/[.72]">
            {review}
          </Text>
        </Column>
      </Row>
    </Section>
  );
};
