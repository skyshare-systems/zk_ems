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
  Column,
  Container,
  Font,
  Head,
  Html,
  Img,
  Link,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { ArticleCard } from "./article";
import { FromThePeopleCard } from "./from-the-people";
import { OurRecentPosts } from "./posts";
import { ProductCards } from "./products";
import { OurServices } from "./services";
import { UpcomingProgramCard } from "./upcoming-section";
import Header from "./header";
import Footer from "./footer";
import { getDefaultOrder, SectionType } from "@/emails/utils";

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
  isSectionOrderUpdated: boolean;
  sectionOrder: SectionType[];
}

export const IBS01Template = ({
  body,
  isTemplate,
  cta = {
    link: "https://example.com",
    text: "Learn More",
  },
  fromThePeople = [
    {
      review:
        "I had an amazing experience with the team! They were professional and attentive to my needs. Highly recommend!",
      reviewerImage: "https://new.email/static/app/placeholder.png",
      reviewerName: "Jane Smith",
      rating: 5,
    },
  ],
  articles = [
    {
      date: new Date("2023-10-01"),
      articleLink: "https://example.com/article",
      image: "https://new.email/static/app/placeholder.png",
      content:
        "Explore the latest trends and innovations in aesthetic medicine. From cutting-edge technologies to breakthrough treatments, stay informed about the future of beauty and wellness.",
      heading: "The Future of Aesthetic Medicine",
    },
  ],
  upcomingPrograms = [
    {
      dates: [
        {
          date: new Date("2023-10-01"),
        },
        {
          date: new Date("2023-10-02"),
        },
      ],
      externalLink: "https://example.com/upcoming-program",
      title: "Upcoming Program",
    },
    {
      dates: [
        {
          date: new Date("2023-10-01"),
        },
      ],
      externalLink: "https://example.com/upcoming-program",
      title: "Upcoming Program",
    },
  ],
  products = [
    {
      description:
        "Discover our range of skincare products designed to enhance your natural beauty.",
      image: "https://new.email/static/app/placeholder.png",
      link: "https://example.com/skincare-products",
      name: "Skincare Products",
    },
    {
      description:
        "Discover our range of skincare products designed to enhance your natural beauty.",
      image: "https://new.email/static/app/placeholder.png",
      link: "https://example.com/skincare-products",
      name: "Skincare Products",
    },
    {
      description:
        "Discover our range of skincare products designed to enhance your natural beauty.",
      image: "https://new.email/static/app/placeholder.png",
      link: "https://example.com/skincare-products",
      name: "Skincare Products",
    },
    {
      description:
        "Discover our range of skincare products designed to enhance your natural beauty.",
      image: "https://new.email/static/app/placeholder.png",
      link: "https://example.com/skincare-products",
      name: "Skincare Products",
    },
  ],
  services = [
    {
      title: "Skin Rejuvenation",
      description:
        "Experience the latest in skin rejuvenation technology with our advanced treatments.",
      image: "https://new.email/static/app/placeholder.png",
      link: "https://example.com/skin-rejuvenation",
    },
    {
      title: "Laser Hair Removal",
      description:
        "Say goodbye to unwanted hair with our safe and effective laser hair removal services.",
      image: "https://new.email/static/app/placeholder.png",
      link: "https://example.com/laser-hair-removal",
    },
    {
      title: "Anti-Aging Treatments",
      description:
        "Turn back the clock with our range of anti-aging treatments tailored to your needs.",
      image: "https://new.email/static/app/placeholder.png",
      link: "https://example.com/anti-aging-treatments",
    },
  ],
  posts = [
    {
      description:
        "Explore the latest trends and innovations in aesthetic medicine.",
      image: "https://new.email/static/app/placeholder.png",
      link: "https://example.com/future-aesthetic-medicine",
    },
    {
      description:
        "Discover the top 10 skincare tips to keep your skin looking youthful and radiant.",
      image: "https://new.email/static/app/placeholder.png",
      link: "https://example.com/top-10-skincare-tips",
    },
    {
      description:
        "A comprehensive guide to understanding laser treatments and their benefits.",
      image: "https://new.email/static/app/placeholder.png",
      link: "https://example.com/understanding-laser-treatments",
    },
  ],
  sectionOrder,
  isSectionOrderUpdated,
}: IBS01TemplateProps) => {
  const finalSectionOrder = getDefaultOrder(
    sectionOrder,
    "InnovatEd Business Solutions",
    isSectionOrderUpdated,
  );

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
          <Container className="border rounded-lg overflow-hidden text-white bg-[#fff] border-solid border-[#eaeaea]  mx-auto max-w-[680px] w-full p-4">
            {/* HEADER */}
            <Header />
            {/* BODY */}
            <Section
              className=" text-black"
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
                <div className="w-full pb-6">
                  <div
                    style={{
                      maxWidth: "680px",
                      overflowWrap: "break-word" as const,
                      width: "100%",
                      lineHeight: "1.6",
                      fontSize: "14px",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: modifiedBody || "<p>IBS</p>",
                    }}
                  />

                  {/* CTA */}

                  {cta && cta.link && cta.text && (
                    <Link
                      href={cta.link}
                      className={cn(
                        "bg-[#0E3773] rounded-[8px] px-[16px] py-[12px] text-white box-border inline-block font-bold mx-auto w-fit",
                      )}
                    >
                      {cta.text}
                    </Link>
                  )}
                </div>
              )}
            </Section>

            {finalSectionOrder.map((section) => {
              switch (section) {
                case "fromThePeople":
                  return fromThePeople?.length ? (
                    <Section>
                      <Row align="center" className="mb-[20px]">
                        <Column align="left">
                          <Text className="text-[20px] text-black font-semibold mx-auto text-center w-fit">
                            From The People
                          </Text>
                        </Column>
                      </Row>

                      {fromThePeople.map((people, index) => (
                        <FromThePeopleCard key={index} people={people} />
                      ))}
                    </Section>
                  ) : null;

                case "articles":
                  return articles?.length ? (
                    <Section>
                      <Text className="text-[20px] text-black font-semibold">
                        Articles
                      </Text>

                      {articles.map((article, index) => (
                        <ArticleCard key={index} article={article} />
                      ))}
                    </Section>
                  ) : null;

                case "upcomingPrograms":
                  return upcomingPrograms?.length ? (
                    <Section>
                      <Text className="text-[20px] text-black font-semibold mx-auto text-center w-fit">
                        Upcoming Programs
                      </Text>

                      {upcomingPrograms?.map((program, index) => (
                        <UpcomingProgramCard program={program} key={index} />
                      ))}
                    </Section>
                  ) : null;
                case "products":
                  return products?.length ? (
                    <Section>
                      <Row align="center" className="mb-[20px]">
                        <Column align="left">
                          <Text className="text-[20px] text-black font-semibold mx-auto text-center w-fit">
                            Discover Our Products
                          </Text>
                        </Column>
                      </Row>

                      <ProductCards products={products} />
                    </Section>
                  ) : null;

                case "services":
                  return services?.length ? (
                    <Section>
                      <Row align="center" className="mb-[20px]">
                        <Column align="left">
                          <Text className="text-[20px] text-black font-semibold mx-auto text-center w-fit">
                            Our Services
                          </Text>
                        </Column>
                      </Row>

                      <OurServices services={services} />
                    </Section>
                  ) : null;

                case "posts":
                  return posts?.length ? (
                    <Section>
                      <Row align="center" className="mb-[20px]">
                        <Column align="left">
                          <Text className="text-[20px] text-black font-semibold mx-auto text-center w-fit">
                            Our Recent Posts
                          </Text>
                        </Column>
                      </Row>

                      <OurRecentPosts posts={posts} />
                    </Section>
                  ) : null;

                default:
                  return null;
              }
            })}

            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default IBS01Template;
