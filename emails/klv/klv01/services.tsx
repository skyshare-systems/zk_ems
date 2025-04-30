import { chunkArray } from "@/emails/utils";
import { cn } from "@/lib/utils";
import { Service } from "@/store/create-email";
import { Row, Link, Column, Img, Text } from "@react-email/components";

export const OurServices = ({ services }: { services: Service[] }) => {
  return (
    <>
      {services.map((service, index) => (
        <Row
          key={index}
          className="rounded-lg border border-[##3467A929] bg-white p-4 mb-2"
        >
          {/* Right Column - Image */}
          <Column valign="top" className="text-center pr-4">
            <div
              style={{
                width: "100%",
                height: "141px",
                overflow: "hidden",
              }}
            >
              <Img
                src={service.image}
                alt="Placeholder image"
                width="250"
                height="141"
                className="w-full h-[141px] object-cover rounded-[4px] align-top"
              />
            </div>
          </Column>

          {/* Left Column - Content */}
          <Column valign="top" className="w-[50%]">
            <Text className="text-[14px] font-bold text-[#000205] my-[4px]  align-top mb-2 p-0">
              {service.title}
            </Text>
            <Text className="text-[12px] text-black/50 my-[4px] leading-normal align-top mb-2 p-0">
              {service.description.substring(0, 140)}
              {service.description.length > 140 ? "..." : ""}
            </Text>
            <Link
              href={service.link}
              className="bg-[#00A19B] align-top mb-2 p-0 rounded-[12px] text-white px-4 py-2 font-medium no-underline text-[14px] inline-block box-border w-full"
            >
              Learn More
            </Link>
          </Column>
        </Row>
      ))}
    </>
  );
};
