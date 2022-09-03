// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import { getSession } from "next-auth/react";

export default async function handler(req, res) {

  const session = await getSession({ req });

  if(!session) return res.send("LOGIN");

  BigInt.prototype.toJSON = function() {       
    return this.toString()
  }
  console.log("req :" +JSON.stringify(req.body));
  const prisma = new PrismaClient();

  const recruitNo = req.body.data.recruitNo===undefined?0:Number(req.body.data.recruitNo);
  
  try {
    if(req.method === 'POST') {

      const result =  await prisma.tb_recruit.create({
        data: {
          cardId: Number(req.body.data.cardId),
          userNo: Number(session.user.userNo),
          status: req.body.data.status,
          requestAt: req.body.data.requestAt,
        },
      });
  
      if(result) {
        return res.send(result);
      };

    }
  } catch(e) {
    console.log(e);
    return res.send("NOK");
  }

}
