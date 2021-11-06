import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  let result;
  switch (req.method) {
    case 'POST':
      const { title, html, markdown, authorId } = await req.body;
      const type = (await authorId) === 1 ? 'notice' : 'normal';
      result = await prisma.post.create({
        data: {
          type: type,
          title: title,
          html: html,
          markdown: markdown,
          author: { connect: { id: authorId } },
        },
      });
      break;
    case 'GET':
      const { authorid } = req.query;
      const authorIdNum = Number(authorid);
      result = await prisma.post.findFirst({
        where: {
          authorId: authorIdNum,
        },
        orderBy: {
          id: 'desc',
        },
      });
      break;
  }
  res.json(result);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
