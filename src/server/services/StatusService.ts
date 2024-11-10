import { prisma } from "@/lib/prisma";

export class StatusService {
  async salvarStatus(status: string): Promise<string> {
    await prisma.agv.updateMany({
      data: { status: status },
    });
    return status;
  }
}
