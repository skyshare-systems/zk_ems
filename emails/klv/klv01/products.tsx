import { chunkArray } from "@/emails/utils";
import { Product } from "@/store/create-email";
import { Row, Column, Img, Text, Link } from "@react-email/components";

export const ProductCards = ({ products }: { products: Product[] }) => {
  const productRows = chunkArray(products, 3);

  return (
    <>
      {productRows.map((row, rowIndex) => (
        <Row key={`row-${rowIndex}`} className="mb-[16px]">
          {row.map((product, colIndex) => (
            <Column
              key={product.name}
              className={
                colIndex === 0
                  ? "pr-[8px]"
                  : colIndex === row.length - 1
                    ? "pl-[8px]"
                    : "px-[4px]"
              }
              style={{ width: "33.33%" }}
            >
              <div className="bg-white  rounded-[8px] overflow-hidden">
                <Img
                  src={product.image}
                  alt={product.name}
                  width="100%"
                  height="auto"
                  className="object-cover w-full h-[128px] "
                />
                <div className="mt-[8px] p-4">
                  <Text className="text-[14px] text-black font-semibold m-0 mb-[4px]">
                    {product.name}
                  </Text>
                  <Text className="text-gray-600 text-[14px] m-0 mb-[4px] line-clamp-2">
                    {product.description.substring(0, 38)}
                  </Text>
                  <Link
                    href={product.link}
                    className="font-normal text-[14px] box-border w-fit text-black/40 underline underline-offset-2"
                    style={{ display: "block" }}
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </Column>
          ))}

          {/* Fill remaining columns if row is not complete */}
          {row.length < 3 &&
            Array(3 - row.length)
              .fill(0)
              .map((_, index) => (
                <Column
                  key={`empty-${index}`}
                  style={{ width: "33.33%" }}
                  className={index === 0 ? "px-[4px]" : "pl-[8px]"}
                >
                  <div></div>
                </Column>
              ))}
        </Row>
      ))}
    </>
  );
};
