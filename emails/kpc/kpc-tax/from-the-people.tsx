import { chunkArray } from "@/emails/utils";
import { FromThePeople } from "@/store/create-email";
import { Column, Img, Row, Text, Section, Link } from "@react-email/components";

export const FromThePeopleSection = ({
  fromThePeople,
}: {
  fromThePeople: FromThePeople[];
}) => {
  const fromThePeopleRows = chunkArray(fromThePeople, 2);

  return (
    <>
      {fromThePeopleRows.map((row, rowIndex) => (
        <Row key={`row-${rowIndex}`} className="mb-[16px]">
          {row.map((people, colIndex) => {
            const { review, reviewerImage, reviewerName, rating } = people;
            return (
              <Column
                key={people.reviewerName}
                className={colIndex === 0 ? "pr-[8px]" : "pl-[8px]"}
                style={{ width: "50%" }}
              >
                <div className="border-[1px]  border-solid border-gray-200 rounded-[8px] overflow-hidden p-4">
                  {rating &&
                    Array.from({ length: rating }).map((_, index) => (
                      <Img
                        key={index}
                        src="https://kpc-tax.sgp1.cdn.digitaloceanspaces.com/star.png"
                        width={16}
                        height={16}
                        className="inline-block mr-1 mb-2"
                      />
                    ))}

                  <Text className="text-[14px] font-normal italic text-[#000205] m-0 p-0 leading-normal mb-2">
                    {review.substring(0, 100)}
                  </Text>

                  <Img
                    src={"https://new.email/static/app/placeholder.png"}
                    width={32}
                    height={32}
                    className="inline-block mr-2 mb-2 rounded-full align-middle"
                  />
                  <Text className="text-[14px] font-bold text-[#000205] m-0 p-0 leading-normal mb-2 inline-block align-middle">
                    {reviewerName}
                  </Text>
                </div>
              </Column>
            );
          })}

          {/* If there's only one product in the row, add an empty column */}
          {row.length === 1 && (
            <Column style={{ width: "50%" }} className="pl-[8px]">
              <div></div>
            </Column>
          )}
        </Row>
      ))}
    </>
  );
};
