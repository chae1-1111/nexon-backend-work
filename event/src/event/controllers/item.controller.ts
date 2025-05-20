import { Controller, Get, Query } from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { GetItemListDto } from '../dto/get-item-list.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/')
  async getItemList(@Query() dto: GetItemListDto) {
    return this.itemService.getItemList(dto);
  }

  @Get('/detail')
  async getItem(@Query('id') id: string) {
    return this.itemService.getItem(id);
  }
}
