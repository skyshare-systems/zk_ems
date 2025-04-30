import { chunkArray } from "@/emails/utils";
import { cn } from "@/lib/utils";
import { Service } from "@/store/create-email";
import { Row, Link, Column, Img, Text } from "@react-email/components";

export const OurServices = ({ services }: { services: Service[] }) => {
  const servicesRows = chunkArray(services, 3);

  return (
    <>
      {servicesRows.map((row, rowIndex) => (
        <Row key={`row-${rowIndex}`} className="mb-[16px]">
          {row.map((service, colIndex) => (
            <Column
              key={colIndex}
              className={cn(
                colIndex === 0
                  ? "pr-[8px]"
                  : colIndex === 1
                    ? "px-[4px]"
                    : "pl-[8px]",
              )}
              style={{ width: "33.33%" }}
            >
              <div className="border-[1px] p-4 border-solid border-gray-200 rounded-[8px] overflow-hidden">
                <Img
                  src={service.image}
                  alt={service.description.substring(0, 10)}
                  width="100%"
                  height="auto"
                  className="object-cover w-full h-[120px] rounded-lg overflow-hidden"
                />
                <div className="mt-[8px]">
                  <Text className="text-[14px] font-semibold mt-3  text-black text-center p-0">
                    {service.title}
                  </Text>
                  <Text className="text-[12px] text-black/50 m-0 mt-3 text-center leading-normal">
                    {service.description.substring(0, 80)}
                    {service.description.length > 80 && "..."}
                  </Text>
                  <Link
                    href={service.link}
                    className="text-black/40 font-bold mx-auto rounded-lg text-[14px] box-border bg-[#08306F] w-fit px-3 py-2 text-white mt-3"
                    style={{ display: "block" }}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </Column>
          ))}

          {/* If there are fewer than 3 products in a row, add empty columns */}
          {row.length < 3 &&
            Array.from({ length: 3 - row.length }).map((_, index) => (
              <Column
                key={`empty-${index}`}
                style={{ width: "33.33%" }}
                className={cn(
                  row.length === 1 && index === 0 ? "px-[4px]" : "pl-[8px]",
                )}
              >
                <div></div>
              </Column>
            ))}
        </Row>
      ))}
    </>
  );
};
