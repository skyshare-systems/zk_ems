import { cn } from "@/lib/utils";
import {
  Column,
  Container,
  Img,
  Row,
  Text,
  Link,
  Section,
} from "@react-email/components";

const Footer = () => {
  return (
    <Section className="text-center bg-[#FFF9E6] p-8">
      <Row>
        <Column align="center">
          <Img
            src="https://kids-learning-ville.sgp1.cdn.digitaloceanspaces.com/logo.png"
            className="mb-3"
          />
          <div className="mb-3">
            <FooterIcon
              src="https://kids-learning-ville.sgp1.cdn.digitaloceanspaces.com/instagram.png"
              alt="Instagram"
              text="kidslearningvilleph"
              classNames="inline-block mr-4"
            />

            <FooterIcon
              src="https://kids-learning-ville.sgp1.cdn.digitaloceanspaces.com/facebook.png"
              alt="Facebook"
              text="@KidsLearningVille"
              classNames="inline-block mr-4"
            />

            <FooterIcon
              src="https://kids-learning-ville.sgp1.cdn.digitaloceanspaces.com/mail.png"
              alt="Mail"
              text="learningvillekids@gmail.com"
              classNames="inline-block"
            />
          </div>
          <Text className="p-0 m-0 text-[12.24px] inline-block text-[#18365A80] leading-normal mr-2">
            Kids Learning Ville
          </Text>
          <Text className="p-0 m-0 text-[12.24px] inline-block text-[#18365A80] leading-normal mr-2">
            All rights reserved.
          </Text>
        </Column>
      </Row>
    </Section>
  );
};

export default Footer;

const FooterIcon = ({
  src,
  alt,
  text,
  classNames,
}: {
  src: string;
  alt: string;
  text: string;
  classNames?: string;
}) => {
  return (
    <div className={cn(classNames, "align-middle")}>
      <Img
        src={src}
        alt={alt}
        width={16}
        height={16}
        className="w-4 h-4 inline-block align-middle"
      />

      <Text className="p-0 m-0 text-[12px] text-black/50 my-[4px] leading-normal inline-block align-middle">
        {text}
      </Text>
    </div>
  );
};
