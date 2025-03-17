import { IconText } from "@/emails/skyshare/jpl/jpl";
import { cn } from "@/lib/utils";
import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Html,
  Img,
  Markdown,
  Row,
  Section,
  Tailwind,
  Text,
  Hr,
  Link,
} from "@react-email/components";
import { CSSProperties } from "react";

interface IBS01TemplateProps {
  body: string;
}

export const IBS01Template = ({ body }: IBS01TemplateProps) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Geist"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "/static/fonts/geist/Geist-Regular.ttf",
            format: "truetype",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      {/* <Preview>{previewText}</Preview> */}
      <Tailwind>
        <Body className="font-geist bg-black/20 my-auto mx-auto  px-2 py-[20px]">
          <Container className="border text-white bg-white border-solid border-[#eaeaea] rounded mx-auto p-[20px] max-w-[640px]">
            <Section className="my-0 mx-auto max-w-[640px] w-full object-cover">
              <Img
                src={`https://innovated-business-solutions.sgp1.cdn.digitaloceanspaces.com/logo.jpg`}
                width="32"
                height="32"
                alt="Skyshare Labs"
                className="w-8 object-cover mx-auto"
              />
            </Section>

            <Section
              className="text-black text-center"
              style={{
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif",
              }}
            >
              <Markdown
                markdownCustomStyles={{
                  h1: {
                    lineHeight: "1.25",
                    fontSize: "24px",
                  },
                }}
              >
                {body ?? ""}
              </Markdown>
            </Section>

            <Section className="text-center">
              <Row align="center">
                <Column className="text-center" align="center">
                  <Img
                    src={`https://innovated-business-solutions.sgp1.cdn.digitaloceanspaces.com/logo.jpg`}
                    width="64"
                    height="64"
                    alt="Skyshare Labs"
                    className="w-16 object-cover mx-auto"
                  />

                  <Text className="text-center text-black text-[14px] font-bold">
                    Grow Beyond Your Limits
                  </Text>
                  <Text
                    style={{
                      margin: "0 auto",
                    }}
                    className="text-center text-black text-[14px] font-normal max-w-[404px]"
                  >
                    The pioneering agency in delivering tailored business
                    solutions that empower SMEs to scale, streamline, and
                    succeed.
                  </Text>

                  <Text
                    className={cn("")}
                    style={{
                      marginInline: "auto",
                    }}
                  >
                    <Img
                      style={{
                        verticalAlign: "middle",
                      }}
                      className="size-[16px] mr-1 inline-block"
                      src={
                        "https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/location-03.png"
                      }
                      width={16}
                      height={16}
                    />
                    <span className="m-0 leading-[1rem] tracking-normal text-black/50">
                      Unit 3101, Tycoon Center Building, Pearl Drive, Ortigas
                      Center, Pasig
                    </span>
                  </Text>

                  <Text
                    className={cn("")}
                    style={{
                      marginInline: "auto",
                    }}
                  >
                    <Img
                      style={{
                        verticalAlign: "middle",
                      }}
                      className="size-[16px] mr-1 inline-block"
                      src={
                        "https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/mail-01.png"
                      }
                      width={16}
                      height={16}
                    />
                    <span className="m-0 leading-[1rem] tracking-normal text-black/50">
                      innovatedsolutionsph@gmail.com
                    </span>
                  </Text>

                  <Text
                    className={cn("")}
                    style={{
                      marginInline: "auto",
                    }}
                  >
                    <Img
                      style={{
                        verticalAlign: "middle",
                      }}
                      className="size-[16px] mr-1 inline-block"
                      src={
                        "https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/smart-phone-01.png"
                      }
                      width={16}
                      height={16}
                    />
                    <span className="m-0 leading-[1rem] tracking-normal text-black/50">
                      0927 547 8713
                    </span>
                  </Text>

                  <Hr className="mb-8" />

                  <Link
                    href="https://www.facebook.com/innovatedacademyph"
                    className="p-2 rounded-[8px] bg-black/[.04] mr-2"
                  >
                    <Img
                      style={{
                        verticalAlign: "middle",
                      }}
                      src={
                        "https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/facebook-01.png"
                      }
                      width={14}
                      height={14}
                      className="h-[14px] inline object-cover"
                    />
                  </Link>

                  <Link
                    href="https://www.facebook.com/innovatedacademyph"
                    className="p-2 rounded-[8px] bg-black/[.04] mr-2"
                  >
                    <Img
                      style={{
                        verticalAlign: "middle",
                      }}
                      src={
                        "https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/new-twitter.png"
                      }
                      width={14}
                      height={14}
                      className="h-[14px] inline object-cover"
                    />
                  </Link>

                  <Link
                    href="http://www.linkedin.com/in/innovated-business-academy"
                    className="p-2 rounded-[8px] bg-black/[.04] mr-2"
                  >
                    <Img
                      style={{
                        verticalAlign: "middle",
                      }}
                      src={
                        "https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/linkedin-01.png"
                      }
                      width={14}
                      height={14}
                      className="h-[14px] inline object-cover"
                    />
                  </Link>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default IBS01Template;
