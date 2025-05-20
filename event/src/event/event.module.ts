import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schemas/event.schema';
import { RewardSchema } from './schemas/reward.schema';
import { ItemSchema } from './schemas/item.schema';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';
import { RewardService } from './services/reward.service';
import { RewardController } from './controllers/reward.controller';
import { ItemService } from './services/item.service';
import { ItemController } from './controllers/item.controller';
import { QuestService } from './services/quest.service';
import { QuestController } from './controllers/quest.controller';
import { QuestSchema } from './schemas/quest.schema';
import { QuestHistorySchema } from './schemas/quest-history.schema';
import { AttendanceSchema } from './schemas/attendance.schema';
import { AttendanceService } from './services/attendance.service';
import { AttendanceController } from './controllers/attendance.controller';
import { InventoryService } from './services/inventory.service';
import { InventoryController } from './controllers/inventory.controller';
import { InventorySchema } from './schemas/inventory.schema';
import { EventHistorySchema } from './schemas/event-history.schema';
import { UserSchema } from './schemas/user.schema';
import { ReferenceSchema } from './schemas/reference.schema';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Event', schema: EventSchema },
      { name: 'Reward', schema: RewardSchema },
      { name: 'Item', schema: ItemSchema },
      { name: 'Quest', schema: QuestSchema },
      { name: 'QuestHistory', schema: QuestHistorySchema },
      { name: 'Attendance', schema: AttendanceSchema },
      { name: 'Inventory', schema: InventorySchema },
      { name: 'EventHistory', schema: EventHistorySchema },
      { name: 'User', schema: UserSchema },
      { name: 'Reference', schema: ReferenceSchema },
    ]),
  ],
  providers: [
    EventService,
    RewardService,
    ItemService,
    QuestService,
    AttendanceService,
    InventoryService,
    UserService,
  ],
  controllers: [
    EventController,
    RewardController,
    ItemController,
    QuestController,
    AttendanceController,
    InventoryController,
    UserController,
  ],
})
export class EventModule {}
