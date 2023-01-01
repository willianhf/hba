import { PermissionGuard } from "@discordx/utilities";
import { CommandInteraction } from "discord.js";
import { Discord, Guard, Slash, SlashGroup } from "discordx";
import { upsertStandings } from "../actions/standings.js";

@Discord()
@Guard(PermissionGuard(["Administrator"]))
@SlashGroup({
  name: "standings",
  description: "Controla a tabela da temporada",
})
export class StandingsCommands {
  @Slash({ description: "Gera a tabela de classificação" })
  @SlashGroup("standings")
  async generate(interaction: CommandInteraction): Promise<void> {
    interaction.reply({ content: "✅ Tabela de classificação gerada com sucesso", ephemeral: true });
    upsertStandings();
  }
}
