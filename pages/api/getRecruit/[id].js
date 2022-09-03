// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import { getSession } from "next-auth/react";


export default async function handler(req, res) {
  const { id } = req.query;
  const session = await getSession({ req });

  if(!session) return res.send("LOGIN");

  BigInt.prototype.toJSON = function() {       
    return this.toString()
  }

  const prisma = new PrismaClient();

  if(req.method === 'GET') {
    const recruit =  await prisma.tb_recruit.findFirst({
      where: {
        cardId: Number(id),
        userNo: Number(session.user.userNo),
      },
      orderBy:{
        requestAt : 'desc',
      }
    });
    
    if(recruit) {
      return res.send(recruit);
    } else {
      return res.send("");
    }
  } else {
    return res.send("");
  }
  
}
