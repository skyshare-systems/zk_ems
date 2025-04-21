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

interface KPCTAX01TemplateProps {
  body: string;
  articles: Article[];
  cta: Cta;
  fromThePeople: FromThePeople[];
  isTemplate: boolean;
  upcomingPrograms: UpcomingProgram[];
}

export const KPCTAX01Template = ({
  body,
  articles = [
    {
      articleLink: "#",
      heading: "Article 1",
      image: "https://new.email/static/app/placeholder.png",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      articleLink: "#",
      heading: "Article 1",
      image: "https://new.email/static/app/placeholder.png",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      articleLink: "#",
      heading: "Article 1",
      image: "https://new.email/static/app/placeholder.png",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ],
  cta,
  fromThePeople = [
    {
      review:
        "This workshop transformed my understanding of finance! The insights I gained were invaluable for my leadership role. Highly recommend!",
      reviewerImage:
        "https://kpc-tax.sgp1.cdn.digitaloceanspaces.com/placeholder.png",
      reviewerName: "John Doe",
      rating: 5,
    },
    {
      review:
        "This workshop transformed my understanding of finance! The insights I gained were invaluable for my leadership role. Highly recommend!",
      reviewerImage:
        "https://kpc-tax.sgp1.cdn.digitaloceanspaces.com/placeholder.png",
      reviewerName: "John Doe",
      rating: 5,
    },
  ],
  isTemplate,
  upcomingPrograms = [
    {
      dates: [
        { date: new Date("2023-03-26") },
        { date: new Date("2023-03-27") },
        { date: new Date("2023-03-28") },
        { date: new Date("2023-05-17") },
        { date: new Date("2023-05-24") },
      ],
      externalLink: "#",
      title: "Program 1",
    },
    {
      dates: [
        {
          date: new Date("2023-10-01"),
        },
        {
          date: new Date("2023-10-02"),
        },
      ],
      externalLink: "#",
      title: "Program 1",
    },
  ],
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
                  <Row key={article.heading}>
                    <Img
                      src={article.image}
                      width={"100%"}
                      height={128}
                      className="h-32 w-full object-cover rounded-lg"
                    />
                    <Text className="text-[20px] font-semibold break-words">
                      {article.heading}
                    </Text>
                    <Text className="text-[14px] break-words">
                      {article.content}
                    </Text>
                    <Link
                      href={article.articleLink}
                      className=" block mt-[8px] w-fit bg-[#F3BC30] px-4 py-2 text-[14px] font-bold text-black rounded-lg"
                    >
                      Read Article
                    </Link>

                    {index !== articles.length - 1 && (
                      <Hr className="bg-[#00000029] h-[1px] my-4" />
                    )}
                  </Row>
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

              <ProductCards products={defaultProducts} />
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

              <OurServices services={defaultServices} />
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

              <OurRecentPosts posts={defaultPosts} />
            </Section>

            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default KPCTAX01Template;

const defaultProducts: Product[] = [
  {
    name: "Wireless Headphones",
    description:
      "Premium noise-cancelling headphones with 30-hour battery life.",
    image: "https://new.email/static/app/placeholder.png",
    link: "#",
  },
  {
    name: "Smart Watch",
    description:
      "Track your fitness and stay connected with this stylish smartwatch.",
    image: "https://new.email/static/app/placeholder.png",
    link: "#",
  },
  {
    name: "Portable Speaker",
    description: "Waterproof Bluetooth speaker with immersive 360° sound.",
    image: "https://new.email/static/app/placeholder.png",
    link: "#",
  },
  {
    name: "Wireless Charger",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices.",
    image: "https://new.email/static/app/placeholder.png",
    link: "#",
  },
  {
    name: "Wireless Charger",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices.",
    image: "https://new.email/static/app/placeholder.png",
    link: "#",
  },
  {
    name: "Wireless Charger",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices.",
    image: "https://new.email/static/app/placeholder.png",
    link: "#",
  },
];

const defaultServices: Service[] = [
  {
    image: "https://new.email/static/app/placeholder.png",
    title: "Smart Savings Account",
    description:
      "Introducing the Smart Savings Account: a secure and flexible way to grow your savings. With competitive interest rates and no monthly fees, you can easily manage your funds while enjoying the benefits of automated savings tools. Whether you're saving for a vacation, a new car, or just building an emergency fund, our Smart Savings Account helps you reach your financial goals effortlessly.",
    link: "#",
  },
  {
    image: "https://new.email/static/app/placeholder.png",
    title: "Investment Growth Plan",
    description:
      "Introducing the Smart Savings Account: a secure and flexible way to grow your savings. With competitive interest rates and no monthly fees, you can easily manage your funds while enjoying the benefits of automated savings tools. Whether you're saving for a vacation, a new car, or just building an emergency fund, our Smart Savings Account helps you reach your financial goals effortlessly.",
    link: "#",
  },
  {
    image: "https://new.email/static/app/placeholder.png",
    title: "Retirement Wealth Builder",
    description:
      "Introducing the Smart Savings Account: a secure and flexible way to grow your savings. With competitive interest rates and no monthly fees, you can easily manage your funds while enjoying the benefits of automated savings tools. Whether you're saving for a vacation, a new car, or just building an emergency fund, our Smart Savings Account helps you reach your financial goals effortlessly.",
    link: "#",
  },
];

const defaultPosts: Post[] = [
  {
    image: "https://new.email/static/app/placeholder.png",
    description:
      "Introducing the Smart Savings Account: a secure and flexible way to grow your savings. With competitive interest rates and no monthly fees, you can easily manage your funds while enjoying the benefits of automated savings tools. Whether you're saving for a vacation, a new car, or just building an emergency fund, our Smart Savings Account helps you reach your financial goals effortlessly.",
  },
  {
    image: "https://new.email/static/app/placeholder.png",
    description:
      "Introducing the Smart Savings Account: a secure and flexible way to grow your savings. With competitive interest rates and no monthly fees, you can easily manage your funds while enjoying the benefits of automated savings tools. Whether you're saving for a vacation, a new car, or just building an emergency fund, our Smart Savings Account helps you reach your financial goals effortlessly.",
  },
  {
    image: "https://new.email/static/app/placeholder.png",
    description:
      "Introducing the Smart Savings Account: a secure and flexible way to grow your savings. With competitive interest rates and no monthly fees, you can easily manage your funds while enjoying the benefits of automated savings tools. Whether you're saving for a vacation, a new car, or just building an emergency fund, our Smart Savings Account helps you reach your financial goals effortlessly.",
  },
  {
    image: "https://new.email/static/app/placeholder.png",
    description:
      "Introducing the Smart Savings Account: a secure and flexible way to grow your savings. With competitive interest rates and no monthly fees, you can easily manage your funds while enjoying the benefits of automated savings tools. Whether you're saving for a vacation, a new car, or just building an emergency fund, our Smart Savings Account helps you reach your financial goals effortlessly.",
  },
  {
    image: "https://new.email/static/app/placeholder.png",
    description:
      "Introducing the Smart Savings Account: a secure and flexible way to grow your savings. With competitive interest rates and no monthly fees, you can easily manage your funds while enjoying the benefits of automated savings tools. Whether you're saving for a vacation, a new car, or just building an emergency fund, our Smart Savings Account helps you reach your financial goals effortlessly.",
  },
  {
    image: "https://new.email/static/app/placeholder.png",
    description:
      "Introducing the Smart Savings Account: a secure and flexible way to grow your savings. With competitive interest rates and no monthly fees, you can easily manage your funds while enjoying the benefits of automated savings tools. Whether you're saving for a vacation, a new car, or just building an emergency fund, our Smart Savings Account helps you reach your financial goals effortlessly.",
  },
  {
    image: "https://new.email/static/app/placeholder.png",
    description:
      "Introducing the Smart Savings Account: a secure and flexible way to grow your savings. With competitive interest rates and no monthly fees, you can easily manage your funds while enjoying the benefits of automated savings tools. Whether you're saving for a vacation, a new car, or just building an emergency fund, our Smart Savings Account helps you reach your financial goals effortlessly.",
  },
];
