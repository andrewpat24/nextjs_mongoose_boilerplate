export interface ExpenseItem {
  id: string;
  name: string;
  amountRemaining: number;
  paidOff: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  expenseList: ExpenseItem[];
}
