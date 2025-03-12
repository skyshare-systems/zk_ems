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
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      {/* <Preview>{previewText}</Preview> */}
      <Tailwind>
        <Body className="bg-black/20 my-auto mx-auto font-sans px-2">
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

            <Section>
              <Markdown>{body ?? "# Test"}</Markdown>
            </Section>

            <Section className="bg-red-500 relative bg-[url('https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/bg-1.png')] bg-cover bg-center bg-no-repeat p-3">
              <Row className="">
                {/* Personal Info */}
                <Column align="left" className="w-[50%] mb-auto">
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
  <Text className="flex items-center text-white tracking-normal leading-normal">
    <Img
      className="inline-block self-center mr-2"
      src={icon}
      width={16}
      height={16}
    />
    <span className="m-0">{text}</span>
  </Text>
);
