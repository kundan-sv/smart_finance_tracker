import { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { AddTransactionForm } from "@/components/AddTransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { BalanceCard } from "@/components/BalanceCard";
import { SpendingChart } from "@/components/SpendingChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, List, AlertTriangle, PlusCircle } from "lucide-react";

const Index = () => {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    balance,
    totalIncome,
    totalExpenses,
    categoryBreakdown,
    suspiciousTransactions,
  } = useTransactions();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container max-w-5xl mx-auto px-4 py-5">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            💰 Smart Finance Tracker
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track income, expenses, and get financial insights
          </p>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-6 space-y-6">
        <BalanceCard
          balance={balance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="add" className="gap-1.5">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Add</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="gap-1.5">
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-1.5">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
            <TabsTrigger value="suspicious" className="gap-1.5 relative">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
              {suspiciousTransactions.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-suspicious text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {suspiciousTransactions.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <TabsContent value="add">
              <AddTransactionForm onAdd={addTransaction} />
            </TabsContent>

            <TabsContent value="transactions">
              <TransactionList
                transactions={transactions}
                onDelete={deleteTransaction}
              />
            </TabsContent>

            <TabsContent value="insights">
              <SpendingChart data={categoryBreakdown} />
            </TabsContent>

            <TabsContent value="suspicious">
              <TransactionList
                transactions={transactions}
                onDelete={deleteTransaction}
                title="Suspicious Transactions"
                showSuspiciousOnly
              />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
