// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';


export default async function handler(req, res) {
  const { id } = req.query;

  BigInt.prototype.toJSON = function() {       
    return this.toString()
  }

  const prisma = new PrismaClient();

  if(req.method === 'GET') {
    const replys =  await prisma.tb_reply.findMany({
      where: {
        cardId: Number(id),
        valid: true,
      },
      include: {
        tb_user: {
          select: {
            userId: true,
          },
        },
      },
    });
    if(replys.length > 0) {
      return res.send(replys);
    } else {
      return res.send("");
    }
  } else {
    return res.send("");
  }
  
}
