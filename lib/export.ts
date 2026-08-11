import { format } from 'date-fns';
import { AmortizationRow } from './finance';

export function downloadAmortizationCSV(schedule: AmortizationRow[]) {
  const headers = ['Month', 'Date', 'EMI', 'Principal', 'Interest', 'Balance'];
  const rows = schedule.map(row => [
    row.month,
    format(row.date, 'MMM yyyy'),
    row.emi.toFixed(2),
    row.principal.toFixed(2),
    row.interest.toFixed(2),
    row.balance.toFixed(2)
  ]);
  
  const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "amortization_schedule.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
}
