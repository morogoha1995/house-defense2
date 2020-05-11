export type ShootableName = "stone" | "arrow" | "rifle"

export type ExplosiveName = "rocket"

export type ExtensiveName = "flame"

export type WeaponName = ShootableName | ExplosiveName | ExtensiveName

export type BulletConfig = {
  atk: number
  speed: number
}
