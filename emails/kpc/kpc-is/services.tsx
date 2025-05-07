import { chunkArray } from "@/emails/utils";
import { Service } from "@/store/create-email";
import { Button, Column, Img, Row, Text } from "@react-email/components";

export const OurServices = ({ services }: { services: Service[] }) => {
  const productRows = chunkArray(services, 3);

  return (
    <>
      {productRows.map((row, rowIndex) => (
        <Row key={`row-${rowIndex}`} className="mb-[16px]">
          {row.map((service, colIndex) => (
            <Column
              align="center"
              valign="top"
              key={service.title}
              className={
                colIndex === 0
                  ? "pr-[8px]"
                  : colIndex === row.length - 1
                    ? "pl-[8px]"
                    : "px-[4px]"
              }
              style={{ width: "33.33%" }}
            >
              <div className="mb-[24px] overflow-hidden">
                {/* Rounded full image at top */}
                <div className="size-[128px] rounded-full mx-auto mb-4 overflow-hidden">
                  <Img
                    src={service.image}
                    alt={service.title}
                    width="100%"
                    height="auto"
                    className="object-cover w-full h-[128px] "
                  />
                </div>

                {/* Title */}
                <Text className="font-semibold text-black text-[18px] m-0 mb-[8px]">
                  {service.title}
                </Text>

                {/* Description */}
                <Text className="text-black/50 m-0 mb-[16px] line-clamp-4 text-left">
                  {service.description.substring(0, 150)}

                  {service.description.length >= 150 && (
                    <span className="font-bold text-black/40">...</span>
                  )}
                </Text>

                {/* Button */}
                <Button
                  className="bg-[#F3BC30] text-[#000205] font-bold py-[8px] px-[16px] text-center text-[12px] box-border"
                  href={service.link}
                >
                  Learn More
                </Button>
              </div>
            </Column>
          ))}
          {/* Fill remaining columns if row is not complete */}
          {row.length < 3 &&
            Array(3 - row.length)
              .fill(0)
              .map((_, index) => (
                <Column
                  key={`empty-${index}`}
                  style={{ width: "33.33%" }}
                  className={index === 0 ? "px-[4px]" : "pl-[8px]"}
                >
                  <div></div>
                </Column>
              ))}
        </Row>
      ))}
    </>
  );
};
