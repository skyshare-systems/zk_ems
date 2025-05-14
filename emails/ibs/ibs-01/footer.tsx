import { cn } from "@/lib/utils";
import {
  Column,
  Container,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import React from "react";

const Footer = () => {
  return (
    <Section className="text-center bg-[#32517e] p-8 rounded-2xl">
      <Row align="center" className="p-4">
        <Column className="text-center" align="center">
          <Img
            src={`https://innovated-business-solutions.sgp1.cdn.digitaloceanspaces.com/logo.png`}
            width="64"
            height="56"
            alt="Skyshare Labs"
            className="object-cover h-16 w-16 mx-auto mb-4"
          />

          <div className="">
            <Text className="text-[14px] font-bold text-white">
              Grow Beyond Your Limits
            </Text>

            <Text className="text-[14px] font-normal">
              The pioneering agency in delivering tailored business solutions
              that empower SMEs to scale, streamline, and succeed.
            </Text>
          </div>

          <Container align="center" className="mx-auto mb-8 w-fit">
            <Text
              className={cn("")}
              style={{
                margin: "8px !important",
              }}
            >
              <Img
                style={{
                  verticalAlign: "middle",
                }}
                className="size-[16px] mr-1 inline-block"
                src={
                  "https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/location.png"
                }
                width={16}
                height={16}
              />
              <span
                style={{
                  verticalAlign: "middle",
                }}
                className="m-0 text-[10.24px]  leading-[1rem] tracking-normal text-white/50 "
              >
                Unit 3101, Tycoon Center Building, Pearl Drive, Ortigas Center,
                Pasig City
              </span>
            </Text>

            <Text
              className={cn("text-white/50 no-underline")}
              style={{
                margin: "8px !important",
              }}
            >
              <Img
                style={{
                  verticalAlign: "middle",
                }}
                className="size-[16px] mr-1 inline-block"
                src={
                  "https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/mail.png"
                }
                width={16}
                height={16}
              />
              <span
                style={{
                  verticalAlign: "middle",
                }}
                className="no-underline m-0 text-[10.24px]  leading-[1rem] tracking-normal text-white/50 "
              >
                innovatedacademyph@gmail.com
              </span>
            </Text>

            <Text
              className={cn("")}
              style={{
                margin: "0 !important",
              }}
            >
              <Img
                style={{
                  verticalAlign: "middle",
                }}
                className="size-[16px] mr-1 inline-block"
                src={
                  "https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/call.png"
                }
                width={16}
                height={16}
              />
              <span
                style={{
                  verticalAlign: "middle",
                }}
                className="m-0 text-[10.24px]  leading-[1rem] tracking-normal text-white/50"
              >
                0927-547-8713 / 0953-883-9132
              </span>
            </Text>
          </Container>
          <Container align="center" className="mx-auto mb-3 w-fit">
            <Link
              href="https://www.facebook.com/innovatedacademyph/"
              className="p-2 rounded-[8px] bg-white/[.04] mr-4 "
            >
              <Img
                src="https://innovated-business-solutions.sgp1.cdn.digitaloceanspaces.com/facebook.png"
                width={"14"}
                height={"14"}
                className="object-cover h-[14px] w-[14px] align-center inline-block"
              />
            </Link>
            <Link
              href="www.linkedin.com/in/innovated-business-academy"
              className="p-2  rounded-[8px] bg-white/[.04] mr-4 "
            >
              <Img
                src="https://innovated-business-solutions.sgp1.cdn.digitaloceanspaces.com/linkedin.png"
                width={"14"}
                height={"14"}
                className="object-cover h-[14px] w-[14px] align-center inline-block"
              />
            </Link>{" "}
            <Link
              href="https://www.tiktok.com/@innovatedacademy"
              className="p-2  rounded-[8px] bg-white/[.04] mr-4 "
            >
              <Img
                src="https://innovated-business-solutions.sgp1.cdn.digitaloceanspaces.com/tiktok.png"
                width={"14"}
                height={"14"}
                className="object-cover h-[14px] w-[14px] align-center inline-block"
              />
            </Link>{" "}
            <Link
              href="https://www.youtube.com/@InnovatedBusinessAcademy"
              className="p-2  rounded-[8px] bg-white/[.04] mr-4 "
            >
              <Img
                src="https://innovated-business-solutions.sgp1.cdn.digitaloceanspaces.com/youtube.png"
                width={"14"}
                height={"14"}
                className="object-cover h-[14px] w-[14px] align-center inline-block"
              />
            </Link>{" "}
            <Link
              href="https://www.instagram.com/innovated_ph/"
              className="p-2  rounded-[8px] bg-white/[.04]"
            >
              <Img
                src="https://innovated-business-solutions.sgp1.cdn.digitaloceanspaces.com/instagram.png"
                width={"14"}
                height={"14"}
                className="object-cover h-[14px] w-[14px] align-center inline-block"
              />
            </Link>
          </Container>
        </Column>
      </Row>
    </Section>
  );
};

export default Footer;
