import { cn } from "@/lib/utils";
import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Html,
  Img,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { CSSProperties } from "react";

interface SkyshareJPLTemplateProps {
  body: string;
  isTemplate: boolean;
}

export const SkyshareLabsJPLTemplate = ({
  body,
  isTemplate,
}: SkyshareJPLTemplateProps) => {
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

        <style>
          {`
            @media (max-width: 640px) {
              .responsive-column {
                width: 100% !important;
                display: block !important;
                text-align: left !important;
              }
            }
          `}
        </style>

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
        <Body className="bg-black/[.08] my-auto mx-auto px-2 py-[20px]">
          <Container className="border rounded-lg text-white bg-white border-solid border-[#eaeaea] mx-auto max-w-[640px] overflow-hidden">
            <Section className="">
              <Img
                src={`https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/email_header.png`}
                width="100%"
                height="100%"
                alt="Skyshare Labs"
                className="my-0 mx-auto max-w-[640px] w-full object-contain"
              />
            </Section>

            <Section
              className="text-black p-8"
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
              }}
            >
              {isTemplate ? (
                <Row>
                  <Column align="center">
                    <Text className="text-[16px] font-semibold text-black/50">
                      Some great email content exists here.
                    </Text>
                  </Column>
                </Row>
              ) : (
                <div
                  style={{
                    maxWidth: "680px",
                    overflowWrap: "break-word" as const,
                    width: "100%",
                    lineHeight: "1.6",
                    fontSize: "14px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: body || "<p>Fallback</p>",
                  }}
                />
              )}
            </Section>

            <Section
              className="font-sora bg-red-500 relative p-3"
              style={{
                backgroundImage:
                  "url('https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/bg-1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Row>
                {/* Personal Info */}
                <Column
                  className="responsive-column"
                  style={{ width: "50%", verticalAlign: "top" }}
                >
                  <Text className="text-[20px] font-semibold text-white leading-none">
                    James Patrick Lucas
                  </Text>
                  <Text className="text-[14px] text-white opacity-50">
                    Business Development Manager
                  </Text>
                  <IconText
                    icon="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/phone.png"
                    text="+917 678 4455"
                  />
                  <IconText
                    icon="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/mail.png"
                    text="jameslucas@skysharelabs.com"
                    style={{ color: "white", textDecoration: "none" }}
                  />
                </Column>

                {/* Company Info - Moves below on small screens */}
                <Column className="responsive-column" style={{ width: "50%" }}>
                  <Text className="text-white text-[20px] font-semibold">
                    Skyshare Labs
                  </Text>
                  <IconText
                    icon="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/tel.png"
                    text="+63 969 631 0004"
                  />
                  <IconText
                    icon="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/mail.png"
                    text="management@skysharelabs.com"
                    style={{ color: "white", textDecoration: "none" }}
                    spanStyle={{ color: "white", textDecoration: "none" }}
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
  spanStyle,
}: {
  icon: string;
  text: string;
  style?: CSSProperties | undefined;
  spanStyle?: CSSProperties | undefined;
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
    <span
      className="m-0 leading-[1rem] tracking-normal "
      style={{
        ...spanStyle,
      }}
    >
      {text}
    </span>
  </Text>
);
