import { IconText } from "@/emails/skyshare/jpl/jpl";
import { formatDateRanges } from "@/lib/utils";
import {
  Articles,
  Cta,
  FromThePeople,
  UpcomingPrograms,
} from "@/store/create-email";
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
  Heading,
} from "@react-email/components";
import { format } from "date-fns";

interface KPCTAX01TemplateProps {
  body: string;
  articles: Articles[];
  cta: Cta;
  fromThePeople: FromThePeople[];
  isTemplate: boolean;
  upcomingPrograms: UpcomingPrograms[];
}

export const KPCTAX01Template = ({
  body,
  articles,
  cta,
  fromThePeople,
  isTemplate,
  upcomingPrograms,
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
          <Container className="border rounded-lg overflow-hidden text-white my-[32px] bg-white border-solid border-[#eaeaea]  mx-auto max-w-[640px] w-full">
            {/* HEADER */}
            <Section className="my-0 mx-auto w-full h-[86px] max-h-[86px] object-cover bg-[url('https://kpc-tax.sgp1.cdn.digitaloceanspaces.com/template-header.png')] bg-cover bg-center bg-no-repeat"></Section>

            {/* BODY */}
            <Section
              className="text-black responsive-padding p-4 [&>img]:max-w-[640px] w-full"
              style={{
                fontFamily:
                  "Poppins,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif",
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

                  {cta && cta.link && cta.text && (
                    <div className="my-[32px]">
                      <Link
                        href={cta.link}
                        className="bg-[#F3BC30] rounded-[8px] px-[16px] py-[12px] text-black box-border inline-block font-bold"
                      >
                        {cta.text}
                      </Link>
                    </div>
                  )}

                  {fromThePeople && fromThePeople.length > 0 && (
                    <Section className="text-center my-[16px] ">
                      <Heading
                        as="h5"
                        className="text-[18px] font-bold m-0 mb-[16px] text-black/50 font-geist"
                      >
                        From the people
                      </Heading>

                      {fromThePeople
                        .filter(
                          (review) =>
                            review.reviewerName.trim() !== "" &&
                            review.review.trim() !== "" &&
                            review.reviewerImage.trim() !== "",
                        )
                        .map((review) => (
                          <>
                            <Section className="my-[16px]">
                              {Array.from({
                                length: parseInt(review.rating),
                              }).map((_, index) => (
                                <Img
                                  key={index}
                                  src="https://kpc-tax.sgp1.cdn.digitaloceanspaces.com/star.png"
                                  alt="Star"
                                  width="14"
                                  height="14"
                                  className="w-[14px] h-auto object-cover inline-block mx-[2px]"
                                />
                              ))}
                            </Section>

                            <Text className="italic text-gray-700 my-[16px] mx-0 text-[16px]">
                              &lsquo;
                              {review.review.length > 150
                                ? review.review.slice(0, 150) + "..."
                                : review.review}
                              &rsquo;
                            </Text>

                            <Section className="text-center" align="center">
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
                                        <table
                                          border={0}
                                          cellPadding="0"
                                          cellSpacing="0"
                                        >
                                          <tr>
                                            <td
                                              valign="middle"
                                              style={{ paddingRight: "8px" }}
                                            >
                                              <Img
                                                src={
                                                  review.reviewerImage
                                                    ? review.reviewerImage
                                                    : "https://new.email/static/app/placeholder.png"
                                                }
                                                width="48"
                                                height="48"
                                                alt="Website"
                                                style={{
                                                  display: "block",
                                                  borderRadius: "50%",
                                                }}
                                              />
                                            </td>
                                            <td valign="middle">
                                              <Text className="m-0 text-black leading-[1rem] tracking-normal font-bold">
                                                {review.reviewerName}
                                              </Text>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </Section>
                          </>
                        ))}
                    </Section>
                  )}
                </div>
              )}
            </Section>

            {articles && articles.length > 0 && (
              <>
                {
                  <Section
                    className="mx-auto my-[16px] p-4 text-black w-full "
                    style={{
                      maxWidth: "640px",
                      width: "100%",
                    }}
                  >
                    <div className="bg-black/[.04] rounded-lg p-4">
                      <Text className="text-black/[.5] text-[12px] uppercase font-bold">
                        ARTICLES
                      </Text>

                      <Row className="">
                        {articles
                          .filter(
                            (article) =>
                              article.heading.trim() !== "" &&
                              article.content.trim() !== "" &&
                              article.articleLink.trim() !== "",
                          )
                          .map((article, index) => (
                            <Row key={article.heading}>
                              <Text className="text-[20px] font-semibold break-words">
                                {article.heading}
                              </Text>
                              <Text className="text-[14px] break-words">
                                {article.content}
                              </Text>
                              <Link
                                href={article.articleLink}
                                className=" block mt-[8px] w-fit bg-black text-white px-4 py-3 text-[14px] font-bold"
                              >
                                Read Article
                              </Link>

                              {index !== articles.length - 1 && (
                                <Hr className="bg-black h-[1px] my-4" />
                              )}
                            </Row>
                          ))}
                      </Row>
                    </div>
                  </Section>
                }
              </>
            )}

            {upcomingPrograms && upcomingPrograms.length > 0 && (
              <Section
                style={{
                  maxWidth: "640px",
                  width: "100%",
                }}
                className="my-[16px] p-4  text-black w-full "
              >
                <Row className="p-4 w-full">
                  <table
                    className="bg-black/[.04] m-0"
                    cellPadding="0"
                    cellSpacing="0"
                    border={0}
                    width={"100%"}
                    align="left"
                  >
                    <tr>
                      <td
                        width="32"
                        style={{ width: "32px", backgroundColor: "#F3BC30" }}
                      ></td>
                      <td align="left">
                        <Container className="w-full p-4">
                          <Heading
                            as="h2"
                            className="text-[14px] font-bold mb-[12px] opacity-50 uppercase"
                          >
                            Upcoming Programs
                          </Heading>

                          {upcomingPrograms.map((program) => (
                            <Section
                              align="left"
                              className="p-2"
                              key={program.title}
                            >
                              <Link
                                href={program.externalLink}
                                className="underline text-black text-poppins text-[14px] font-bold m-0 mb-[8px]"
                              >
                                {program.title}
                              </Link>

                              <Text className="text-poppins text-[14px] text-gray-600 m-0">
                                {formatDateRanges(
                                  program.dates.map((date) =>
                                    date.date.toString(),
                                  ),
                                )}
                              </Text>
                            </Section>
                          ))}
                        </Container>
                      </td>
                    </tr>
                  </table>
                </Row>
              </Section>
            )}

            <Section className="relative w-full bg-[url('https://kpc-tax.sgp1.cdn.digitaloceanspaces.com/footer-bg.png')] bg-cover bg-center bg-no-repeat p-8">
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
