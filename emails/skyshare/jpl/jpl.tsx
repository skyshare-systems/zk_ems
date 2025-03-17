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
            url: "../static/fonts/sora/Sora-Regular.ttf",
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
                <Markdown>{body ?? "# Test"}</Markdown>
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
                    text="+63 956 487 5538"
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
