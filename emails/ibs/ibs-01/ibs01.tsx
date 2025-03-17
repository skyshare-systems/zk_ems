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
              className="text-black"
              style={{
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif",
              }}
            >
              <Markdown
                markdownCustomStyles={{
                  h1: {
                    fontSize: "2rem",
                    fontWeight: "700",
                    marginBlock: "1rem",
                  },
                  h2: {
                    fontSize: "1.8rem",
                    fontWeight: "700",
                    marginBlock: "1rem",
                  },
                  h3: {
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    marginBlock: "1rem",
                  },
                  h4: {
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    marginBlock: "1rem",
                  },
                  h5: {
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    marginBlock: "1rem",
                  },
                  h6: {
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBlock: "1rem",
                  },
                  blockQuote: {
                    borderLeft: "4px solid #e2e8f0",
                    paddingLeft: "1rem",
                    marginLeft: "0",
                    marginRight: "0",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    fontStyle: "italic",
                    color: "#4a5568",
                  },
                  bold: {
                    fontWeight: "700",
                  },
                  italic: {
                    fontStyle: "italic",
                  },
                  link: {
                    color: "#3182ce",
                    textDecoration: "none",
                    borderBottom: "1px solid transparent",
                    transition: "border-color 0.2s ease",
                  },
                  codeBlock: {
                    backgroundColor: "#f7fafc",
                    padding: "1rem",
                    borderRadius: "0.375rem",
                    overflowX: "auto",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    fontFamily: "monospace",
                  },
                  codeInline: {
                    fontFamily: "monospace",
                    backgroundColor: "#f7fafc",
                    padding: "0.2rem 0.4rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.9em",
                  },
                  p: {
                    marginTop: "0.75rem",
                    marginBottom: "0.75rem",
                    lineHeight: "1.6",
                  },
                  li: {
                    marginBottom: "0.5rem",
                  },
                  ul: {
                    paddingLeft: "1.5rem",
                    marginTop: "0.75rem",
                    marginBottom: "0.75rem",
                  },
                  ol: {
                    paddingLeft: "1.5rem",
                    marginTop: "0.75rem",
                    marginBottom: "0.75rem",
                  },
                  image: {
                    maxWidth: "100%",
                    height: "auto",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    borderRadius: "0.375rem",
                  },
                  br: {
                    marginTop: "0.5rem",
                  },
                  hr: {
                    height: "1px",
                    backgroundColor: "#e2e8f0",
                    border: "0",
                    marginTop: "2rem",
                    marginBottom: "2rem",
                  },
                  table: {
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  },
                  thead: {
                    backgroundColor: "#f7fafc",
                  },
                  tbody: {},
                  tr: {
                    borderBottom: "1px solid #e2e8f0",
                  },
                  th: {
                    padding: "0.75rem",
                    textAlign: "left",
                    fontWeight: "600",
                    borderBottom: "2px solid #e2e8f0",
                  },
                  td: {
                    padding: "0.75rem",
                    textAlign: "left",
                  },
                  strikethrough: {
                    textDecoration: "line-through",
                    color: "#718096",
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

                  <Text
                    style={{
                      margin: "8px !important",
                    }}
                    className="text-center text-black text-[14px] font-bold"
                  >
                    Grow Beyond Your Limits
                  </Text>
                  <Text
                    style={{
                      marginBlock: "12px !important",
                      marginInline: "auto",
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
                      margin: "8px !important",
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
                      margin: "8px !important",
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
                      margin: "0 !important",
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
