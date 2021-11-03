import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { id } = await req.query;
  const idNumber = Number(id);
  let result;
  switch (req.method) {
    case 'DELETE':
      result = await prisma.post.delete({
        where: {
          id: idNumber,
        },
      });
      break;
    case 'GET':
      result = await prisma.post.findUnique({
        where: {
          id: idNumber,
        },
        include: {
          author: true,
          comments: {
            include: {
              author: true,
              reTarget: true,
              tail: true,
            },
          },
        },
      });
      break;
    case 'PUT':
      result = await prisma.post.update({
        where: {
          id: idNumber,
        },
        data: req.body,
      });
  }
  res.json(result);
}