// Prisma Mock stub for Astro static prerender & edge deployment
export const prisma: any = {
  lead: {
    create: async () => ({ id: 'mock-lead-id' }),
    findMany: async () => [],
    findFirst: async () => null,
  },
  customer: {
    findFirst: async () => null,
    create: async () => ({ id: 'mock-customer-id' }),
  },
  $connect: async () => {},
  $disconnect: async () => {},
};

export class PrismaClient {
  lead = prisma.lead;
  customer = prisma.customer;
  $connect = prisma.$connect;
  $disconnect = prisma.$disconnect;
}

export type Lead = {
  id: string;
  name: string;
  email?: string | null;
  phone: string;
  configuration: string;
  status: string;
  createdAt: Date;
};

export default prisma;
