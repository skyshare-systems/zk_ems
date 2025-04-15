import { cn } from "@/lib/utils";
import { Articles, Cta, UpcomingPrograms } from "@/store/create-email";
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

interface FromThePeople {
  name: string;
  image: string;
  quote: string;
}

// interface Product {
//   image: string;
//   name: string;
//   description: string;
//   link: string;
// }

interface Service {
  image: string;
  title: string;
  description: string;
  link: string;
}

interface Post {
  image: string;
  description: string;
}

interface IBS01TemplateProps {
  body: string;
  isTemplate: boolean;
  articles: Articles[];
  cta: Cta;
  fromThePeople: FromThePeople[];
  upcomingPrograms: UpcomingPrograms[];
  products: Product[];
}

export const IBA01Template = ({
  body,
  isTemplate,
  products,
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
                src={`https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/header.png`}
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
                    {modifiedBody ?? "# IBA"}
                  </Markdown>
                </div>
              )}{" "}
            </Section>

            {/* FROM THE PEOPLC */}
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

              {Array.from({ length: 2 }).map((_, index) => (
                <FromThePeopleCard
                  image="https://new.email/static/app/placeholder.png"
                  key={index}
                  name="John Doe"
                  quote="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
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

              {Array.from({ length: 2 }).map((_, index) => (
                <ArticleCard key={index} />
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

              {Array.from({ length: 2 }).map((_, index) => (
                <UpcomingProgramCard key={index} />
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

              <ProductCards products={defaultProducts} />
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

              <OurServices services={defaultServices} />
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

export default IBA01Template;

const chunkArray = <T,>(array: T[], size: number) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size),
  );
};

const FromThePeopleCard = ({ image, name, quote }: FromThePeople) => {
  return (
    <Section className="border-[1px] border-solid border-[#Dfd8e9] bg-4 bg-white rounded-[16px] mb-4">
      <Row align="center" className="  p-[16px] text-center">
        <Column className="w-fit" valign="middle" align="center">
          <Img
            src={
              image ??
              "https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/placeholder.png"
            }
            width={164}
            alt="Placeholder"
            className="w-[164px] h-auto object-cover rounded-[4px] mx-auto"
          />
        </Column>
        <Column className="p-[8px]" valign="middle" align="left">
          <Img
            src="https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/quote.png"
            alt="Quote icon"
            className="w-[32px] h-auto object-cover mb-[8px]"
          />

          <Text className="mx-auto text-black">{quote}</Text>

          <Text className="mx-auto font-semibold text-black">{name}</Text>
        </Column>
      </Row>
    </Section>
  );
};

const ArticleCard = () => {
  return (
    <Section className="border-[1px] border-solid border-[#Dfd8e9] bg-4 bg-white rounded-[16px] mb-4">
      <Row align="center" className="p-[16px] text-center">
        <Column
          align="left"
          valign="top"
          className="mr-6 w-fit"
          style={{ paddingRight: "24px" }}
        >
          <Text className="text-black">JUN</Text>
          <Img
            src="https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/line.png"
            width={"100%"}
            height={"100%"}
          />
          <Text className="text-black">23</Text>
        </Column>
        <Column
          valign="top"
          align="center"
          className="ml-[24px]"
          style={{ paddingRight: "24px" }}
        >
          <Img
            src={"https://new.email/static/app/placeholder.png"}
            width={250}
            alt="Placeholder"
            className="w-[250px] aspect-square object-cover rounded-[4px] mx-auto"
          />
        </Column>
        <Column className="p-[8px] ml-[24px]" valign="top" align="left">
          <Text className="text-black mx-auto font-semibold text-[20px]">
            Placeholder Headling
          </Text>

          <Text className="mx-auto text-black line-clamp-6 text-ellipsis">
            This is just placeholder text. Don’t be alarmed, this is just here
            to fill up space since your finalized copy isn’t ready yet. Once we
            have your content finalized, we’ll replace this placeholder text
            with your real content. Sometimes it’s nice to put in text just to
            get an idea of how text will fill in a space on your website.
          </Text>

          <Hr />

          <Link href="#">
            <Text className="inline-block text-black">Read more</Text>

            <Img
              src="https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/arrow-right.png"
              width={10}
              height={10}
              className="inline-block ml-2"
            />
          </Link>
        </Column>
      </Row>
    </Section>
  );
};

const UpcomingProgramCard = () => {
  return (
    <Section className="border-[1px] border-solid border-[#Dfd8e9] bg-4 bg-white rounded-[16px] mb-4">
      <Row align="center" className="p-[16px] text-center">
        <Column
          align="left"
          valign="top"
          className="mr-6 w-fit"
          style={{ paddingRight: "24px" }}
        >
          <Text className="text-black text-[20px] font-semibold">2025</Text>
        </Column>
        <Column valign="top" align="left" className="ml-[24px] w-[120px]">
          <Text className="inline-block m-0 text-black">March 26-28</Text>
          <Text className="inline-block m-0 text-black">April 23-25</Text>
        </Column>
        <Column className="" valign="top" align="left">
          <Container className="bg-[#0E3773] rounded-2xl">
            <Text className="font-bold text-center">
              3-Day Corporate Finance Management Program
            </Text>
          </Container>
        </Column>
      </Row>
    </Section>
  );
};

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
}

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: "$129.99",
    description:
      "Premium noise-cancelling headphones with 30-hour battery life.",
    imageUrl: "https://new.email/static/app/placeholder.png",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: "$199.99",
    description:
      "Track your fitness and stay connected with this stylish smartwatch.",
    imageUrl: "https://new.email/static/app/placeholder.png",
  },
  {
    id: "3",
    name: "Portable Speaker",
    price: "$79.99",
    description: "Waterproof Bluetooth speaker with immersive 360° sound.",
    imageUrl: "https://new.email/static/app/placeholder.png",
  },
  {
    id: "4",
    name: "Wireless Charger",
    price: "$39.99",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices.",
    imageUrl: "https://new.email/static/app/placeholder.png",
  },
];

const ProductCards = ({ products }: { products: Product[] }) => {
  const productRows = chunkArray(products, 2);

  return (
    <>
      {productRows.map((row, rowIndex) => (
        <Row key={`row-${rowIndex}`} className="mb-[32px]">
          {row.map((product, colIndex) => (
            <Column
              key={product.id}
              className={colIndex === 0 ? "pr-[8px]" : "pl-[8px]"}
              style={{ width: "50%" }}
            >
              <div className="border-[1px] p-2 border-solid border-gray-200 rounded-[8px] overflow-hidden">
                <Img
                  src={product.imageUrl}
                  alt={product.name}
                  width="100%"
                  height="auto"
                  className="object-cover w-full h-[128px]"
                />
                <div className="mt-2">
                  <Text className="text-[16px] text-black font-semibold m-0 mb-[4px]">
                    {product.name}
                  </Text>
                  <Text className="text-gray-600 text-[14px] m-0 mb-[4px]">
                    {product.description}
                  </Text>
                  <Link
                    href={`https://example.com/products/${product.id}`}
                    className="text-black/40 font-bold rounded-[4px] text-[14px] underline box-border"
                    style={{ display: "block" }}
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </Column>
          ))}

          {/* If there's only one product in the row, add an empty column */}
          {row.length === 1 && (
            <Column style={{ width: "50%" }} className="pl-[8px]">
              <div></div>
            </Column>
          )}
        </Row>
      ))}
    </>
  );
};

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
const OurServices = ({ services }: { services: Service[] }) => {
  return (
    <Row>
      {services.map((service, index) => (
        <Column
          key={index}
          className="px-[8px] text-center"
          style={{ width: "33.33%" }}
        >
          <div className="mb-[24px]">
            {/* Rounded full image at top */}
            <div className="size-[128px] rounded-full mx-auto mb-4 overflow-hidden">
              <Img
                src={
                  service.image ||
                  "https://new.email/static/app/placeholder.png"
                }
                width="128"
                height="128"
                alt={service.title}
                className="rounded-full mx-auto mb-[16px]"
              />
            </div>

            {/* Title */}
            <Text className="font-semibold text-black text-[18px] m-0 mb-[8px]">
              {service.title}
            </Text>

            {/* Description */}
            <Text className="text-black/50 m-0 mb-[16px] line-clamp-4 text-left">
              {service.description.substring(0, 150)}

              {service.description.length >= 150 && (
                <span className="font-bold text-black/40">...</span>
              )}
            </Text>

            {/* Button */}
            <Button
              className="bg-[#0E3773] text-white font-bold py-[8px] px-[16px] rounded-[4px] text-center text-[12px] box-border"
              href={service.link}
            >
              Learn More
            </Button>
          </div>
        </Column>
      ))}
    </Row>
  );
};

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
const OurRecentPosts = ({ posts }: { posts: Post[] }) => {
  const postRows = chunkArray(posts, 3);

  return (
    <>
      <>
        {postRows.map((row, rowIndex) => (
          <Row key={`row-${rowIndex}`} className="mb-[16px]">
            {row.map((post, colIndex) => (
              <Column
                key={colIndex}
                className={cn(
                  colIndex === 0
                    ? "pr-[8px]"
                    : colIndex === 1
                      ? "px-[4px]"
                      : "pl-[8px]",
                )}
                style={{ width: "33.33%" }}
              >
                <div className="border-[1px] p-[8px] border-solid border-gray-200 rounded-[8px] overflow-hidden">
                  <Img
                    src={post.image}
                    alt={post.description.substring(0, 10)}
                    width="100%"
                    height="auto"
                    className="object-cover w-full h-[120px]"
                  />

                  <div className="mt-[8px]">
                    <Img
                      src="https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/favourite.png"
                      width={16}
                      height={16}
                      className="inline-block mr-2"
                    />
                    <Img
                      src="https://innovated-business-academy.sgp1.cdn.digitaloceanspaces.com/navigation.png"
                      width={16}
                      height={16}
                      className="inline-block"
                    />
                  </div>
                  <div className="mt-[8px]">
                    <Text className="text-[12px] text-black/50 m-0 mb-[4px]">
                      {post.description.substring(0, 60)}
                      {post.description.length > 60 && "..."}
                    </Text>
                  </div>
                </div>
              </Column>
            ))}

            {/* If there are fewer than 3 products in a row, add empty columns */}
            {row.length < 3 &&
              Array.from({ length: 3 - row.length }).map((_, index) => (
                <Column
                  key={`empty-${index}`}
                  style={{ width: "33.33%" }}
                  className={cn(
                    row.length === 1 && index === 0 ? "px-[4px]" : "pl-[8px]",
                  )}
                >
                  <div></div>
                </Column>
              ))}
          </Row>
        ))}
      </>
    </>
  );
};
