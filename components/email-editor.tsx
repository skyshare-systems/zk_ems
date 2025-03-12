import { useCreateEmailStore } from "@/store/create-email";
import { marked } from "marked";
import React, { useEffect, useRef } from "react";
import { Mdx } from "./mdx/InitializedMDXEditor";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { EmailSection } from "./email-section";
import { cn } from "@/lib/utils";
// import EditorPreview from "./mdx/preview";
// import Editor from "./mdx/editor";
const EmailEditor = ({ isPreview }: { isPreview: boolean }) => {
  const { selectedTemplate, body, alignment, editorData } =
    useCreateEmailStore();
  const ref = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  if (!selectedTemplate) return null;

  console.log({ html: marked.parse(body) });

  const previewHTML = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link rel="preload" as="image" href="/static/email_header.png" />
    <link
      rel="preload"
      as="image"
      href="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/phone.png" />
    <link
      rel="preload"
      as="image"
      href="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/mail.png" />
    <link
      rel="preload"
      as="image"
      href="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/tel.png" />
    <link
      rel="preload"
      as="image"
      href="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/pin.png" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
    <style>
      @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        mso-font-alt: 'Verdana';
        src: url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format('woff2');
      }

      * {
        font-family: 'Roboto', Verdana;
      }
    </style>
  </head>
  <body
    style='background-color:rgb(0,0,0,0.2);margin-top:auto;margin-bottom:auto;margin-left:auto;margin-right:auto;font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";padding-left:0.5rem;padding-right:0.5rem'>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="border-width:1px;background-color:rgb(255,255,255);border-style:solid;border-color:rgb(234,234,234);border-radius:0.25rem;margin-left:auto;margin-right:auto;padding:20px;max-width:640px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              class="">
              <tbody>
                <tr>
                  <td>
                    <img
                      alt="Skyshare Labs"
                      height="150"
                      src="/static/email_header.png"
                      style="margin-top:0px;margin-bottom:0px;margin-left:auto;margin-right:auto;max-width:640px;width:100%;object-fit:cover;display:block;outline:none;border:none;text-decoration:none"
                      width="640" />
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation">
              <tbody>
                <tr>
                  <td>
                    <div data-id="react-email-markdown">
                      <h1
                        style="font-weight:500;padding-top:20px;font-size:2.5rem;color:black">
                        Test
                      </h1>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="background-color:rgb(239,68,68);position:relative;background-image:url(&#x27;https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/bg-1.png&#x27;);background-size:cover;background-position:center;background-repeat:no-repeat;padding:12px">
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td
                            align="left"
                            data-id="__react-email-column"
                            style="width:50%;margin-bottom:auto">
                            <p
                              style="font-size:20px;font-weight:600;color:rgb(255,255,255);line-height:1;margin:16px 0">
                              James Patrick Lucas
                            </p>
                            <p
                              style="font-size:14px;color:rgb(255,255,255);opacity:0.5;line-height:24px;margin:16px 0">
                              Business Development Manager
                            </p>
                            <p
                              style="display:flex;align-items:center;color:rgb(255,255,255);letter-spacing:0em;line-height:1.5;font-size:14px;margin:16px 0">
                              <img
                                height="16"
                                src="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/phone.png"
                                style="display:inline-block;align-self:center;margin-right:0.5rem;outline:none;border:none;text-decoration:none"
                                width="16" /><span style="margin:0px"
                                >+917 678 4455</span
                              >
                            </p>
                            <p
                              style="display:flex;align-items:center;color:rgb(255,255,255);letter-spacing:0em;line-height:1.5;font-size:14px;margin:16px 0">
                              <img
                                height="16"
                                src="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/mail.png"
                                style="display:inline-block;align-self:center;margin-right:0.5rem;outline:none;border:none;text-decoration:none"
                                width="16" /><span style="margin:0px"
                                >jameslucas@skysharelabs.com</span
                              >
                            </p>
                          </td>
                          <td
                            align="left"
                            data-id="__react-email-column"
                            style="width:50%">
                            <p
                              style="color:rgb(255,255,255);font-size:20px;font-weight:600;line-height:24px;margin:16px 0">
                              Skyshare Labs
                            </p>
                            <p
                              style="display:flex;align-items:center;color:rgb(255,255,255);letter-spacing:0em;line-height:1.5;font-size:14px;margin:16px 0">
                              <img
                                height="16"
                                src="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/tel.png"
                                style="display:inline-block;align-self:center;margin-right:0.5rem;outline:none;border:none;text-decoration:none"
                                width="16" /><span style="margin:0px"
                                >+63 956 487 5538</span
                              >
                            </p>
                            <p
                              style="display:flex;align-items:center;color:rgb(255,255,255);letter-spacing:0em;line-height:1.5;font-size:14px;margin:16px 0">
                              <img
                                height="16"
                                src="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/mail.png"
                                style="display:inline-block;align-self:center;margin-right:0.5rem;outline:none;border:none;text-decoration:none"
                                width="16" /><span style="margin:0px"
                                >management@skysharelabs.com</span
                              >
                            </p>
                            <p
                              style="display:flex;align-items:center;color:rgb(255,255,255);letter-spacing:0em;line-height:1.5;font-size:14px;margin:16px 0">
                              <img
                                height="16"
                                src="https://skyshare-labs.sgp1.cdn.digitaloceanspaces.com/pin.png"
                                style="display:inline-block;align-self:center;margin-right:0.5rem;outline:none;border:none;text-decoration:none"
                                width="16" /><span style="margin:0px"
                                >Block 6, Lot 6A Dulalia Homes 1, T. Santiago
                                St., Viente Reales, Valenzuela City</span
                              >
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>

`;

  return (
    <div className="flex p-4 flex-col gap-6 self-stretch rounded-2xl bg-white h-full grow">
      {isPreview ? (
        <div dangerouslySetInnerHTML={{ __html: previewHTML }}></div>
      ) : (
        <>
          <EmailSection content={selectedTemplate.header} />

          {/* Body */}
          <div className="flex flex-col items-center gap-2 w-full my-4 grow">
            <p className="ty-subtext text-black">Edit Email Body</p>
            <p className="text-black/[.5] text-[10.24px]">
              Note: Alignment Plugin will make all content to follow the
              selected alignment. Since markdown doesn&rsquo;t support alignment
              at all.
            </p>
            <div className="flex flex-col border border-black/[.32] border-dashed grow h-full w-full rounded-2xl overflow-hidden min-h-[450px]">
              <Mdx ref={ref} />
              {/* <Editor /> */}
            </div>
          </div>

          <EmailSection content={selectedTemplate.footer} />
        </>
      )}
    </div>
  );
};

export default EmailEditor;
