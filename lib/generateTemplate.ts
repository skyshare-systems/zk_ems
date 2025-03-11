
interface Template {
  header: string;
  footer:string
}
export const generateTemplate = (template: Template, body: string, alignment: string
) => {

   const modifiedBody = body.replace(
      /<img(?![^>]*\bwidth\b)([^>]*)>/gi,
      '<img width="100%" style="border-radius:12px" $1>',
    );

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
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
                text-alignment: ${alignment};
            "
        >
            <!-- Header -->
            <div class="email-header" style="margin-bottom: 20px;">
                ${template.header}
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
                <div style="max-width: 100%;
                            width: 100%;">
                    ${modifiedBody}
                </div>
            </div>

            <!-- Footer -->
            <div class="email-footer" style="margin-top: 20px;">
                ${template.footer}
            </div>
        </div>
    </div>
    </body>
      </html>
    `;
}