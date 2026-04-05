export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export const CATEGORIES = [
  "Food",
  "Shopping",
  "Travel",
  "Entertainment",
  "Bills",
  "Health",
  "Education",
  "Salary",
  "Freelance",
  "Other",
] as const;

export const SUSPICIOUS_THRESHOLD = 5000;

const STORAGE_KEY = "finance-tracker-transactions";

export function loadTransactions(): Transaction[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveTransactions(transactions: Transaction[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export function getBalance(transactions: Transaction[]): number {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalIncome(transactions: Transaction[]): number {
  return transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalExpenses(transactions: Transaction[]): number {
  return Math.abs(
    transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)
  );
}

export function getCategoryBreakdown(
  transactions: Transaction[]
): { category: string; amount: number }[] {
  const map = new Map<string, number>();
  transactions
    .filter((t) => t.amount < 0)
    .forEach((t) => {
      const prev = map.get(t.category) || 0;
      map.set(t.category, prev + Math.abs(t.amount));
    });
  return Array.from(map.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}

export function getSuspiciousTransactions(transactions: Transaction[]): Transaction[] {
  return transactions.filter((t) => Math.abs(t.amount) > SUSPICIOUS_THRESHOLD);
}
