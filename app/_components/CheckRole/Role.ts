// // pages/api/user/role.js

// import { getSession } from '@clerk/nextjs/api';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   const session = getSession(req);

//   if (!session) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   try {
//     const userId = session.userId; 
//     const user = await prisma.user.findUnique({
//       where: { externalId: userId },
//       select: { role: true }, 
//     });

//     return res.status(200).json({ role: user?.role || 'User' });
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
