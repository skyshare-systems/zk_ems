import { cn } from "@/lib/utils";
import {
  Column,
  Hr,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";

const Footer = () => {
  return (
    <Section className="relative w-full bg-[url('https://kpc-fai.sgp1.cdn.digitaloceanspaces.com/bg-footer.png')] bg-cover bg-center bg-no-repeat p-8">
      <Row align="center">
        <Column className="text-center">
          <Img
            src={`https://kpc-fai.sgp1.cdn.digitaloceanspaces.com/logo.png`}
            width="100%"
            height="100%"
            alt="KPC FAI"
            className="ml-4 inline self-center w-[76px] h-[67px] object-cover mx-auto"
            style={{
              verticalAlign: "middle",
              marginLeft: "16px",
            }}
          />
          <Text
            style={{
              verticalAlign: "center",
              background:
                "linear-gradient(90deg, #D5BC3B 0%, #FAE696 48%, #D5BC3B 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "16px",
            }}
            className="self-center"
          >
            Educating Tomorrow’s Financial Leaders
          </Text>
        </Column>
      </Row>

      <Row>
        <Column align="center">
          <Link
            href="#"
            style={{
              display: "inline-flex",
            }}
          >
            <Img
              src={`https://kpc-is.sgp1.cdn.digitaloceanspaces.com/youtube.png`}
              width="32"
              height="32"
              alt="Skyshare Labs"
              className="w-8 object-cover mx-auto"
            />
          </Link>
          <Link
            href="#"
            style={{
              display: "inline-flex",
              marginLeft: "20px",
            }}
          >
            <Img
              src={`https://kpc-is.sgp1.cdn.digitaloceanspaces.com/facebook.png`}
              width="32"
              height="32"
              alt="Skyshare Labs"
              className="w-8 object-cover mx-auto"
            />
          </Link>
          <Link
            href="#"
            style={{
              display: "inline-flex",
              marginLeft: "20px",
            }}
          >
            <Img
              src={`https://kpc-is.sgp1.cdn.digitaloceanspaces.com/tiktok.png`}
              width="32"
              height="32"
              alt="Skyshare Labs"
              className="w-8 object-cover mx-auto"
            />
          </Link>
        </Column>
      </Row>

      <Row align="center">
        <Column className="text-center" align="center">
          <tr>
            <td align="center">
              <table
                border={0}
                cellPadding="0"
                cellSpacing="0"
                style={{ margin: "8px 0", maxWidth: "604px" }}
              >
                <tr>
                  <td align="center">
                    <table border={0} cellPadding="0" cellSpacing="0">
                      <tr>
                        <td valign="middle" style={{ paddingRight: "8px" }}>
                          <Img
                            src="https://kpc-is.sgp1.cdn.digitaloceanspaces.com/location-03.png"
                            width="16"
                            height="16"
                            alt="Website"
                            style={{ display: "block" }}
                          />
                        </td>
                        <td valign="middle">
                          <Text className="m-0 text-white/[.72] leading-[1rem] tracking-normal">
                            3F ZK Summit, In Arca Strip Commercial Bldg.,
                            McArthur Highway, Corner Action Drive Center
                            Balubaran Dalandanan, Valenzuela, Philippines, 1443
                          </Text>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center">
              <table
                border={0}
                cellPadding="0"
                cellSpacing="0"
                style={{ margin: "8px 0" }}
              >
                <tr>
                  <td align="center">
                    <table border={0} cellPadding="0" cellSpacing="0">
                      <tr>
                        <td valign="middle" style={{ paddingRight: "8px" }}>
                          <Img
                            src="https://kpc-is.sgp1.cdn.digitaloceanspaces.com/location-03.png"
                            width="16"
                            height="16"
                            alt="Website"
                            style={{ display: "block" }}
                          />
                        </td>
                        <td valign="middle">
                          <Link className="m-0 no-underline text-white/[.72] leading-[1rem] tracking-normal">
                            https://merchant.kpc-express.com
                          </Link>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center">
              <table
                border={0}
                cellPadding="0"
                cellSpacing="0"
                style={{ margin: "8px 0" }}
              >
                <tr>
                  <td align="center">
                    <table border={0} cellPadding="0" cellSpacing="0">
                      <tr>
                        <td valign="middle" style={{ paddingRight: "8px" }}>
                          <Img
                            src="https://kpc-is.sgp1.cdn.digitaloceanspaces.com/location-03.png"
                            width="16"
                            height="16"
                            alt="Website"
                            style={{ display: "block" }}
                          />
                        </td>
                        <td valign="middle">
                          <Text className="m-0 text-white/[.72] leading-[1rem] tracking-normal">
                            0995-775-7124
                          </Text>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </Column>
      </Row>

      <Hr />

      <Row className="footer-row">
        {/* Copyright Section */}
        <Column className="footer-column">
          <Img
            src="https://kpc-is.sgp1.cdn.digitaloceanspaces.com/copyright.png"
            width="16"
            height="16"
            alt="Skyshare Labs"
            style={{ verticalAlign: "middle" }}
            className="inline-flex w-4 object-cover mx-auto mr-2"
          />
          <Text
            className="inline-flex text-white/50"
            style={{ marginRight: "20px" }}
          >
            KPC Finance and Accounting Institute {new Date().getFullYear()}
          </Text>
          <Text className="inline-flex text-white/50">
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
