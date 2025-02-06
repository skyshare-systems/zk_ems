import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const {  subject, body } = await req.json();

    // Email template structure
    const header = ` <img        	src="https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/412166078_122110770992142460_4959483653729820272_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeESLHTVTgEajXZ6eWC2d3CR1b5ykJ9QNC3VvnKQn1A0LR-9bz4TCGnkqZgdRJH5rSN6D__Xs685swHXgKJONe9O&_nc_ohc=Krq7ja5xc0sQ7kNvgGlnoec&_nc_oc=AdjA1CEZj1l5-RBV6ogkteyAbjM7mGzhKbXOb-VilD6DUS-uI4KpYodET0F9IaFPLok&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=Afr617oF7M6ab9nUXXUIZHi&oh=00_AYBD6uadAn9hNROnn4eUfsOdtMdxX9bOu9LlATb7nwVhPw&oe=67A9FBEB"       width="28" height="32"       />`;
    const footer = ` <img        	src="https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/412166078_122110770992142460_4959483653729820272_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeESLHTVTgEajXZ6eWC2d3CR1b5ykJ9QNC3VvnKQn1A0LR-9bz4TCGnkqZgdRJH5rSN6D__Xs685swHXgKJONe9O&_nc_ohc=Krq7ja5xc0sQ7kNvgGlnoec&_nc_oc=AdjA1CEZj1l5-RBV6ogkteyAbjM7mGzhKbXOb-VilD6DUS-uI4KpYodET0F9IaFPLok&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=Afr617oF7M6ab9nUXXUIZHi&oh=00_AYBD6uadAn9hNROnn4eUfsOdtMdxX9bOu9LlATb7nwVhPw&oe=67A9FBEB"       width="28" height="32"       />`;
    
    const emailContent = `
      ${header}
      <div style="padding: 20px; min-height: 100px;">${body}</div>
      ${footer}
    `;

    // Configure SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: "email-smtp.eu-west-1.amazonaws.com",
      port: "587",
      auth: {
        user: "AKIA33FBU3VU5BFLWDFZ",
        pass: "BO3dk7L8/ZbjC0OHaHkdtvcNTEsn0XvxOjn4G1avUPxj"
      }
    });

    // Send Email
    const info = await transporter.sendMail({
      from: "support@coinkings.tech",
      to:"ijohnpaul2000@gmail.com",
      subject,
      html: emailContent, // Send as HTML
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: 'Internal' }, { status: 500 });
  }
}
