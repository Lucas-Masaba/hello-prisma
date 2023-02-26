const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const main = async () => {

  await prisma.user.create({
    data: {
      name: 'Lucas',
      email: 'raul@gmail.com',
      posts: {
        create: { title: 'Hello World' },
      },
      profile: {
        create: { bio: 'I like video games' }
      }
    }
  })

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true
    }
  })
  console.dir(allUsers, { depth: null })

  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  })
  console.log(post)
}


main().then(async () => {
  await prisma.$disconnect
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})