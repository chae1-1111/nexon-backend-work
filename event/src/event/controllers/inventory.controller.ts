import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Role } from '../../roles/roles.enum';
import { InventoryService } from '../services/inventory.service';
import { AddItemToInventoryDto } from '../dto/add-item-to-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('/')
  async addInventory(@Body() dto: AddItemToInventoryDto) {
    return this.inventoryService.addItemsToInventory(dto);
  }

  @Get('/')
  async getInventory(@Req() req: any, @Query('userId') userId: string) {
    const targetUserId =
      req.headers['x-user-role'] === Role.USER
        ? req.headers['x-user-id']
        : userId;
    return this.inventoryService.getInventory(targetUserId);
  }
}
