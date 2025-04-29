import { formatDateRanges } from "@/lib/utils";
import {
  Article,
  Cta,
  FromThePeople,
  Post,
  Product,
  Service,
  UpcomingProgram,
} from "@/store/create-email";
import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Markdown,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import Footer from "./footer";
import FromThePeopleCard from "./from-the-people";
import Header from "./header";
import { OurRecentPosts } from "./posts";
import { ProductCards } from "./products";
import { OurServices } from "./services";
import { UpcomingProgramsSection } from "./upcoming-section";

interface KPCIS01TemplateProps {
  body: string;
  isTemplate: boolean;
  articles: Article[];
  cta: Cta;
  fromThePeople: FromThePeople[];
  upcomingPrograms: UpcomingProgram[];
  products: Product[];
  services: Service[];
  posts: Post[];
}

export const KPCIS01Template = ({
  body,
  isTemplate,
  cta,
  fromThePeople,
  articles,
  upcomingPrograms,
  products,
  services,
  posts,
}: KPCIS01TemplateProps) => {
  const modifiedBody = body?.replace(
    /<img(?![^>]*\bwidth\b)([^>]*)>/gi,
    '<img style="max-width:640px; width:100%; border-radius:12px" $1>',
  );

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
        <Body className="font-inter bg-black/[.08] my-auto mx-auto  px-2 py-[20px]">
          <Container
            style={{
              padding: "16px",
            }}
            className=" border rounded-lg overflow-hidden text-white my-[32px] bg-white border-solid border-[#eaeaea]  mx-auto max-w-[640px] w-full"
          >
            {/* HEADER */}

            <Header />

            {/* BODY */}
            <Section
              className="w-full text-black"
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
                      maxWidth: "680px",
                      overflowWrap: "break-word",
                    }}
                    markdownCustomStyles={{
                      image: {
                        width: "100%",
                      },
                    }}
                  >
                    {modifiedBody ?? "# KPC IS"}
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
                </div>
              )}
            </Section>

            {/* FROM THE PEOPLE */}
            {fromThePeople && fromThePeople.length >= 1 && (
              <Section className="text-center p-4">
                <Heading
                  as="h5"
                  className="text-[18px] uppercase font-bold m-0 mb-[16px] text-black/50 font-geist"
                >
                  From the people
                </Heading>

                {fromThePeople.map((people) => (
                  <FromThePeopleCard
                    key={people.reviewerName}
                    people={people}
                  />
                ))}
              </Section>
            )}

            {articles && articles.length >= 1 && (
              <Section
                className="w-full p-4 mx-auto text-black"
                style={{
                  maxWidth: "640px",
                  width: "100%",
                }}
              >
                <div className="bg-black/[.04] p-4 rounded-lg">
                  <Text className="text-black/[.5] p-0 m-0 text-[12px] uppercase font-bold">
                    ARTICLE
                  </Text>
                  {articles.map((article) => (
                    <Row key={article.heading} className="mt-[24px]">
                      <Column>
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
                </div>
              </Section>
            )}

            {/* UPCOMING PROGRAMS */}
            {articles && articles.length >= 1 && (
              <UpcomingProgramsSection upcomingPrograms={upcomingPrograms} />
            )}

            {/* Discover Our Products */}
            {products && products.length >= 1 && (
              <Section className=" mx-auto w-full">
                <Row align="center" className="mb-[16px]">
                  <Column align="center">
                    <Text className="text-[14px] uppercase font-bold text-black/50 text-center w-fit">
                      Discover Our Products
                    </Text>
                  </Column>
                </Row>

                <ProductCards products={products} />
              </Section>
            )}

            {/* OUR SERVICES */}
            {services && services.length >= 1 && (
              <Section className="">
                <Row align="center" className="mb-[16px]">
                  <Column align="center">
                    <Text className="text-[14px] text-[#000205] opacity-50 uppercase font-bold  w-fit">
                      Our Services
                    </Text>
                  </Column>
                </Row>

                <OurServices services={services} />
              </Section>
            )}

            {/* Our Recent Posts */}
            {posts && posts.length >= 1 && (
              <Section className="">
                <Row align="center" className="mb-[20px]">
                  <Column align="center">
                    <Text className="text-[14px] text-[#000205] opacity-50 uppercase font-bold  w-fit">
                      Our Recent Posts
                    </Text>
                  </Column>
                </Row>

                <OurRecentPosts posts={posts} />
              </Section>
            )}

            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default KPCIS01Template;
