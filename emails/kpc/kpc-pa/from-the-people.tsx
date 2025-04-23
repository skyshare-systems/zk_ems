import { FromThePeople } from "@/store/create-email";
import { Column, Img, Row, Text } from "@react-email/components";

export const FromThePeopleCard = ({ people }: { people: FromThePeople }) => {
  const { review, reviewerImage, reviewerName, rating } = people;
  return (
    <Row className="mb-[16px]">
      <Column style={{ width: "100%" }}>
        <div className="rounded-[8px] overflow-hidden p-[16px]">
          {rating &&
            rating > 0 &&
            Array.from({ length: rating }).map((_, index) => (
              <Img
                key={`star-${index}`}
                src="https://kpc-pa.sgp1.cdn.digitaloceanspaces.com/star.png"
                width={16}
                height={16}
                className="inline-block mr-[4px] mb-[8px]"
                alt="Star"
              />
            ))}

          <Text className="text-[14px] font-normal italic text-[#000205] m-0 p-0 leading-normal mb-[8px]">
            {review.substring(0, 100)}
            {review.length > 100 ? "..." : ""}
          </Text>

          <div>
            <Img
              src={reviewerImage}
              width={32}
              height={32}
              className="inline-block mr-[8px] rounded-full align-middle"
              alt={`${reviewerName} avatar`}
            />
            <Text className="text-[14px] font-bold text-[#000205] m-0 p-0 leading-normal inline-block align-middle">
              {reviewerName}
            </Text>
          </div>
        </div>
      </Column>
    </Row>
  );
};

export default FromThePeopleCard;
