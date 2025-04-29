import { cn } from "@/lib/utils";
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
  Button,
  Column,
  Container,
  Font,
  Head,
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
import { UpcomingProgramsSection } from "./upcoming-section";
import { ArticleCard } from "./article";
import { ProductCards } from "./products";
import { OurServices } from "./services";
import { OurRecentPosts } from "./posts";
import Header from "./header";
import { FromThePeopleCard } from "./from-the-people";
import Footer from "./footer";

interface IBS01TemplateProps {
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

export const YSOIA01Template = ({
  body,
  isTemplate,
  cta,
  fromThePeople,
  articles,
  upcomingPrograms,
  products,
  services,
  posts,
}: IBS01TemplateProps) => {
  const modifiedBody = body?.replace(
    /<img(?![^>]*\bwidth\b)([^>]*)>/gi,
    '<img style="width:100%; border-radius:12px" $1>',
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
      </Head>
      {/* <Preview>{previewText}</Preview> */}
      <Tailwind>
        <Body className="font-inter bg-black/[.08] my-auto mx-auto px-2 py-[20px]">
          <Container className="border rounded-lg overflow-hidden text-white bg-[#f5f7f9] border-solid border-[#eaeaea]  mx-auto max-w-[680px] w-full p-4">
            {/* HEADER */}
            <Header />

            {/* BODY */}
            <Section
              className="text-black"
              style={{
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif",
              }}
            >
              {isTemplate ? (
                <Row>
                  <Column align="center">
                    <Text className="text-[16px] font-semibold">
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
                      width: "100%",
                    }}
                  >
                    {modifiedBody ?? "# Your Skin"}
                  </Markdown>

                  {cta && cta.link && cta.text && (
                    <Link
                      href={cta.link}
                      className={cn(
                        "bg-[#3467A9] rounded-[8px] px-[16px] py-[12px] text-white box-border inline-block font-bold",
                      )}
                    >
                      {cta.text}
                    </Link>
                  )}
                </div>
              )}
            </Section>

            {/* FROM THE PEOPLE */}
            {fromThePeople && fromThePeople.length >= 1 && (
              <Section>
                <Row align="center" className="mb-[20px]">
                  <Column align="center">
                    <Text className="text-[20px] text-black font-medium mx-auto text-center w-fit">
                      From The People
                    </Text>
                  </Column>
                </Row>

                {fromThePeople.map((people, index) => (
                  <FromThePeopleCard people={people} key={index} />
                ))}
              </Section>
            )}

            {/* Articles */}
            {articles && articles.length >= 1 && (
              <Section className="p-4">
                <Text className="text-[20px] text-black font-medium mx-auto text-center w-fit">
                  Articles
                </Text>

                <ArticleCard articles={articles} />
              </Section>
            )}

            {/* Upcoming Programs */}
            {upcomingPrograms && upcomingPrograms.length >= 1 && (
              <UpcomingProgramsSection upcomingPrograms={upcomingPrograms} />
            )}

            {/* Discover Our Products */}
            {products && products.length >= 1 && (
              <Section>
                <Row align="center" className="mb-[20px]">
                  <Column align="left">
                    <Text className="text-[20px] text-black font-medium  text-center w-fit">
                      Discover Our Products
                    </Text>
                  </Column>
                </Row>

                <ProductCards products={products} />
              </Section>
            )}

            {/* Our Services */}
            {services && services.length >= 1 && (
              <Section>
                <Row align="center" className="mb-[20px]">
                  <Column align="left">
                    <Text className="text-[20px] text-black font-medium w-fit">
                      Our Services
                    </Text>
                  </Column>
                </Row>

                <OurServices services={services} />
              </Section>
            )}

            {/* Our Recent Posts */}
            {posts && posts.length >= 1 && (
              <Section>
                <Row align="center" className="mb-[20px]">
                  <Column align="left">
                    <Text className="text-[20px] text-black font-medium text-center w-fit">
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

export default YSOIA01Template;
