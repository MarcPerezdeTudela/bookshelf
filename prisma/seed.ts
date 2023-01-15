import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const author1 = await prisma.author.create({
    data: {
      name: 'Miguel',
      secondName: 'De Cervantes',
      books: {
        create: [
          { title: 'Don Quijote de la Mancha', publishedAt: new Date(1605, 0) },
          { title: 'La Galatea', publishedAt: new Date(1615, 0) },
        ],
      },
    },
  });

  console.log(author1);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
