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


  await prisma.expo.deleteMany()

  for (let i = 0; i < 6; i++) {

    const title = words[Math.round(Math.random() * words.length)] + " " + words[Math.round(Math.random() * words.length)] + " " + words[Math.round(Math.random() * words.length)];
    let numImgs = Math.round(Math.random() * 6);

    let imgs: Image[] = []

    for (numImgs; numImgs > 0; numImgs--) {

      const w = Math.round(Math.random() * 700) + 100;
      const h = Math.round(Math.random() * 700) + 100;

      const img = {
        filename: `img`,
        alt: "",
        src: `https://picsum.photos/${w}/${h}`,
        title: words[numImgs],
      }
      imgs.push(img as any)
    }
    await prisma.expo.upsert({
      where: { id: i.toString() }, update: {}, create: {
        title: title,
        slug: 'expo-' + i,
        images: {
          create: imgs
        }

      }
    })
  }

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
