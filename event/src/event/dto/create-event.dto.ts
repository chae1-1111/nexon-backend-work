import { EventType } from '../enums/event-type.enum';

export class CreateEventDto {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  type: EventType;
  count?: number;
  questId?: string;
  isActive: boolean;
}
