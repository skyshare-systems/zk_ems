import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  Font,
  Markdown,
} from "@react-email/components";
import * as React from "react";

interface SkyshareJPLTemplateProps {
  // username?: string;
  userImage?: string;
  // invitedByUsername?: string;
  // invitedByEmail?: string;
  // teamName?: string;
  teamImage?: string;
  // inviteLink?: string;
  // inviteFromIp?: string;
  // inviteFromLocation?: string;
  body: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const SkyshareLabsJPLTemplate = ({ body }: SkyshareJPLTemplateProps) => {
  // const previewText = `Join ${invitedByUsername} on Vercel`;

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

        <Font
          fontFamily="MuseoModerno"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "../static/fonts/museomoderno/MuseoModerno-Regular.ttf",
            format: "truetype",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      {/* <Preview>{previewText}</Preview> */}
      <Tailwind>
        <Body className="bg-black/20 my-auto mx-auto  px-2">
          <Container className="border bg-white border-solid border-[#eaeaea] rounded mx-auto p-[20px] max-w-[640px]">
            <Section className="">
              <Img
                src={`${baseUrl}/static/email_header.png`}
                width="640"
                height="150"
                alt="Skyshare Labs"
                className="my-0 mx-auto max-w-[640px] w-full object-cover"
              />
            </Section>

            <Section style={{
              fontFamily: ""
            }}>
              <Markdown>{body ?? "# Test"}</Markdown>
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
                  <Text
                    style={{
                      fontFamily: "MuseoModerno",
                    }}
                    className="text-[14px] text-white opacity-50"
                  >
                    Business Development Manager
                  </Text>
                  <ContactItem
                    icon="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/phone.png"
                    text="+917 678 4455"
                  />
                  <ContactItem
                    icon="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/mail.png"
                    text="jameslucas@skysharelabs.com"
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

SkyshareLabsJPLTemplate.PreviewProps = {
  // username: "alanturing",
  userImage: `${baseUrl}/static/vercel-user.png`,
  // invitedByUsername: "Alan",
  // invitedByEmail: "alan.turing@example.com",
  // teamName: "Enigma",
  teamImage: `${baseUrl}/static/vercel-team.png`,
  // inviteLink: "https://vercel.com/teams/invite/foo",
  // inviteFromIp: "204.13.186.218",
  // inviteFromLocation: "São Paulo, Brazil",
} as SkyshareJPLTemplateProps;

export default SkyshareLabsJPLTemplate;

const ContactItem = ({ icon, text }: { icon: string; text: string }) => (
  // <Row>
  //   <Column
  //     align="center"
  //     style={{
  //       display: "table-cell",
  //     }}
  //   >
  //     <Link
  //       href="https://wallet.apple.com/apple-card/setup/feature/ccs?referrer=cid%3Dapy-120-100003"
  //       style={{
  //         textDecoration: "none",
  //       }}
  //     >
  //       <Img
  //         src={`${baseUrl}/static/apple-wallet.png`}
  //         width="28"
  //         height="28"
  //         alt="Apple Wallet"
  //         style={{
  //           display: "inherit",
  //           paddingRight: "8px",
  //           verticalAlign: "middle",
  //         }}
  //       />
  //       <Img
  //         className="inline-block self-stretch mr-2"
  //         src={icon}
  //         width={16}
  //         height={16}
  //       />
  //       <span
  //         style={{
  //           textDecoration: "none",
  //         }}
  //       >
  //         {text}
  //       </span>
  //     </Link>
  //   </Column>
  // </Row>

  <Text className="flex text-white leading-none gap-2 items-start">
    <Img
      style={{
        verticalAlign: "middle",
      }}
      className="self-stretch mr-1"
      src={icon}
      width={16}
      height={16}
    />
    <span className="m-0 leading-[1rem] tracking-normal">{text}</span>
  </Text>
);
