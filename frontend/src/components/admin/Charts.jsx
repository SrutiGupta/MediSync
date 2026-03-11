import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
} from 'recharts'

// ── Shared ────────────────────────────────────────────────────────────────────
function CardShell({ title, subtitle, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

const TOOLTIP_STYLE = {
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
  fontSize: '12px',
}

// ── A. Patient Distribution Pie ───────────────────────────────────────────────
const PIE_COLORS = {
  emergency: '#ef4444',
  serious: '#f59e0b',
  normal: '#10b981',
}

export function PatientDistributionChart({ data }) {
  const chartData = [
    { name: 'Emergency', value: data?.emergency ?? 0, color: PIE_COLORS.emergency },
    { name: 'Serious', value: data?.serious ?? 0, color: PIE_COLORS.serious },
    { name: 'Normal', value: data?.normal ?? 0, color: PIE_COLORS.normal },
  ].filter((d) => d.value > 0)

  const isEmpty = chartData.every((d) => d.value === 0)

  return (
    <CardShell title="Patient Distribution" subtitle="By condition priority">
      {isEmpty ? (
        <EmptyChart />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </CardShell>
  )
}

// ── B. Bed Usage Bar ──────────────────────────────────────────────────────────
export function BedUsageChart({ data }) {
  const chartData = [
    { name: 'Available', value: data?.available ?? 0, fill: '#10b981' },
    { name: 'Occupied', value: data?.occupied ?? 0, fill: '#ef4444' },
    { name: 'Maintenance', value: data?.maintenance ?? 0, fill: '#f59e0b' },
  ]

  return (
    <CardShell title="Bed Usage" subtitle="Current occupancy across all wards">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={chartData} barSize={36} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: '#f8fafc' }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </CardShell>
  )
}

// ── C. Admission Trend Line ───────────────────────────────────────────────────
// Uses the passed trendData array: [{ date: 'Jan 1', admissions: 3 }, …]
// Falls back to dummy data when not provided.
const DUMMY_TREND = [
  { date: 'Mar 1', admissions: 3 },
  { date: 'Mar 2', admissions: 5 },
  { date: 'Mar 3', admissions: 2 },
  { date: 'Mar 4', admissions: 8 },
  { date: 'Mar 5', admissions: 6 },
  { date: 'Mar 6', admissions: 4 },
  { date: 'Mar 7', admissions: 9 },
  { date: 'Mar 8', admissions: 7 },
  { date: 'Mar 9', admissions: 11 },
  { date: 'Mar 10', admissions: 5 },
]

export function AdmissionTrendChart({ data }) {
  const chartData = data && data.length > 0 ? data : DUMMY_TREND
  const isDummy = !data || data.length === 0

  return (
    <CardShell
      title="Admission Trend"
      subtitle={isDummy ? 'Sample data — connect backend for live data' : 'Daily admissions over time'}
    >
      {isDummy && (
        <p className="text-[10px] text-amber-500 bg-amber-50 border border-amber-100 rounded-lg px-3 py-1.5 mb-4 inline-block">
          ⚠ Showing sample data
        </p>
      )}
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 5, right: 15, bottom: 5, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Line
            type="monotone"
            dataKey="admissions"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardShell>
  )
}

// ── Empty placeholder ─────────────────────────────────────────────────────────
function EmptyChart() {
  return (
    <div className="h-[240px] flex flex-col items-center justify-center text-slate-300">
      <p className="text-3xl mb-2">📊</p>
      <p className="text-sm text-slate-400">No data yet</p>
    </div>
  )
}
