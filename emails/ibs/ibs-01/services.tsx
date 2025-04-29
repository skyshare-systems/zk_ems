// import { chunkArray } from "@/emails/utils";
// import { cn } from "@/lib/utils";
// import { Service } from "@/store/create-email";
// import { Button, Column, Img, Link, Row, Text } from "@react-email/components";

// export const OurServices = ({ services }: { services: Service[] }) => {
//   const servicesRow = chunkArray(services, 3);

//   return (
//     <>
//       {servicesRow.map((row, rowIndex) => (
//         <Row key={`row-${rowIndex}`} className="mb-[16px]">
//           {row.map((service, colIndex) => (
//             <Column
//               key={colIndex}
//               className="px-[8px] text-center"
//               style={{ width: "33.33%" }}
//             >
//               <div className="mb-[24px] p-4 border-[1px] border-solid border-[#08306F29] bg-white rounded-[8px] overflow-hidden">
//                 {/* Rounded full image at top */}
//                 <div className="mb-4 overflow-hidden">
//                   <Img
//                     src={service.image}
//                     width="128"
//                     height="128"
//                     alt={service.title}
//                     className="mx-auto w-full mb-[16px] object-cover"
//                   />
//                 </div>

//                 {/* Title */}
//                 <Text className="font-semibold text-black text-[18px] m-0 p-0 mb-[8px]">
//                   {service.title}
//                 </Text>

//                 {/* Description */}
//                 <Text className="text-black/50 m-0 mb-[16px] p-0 text-center">
//                   {service.description.substring(0, 150)}

//                   {service.description.length >= 150 && (
//                     <span className="font-bold text-black/40">...</span>
//                   )}
//                 </Text>

//                 {/* Button */}
//                 <Button
//                   className="bg-[#0E3773] text-white font-bold py-[8px] px-[12px] rounded-[4px] text-center text-[12px] box-border"
//                   href={service.link}
//                 >
//                   Learn More
//                 </Button>
//               </div>
//             </Column>
//           ))}

//           {/* If there are fewer than 3 products in a row, add empty columns */}
//           {row.length < 3 &&
//             Array.from({ length: 3 - row.length }).map((_, index) => (
//               <Column
//                 key={`empty-${index}`}
//                 style={{ width: "33.33%" }}
//                 className={cn(
//                   row.length === 1 && index === 0 ? "px-[4px]" : "pl-[8px]",
//                 )}
//               >
//                 <div></div>
//               </Column>
//             ))}
//         </Row>
//       ))}
//     </>
//   );
// };

import { chunkArray } from "@/emails/utils";
import { cn } from "@/lib/utils";
import { Post, Service } from "@/store/create-email";
import { Button, Column, Img, Link, Row, Text } from "@react-email/components";

export const OurServices = ({ services }: { services: Service[] }) => {
  const serviceRows = chunkArray(services, 3);

  return (
    <>
      {serviceRows.map((row, rowIndex) => (
        <Row key={`row-${rowIndex}`} className="mb-[16px]">
          {row.map((service, colIndex) => (
            <Column
              key={colIndex}
              className={cn(
                "border-[1px] w-full p-4 border-solid border-gray-200 rounded-[8px] overflow-hidden",
                colIndex === 0
                  ? "pr-[8px]"
                  : colIndex === 1
                    ? "px-[4px]"
                    : "pl-[8px]",
              )}
              style={{ width: "33.33%" }}
            >
              <div>
                {/* Rounded full image at top */}
                <div className="mb-4 overflow-hidden">
                  <Img
                    src={service.image}
                    width="128"
                    height="128"
                    alt={service.title}
                    className="mx-auto w-full mb-[16px] object-cover"
                  />
                </div>

                {/* Title */}
                <Text className="font-semibold text-black text-[18px] m-0 p-0 mb-[8px]">
                  {service.title}
                </Text>

                {/* Description */}
                <Text className="text-black/50 m-0 mb-[16px] p-0 text-center">
                  {service.description.substring(0, 150)}

                  {service.description.length >= 150 && (
                    <span className="font-bold text-black/40">...</span>
                  )}
                </Text>

                {/* Button */}
                <Link
                  className="bg-[#0E3773] text-white font-bold py-[8px] px-[12px] rounded-[4px] text-center text-[12px] box-border mx-auto w-fit m-0 inline-block"
                  href={service.link}
                >
                  Learn More
                </Link>
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
  );
};
