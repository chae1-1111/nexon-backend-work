export class AddItemToInventoryDto {
  userId: string;
  items: {
    itemId: string;
    amount: number;
  }[];
}
