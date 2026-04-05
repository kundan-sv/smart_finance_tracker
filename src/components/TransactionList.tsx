import { Transaction, SUSPICIOUS_THRESHOLD, formatINR } from "@/lib/finance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  title?: string;
  showSuspiciousOnly?: boolean;
}

export function TransactionList({
  transactions,
  onDelete,
  title = "Recent Transactions",
  showSuspiciousOnly = false,
}: Props) {
  const list = showSuspiciousOnly
    ? transactions.filter((t) => Math.abs(t.amount) > SUSPICIOUS_THRESHOLD)
    : transactions;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {showSuspiciousOnly && <AlertTriangle className="h-5 w-5 text-suspicious" />}
          {title}
          {showSuspiciousOnly && (
            <Badge variant="outline" className="text-suspicious border-suspicious ml-auto">
              {list.length} flagged
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {list.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-6">
            {showSuspiciousOnly ? "No suspicious transactions" : "No transactions yet"}
          </p>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {list.map((t) => {
              const isSuspicious = Math.abs(t.amount) > SUSPICIOUS_THRESHOLD;
              return (
                <div
                  key={t.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    isSuspicious ? "border-suspicious/40 bg-suspicious/5" : "border-border"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm truncate">
                        {t.description || t.category}
                      </span>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {t.category}
                      </Badge>
                      {isSuspicious && !showSuspiciousOnly && (
                        <AlertTriangle className="h-3.5 w-3.5 text-suspicious shrink-0" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(t.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold text-sm ${
                        t.amount > 0 ? "text-income" : "text-expense"
                      }`}
                    >
                      {t.amount > 0 ? "+" : ""}
                      ₹{Math.abs(t.amount).toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-expense"
                      onClick={() => onDelete(t.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
