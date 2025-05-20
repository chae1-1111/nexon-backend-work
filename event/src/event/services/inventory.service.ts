import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Inventory, InventoryDocument } from '../schemas/inventory.schema';
import { AddItemToInventoryDto } from '../dto/add-item-to-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name)
    private inventoryModel: Model<InventoryDocument>,
  ) {}

  async addItemsToInventory(dto: AddItemToInventoryDto) {
    const _userId = new Types.ObjectId(dto.userId);
    const operations = dto.items.map((i) => ({
      updateOne: {
        filter: {
          userId: _userId,
          itemId: new Types.ObjectId(i.itemId),
        },
        update: {
          $inc: { amount: i.amount },
        },
        upsert: true,
      },
    }));

    await this.inventoryModel.bulkWrite(operations);
  }

  async getInventory(userId: string) {
    const _userId = new Types.ObjectId(userId);
    return this.inventoryModel.find({
      userId: _userId,
    });
  }
}
