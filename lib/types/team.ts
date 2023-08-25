export interface TeamData {
  id: number | string;
  name: string;
  totalMembers: number;
  membersToShowcase: { imageUrl: string }[];
}
