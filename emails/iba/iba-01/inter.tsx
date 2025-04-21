import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Tailwind,
  Font,
} from "@react-email/components";

const EmailTemplate = () => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2",
            format: "woff2",
          }}
          fontWeight={700}
          fontStyle="normal"
        />
      </Head>
      <Tailwind>
        <Body className="font-sans bg-gray-100 py-[40px]">
          <Container className="bg-white rounded-[8px] mx-auto p-[20px] max-w-[600px]">
            <Section>
              <Text className="text-[24px] font-bold text-gray-800 mb-[16px] font-['Inter']">
                Using Inter Font
              </Text>
              <Text className="text-[16px] text-gray-600 mb-[24px] font-['Inter']">
                This email template is using the Inter font family. The font is
                loaded from Google Fonts and applied to the text elements.
              </Text>
              <Text className="text-[16px] text-gray-600 mb-[24px] font-['Inter']">
                You can see both regular (400) and bold (700) weights being used
                in this template.
              </Text>
            </Section>

            <Section className="border-t border-gray-200 mt-[32px] pt-[32px]">
              <Text className="text-[14px] text-gray-500 m-0 font-['Inter']">
                123 Email Street, Inbox City, 12345
              </Text>
              <Text className="text-[14px] text-gray-500 m-0 font-['Inter']">
                © {new Date().getFullYear()} Your Company
              </Text>
              <Text className="text-[14px] text-gray-500 m-0 font-['Inter']">
                <a
                  href="https://example.com/unsubscribe"
                  className="text-blue-500 underline"
                >
                  Unsubscribe
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailTemplate;
