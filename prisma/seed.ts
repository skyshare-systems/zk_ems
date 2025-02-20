import { PrismaClient, Role, TokenType } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  // Clean the database
  await prisma.$transaction([
    prisma.token.deleteMany(),
    prisma.recipient.deleteMany(),
    prisma.sentEmail.deleteMany(),
    prisma.template.deleteMany(),
    prisma.userCompany.deleteMany(),
    prisma.company.deleteMany(),
    prisma.user.deleteMany(),
  ]);
  // Create 10 users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(async (_, index) => {
      return prisma.user.create({
        data: {
          emailAddress: `user${index + 1}@example.com`,
          username: `user${index + 1}`,
          password: await hash("a", 10),
          firstName: `FirstName${index + 1}`,
          lastName: `LastName${index + 1}`,
          image: `https://randomuser.me/api/portraits/${
            index % 2 ? "men" : "women"
          }/${index + 1}.jpg`,
          role: index === 0 ? Role.ADMIN : Role.USER,
          isActivated: true,
          lastLogin: new Date(),
        },
      });
    })
  );

  // Create 5 companies
  const companies = await Promise.all(
    Array.from({ length: 5 }).map((_, index) => {
      return prisma.company.create({
        data: {
          name: `Company ${index + 1}`,
          description: `Description for company ${index + 1}`,
          image: `https://picsum.photos/200/200?random=${index + 1}`,
          smtpCredential: {
            create: {
              host: 'smtp.example.com',
              port: 587,
              username: `smtpuser${index + 1}`,
              password: `smtppassword${index + 1}`,
              from: `smtpuser${index + 1}`,
            }   
          },
        },
      });
    })
  );

  // Create user-company relationships (each user belongs to 2 companies)
  await Promise.all(
    users.flatMap((user) =>
      companies.slice(0, 2).map((company) =>
        prisma.userCompany.create({
          data: {
            userId: user.id,
            companyId: company.id,
          },
        })
      )
    )
  );

  // Create 3 templates per company
  const templates = await Promise.all(
    companies.flatMap((company) =>
      Array.from({ length: 3 }).map((_, index) =>
        prisma.template.create({
          data: {
            name: `Template ${index + 1} - ${company.name}`,
            description: `Description for template ${index + 1}`,
            subject: `Subject ${index + 1}`,
            header: `Header ${index + 1}`,
            footer: `Footer ${index + 1}`,
            tags: [`tag${index + 1}`, "email", company.name.toLowerCase()],
            companyId: company.id,
          },
        })
      )
    )
  );

  // Create 2 sent emails per template
  const sentEmails = await Promise.all(
    templates.flatMap((template) =>
      Array.from({ length: 2 }).map(() =>
        prisma.sentEmail.create({
          data: {
            header: `Email header based on template: ${template.name}`,
            body: `Email body based on template: ${template.name}`,
            footer: `Email footer based on template: ${template.name}`,
            templateId: template.id,
            companyId: template.companyId,
          },
        })
      )
    )
  );

  // Create 3 recipients per sent email
  await Promise.all(
    sentEmails.flatMap((sentEmail, emailIndex) =>
      Array.from({ length: 3 }).map((_, index) =>
        prisma.recipient.create({
          data: {
            emailAddress: `recipient${emailIndex * 3 + index + 1}@example.com`,
            sentEmailId: sentEmail.id,
          },
        })
      )
    )
  );

  // Create tokens for each user (access and refresh)
  await Promise.all(
    users.flatMap((user) =>
      [TokenType.ACCESS, TokenType.REFRESH].map((type) =>
        prisma.token.create({
          data: {
            token: `${type}_${Math.random().toString(36).substring(7)}`,
            type,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            blacklisted: false,
            userId: user.id,
          },
        })
      )
    )
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
