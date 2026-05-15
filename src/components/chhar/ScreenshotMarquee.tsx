const DEALS = [
  {
    store: "Shwarma House",
    discount: "-40%",
    category: "Fast Food",
    city: "Dhaka",
    flash: true,
    rotate: "rotate-[0deg]",
  },
  {
    store: "Meena Bazar",
    discount: "-25%",
    category: "Grocery",
    city: "Chittagong",
    flash: false,
    rotate: "rotate-[1.5deg]",
  },
  {
    store: "Pizza Hut BD",
    discount: "BOGO",
    category: "Dining",
    city: "Dhaka",
    flash: false,
    rotate: "rotate-[-1deg]",
  },
  {
    store: "Rangs Electronics",
    discount: "-45%",
    category: "Electronics",
    city: "Rajshahi",
    flash: true,
    rotate: "rotate-[0deg]",
  },
  {
    store: "Bashundhara Outlet",
    discount: "-50%",
    category: "Fashion",
    city: "Dhaka",
    flash: false,
    rotate: "rotate-[1deg]",
  },
  {
    store: "Esquire Electronics",
    discount: "-30%",
    category: "Electronics",
    city: "Khulna",
    flash: false,
    rotate: "rotate-[-1.5deg]",
  },
  {
    store: "Lavazza BD",
    discount: "-35%",
    category: "Coffee",
    city: "Dhaka",
    flash: true,
    rotate: "rotate-[0deg]",
  },
  {
    store: "Domino's BD",
    discount: "BOGO",
    category: "Fast Food",
    city: "Chittagong",
    flash: false,
    rotate: "rotate-[1.5deg]",
  },
  {
    store: "Aarong",
    discount: "-20%",
    category: "Fashion",
    city: "Dhaka",
    flash: false,
    rotate: "rotate-[-0.5deg]",
  },
  {
    store: "Star Hotel & Dining",
    discount: "-40%",
    category: "Dining",
    city: "Rajshahi",
    flash: true,
    rotate: "rotate-[0deg]",
  },
  {
    store: "Chillox",
    discount: "-55%",
    category: "Fast Food",
    city: "Dhaka",
    flash: true,
    rotate: "rotate-[1deg]",
  },
  {
    store: "Tech Depot BD",
    discount: "-25%",
    category: "Electronics",
    city: "Khulna",
    flash: false,
    rotate: "rotate-[-1.5deg]",
  },
]

// Doubled for seamless infinite loop
const TICKER = [...DEALS, ...DEALS]

export function ChharScreenshotMarquee() {
  return (
    <div
      className="w-full overflow-hidden py-4"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className="flex gap-4 shrink-0 animate-marquee-left"
        style={{ animationDuration: "28s" }}
      >
        {TICKER.map((deal, i) => (
          <div
            key={i}
            className={`relative shrink-0 flex flex-col justify-between w-[230px] h-[138px] rounded-2xl p-5 ${deal.rotate}`}
            style={{
              backgroundColor: "#0D0E0F",
              border: "1px solid rgba(217,255,59,0.16)",
              borderLeft: "3px solid rgba(217,255,59,0.45)",
            }}
          >
            {/* Top row: store name + category pill */}
            <div className="flex items-start justify-between gap-2">
              <span
                className="text-xs font-bold leading-tight truncate"
                style={{ color: "rgba(242,242,243,0.88)" }}
              >
                {deal.store}
              </span>
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide"
                style={{
                  backgroundColor: "rgba(217,255,59,0.09)",
                  color: "rgba(217,255,59,0.65)",
                }}
              >
                {deal.category}
              </span>
            </div>

            {/* Middle: hero discount */}
            <div
              className="font-black leading-none tracking-tighter"
              style={{ fontSize: "2.1rem", color: "#D9FF3B" }}
            >
              {deal.discount}
            </div>

            {/* Bottom row: city pill + optional flash tag */}
            <div className="flex items-center justify-between gap-2">
              <span
                className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "rgba(242,242,243,0.45)",
                }}
              >
                📍 {deal.city}
              </span>
              {deal.flash && (
                <span
                  className="rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide"
                  style={{
                    backgroundColor: "rgba(255,90,54,0.14)",
                    color: "#FF5A36",
                  }}
                >
                  ⚡ FLASH
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
