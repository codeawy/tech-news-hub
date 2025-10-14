import {
  PrismaClient,
  UserRole,
  ArticleCategory,
  ArticleStatus,
} from "../app/generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data
  await prisma.articleTag.deleteMany();
  await prisma.article.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.author.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Cleared existing data");

  // Create Users
  const users: any[] = [];
  const userCount = 20;

  for (let i = 0; i < userCount; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        avatar_url: faker.image.avatar(),
        role: faker.helpers.arrayElement(Object.values(UserRole)),
      },
    });
    users.push(user);
  }

  console.log(`👥 Created ${users.length} users`);

  // Create Authors (subset of users)
  const authors = [];
  const authorCount = 8;
  const authorUsers = faker.helpers.arrayElements(users, authorCount);

  for (const user of authorUsers) {
    const author = await prisma.author.create({
      data: {
        user_id: user.id,
        username: faker.internet.username(),
        bio: faker.lorem.paragraph(),
        website_url: faker.internet.url(),
        twitter: faker.helpers.maybe(() => `@${faker.internet.username()}`),
        github: faker.helpers.maybe(() => faker.internet.username()),
        linkedin: faker.helpers.maybe(() => faker.internet.username()),
      },
    });
    authors.push(author);
  }

  console.log(`✍️ Created ${authors.length} authors`);

  // Create Tags
  const techTags = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Machine Learning",
    "AI",
    "Web Development",
    "Mobile Development",
    "DevOps",
    "Cloud Computing",
    "Cybersecurity",
    "Blockchain",
    "Data Science",
    "Frontend",
    "Backend",
    "Full Stack",
    "API",
    "Database",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Kubernetes",
  ];

  const tags = [];
  for (const tagName of techTags) {
    const tag = await prisma.tag.create({
      data: {
        name: tagName,
        slug: tagName.toLowerCase().replace(/\s+/g, "-"),
      },
    });
    tags.push(tag);
  }

  console.log(`🏷️ Created ${tags.length} tags`);

  // Create Articles
  const articles = [];
  const articleCount = 50;

  for (let i = 0; i < articleCount; i++) {
    const author = faker.helpers.arrayElement(authors);
    const title = faker.lorem.sentence();
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    const content = faker.lorem.paragraphs(
      faker.number.int({ min: 5, max: 15 })
    );
    const excerpt = faker.lorem.paragraph();
    const readingTime = Math.ceil(content.split(" ").length / 200); // ~200 words per minute

    const article = await prisma.article.create({
      data: {
        slug,
        title,
        content,
        excerpt,
        cover_image: faker.image.url(),
        category: faker.helpers.arrayElement(Object.values(ArticleCategory)),
        status: faker.helpers.arrayElement(Object.values(ArticleStatus)),
        featured: faker.datatype.boolean({ probability: 0.2 }),
        views: faker.number.int({ min: 0, max: 10000 }),
        reading_time: readingTime,
        published_at: faker.helpers.maybe(() => faker.date.past()),
        author_id: author.id,
        userId: faker.helpers.maybe(
          () => faker.helpers.arrayElement(users as any[]).id
        ),
      },
    });
    articles.push(article);
  }

  console.log(`📰 Created ${articles.length} articles`);

  // Create Article-Tag relationships
  const articleTags = [];
  for (const article of articles) {
    const articleTagCount = faker.number.int({ min: 1, max: 5 });
    const selectedTags = faker.helpers.arrayElements(tags, articleTagCount);

    for (const tag of selectedTags) {
      const articleTag = await prisma.articleTag.create({
        data: {
          article_id: article.id,
          tag_id: tag.id,
        },
      });
      articleTags.push(articleTag);
    }
  }

  console.log(`🔗 Created ${articleTags.length} article-tag relationships`);

  // Create some featured articles
  const featuredCount = 5;
  const featuredArticles = faker.helpers.arrayElements(articles, featuredCount);
  for (const article of featuredArticles) {
    await prisma.article.update({
      where: { id: article.id },
      data: { featured: true },
    });
  }

  console.log(`⭐ Set ${featuredCount} articles as featured`);

  // Create some published articles
  const publishedCount = Math.floor(articles.length * 0.7);
  const publishedArticles = faker.helpers.arrayElements(
    articles,
    publishedCount
  );
  for (const article of publishedArticles) {
    await prisma.article.update({
      where: { id: article.id },
      data: {
        status: ArticleStatus.PUBLISHED,
        published_at: faker.date.past(),
      },
    });
  }

  console.log(`📢 Published ${publishedCount} articles`);

  console.log("✅ Database seeding completed successfully!");
  console.log(`📊 Summary:`);
  console.log(`   - Users: ${users.length}`);
  console.log(`   - Authors: ${authors.length}`);
  console.log(`   - Tags: ${tags.length}`);
  console.log(`   - Articles: ${articles.length}`);
  console.log(`   - Article-Tag relationships: ${articleTags.length}`);
  console.log(`   - Featured articles: ${featuredCount}`);
  console.log(`   - Published articles: ${publishedCount}`);
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
