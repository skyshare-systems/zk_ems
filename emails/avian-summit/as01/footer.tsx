import { cn } from "@/lib/utils";
import {
  Column,
  Container,
  Img,
  Row,
  Text,
  Link,
  Section,
} from "@react-email/components";

const Footer = () => {
  return (
    <Section className="text-center bg-[#F2F8FF] p-8">
      <Row>
        {/* Left Column */}
        <Column
          align="center"
          style={{
            width: "50%",
          }}
          valign="middle"
          className="pr-[16px]"
        >
          {/* Logo */}
          <Img
            src="https://avian-summit-travel-corporation.sgp1.cdn.digitaloceanspaces.com/logo.png"
            alt="Company Logo"
            width="152"
            height="auto"
            className="mb-[24px]"
          />

          <Container align="center" className="mx-auto mb-3 w-fit">
            <Link href="#">
              <Img
                src="https://avian-summit-travel-corporation.sgp1.cdn.digitaloceanspaces.com/instagram.png"
                width={"100%"}
                height={"100%"}
                className="aspect-[1/1] size-8 inline-block mr-[20px]"
              />
            </Link>

            <Link href="#">
              <Img
                src="https://avian-summit-travel-corporation.sgp1.cdn.digitaloceanspaces.com/youtube.png"
                width={"100%"}
                height={"100%"}
                className="aspect-[1/1] size-8 inline-block mr-[20px]"
              />
            </Link>

            <Link href="#">
              <Img
                src="https://avian-summit-travel-corporation.sgp1.cdn.digitaloceanspaces.com/facebook.png"
                width={"100%"}
                height={"100%"}
                className="aspect-[1/1] size-8 inline-block mr-[20px]"
              />
            </Link>

            <Link href="#">
              <Img
                src="https://avian-summit-travel-corporation.sgp1.cdn.digitaloceanspaces.com/tiktok.png"
                width={"100%"}
                height={"100%"}
                className="aspect-[1/1] size-8 inline-block mr-[20px]"
              />
            </Link>
          </Container>

          {/* Text Content */}
          <Text className="text-gray-800 m-0 p-0 text-[10.24px] text-[#18365A80]">
            Avian Summit Travel Corp.
          </Text>
          <Text className="text-gray-800 m-0 p-0 text-[10.24px] text-[#18365A80]">
            All rights reserved.
          </Text>
        </Column>

        {/* Right Column */}
        <Column
          style={{
            width: "50%",
          }}
          valign="middle"
          align="left"
          className="pl-[16px] border-l border-gray-200"
        >
          {/* Address Section */}
          <Text className="text-[14px] text-[#18365A] font-bold">Address</Text>
          <Row className="">
            <Column valign="top" className="w-[24px] align-top">
              <Img
                src="https://avian-summit-travel-corporation.sgp1.cdn.digitaloceanspaces.com/location.png"
                width={16}
                height={16}
              />
            </Column>
            <Column valign="top">
              <Text className="text-[#18365AB8] m-0 leading-[120%] align-top">
                3F ZK Summit, In Arca Strip Commercial Bldg., McArthur Highway,
                Corner Action Drive Center, Balubaran Dalandanan, Valenzuela,
                Philippines, 1443
              </Text>
            </Column>
          </Row>

          <Text className="text-[14px] text-[#18365A] font-bold">Contact</Text>
          <Row className="">
            <Column valign="top" className="w-[24px]">
              <Img
                src="https://avian-summit-travel-corporation.sgp1.cdn.digitaloceanspaces.com/mail.png"
                width={16}
                height={16}
              />
            </Column>
            <Column valign="top">
              <Text className="text-[#18365AB8] m-0 leading-none align-top">
                aviansummit@gmail.com
              </Text>
            </Column>
          </Row>
          <Row className="mt-1">
            <Column valign="top" className="w-[24px]">
              <Img
                src="https://avian-summit-travel-corporation.sgp1.cdn.digitaloceanspaces.com/call.png"
                width={16}
                height={16}
              />
            </Column>
            <Column valign="top">
              <Text className="text-[#18365AB8] m-0 leading-none align-top">
                0928 291 7170 (VIBER)
              </Text>
            </Column>
          </Row>
        </Column>
      </Row>
    </Section>
  );
};

export default Footer;
