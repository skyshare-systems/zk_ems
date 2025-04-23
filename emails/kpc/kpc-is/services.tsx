import { chunkArray } from "@/emails/utils";
import { cn } from "@/lib/utils";
import { Service } from "@/store/create-email";
import { Row, Link, Column, Img, Text, Button } from "@react-email/components";

export const OurServices = ({ services }: { services: Service[] }) => {
  return (
    <Row>
      {services.map((service, index) => (
        <Column
          key={index}
          className="px-[8px] text-center"
          style={{ width: "33.33%" }}
        >
          <div className="mb-[24px]">
            {/* Rounded full image at top */}
            <div className="size-[128px] rounded-full mx-auto mb-4 overflow-hidden">
              <Img
                src={service.image}
                width="128"
                height="128"
                alt={service.title}
                className="rounded-full mx-auto mb-[16px]"
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
    </Row>
  );
};
