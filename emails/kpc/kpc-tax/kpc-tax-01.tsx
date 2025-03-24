import { IconText } from "@/emails/skyshare/jpl/jpl";
import { cn } from "@/lib/utils";
import { Articles } from "@/store/create-email";
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

interface KPCTAX01TemplateProps {
  body: string;
  articles: Articles[];
  isTemplate: boolean;
}

export const KPCTAX01Template = ({
  body,
  articles,
  isTemplate,
}: KPCTAX01TemplateProps) => {
  const modifiedBody = body?.replace(
    /<img(?![^>]*\bwidth\b)([^>]*)>/gi,
    '<img style="max-width:640px; width:100%; border-radius:12px" $1>',
  );

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Poppins"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "/static/fonts/poppins/Poppins-Regular.ttf",
            format: "truetype",
          }}
          fontWeight={400}
          fontStyle="normal"
        />

        <style>
          {`
          @media (max-width: 640px) {
            .footer-row {
              display: block !important;
              text-align: center !important;
            }
            .footer-column {
              width: 100% !important;
              display: block !important;
              margin-bottom: 8px !important;
            }
            .responsive-padding {
              padding: 0 32px !important;
            }
          }
        `}
        </style>
      </Head>
      {/* <Preview>{previewText}</Preview> */}
      <Tailwind>
        <Body className="font-poppins bg-black/20 my-auto mx-auto  px-2 py-[20px]">
          <Container className="border rounded-lg overflow-hidden text-white bg-white border-solid border-[#eaeaea]  mx-auto max-w-[640px] w-full">
            {/* HEADER */}
            <Section className="my-0 mx-auto w-full h-[86px] max-h-[86px] object-cover bg-[url('https://kpc-tax.sgp1.cdn.digitaloceanspaces.com/template-header.png')] bg-cover bg-center bg-no-repeat"></Section>

            {/* BODY */}
            <Section
              className="text-black responsive-padding p-4 [&>img]:max-w-[640px] w-full"
              style={{
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif",
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
                <div className="w-full">
                  <Markdown
                    markdownContainerStyles={{
                      imageRendering: "crisp-edges",
                      container: "prose max-w-none",
                      containerType: "unset",
                      aspectRatio: "none",
                      maxWidth: "640px",
                      width: "100%",
                    }}
                  >
                    {modifiedBody ?? "# KPC TAX"}
                  </Markdown>
                </div>
              )}
            </Section>

            {articles && articles.length > 0 && (
              <Section
                className="mx-auto  p-4  text-black w-full"
                style={{
                  maxWidth: "640px",
                  width: "100%",
                }}
              >
                {articles.map((article) => (
                  <Row
                    key={article.heading}
                    className="bg-black/[.04] p-4 rounded-lg"
                  >
                    <Column>
                      <Text className="text-black/[.5] text-[12px] uppercase font-bold">
                        ARTICLE
                      </Text>
                      <Text className="text-[20px] font-semibold break-words">
                        {article.heading}
                      </Text>
                      <Text className="text-[14px] break-words">
                        {article.content}
                      </Text>
                      <Link
                        href={article.articleLink}
                        className="text-black block mt-[8px] mx-auto w-fit bg-[#F3BC30] px-4 py-3 text-[14px] font-bold"
                      >
                        Read Article
                      </Link>
                    </Column>
                  </Row>
                ))}
              </Section>
            )}

            <Section className="relative bg-[url('https://kpc-tax.sgp1.cdn.digitaloceanspaces.com/footer-bg.png')] bg-cover bg-center bg-no-repeat p-8">
              <Row align="center">
                <Column className="text-center">
                  <Img
                    src={`https://kpc-pa.sgp1.cdn.digitaloceanspaces.com/footer-logo.png`}
                    width="100%"
                    height="100%"
                    alt="Skyshare Labs"
                    className="ml-4 inline self-center w-[92px] h-[35px] object-cover mx-auto"
                    style={{
                      verticalAlign: "middle",
                      marginLeft: "16px",
                    }}
                  />
                  <Text
                    style={{
                      verticalAlign: "center",
                      background:
                        "linear-gradient(90deg, #D5BC3B 0%, #FAE696 48%, #D5BC3B 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: "16px",
                    }}
                    className="self-center"
                  >
                    Simplify Your Compliance, Amplify Your Growth
                  </Text>
                </Column>
              </Row>

              <Row>
                <Column align="center">
                  <Link
                    href="#"
                    style={{
                      display: "inline-flex",
                    }}
                  >
                    <Img
                      src={`https://kpc-is.sgp1.cdn.digitaloceanspaces.com/youtube.png`}
                      width="32"
                      height="32"
                      alt="Skyshare Labs"
                      className="w-8 object-cover mx-auto"
                    />
                  </Link>
                  <Link
                    href="#"
                    style={{
                      display: "inline-flex",
                      marginLeft: "20px",
                    }}
                  >
                    <Img
                      src={`https://kpc-is.sgp1.cdn.digitaloceanspaces.com/facebook.png`}
                      width="32"
                      height="32"
                      alt="Skyshare Labs"
                      className="w-8 object-cover mx-auto"
                    />
                  </Link>
                  <Link
                    href="#"
                    style={{
                      display: "inline-flex",
                      marginLeft: "20px",
                    }}
                  >
                    <Img
                      src={`https://kpc-is.sgp1.cdn.digitaloceanspaces.com/tiktok.png`}
                      width="32"
                      height="32"
                      alt="Skyshare Labs"
                      className="w-8 object-cover mx-auto"
                    />
                  </Link>
                </Column>
              </Row>

              <Row align="center">
                <Column className="text-center" align="center">
                  <tr>
                    <td align="center">
                      <table
                        border={0}
                        cellPadding="0"
                        cellSpacing="0"
                        style={{ margin: "8px 0", maxWidth: "604px" }}
                      >
                        <tr>
                          <td align="center">
                            <table border={0} cellPadding="0" cellSpacing="0">
                              <tr>
                                <td
                                  valign="middle"
                                  style={{ paddingRight: "8px" }}
                                >
                                  <Img
                                    src="https://kpc-is.sgp1.cdn.digitaloceanspaces.com/location-03.png"
                                    width="16"
                                    height="16"
                                    alt="Website"
                                    style={{ display: "block" }}
                                  />
                                </td>
                                <td valign="middle">
                                  <Text className="m-0 text-white/[.72] leading-[1rem] tracking-normal">
                                    3F ZK Summit, In Arca Strip Commercial
                                    Bldg., McArthur Highway, Corner Action Drive
                                    Center Balubaran Dalandanan, Valenzuela,
                                    Philippines, 1443
                                  </Text>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td align="center">
                      <table
                        border={0}
                        cellPadding="0"
                        cellSpacing="0"
                        style={{ margin: "8px 0" }}
                      >
                        <tr>
                          <td align="center">
                            <table border={0} cellPadding="0" cellSpacing="0">
                              <tr>
                                <td
                                  valign="middle"
                                  style={{ paddingRight: "8px" }}
                                >
                                  <Img
                                    src="https://kpc-is.sgp1.cdn.digitaloceanspaces.com/location-03.png"
                                    width="16"
                                    height="16"
                                    alt="Website"
                                    style={{ display: "block" }}
                                  />
                                </td>
                                <td valign="middle">
                                  <Link className="m-0 no-underline text-white/[.72] leading-[1rem] tracking-normal">
                                    https://merchant.kpc-express.com
                                  </Link>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <table
                        border={0}
                        cellPadding="0"
                        cellSpacing="0"
                        style={{ margin: "8px 0" }}
                      >
                        <tr>
                          <td align="center">
                            <table border={0} cellPadding="0" cellSpacing="0">
                              <tr>
                                <td
                                  valign="middle"
                                  style={{ paddingRight: "8px" }}
                                >
                                  <Img
                                    src="https://kpc-is.sgp1.cdn.digitaloceanspaces.com/location-03.png"
                                    width="16"
                                    height="16"
                                    alt="Website"
                                    style={{ display: "block" }}
                                  />
                                </td>
                                <td valign="middle">
                                  <Text className="m-0 text-white/[.72] leading-[1rem] tracking-normal">
                                    0995-775-7124
                                  </Text>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </Column>
              </Row>

              <Hr />

              <Row className="footer-row">
                {/* Copyright Section */}
                <Column className="footer-column">
                  <Img
                    src="https://kpc-is.sgp1.cdn.digitaloceanspaces.com/copyright.png"
                    width="16"
                    height="16"
                    alt="Skyshare Labs"
                    style={{ verticalAlign: "middle" }}
                    className="inline-flex w-4 object-cover mx-auto mr-2"
                  />
                  <Text
                    className="inline-flex text-white/50"
                    style={{ marginRight: "20px" }}
                  >
                    KPC Tax & Accounting Services 2025{" "}
                    {new Date().getFullYear()}
                  </Text>
                  <Text className="inline-flex text-white/50">
                    All rights reserved.
                  </Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default KPCTAX01Template;
