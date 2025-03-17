import { cn } from "@/lib/utils";
import {
  Body,
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
} from "@react-email/components";
import { CSSProperties } from "react";

interface SkyshareJPLTemplateProps {
  body: string;
}

export const SkyshareLabsJPLTemplate = ({ body }: SkyshareJPLTemplateProps) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Sora"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "/static/fonts/sora/Sora-Regular.ttf",
            format: "truetype",
          }}
          fontWeight={400}
          fontStyle="normal"
        />

        {/* <Font
          fontFamily="MuseoModerno"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "../static/fonts/museomoderno/MuseoModerno-Regular.ttf",
            format: "truetype",
          }}
          fontWeight={400}
          fontStyle="normal"
        /> */}
      </Head>
      {/* <Preview>{previewText}</Preview> */}
      <Tailwind>
        <Body className="bg-black/20 my-auto mx-auto  px-2 py-[20px]">
          <Container className="border text-white bg-white border-solid border-[#eaeaea] rounded mx-auto max-w-[640px]">
            <Section className="">
              <Img
                src={`https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/email_header.png`}
                width="640"
                height="130"
                alt="Skyshare Labs"
                className="my-0 mx-auto max-w-[640px] w-full object-cover"
              />
            </Section>

            <Section
              className="my-10 text-black"
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
              }}
            >
              <div className="wrapper px-4">
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
                  {body ?? "# Test"}
                </Markdown>
              </div>
            </Section>

            <Section className="font-sora bg-red-500 relative bg-[url('https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/bg-1.png')] bg-cover bg-center bg-no-repeat p-3">
              <Row>
                {/* Personal Info */}
                <Column
                  align="left"
                  className="w-[50%] mb-auto"
                  style={{
                    verticalAlign: "top",
                  }}
                >
                  <Text
                    style={{
                      margin: "4px !important",
                    }}
                    className="text-[20px] font-semibold text-white leading-none"
                  >
                    James Patrick Lucas
                  </Text>
                  <Text
                    style={{
                      margin: "4px !important",
                    }}
                    className="text-[14px] text-white opacity-50"
                  >
                    Business Development Manager
                  </Text>
                  <IconText
                    icon="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/phone.png"
                    text="+917 678 4455"
                  />
                  <IconText
                    icon="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/mail.png"
                    text="jameslucas@skysharelabs.com"
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}
                  />
                </Column>
                {/* Company Info */}
                <Column align="left" className="w-[50%]">
                  <Text
                    style={{
                      margin: "0 !important",
                    }}
                    className="text-white text-[20px] font-semibold"
                  >
                    Skyshare Labs
                  </Text>
                  <IconText
                    icon="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/tel.png"
                    text="+63 969 631 0004"
                  />
                  <IconText
                    icon="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/mail.png"
                    text="management@skysharelabs.com"
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}
                  />
                  <IconText
                    icon="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/pin.png"
                    text="Block 6, Lot 6A Dulalia Homes 1, T. Santiago St., Viente Reales, Valenzuela City"
                  />
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SkyshareLabsJPLTemplate;

export const IconText = ({
  icon,
  text,
  style,
}: {
  icon: string;
  text: string;
  style?: CSSProperties | undefined;
}) => (
  <Text
    className={cn("flex text-white leading-none gap-2 items-start")}
    style={{
      ...style,
      margin: "4px !important",
    }}
  >
    <Img
      style={{
        verticalAlign: "middle",
      }}
      className="size-[16px] mr-1"
      src={icon}
      width={16}
      height={16}
    />
    <span className="m-0 leading-[1rem] tracking-normal ">{text}</span>
  </Text>
);
