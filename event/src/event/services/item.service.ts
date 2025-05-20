import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Item, ItemDocument } from '../schemas/item.schema';
import { GetItemListDto } from '../dto/get-item-list.dto';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  // 초기 데이터 생성
  async onModuleInit() {
    const itemCount = await this.itemModel.countDocuments();

    if (itemCount === 0) {
      await this.itemModel.insertMany([
        {
          name: '코어젬스톤',
          description:
            '더블클릭하면 사용 가능하다. 무작위 코어를 획득할 수 있다.',
        },
        {
          name: '파워 엘릭서',
          description:
            '전설의 비약이다. HP, MP를 모두 회복시킨다. 단, 최대 HP, MP가 999,999를 초과할 경우는 HP, MP를 999,999 회복한다',
        },
        {
          name: '솔 에르다 조각',
          description:
            '솔 에르다로 응축되지 못하고 남은 희미한 마력 파편이다. HEXA 스킬 및 HEXA 스탯을 활성화하거나 강화하는 데 사용된다.',
        },
        {
          name: '극한 성장의 비약',
          description:
            '전설로만 전해지는 성장의 비약이다. 한 모금만 마시면 1레벨 성장할 수 있다. - 200레벨 이상의 캐릭터만 사용이 가능하며 200~249레벨이 사용 시 1레벨 성장, 250레벨 이상은 상당량의 경험치를 얻을 수 있다.',
        },
        {
          name: '경험치 3배 쿠폰',
          description:
            '더블클릭해서 사용하면 30분 동안 경험치 3배 버프가 걸린다. 유사한 효과의 이벤트가 활성화되어 있을 때는 효과가 중복되지 않는다.',
        },
      ]);
    }
  }

  async getItemList(dto: GetItemListDto) {
    return this.itemModel
      .find({})
      .skip(((dto.page ?? 1) - 1) * 10)
      .limit(10);
  }

  async getItem(id: string) {
    const _id = new Types.ObjectId(id);
    return this.itemModel.findById(_id);
  }
}
