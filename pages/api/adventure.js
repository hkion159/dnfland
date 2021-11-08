import prisma from '../../lib/prisma';

export default async function handle(req, res) {
  let { id, name } = await req.body;
  let result;
  switch (req.method) {
    case 'PUT':
      result = await prisma.adventure.upsert({
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
      break;
    case 'GET':
      name = await req.query.name;
      result = await prisma.adventure.findUnique({
        where: {
          name: name,
        },
        include: {
          characters: true,
        },
      });
      break;
    default:
  }
  await res.json(result);
}
