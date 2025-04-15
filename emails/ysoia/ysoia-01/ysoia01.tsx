import { cn } from "@/lib/utils";
import {
  Articles,
  Cta,
  FromThePeople,
  Post,
  Product,
  Service,
  UpcomingPrograms,
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

interface IBS01TemplateProps {
  body: string;
  isTemplate: boolean;
  articles: Articles[];
  cta: Cta;
  fromThePeople: FromThePeople[];
  upcomingPrograms: UpcomingPrograms[];
  products: Product[];
  services: Service[];
  posts: Post[];
}

export const YSOIA01Template = ({
  body,
  isTemplate,
  cta = {
    link: "#",
    text: "Learn More",
  },
  fromThePeople = [
    {
      reviewerName: "John Doe",
      reviewerImage: "https://new.email/static/app/placeholder.png",
      rating: 4,
      review: "This is a sample review from a satisfied customer.",
    },
    {
      reviewerName: "John Doe",
      reviewerImage: "https://new.email/static/app/placeholder.png",
      rating: 4,
      review: "This is a sample review from a satisfied customer.",
    },
  ],
  articles = [
    {
      articleLink: "#",
      heading: "Sample Article Heading 1",
      content:
        "This is a sample article content. It can be a brief description or summary of the article.",
    },
    {
      articleLink: "#",
      heading: "Sample Article Heading 2",
      content:
        "This is a sample article content. It can be a brief description or summary of the article.",
    },
  ],
  upcomingPrograms = [
    {
      title: "Sample Program Title",
      externalLink: "#",
      dates: [
        {
          date: new Date("2025-03-26"),
        },
        {
          date: new Date("2025-04-23"),
        },
      ],
    },
  ],
  products = [
    {
      name: "Wireless Headphones",
      link: "#",
      description:
        "Premium noise-cancelling headphones with 30-hour battery life.",
      image: "https://new.email/static/app/placeholder.png",
    },
    {
      name: "Wireless Headphones",
      link: "#",
      description:
        "Premium noise-cancelling headphones with 30-hour battery life.",
      image: "https://new.email/static/app/placeholder.png",
    },
    {
      name: "Wireless Headphones",
      link: "#",
      description:
        "Premium noise-cancelling headphones with 30-hour battery life.",
      image: "https://new.email/static/app/placeholder.png",
    },
    {
      name: "Wireless Headphones",
      link: "#",
      description:
        "Premium noise-cancelling headphones with 30-hour battery life.",
      image: "https://new.email/static/app/placeholder.png",
    },
  ],
  services = [
    {
      title: "Smart Savings Account",
      image: "https://new.email/static/app/placeholder.png",
      description: "qweqw",
      link: "#",
    },
    {
      title: "Smart Savings Account",
      image: "https://new.email/static/app/placeholder.png",
      description: "qweqw",
      link: "#",
    },
    {
      title: "Smart Savings Account",
      image: "https://new.email/static/app/placeholder.png",
      description: "qweqw",
      link: "#",
    },
  ],
  posts = [
    {
      image: "https://new.email/static/app/placeholder.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum libero modi perferendis voluptatum, at tempore, velit quia aut tenetur laudantium exercitationem impedit? Consequuntur sint quaerat nulla fuga, unde voluptas blanditiis.",
    },
    {
      image: "https://new.email/static/app/placeholder.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum libero modi perferendis voluptatum, at tempore, velit quia aut tenetur laudantium exercitationem impedit? Consequuntur sint quaerat nulla fuga, unde voluptas blanditiis.",
    },
    {
      image: "https://new.email/static/app/placeholder.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum libero modi perferendis voluptatum, at tempore, velit quia aut tenetur laudantium exercitationem impedit? Consequuntur sint quaerat nulla fuga, unde voluptas blanditiis.",
    },
    {
      image: "https://new.email/static/app/placeholder.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum libero modi perferendis voluptatum, at tempore, velit quia aut tenetur laudantium exercitationem impedit? Consequuntur sint quaerat nulla fuga, unde voluptas blanditiis.",
    },
    {
      image: "https://new.email/static/app/placeholder.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum libero modi perferendis voluptatum, at tempore, velit quia aut tenetur laudantium exercitationem impedit? Consequuntur sint quaerat nulla fuga, unde voluptas blanditiis.",
    },
    {
      image: "https://new.email/static/app/placeholder.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum libero modi perferendis voluptatum, at tempore, velit quia aut tenetur laudantium exercitationem impedit? Consequuntur sint quaerat nulla fuga, unde voluptas blanditiis.",
    },
  ],
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
        <Body className=" bg-black/20 my-auto mx-auto px-2 py-[20px]">
          <Container className="border rounded-lg overflow-hidden text-white bg-[#f5f7f9] border-solid border-[#eaeaea]  mx-auto max-w-[680px] w-full p-4">
            {/* HEADER */}
            <Section className="my-0 mx-auto max-w-[640px] w-full object-cover">
              <Img
                src={`https://your-skin.sgp1.cdn.digitaloceanspaces.com/header.png`}
                width="100%"
                height="100%"
                alt="Skyshare Labs"
                className="object-cover w-full"
              />
            </Section>

            {/* BODY */}
            <Section
              className="p-8 text-black"
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
                      textAlign: "center",
                      fontFamily: "Inter",
                    }}
                  >
                    {modifiedBody ?? "# Your Skin"}
                  </Markdown>
                </div>
              )}{" "}
            </Section>

            {/* FROM THE PEOPLE */}
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

            {/* Articles */}
            <Section className="p-4">
              <Text className="text-[20px] text-black font-medium mx-auto text-center w-fit">
                Articles
              </Text>

              <ArticleCard articles={articles} />
            </Section>

            {/* Upcoming Programs */}
            <UpcomingProgramsSection upcomingPrograms={upcomingPrograms} />

            {/* Discover Our Products */}
            <Section>
              <Row align="center" className="mb-[20px]">
                <Column align="left">
                  <Text className="text-[20px] text-black font-medium  text-center w-fit">
                    Discover Our Products
                  </Text>
                </Column>
              </Row>

              <ProductCards products={defaultProducts} />
            </Section>

            {/* Our Services */}
            <Section>
              <Row align="center" className="mb-[20px]">
                <Column align="left">
                  <Text className="text-[20px] text-black font-medium w-fit">
                    Our Services
                  </Text>
                </Column>
              </Row>

              <OurServices services={defaultServices} />
            </Section>

            {/* Our Recent Posts */}
            <Section>
              <Row align="center" className="mb-[20px]">
                <Column align="left">
                  <Text className="text-[20px] text-black font-medium text-center w-fit">
                    Our Recent Posts
                  </Text>
                </Column>
              </Row>

              <OurRecentPosts posts={defaultPosts} />
            </Section>

            <Section className="text-center bg-[#09316F] p-8">
              <Row align="center" className="p-4">
                <Column className="text-center" align="center">
                  <Img
                    src={`https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/logo.png`}
                    width="64"
                    height="64"
                    alt="Skyshare Labs"
                    className="object-cover w-16 mx-auto mb-3"
                  />

                  <Container align="center" className="mx-auto mb-3 w-fit">
                    <Link href="#">
                      <Img
                        src="https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/linkedin.png"
                        width={"100%"}
                        height={"100%"}
                        className="aspect-[1/1] size-8 inline-block mr-[20px]"
                      />
                    </Link>

                    <Link href="#">
                      <Img
                        src="https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/instagram.png"
                        width={"100%"}
                        height={"100%"}
                        className="aspect-[1/1] size-8 inline-block mr-[20px]"
                      />
                    </Link>

                    <Link href="#">
                      <Img
                        src="https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/youtube.png"
                        width={"100%"}
                        height={"100%"}
                        className="aspect-[1/1] size-8 inline-block mr-[20px]"
                      />
                    </Link>

                    <Link href="#">
                      <Img
                        src="https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/facebook.png"
                        width={"100%"}
                        height={"100%"}
                        className="aspect-[1/1] size-8 inline-block mr-[20px]"
                      />
                    </Link>

                    <Link href="#">
                      <Img
                        src="https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/tiktok.png"
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
                          "https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/location.png"
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
                          "https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/mail.png"
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
                          "https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/call.png"
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

