import type { Town } from "@/lib/towns";

export function TransitCard({ town }: { town: Town }) {
  const { transport, connectivity, healthcare } = town;

  return (
    <div className="card p-5 md:p-6">
      <p className="eyebrow">Access &amp; connectivity</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--foreground)]">✈️ Getting here</p>
          <div className="space-y-1.5 text-xs leading-5 text-[var(--muted)]">
            <p><span className="font-medium text-[var(--foreground)]">Airport:</span> {transport.nearestAirport} ({transport.airportDistanceKm} km)</p>
            <p><span className="font-medium text-[var(--foreground)]">Railway:</span> {transport.nearestRailway}</p>
            <p><span className="font-medium text-[var(--foreground)]">Delhi drive:</span> {transport.delhiDriveKm} km, {transport.delhiDriveHours[0]}–{transport.delhiDriveHours[1]} hrs</p>
            {transport.volvoFare && (
              <p><span className="font-medium text-[var(--foreground)]">Volvo bus:</span> ₹{transport.volvoFare[0].toLocaleString("en-IN")}–₹{transport.volvoFare[1].toLocaleString("en-IN")}</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--foreground)]">📶 Internet</p>
          <div className="space-y-1.5 text-xs leading-5 text-[var(--muted)]">
            <p><span className="font-medium text-[var(--foreground)]">ISPs:</span> {connectivity.isps.join(", ")}</p>
            <p><span className="font-medium text-[var(--foreground)]">Speeds:</span> {connectivity.typicalSpeeds}</p>
            <p>{connectivity.reliabilityNote}</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--foreground)]">🏥 Healthcare</p>
          <div className="space-y-1.5 text-xs leading-5 text-[var(--muted)]">
            <p><span className="font-medium text-[var(--foreground)]">Nearest ICU:</span> {healthcare.nearestICU}</p>
            <p><span className="font-medium text-[var(--foreground)]">Location:</span> {healthcare.icuLocation} ({healthcare.driveTimeMinutes[0]}–{healthcare.driveTimeMinutes[1]} min)</p>
            <p>{healthcare.notes}</p>
          </div>
        </div>
      </div>

      {town.schools && (
        <div className="mt-5 rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.4)] p-4">
          <p className="text-sm font-semibold text-[var(--foreground)]">🎓 Schools within 15 km</p>
          <div className="mt-2 space-y-1 text-xs leading-5 text-[var(--muted)]">
            <p><span className="font-medium text-[var(--foreground)]">Boards:</span> {town.schools.boards.join(", ")} &middot; {town.schools.format}</p>
            <p>{town.schools.notable.join(" · ")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
