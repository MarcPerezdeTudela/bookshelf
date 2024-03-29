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

  const user1 = await prisma.user.create({
    data: {
      username: 'admin',
      password: 'admin',
    },
  });
  console.log(author1);
  console.log(user1);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
