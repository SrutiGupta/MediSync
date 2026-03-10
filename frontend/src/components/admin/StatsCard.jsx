export default function StatsCard({ icon: Icon, title, value = 0, gradient, iconBg, iconColor, trend }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 shadow-sm border border-white/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default ${gradient}`}
    >
      {/* Background decoration */}
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute -right-1 -bottom-6 w-16 h-16 rounded-full bg-white/10" />

      <div className="relative flex items-start justify-between">
        {/* Icon */}
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>

        {/* Trend badge */}
        {trend !== undefined && (
          <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>

      <div className="mt-4 relative">
        <p className="text-sm font-medium text-white/80">{title}</p>
        <p className="text-4xl font-extrabold text-white mt-1 leading-none tracking-tight">
          {value}
        </p>
      </div>
    </div>
  )
}