export default YSOIA01Template;

const FromThePeopleCard = ({ people }: { people: FromThePeople }) => {
  const { rating, reviewerImage, review, reviewerName, program } = people;

  return (
    <Section className="border-[1px] border-solid border-[#Dfd8e9] bg-4 bg-white rounded-[16px] mb-4 p-4">
      <Row className="m-0">
        {/* Left side - Image */}
        <Column valign="middle" className="w-[36px] pr-[20px]">
          <Img
            src={reviewerImage}
            alt="Profile image"
            className="object-cover w-full h-auto rounded-full"
          />
        </Column>

        {/* Right side - Content */}
        <Column>
          {/* Name and star in the same row, properly aligned */}
          <Row className="m-0">
            <Column className="p-0">
              <Text className="m-0 font-bold text-black">
                {reviewerName}

                {Array.from({
                  length: Math.round(rating) > 5 ? 5 : Math.round(rating),
                }).map((_, index) => (
                  <Img
                    key={index}
                    src="https://new.email/static/app/placeholder.png"
                    alt="Star"
                    width="20"
                    height="20"
                    className="ml-[8px] inline-block align-middle"
                  />
                ))}
              </Text>
            </Column>
          </Row>

          {/* Text below name and star */}
          <Text className="m-0 text-[12.8px] text-black/50">
            {program as string}
          </Text>
        </Column>
      </Row>

      {/* Additional text below all the content above */}
      <Row className="m-0 mt-[16px]">
        <Column>
          <Text className="m-0 text-[14px] font-normal text-black/[.72]">
            {review}
          </Text>
        </Column>
      </Row>
    </Section>
  );
};

