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
import { FromThePeopleSection } from "./from-the-people";
import Header from "./header";
import { OurRecentPosts } from "./posts";
import { ProductCards } from "./products";
import { OurServices } from "./services";
import { UpcomingProgramsSection } from "./upcoming-section";
import ArticleCard from "./article";

interface KPCTAX01TemplateProps {
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

export const KPCTAX01Template = ({
  body,
  isTemplate,
  cta,
  fromThePeople,
  articles,
  upcomingPrograms,
  products,
  services,
  posts,
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

            <Header />

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
                </div>
              )}
            </Section>

            {/* FROM THE PEOPLE */}
            <Section className="text-center p-4">
              <Heading
                as="h5"
                className="text-[18px] uppercase font-bold m-0 mb-[16px] text-black/50 font-geist"
              >
                From the people
              </Heading>

              <FromThePeopleSection fromThePeople={fromThePeople} />
            </Section>

            {/* ARTICLES */}
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

                {articles.map((article, index) => (
                  <>
                    <ArticleCard article={article} key={index} />
                    {index !== articles.length - 1 && (
                      <Hr className="bg-[#00000029] h-[1px] my-4" />
                    )}
                  </>
                ))}
              </div>
            </Section>

            {/* UPCOMING PROGRAMS */}
            <UpcomingProgramsSection upcomingPrograms={upcomingPrograms} />

            {/* Discover Our Products */}
            <Section className="p-4 mx-auto w-full">
              <Row align="center" className="mb-[16px]">
                <Column align="center">
                  <Text className="text-[14px] uppercase font-bold text-black/50 text-center w-fit">
                    Discover Our Products
                  </Text>
                </Column>
              </Row>

              <ProductCards products={products} />
            </Section>

            {/* OUR SERVICES */}
            <Section className="p-4">
              <Row align="center" className="mb-[16px]">
                <Column align="left">
                  <Text className="text-[20px] text-black font-medium w-fit">
                    Our Services
                  </Text>
                </Column>
              </Row>

              <OurServices services={services} />
            </Section>

            {/* Our Recent Posts */}
            <Section className="p-4">
              <Row align="center" className="mb-[20px]">
                <Column align="left">
                  <Text className="text-[20px] text-black font-medium text-center w-fit">
                    Our Recent Posts
                  </Text>
                </Column>
              </Row>

              <OurRecentPosts posts={posts} />
            </Section>

            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default KPCTAX01Template;
