import PaymentTracker from '@/components/finance/PaymentTracker'

export default function FinancePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Suivi des Paiements</h1>
      <PaymentTracker />
    </div>
  )
}
