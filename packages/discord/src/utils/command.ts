import { GuildMember, PermissionsBitField } from "discord.js";

export function canExecute(member: GuildMember, roleId: string): boolean {
  return member.roles.cache.has(roleId) || member.permissions.has(PermissionsBitField.Flags.Administrator);
}
