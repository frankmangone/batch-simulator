type TemperatureUnits = ["K", "R", "°C", "°F"]
type TimeUnits = ["ms", "s", "min", "h"]
type MassUnits = ["mg", "g", "kg", "lb"]
type MolarUnits = ["mol", "kmol", "lbmol"]
type VolumeUnits = ["L", "m3", "cm3"]
type EnergyUnits = ["cal", "kcal", "J", "kJ"]

type TemperatureUnit = TemperatureUnits[number]
type TimeUnit = TimeUnits[number]
type MassUnit = MassUnits[number]
type MolarUnit = MolarUnits[number]
type VolumeUnit = VolumeUnits[number]
type EnergyUnit = EnergyUnits[number]

type Factors = {
  temperature: Record<TemperatureUnit, number>
  time: Record<TimeUnit, number>
  mass: Record<MassUnit, number>
  molar: Record<MolarUnit, number>
  volume: Record<VolumeUnit, number>
  energy: Record<EnergyUnit, number>
}
