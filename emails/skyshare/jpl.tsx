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

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

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

        {/*   <Font
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
          <Container className="border text-white bg-white border-solid border-[#eaeaea] rounded mx-auto p-[20px] max-w-[640px]">
            <Section className="">
              <Img
                src={`${baseUrl}/static/email_header.png`}
                width="640"
                height="150"
                alt="Skyshare Labs"
                className="my-0 mx-auto max-w-[640px] w-full object-cover"
              />
            </Section>

            <Section
              className="text-black"
              style={{
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif",
              }}
            >
              <Markdown>{body ?? ""}</Markdown>
            </Section>

            <Section className="bg-red-500 relative bg-[url('https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/bg-1.png')] bg-cover bg-center bg-no-repeat p-3">
              <Row>
                {/* Personal Info */}
                <Column
                  align="left"
                  className="w-[50%] mb-auto"
                  style={{
                    verticalAlign: "top",
                  }}
                >
                  <Text className="text-[20px] font-semibold text-white leading-none">
                    James Patrick Lucas
                  </Text>
                  <Text className="text-[14px] text-white opacity-50">
                    Business Development Manager
                  </Text>
                  <ContactItem
                    icon="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/phone.png"
                    text="+917 678 4455"
                  />
                  <ContactItem
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
                  <Text className="text-white text-[20px] font-semibold">
                    Skyshare Labs
                  </Text>
                  <ContactItem
                    icon="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/tel.png"
                    text="+63 956 487 5538"
                  />
                  <ContactItem
                    icon="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/mail.png"
                    text="management@skysharelabs.com"
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}
                  />
                  <ContactItem
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

const ContactItem = ({
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
    }}
  >
    <Img
      style={{
        verticalAlign: "middle",
      }}
      className="self-stretch mr-1"
      src={icon}
      width={16}
      height={16}
    />
    <span className="m-0 leading-[1rem] tracking-normal ">{text}</span>
  </Text>
);
