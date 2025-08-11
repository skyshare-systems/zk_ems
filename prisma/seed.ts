import { PrismaClient, Role, TokenType } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const range = (n: number) => Array.from({ length: n });

async function clearDatabase() {
  await prisma.$transaction([
    prisma.token.deleteMany(),
    prisma.addressBookRecipient.deleteMany(),
    prisma.addressBookGroup.deleteMany(),
    prisma.recipient.deleteMany(),
    prisma.sentEmail.deleteMany(),
    prisma.template.deleteMany(),
    prisma.userCompany.deleteMany(),
    prisma.company.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}

async function seedUsers() {
  const superadmin = await prisma.user.create({
    data: {
      emailAddress: "superadmin@zk.com",
      username: "superadmin",
      password: await hash("Dyq7yOdd#Vh038C5", 10),
      firstName: "Super",
      lastName: "Admin",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      role: Role.ADMIN,
      isActivated: true,
      lastLogin: new Date(),
    },
  });

  const users = await Promise.all(
    range(10).map(async (_, i) =>
      prisma.user.create({
        data: {
          emailAddress: `user${i + 1}@example.com`,
          username: `user${i + 1}`,
          password: await hash("a", 10),
          firstName: `FirstName${i + 1}`,
          lastName: `LastName${i + 1}`,
          image: `https://randomuser.me/api/portraits/${
            i % 2 ? "men" : "women"
          }/${i + 1}.jpg`,
          role: Role.USER,
          isActivated: true,
          lastLogin: new Date(),
        },
      })
    )
  );

  return [superadmin, ...users];
}

async function seedCompanies(users: any[]) {
  const companies = await Promise.all(
    range(5).map((_, i) =>
      prisma.company.create({
        data: {
          name: `Company ${i + 1}`,
          description: `Description for company ${i + 1}`,
          image: `https://picsum.photos/200/200?random=${i + 1}`,
          smtpCredential: {
            create: {
              host: "smtp.example.com",
              port: 587,
              username: `smtpuser${i + 1}`,
              password: `smtppassword${i + 1}`,
              from: `smtpuser${i + 1}@example.com`,
            },
          },
          users: {
            create: users.slice(0, 2).map((u) => ({
              userId: u.id,
            })),
          },
        },
      })
    )
  );
  return companies;
}

async function seedTemplates(companies: any[]) {
  const templates = await Promise.all(
    companies.flatMap((company) =>
      range(3).map((_, i) =>
        prisma.template.create({
          data: {
            name: `Template ${i + 1} - ${company.name}`,
            description: `Description for template ${i + 1}`,
            header: `Header ${i + 1}`,
            footer: `Footer ${i + 1}`,
            tags: [`tag${i + 1}`, "email", company.name.toLowerCase()],
            companyId: company.id,
          },
        })
      )
    )
  );
  return templates;
}

async function seedSentEmails(templates: any[]) {
  const sentEmails = await Promise.all(
    templates.flatMap((template) =>
      range(2).map(() =>
        prisma.sentEmail.create({
          data: {
            header: `Email header based on template: ${template.name}`,
            body: `Email body based on template: ${template.name}`,
            footer: `Email footer based on template: ${template.name}`,
            subject: `Email subject based on template: ${template.name}`,
            templateId: template.id,
            companyId: template.companyId,
          },
        })
      )
    )
  );
  return sentEmails;
}

async function seedRecipients(sentEmails: any[]) {
  await Promise.all(
    sentEmails.flatMap((sentEmail, idx) =>
      range(3).map((_, i) =>
        prisma.recipient.create({
          data: {
            emailAddress: `recipient${idx * 3 + i + 1}@example.com`,
            sentEmailId: sentEmail.id,
          },
        })
      )
    )
  );
}

async function seedTokens(users: any[]) {
  await Promise.all(
    users.flatMap((user) =>
      [TokenType.ACCESS, TokenType.REFRESH].map((type) =>
        prisma.token.create({
          data: {
            token: `${type}_${Math.random().toString(36).substring(7)}`,
            type,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            blacklisted: false,
            userId: user.id,
          },
        })
      )
    )
  );
}

// NEW: Seed AddressBookGroups per company
async function seedAddressBookGroups(companies: any[]) {
  const groups = await Promise.all(
    companies.flatMap((company) =>
      range(2).map((_, i) =>
        prisma.addressBookGroup.create({
          data: {
            name: `Group ${i + 1} - ${company.name}`,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            tag: `group${i + 1}`,
            companyId: company.id,
          },
        })
      )
    )
  );
  return groups;
}

// NEW: Seed AddressBookRecipients linked to companies and add them to groups
async function seedAddressBookRecipients(
  companies: any[],
  groups: any[]
) {
  const recipients = await Promise.all(
    companies.flatMap((company, companyIdx) =>
      range(5).map((_, i) =>
        prisma.addressBookRecipient.create({
          data: {
            emailAddress: `addressbook${companyIdx * 5 + i + 1}@example.com`,
            name: `AddressBook Recipient ${companyIdx * 5 + i + 1}`,
            photoUrl: `https://randomuser.me/api/portraits/${
              i % 2 ? "men" : "women"
            }/${i + 10}.jpg`,
            companyId: company.id,
            groups: {
              connect: [
                groups[companyIdx * 2], // connect to first group of this company
                groups[companyIdx * 2 + 1], // connect to second group of this company
              ].filter(Boolean), // just in case
            },
          },
        })
      )
    )
  );
  return recipients;
}

async function main() {
  await prisma.$connect();
  await clearDatabase();

  const users = await seedUsers();
  const companies = await seedCompanies(users);
  const templates = await seedTemplates(companies);
  const sentEmails = await seedSentEmails(templates);

  await seedRecipients(sentEmails);
  await seedTokens(users);

  const addressBookGroups = await seedAddressBookGroups(companies);
  await seedAddressBookRecipients(companies, addressBookGroups);

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
