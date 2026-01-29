interface Template {
  header: string;
  footer: string;
}

export const generateTemplate = (
  template: Template,
  body: string,
  alignment: string = "left"
) => {
  // Ensure images in header and footer have max-width: 200px
  const modifiedHeader = template.header.replace(
    /<img(?![^>]*\bwidth\b)([^>]*)>/gi,
    '<img style="max-width:200px; border-radius:8px" $1>'
  );

  const modifiedFooter = template.footer.replace(
    /<img(?![^>]*\bwidth\b)([^>]*)>/gi,
    '<img style="max-width:200px; border-radius:8px" $1>'
  );

  // Ensure images in the body have max-width: 640px
  const modifiedBody = body.replace(
    /<img(?![^>]*\bwidth\b)([^>]*)>/gi,
    '<img style="max-width:640px; border-radius:12px" $1>'
  );

  // Markdown content (remove JSON.stringify)
  const md = `# Welcome to Next.js Email Template

This is a **Next.js** project bootstrapped with \`create-next-app\`.

## Getting Started

Run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Hi Sir Marlon! I hope you're doing well. This is James Lucas, previously from Kyoo, now spearheading Business Development at SkyShare Labs, where we live by our motto: Transforming ideas into products, bringing your vision to life.

We specialize in:
✅ Applications – Delivery & Shipments, Order Management, Rewards & HMO
✅ Web2 & Web3 Expertise – Custom Development, Blockchain Development
✅ Creative & Tech Solutions – UI/UX, 3D Animation, Motion Graphics, Social Media Management
✅ IT Services – IT Staff Augmentation & Outsourcing

Please find our company profile attached. Looking forward to exploring how we can collaborate!

Visit [http://localhost:3000](http://localhost:3000) to see the result.

## Deploy on Vercel

Deploy your Next.js app using [Vercel](https://vercel.com/new).
`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <div 
          class="email-container" 
          style="
              box-sizing: border-box;
              background-color: #f0f0f0;
              padding: 16px;
          "
      >
          <!-- Centered White Container -->
          <div 
              class="email-content" 
              style="
                  box-sizing: border-box;
                  background-color: #ffffff;
                  width: 100%;
                  max-width: 640px;
                  padding: 20px;
                  margin: 0 auto;
                  border-radius: 8px;
                  text-align: ${alignment};
              "
          >
              <!-- Header -->
              <div class="email-header" style="margin-bottom: 20px;">
                  ${modifiedHeader}
              </div>

              <!-- Email Body -->
              <div 
                  class="email-body" 
                  style="
                      box-sizing: border-box;
                      padding: 20px;
                      min-height: 100px;
                      width: 100%;
                  "
              >
                  <div style="max-width: 100%; width: 100%;">
                      ${body}
                  </div>
              </div>

              <!-- Footer -->
              <div class="email-footer" style="margin-top: 20px;">
                  ${modifiedFooter}
              </div>
          </div>
      </div>
    </body>
    </html>
  `;
};
