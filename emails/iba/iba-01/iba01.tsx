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
  Html,
  Img,
  Link,
  Markdown,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { ArticleCard } from "./article";
import { config } from "./config";
import { FromThePeopleCard } from "./from-the-people";
import { chunkArray } from "@/emails/utils";
import { UpcomingProgramCard } from "./upcoming-section";
import { ProductCards } from "./products";
import { OurServices } from "./services";
import { OurRecentPosts } from "./posts";

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

export const IBA01Template = ({
  body,
  isTemplate,
  articles,
  cta,
  fromThePeople,
  upcomingPrograms,
  products,
  services,
  posts,
}: IBS01TemplateProps) => {
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
      </Head>
      {/* <Preview>{previewText}</Preview> */}
      <Tailwind>
        <Body className="font-inter bg-black/20 my-auto mx-auto px-2 py-[20px]">
          <Container className="border rounded-lg overflow-hidden text-white bg-[#f5f7f9] border-solid border-[#eaeaea]  mx-auto max-w-[680px] w-full p-4">
            {/* HEADER */}
            <Section className="my-0 mx-auto max-w-[640px] w-full object-cover">
              <Img
                src={`https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/header.png`}
                width="100%"
                height="100%"
                alt="Skyshare Labs"
                className="object-cover w-full"
              />
            </Section>

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
                <div className="w-full">
                  <Markdown
                    markdownContainerStyles={{
                      imageRendering: "crisp-edges",
                      container: "prose max-w-none",
                      containerType: "unset",
                      aspectRatio: "none",
                      maxWidth: "640px",
                      width: "100%",
                      fontFamily: "Inter",
                    }}
                    markdownCustomStyles={{
                      p: {
                        fontSize: "14px",
                      },
                    }}
                  >
                    {modifiedBody ?? "# IBA"}
                  </Markdown>

                  <Link
                    href={cta.link}
                    className={cn(
                      "rounded-[8px] px-[16px] py-[12px] text-white box-border inline-block font-bold",
                    )}
                  >
                    {cta.text}
                  </Link>
                </div>
              )}
            </Section>

            {/* FROM THE PEOPLE */}
            <Section>
              <Row align="center" className="mb-[20px]">
                <Column align="center">
                  <Text
                    style={{
                      borderBottom: "4px solid #dda624",
                    }}
                    className="text-[20px] text-black font-semibold mx-auto text-center w-fit"
                  >
                    From The People
                  </Text>
                </Column>
              </Row>

              {fromThePeople?.map((people, index) => (
                <FromThePeopleCard key={index} people={people} />
              ))}
            </Section>

            {/* Articles */}
            <Section className="p-4">
              <Text
                style={{
                  borderBottom: "4px solid #dda624",
                }}
                className="text-[20px] text-black font-semibold mx-auto text-center w-fit"
              >
                Articles
              </Text>

              {articles?.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
            </Section>

            {/* Upcoming Programs */}
            <Section className="p-4">
              <Text
                style={{
                  borderBottom: "4px solid #dda624",
                }}
                className="text-[20px] text-black font-semibold mx-auto text-center w-fit"
              >
                Upcoming Programs
              </Text>

              {upcomingPrograms?.map((program, index) => (
                <UpcomingProgramCard program={program} key={index} />
              ))}
            </Section>

            {/* Discover Our Products */}
            <Section>
              <Row align="center" className="mb-[20px]">
                <Column align="center">
                  <Text
                    style={{
                      borderBottom: "4px solid #dda624",
                    }}
                    className="text-[20px] text-black font-semibold mx-auto text-center w-fit"
                  >
                    Discover Our Products
                  </Text>
                </Column>
              </Row>

              <ProductCards products={products} />
            </Section>

            {/* Our Services */}
            <Section>
              <Row align="center" className="mb-[20px]">
                <Column align="center">
                  <Text
                    style={{
                      borderBottom: "4px solid #dda624",
                    }}
                    className="text-[20px] text-black font-semibold mx-auto text-center w-fit"
                  >
                    Our Services
                  </Text>
                </Column>
              </Row>

              <OurServices services={services} />
            </Section>

            {/* Our Recent Posts */}
            <Section>
              <Row align="center" className="mb-[20px]">
                <Column align="center">
                  <Text
                    style={{
                      borderBottom: "4px solid #dda624",
                    }}
                    className="text-[20px] text-black font-semibold mx-auto text-center w-fit"
                  >
                    Our Recent Posts
                  </Text>
                </Column>
              </Row>

              <OurRecentPosts posts={posts} />
            </Section>

            <Section className="text-center bg-[#09316F] p-8">
              <Row align="center" className="p-4">
                <Column className="text-center" align="center">
                  <Img
                    src={`https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/logo.png`}
                    width="64"
                    height="64"
                    alt="Skyshare Labs"
                    className="object-cover w-16 mx-auto mb-3"
                  />

                  <Container align="center" className="mx-auto mb-3 w-fit">
                    <Link href="#">
                      <Img
                        src="https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/linkedin.png"
                        width={"100%"}
                        height={"100%"}
                        className="aspect-[1/1] size-8 inline-block mr-[20px]"
                      />
                    </Link>

                    <Link href="#">
                      <Img
                        src="https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/instagram.png"
                        width={"100%"}
                        height={"100%"}
                        className="aspect-[1/1] size-8 inline-block mr-[20px]"
                      />
                    </Link>

                    <Link href="#">
                      <Img
                        src="https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/youtube.png"
                        width={"100%"}
                        height={"100%"}
                        className="aspect-[1/1] size-8 inline-block mr-[20px]"
                      />
                    </Link>

                    <Link href="#">
                      <Img
                        src="https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/facebook.png"
                        width={"100%"}
                        height={"100%"}
                        className="aspect-[1/1] size-8 inline-block mr-[20px]"
                      />
                    </Link>

                    <Link href="#">
                      <Img
                        src="https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/tiktok.png"
                        width={"100%"}
                        height={"100%"}
                        className="aspect-[1/1] size-8 inline-block"
                      />
                    </Link>
                  </Container>

                  <Container align="center" className="mx-auto mb-3 w-fit">
                    <Text
                      className={cn("")}
                      style={{
                        margin: "8px !important",
                      }}
                    >
                      <Img
                        style={{
                          verticalAlign: "middle",
                        }}
                        className="size-[16px] mr-1 inline-block"
                        src={
                          "https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/location.png"
                        }
                        width={16}
                        height={16}
                      />
                      <span
                        style={{
                          verticalAlign: "middle",
                        }}
                        className="m-0 leading-[1rem] tracking-normal text-white/[.72] "
                      >
                        Unit 3101, Tycoon Center Building, Pearl Drive, Ortigas
                        Center, Pasig
                      </span>
                    </Text>

                    <Text
                      className={cn("")}
                      style={{
                        margin: "8px !important",
                      }}
                    >
                      <Img
                        style={{
                          verticalAlign: "middle",
                        }}
                        className="size-[16px] mr-1 inline-block"
                        src={
                          "https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/mail.png"
                        }
                        width={16}
                        height={16}
                      />
                      <span
                        style={{
                          verticalAlign: "middle",
                        }}
                        className="m-0 leading-[1rem] tracking-normal text-white/[.72] "
                      >
                        innovatedsolutionsph@gmail.com
                      </span>
                    </Text>

                    <Text
                      className={cn("")}
                      style={{
                        margin: "0 !important",
                      }}
                    >
                      <Img
                        style={{
                          verticalAlign: "middle",
                        }}
                        className="size-[16px] mr-1 inline-block"
                        src={
                          "https://innovated-business-academy-ems.sgp1.digitaloceanspaces.com/call.png"
                        }
                        width={16}
                        height={16}
                      />
                      <span
                        style={{
                          verticalAlign: "middle",
                        }}
                        className="m-0 leading-[1rem] tracking-normal text-white/[.72]"
                      >
                        0927 547 8713
                      </span>
                    </Text>
                  </Container>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default IBA01Template;
