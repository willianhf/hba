import { GuildMember, PermissionsBitField } from "discord.js";

export function canExecute(member: GuildMember, roleIds: string[]): boolean {
  return member.roles.cache.hasAny(...roleIds) || member.permissions.has(PermissionsBitField.Flags.Administrator);
}
