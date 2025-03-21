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

interface KPCPA01TemplateProps {
  body: string;
  articles: Articles[];
  isTemplate: boolean;
}

export const KPCPA01Template = ({
  body,
  articles,
  isTemplate,
}: KPCPA01TemplateProps) => {
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
          }
        `}
        </style>
      </Head>
      {/* <Preview>{previewText}</Preview> */}
      <Tailwind>
        <Body className="font-poppins bg-black/20 my-auto mx-auto  px-2 py-[20px]">
          <Container className="border rounded-lg overflow-hidden text-white bg-white border-solid border-[#eaeaea]  mx-auto max-w-[640px]">
            <Section className="my-0 mx-auto max-w-[640px] w-full object-cover">
              <Img
                src={`https://kpc-pa.sgp1.cdn.digitaloceanspaces.com/template-header.png`}
                width="100%"
                height="100%"
                alt="Skyshare Labs"
                className="w-full object-contain mx-auto"
              />
            </Section>

            {/* BODY */}
            <Section
              className="text-black p-8"
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
                  {body ?? "# KPC PA"}
                </Markdown>
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

            <Section className="relative bg-[url('https://kpc-is.sgp1.cdn.digitaloceanspaces.com/footer_bg.png')] bg-cover bg-center bg-no-repeat p-8">
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
                    Minimize Cost, Maximize Savings!
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
                    KPC Payment Assistance {new Date().getFullYear()}
                  </Text>
                  <Text className="inline-flex text-white/50">
                    All rights reserved.
                  </Text>
                </Column>

                {/* Unsubscribe Section - Moves below on small screens */}
                <Column className="footer-column">
                  <Text className="text-white/50">Unsubscribe</Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default KPCPA01Template;
