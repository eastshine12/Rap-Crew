// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import { getSession } from "next-auth/react";

export default async function handler(req, res) {

  const session = await getSession({ req });

  if(!session) return res.send("LOGIN");

  BigInt.prototype.toJSON = function() {       
    return this.toString()
  }

  const prisma = new PrismaClient();

  // const card = {
  //   userNo: 1,
  //   title: "제목3",
  //   content: "내용3",
  // }
  
  try {
    if(req.method === 'POST') {

      const cards =  await prisma.tb_card.create({
        data: {
          ...req.body,
          userNo: Number(session.user.userNo),
        },
      });
  
      if(cards) {
        return res.send("OK");
      };

    }
  } catch(e) {
    console.log(e);
    return res.send("NOK");
  }

}
