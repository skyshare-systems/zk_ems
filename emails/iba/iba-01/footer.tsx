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
    <Section className="text-center bg-[#09316F] p-8">
      <Row align="center" className="p-4">
        <Column className="text-center" align="center">
          <Img
            src={`https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/logo.png`}
            width="64"
            height="64"
            alt="Skyshare Labs"
            className="object-cover w-16 mx-auto mb-3"
          />

          <Container align="center" className="mx-auto mb-3 w-fit">
            <Link href="https://www.instagram.com/innovatedsolutionsph/">
              <Img
                src="https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/instagram.png"
                width={"100%"}
                height={"100%"}
                className="aspect-[1/1] size-8 inline-block mr-[20px]"
              />
            </Link>

            <Link href="https://www.facebook.com/share/19mUERaoCZ/">
              <Img
                src="https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/facebook.png"
                width={"100%"}
                height={"100%"}
                className="aspect-[1/1] size-8 inline-block"
              />
            </Link>
          </Container>

          <Container align="center" className="mx-auto mb-3 w-fit">
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
                className="m-0 leading-[1rem] tracking-normal text-white/[.72] "
              >
                Unit 3101, Tycoon Center Building, Pearl Drive, Ortigas Center,
                Pasig City
              </span>
            </Text>

            <Text
              className={cn("text-white/[.72]")}
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
                className="m-0 leading-[1rem] tracking-normal text-white/[.72] "
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
                className="m-0 leading-[1rem] tracking-normal text-white/[.72]"
              >
                Admission Inquiries: 09766078446 (Kim)
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
                className="m-0 leading-[1rem] tracking-normal text-white/[.72]"
              >
                Reservation: 09922075046 (Juhlia)
              </span>
            </Text>

            <Text className="mt-3 leading-[1rem] tracking-normal text-white/[.50] inline-block">
              Innovated Business Academy
            </Text>
            <Text className="m-0 leading-[1rem] tracking-normal text-white/[.50] inline-block">
              All rights reserved.
            </Text>
          </Container>
        </Column>
      </Row>
    </Section>
  );
};

export default Footer;
