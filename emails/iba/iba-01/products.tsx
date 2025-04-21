import { chunkArray } from "@/emails/utils";
import { Product } from "@/store/create-email";
import { Column, Img, Link, Row, Text } from "@react-email/components";

export const ProductCards = ({ products }: { products: Product[] }) => {
  const productRows = chunkArray(products, 2);

  return (
    <>
      {productRows.map((row, rowIndex) => (
        <Row key={`row-${rowIndex}`} className="mb-[32px]">
          {row.map((product, colIndex) => (
            <Column
              key={product.name}
              className={colIndex === 0 ? "pr-[8px]" : "pl-[8px]"}
              style={{ width: "50%" }}
            >
              <div className="border-[1px] p-2 border-solid border-gray-200 rounded-[8px] overflow-hidden">
                <Img
                  src={product.link}
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
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
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
