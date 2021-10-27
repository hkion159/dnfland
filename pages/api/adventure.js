import prisma from '../../lib/prisma';

export default async function handle(req, res) {
  const { id, name } = req.body;

  const adventure = await prisma.adventure.upsert({
    where: {
      name: name,
    },
    create: {
      name: name,
      user: {
        connect: {
          id: id,
        },
      },
    },
    update: {
      user: {
        connect: {
          id: id,
        },
      },
    },
  });
  res.json(adventure);
}
