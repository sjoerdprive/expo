import { PrismaClient, Image } from '@prisma/client'
const prisma = new PrismaClient();

const words = ["tangy", "large", "impolite", "rainstorm", "soap", "summer", "cultured", "spell", "person", "bless", "want", "dusty", "wooden", "utopian", "uttermost", "tested", "expand", "bumpy", "tasteless", "dramatic", "test", "meeting", "amused", "attract", "ruin", "cars", "belong", "skinny", "bite-sized", "size",]

async function main() {
  await prisma.user.upsert({
    where: { username: "admin" }, update: {}, create: {
      username: "admin",
      password: 'admin',
    }
  })

  await prisma.settings.upsert({
    where: {
      id: "0"
    },
    create: {
    },
    update: {}
  })


  await prisma.category.upsert({
    where: { id: "0" }, update: {}, create: {
      name: "Geen",
      slug: "none",
      id: "0"
    }
  })

  await prisma.category.upsert({
    where: { id: "1" }, update: {}, create: {
      name: "Commissies",
      slug: "commissies",
      id: "1"
    }
  })

  await prisma.category.upsert({
    where: { id: "2" }, update: {}, create: {
      name: "Experimenten",
      slug: "experimenten",
      id: "2"
    }
  })


  await prisma.image.deleteMany()
  await prisma.expo.deleteMany()

  await prisma.expo.upsert({
    where: { id: "1919051" }, update: {}, create: {
      title: "Arrangement of guitars",
      slug: 'arrangement-of-guitars',
    }
  })


}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