// const ArticleCard = () => {
//   return (
//     <Section className="border-[1px] border-solid border-[#Dfd8e9] bg-4 bg-white rounded-[16px] mb-4">
//       <Row align="center" className="p-[16px] text-center">
//         <Column
//           align="left"
//           valign="top"
//           className="mr-6 w-fit"
//           style={{ paddingRight: "24px" }}
//         >
//           <Text className="text-black">JUN</Text>
//           <Img
//             src="https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/line.png"
//             width={"100%"}
//             height={"100%"}
//           />
//           <Text className="text-black">23</Text>
//         </Column>
//         <Column
//           valign="top"
//           align="center"
//           className="ml-[24px]"
//           style={{ paddingRight: "24px" }}
//         >
//           <Img
//             src={"https://new.email/static/app/placeholder.png"}
//             width={250}
//             alt="Placeholder"
//             className="w-[250px] aspect-square object-cover rounded-[4px] mx-auto"
//           />
//         </Column>
//         <Column className="p-[8px] ml-[24px]" valign="top" align="left">
//           <Text className="text-black mx-auto font-semibold text-[20px]">
//             Placeholder Headling
//           </Text>

//           <Text className="mx-auto text-black line-clamp-6 text-ellipsis">
//             This is just placeholder text. Don’t be alarmed, this is just here
//             to fill up space since your finalized copy isn’t ready yet. Once we
//             have your content finalized, we’ll replace this placeholder text
//             with your real content. Sometimes it’s nice to put in text just to
//             get an idea of how text will fill in a space on your website.
//           </Text>

//           <Hr />

//           <Link href="#">
//             <Text className="inline-block text-black">Read more</Text>

//             <Img
//               src="https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/arrow-right.png"
//               width={10}
//               height={10}
//               className="inline-block ml-2"
//             />
//           </Link>
//         </Column>
//       </Row>
//     </Section>
//   );
// };

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
