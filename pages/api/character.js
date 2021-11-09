import prisma from '../../lib/prisma';

export default async function handle(req, res) {
  let result;
  switch (req.method) {
    case 'PUT':
      const { charId, charName, serverId, serverName, jobName, adventureName, guildName } = await req.body;
      result = await prisma.character.upsert({
        where: {
          characterId: charId,
        },
        create: {
          characterId: charId,
          name: charName,
          serverId: serverId,
          serverName: serverName,
          jobName: jobName,
          // guild: {
          //   connectOrCreate: {
          //     create: {
          //       name: guildName,
          //     },
          //     where: {
          //       name: guildName,
          //     },
          //   },
          // },
        },
        update: {
          name: charName,
          jobName: jobName,
          // adventure: {
          //   connectOrCreate: {
          //     create: {
          //       name: adventureName,
          //     },
          //     where: {
          //       name: adventureName,
          //     },
          //   },
          // },
          // guild: {
          //   connectOrCreate: {
          //     create: {
          //       name: guildName,
          //     },
          //     where: {
          //       name: guildName,
          //     },
          //   },
          // },
        },
      });
      break;
    case 'GET':
      result = await prisma.character.findUnique({
        where: {
          id: id,
        },
      });
      break;
    default:
  }
  await res.json(result);
}
