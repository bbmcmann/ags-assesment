export type Transaction = {
  roundId: string;
  playerId: string;
  gameName: string;
  betAmount: number;
  winAmount: number;
  status: string;
  startedAt: string;
  currency: string;
};