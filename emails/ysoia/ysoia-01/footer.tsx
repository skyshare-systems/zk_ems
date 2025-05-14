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
    <Section className="text-center p-8">
      <Row align="center" className="p-4 ">
        <Column className="text-center" align="center">
          <Img
            src={`https://your-skin.sgp1.cdn.digitaloceanspaces.com/logo.png`}
            width="66"
            height="88"
            alt="Skyshare Labs"
            className="object-cover w-16 mx-auto mb-3"
          />

          <Container align="center" className="mx-auto mb-3 w-fit">
            <Link href="https://www.instagram.com/yourskin.school/">
              <Img
                src="https://your-skin.sgp1.cdn.digitaloceanspaces.com/instagram.png"
                width={"100%"}
                height={"100%"}
                className="aspect-[1/1] size-8 inline-block mr-[20px]"
              />
            </Link>

            <Link href="https://www.youtube.com/@YourSkinSchool">
              <Img
                src="https://your-skin.sgp1.cdn.digitaloceanspaces.com/youtube.png"
                width={"100%"}
                height={"100%"}
                className="aspect-[1/1] size-8 inline-block mr-[20px]"
              />
            </Link>

            <Link href="https://www.facebook.com/share/1UKoDrSaWK/">
              <Img
                src="https://your-skin.sgp1.cdn.digitaloceanspaces.com/facebook.png"
                width={"100%"}
                height={"100%"}
                className="aspect-[1/1] size-8 inline-block mr-[20px]"
              />
            </Link>

            <Link href="https://www.tiktok.com/@yourskin_school">
              <Img
                src="https://your-skin.sgp1.cdn.digitaloceanspaces.com/tiktok.png"
                width={"100%"}
                height={"100%"}
                className="aspect-[1/1] size-8 inline-block"
              />
            </Link>
          </Container>

          <Container align="center" className="mx-auto mb-3 w-fit">
            <Text
              className={cn("text-[#3467A9B8]")}
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
                  "https://your-skin.sgp1.cdn.digitaloceanspaces.com/location.png"
                }
                width={16}
                height={16}
              />
              <span
                style={{
                  verticalAlign: "middle",
                }}
                className="m-0 leading-[1rem] tracking-normal "
              >
                #3101 Tycoon Center, Pearl Drive, Ortigas Center, San Antonio,
                Ortigas, Pasig City
              </span>
            </Text>

            <Text
              className={cn("text-[#3467A9B8]")}
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
                  "https://your-skin.sgp1.cdn.digitaloceanspaces.com/mail.png"
                }
                width={16}
                height={16}
              />
              <span
                style={{
                  verticalAlign: "middle",
                }}
                className="m-0 leading-[1rem] tracking-normal "
              >
                yourskinaestheticmedicalgroup@gmail.com
              </span>
            </Text>

            <Text
              className={cn("text-[#3467A9B8]")}
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
                  "https://your-skin.sgp1.cdn.digitaloceanspaces.com/call.png"
                }
                width={16}
                height={16}
              />
              <span
                style={{
                  verticalAlign: "middle",
                }}
                className="m-0 leading-[1rem] tracking-normal"
              >
                0917-622-0676 / 0927-735-9793
              </span>
            </Text>
          </Container>

          <Container>
            <Text className="text-[#3467A980] inline-block  p-0 m-0 mr-4">
              YourSkin School of Integrated Aesthetics
            </Text>
            <Text className="text-[#3467A980] inline-block  p-0 m-0">
              All rights reserved.
            </Text>
          </Container>
        </Column>
      </Row>
    </Section>
  );
};

export default Footer;
