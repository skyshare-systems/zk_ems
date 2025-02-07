import { Prisma, PrismaClient, Role, TokenType } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await cleanDatabase();

  // Create Users
  const users = await Promise.all([
    createUser({
      username: "admin.user",
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      role: Role.ADMIN,
      password: "Admin123!",
      image: "https://picsum.photos/200",
    }),
    createUser({
      username: "john.doe",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      role: Role.USER,
      password: "User123!",
      image: "https://picsum.photos/200",
    }),
    createUser({
      username: "jane.smith",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      role: Role.USER,
      password: "User123!",
      image: "https://picsum.photos/200",
    }),
  ]);
  // Create Companies
  const companies = await Promise.all([
    createCompany({
      name: "Tech Corp",
      image: "https://placeholder.com/tech-corp.jpg",
      description: "Leading technology solutions provider",
    }),
    createCompany({
      name: "Marketing Pro",
      image: "https://placeholder.com/marketing-pro.jpg",
      description: "Digital marketing excellence",
    }),
    createCompany({
      name: "Design Studio",
      image: "https://placeholder.com/design-studio.jpg",
      description: "Creative design solutions",
    }),
  ]);

  // Create Templates
  const templates = await Promise.all([
    createTemplate({
      subject: "Welcome to Our Service",
      header: `
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <img src="{{company_logo}}" alt="Company Logo" style="max-width: 200px; margin-bottom: 20px;">
          <h1 style="color: #333; font-family: Arial, sans-serif;">Welcome Aboard!</h1>
          <p style="color: #666;">We're excited to have you join our community</p>
        </div>
      `,
      description: "Welcome email for new users",
      company:{ 
        connect: { id: companies[0].id },
      },
      name: "Welcome Email",
      body: "We're excited to have you join us...",
      footer: `
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-family: Arial, sans-serif;">
          <p style="margin-bottom: 10px; color: #666;">Best regards,<br>The Team</p>
          <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px;">
            <p style="font-size: 12px; color: #999;">
              {{company_name}}<br>
              {{company_address}}<br>
              <a href="{{unsubscribe_link}}" style="color: #999; text-decoration: none;">Unsubscribe</a>
            </p>
          </div>
        </div>
      `,
    }),
    createTemplate({
      subject: "Monthly Newsletter",
      name: "Monthly Updates",
      header: `
        <div style="background-color: #2c3e50; padding: 30px; text-align: center;">
          <img src="{{company_logo}}" alt="Company Logo" style="max-width: 150px; margin-bottom: 15px;">
          <h1 style="color: #ffffff; font-family: 'Helvetica Neue', Arial, sans-serif;">Monthly Updates</h1>
          <p style="color: #ecf0f1;">Your Monthly Digest of {{company_name}} News</p>
          <div style="background-color: #34495e; height: 5px; width: 50px; margin: 20px auto;"></div>
        </div>
      `,
      company:{ 
        connect: { id: companies[1].id },
      },
      description: "Monthly newsletter for subscribers",
      body: "Here's what's new with us...",
      footer: `
        <div style="background-color: #2c3e50; padding: 30px; text-align: center; font-family: 'Helvetica Neue', Arial, sans-serif;">
          <div style="margin-bottom: 20px;">
            <a href="{{social_facebook}}" style="color: #ffffff; margin: 0 10px;">Facebook</a>
            <a href="{{social_twitter}}" style="color: #ffffff; margin: 0 10px;">Twitter</a>
            <a href="{{social_linkedin}}" style="color: #ffffff; margin: 0 10px;">LinkedIn</a>
          </div>
          <p style="color: #ecf0f1; font-size: 14px;">
            © {{current_year}} {{company_name}}. All rights reserved.<br>
            {{company_address}}
          </p>
          <p style="font-size: 12px; color: #bdc3c7;">
            <a href="{{unsubscribe_link}}" style="color: #bdc3c7; text-decoration: underline;">Unsubscribe</a> |
            <a href="{{privacy_policy}}" style="color: #bdc3c7; text-decoration: underline;">Privacy Policy</a>
          </p>
        </div>
      `,
    }),
  ]);

  // Create SentEmails
  const sentEmails = await Promise.all([
    createSentEmail(templates[0].id),
    createSentEmail(templates[1].id),
  ]);

  // Create Recipients
  await Promise.all([
    createRecipient({
      firstName: "Robert",
      lastName: "Johnson",
      email: "robert@example.com",
      phone: "+1234567890",
      company: "Client Corp",
      sentEmail: {
        connect: { id: sentEmails[0].id },
      },
    }),
    createRecipient({
      firstName: "Sarah",
      lastName: "Williams",
      email: "sarah@example.com",
      phone: "+1987654321",
      company: "Partner LLC",
      sentEmail: {
        connect: { id: sentEmails[1].id },
      },
    }),
  ]);

  // Create Tokens
  await Promise.all([createToken(users[0].id), createToken(users[1].id)]);

  console.log("Database seeded successfully!");
}

async function cleanDatabase() {
  const tablenames = [
    "Token",
    "Recipient",
    "SentEmail",
    "Template",
    "Company",
    "User",
  ];

  for (const table of tablenames) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
  }
}

async function createUser(data: Prisma.UserCreateInput) {
  const hashedPassword = await hash(data.password, 10);
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      isActivated: true,
      lastLogin: new Date(),
    },
  });
}

async function createCompany(data: Prisma.CompanyCreateInput) {
  return prisma.company.create({ data });
}

async function createTemplate(data: Prisma.TemplateCreateInput) {
  return prisma.template.create({ data });
}

async function createSentEmail(templateId: string) {
  return prisma.sentEmail.create({
    data: { templateId },
  });
}

async function createRecipient(data: Prisma.RecipientCreateInput) {
  return prisma.recipient.create({ data });
}

async function createToken(userId: string) {
  return prisma.token.create({
    data: {
      userId,
      token: "dummy-token-" + Math.random().toString(36),
      type: TokenType.ACCESS,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      blacklisted: false,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
