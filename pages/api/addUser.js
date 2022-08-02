// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';


export default async function handler(req, res) {

  BigInt.prototype.toJSON = function() {       
    return this.toString()
  }

  const prisma = new PrismaClient();

  try {
    if(req.method === 'POST') {

      const user =  await prisma.tb_user.create({
        data: req.body
      })
  
      if(user) {
        return res.send("OK");
      }
    }
  } catch(e) {
    console.log(e);
    return res.send("NOK");
  }

}
