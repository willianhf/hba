import { PermissionGuard } from "@discordx/utilities";
import { ApplicationCommandOptionType, CommandInteraction, User } from "discord.js";
import { Discord, Guard, Slash, SlashChoice, SlashGroup, SlashOption } from "discordx";
import { onSendResult } from "../actions/result.js";
import { bot } from "../main.js";
import { teams } from "../services/teams.js";

const teamsChoice = teams.map(team => team.name);

@Discord()
@Guard(PermissionGuard(["Administrator"]))
@SlashGroup({
  name: "results",
  description: "Gerencia os resultados da temporada",
})
export class ResultsCommands {
  @Slash({ description: "Adiciona um novo resultado" })
  @SlashGroup("results")
  add(
    @SlashChoice(...teamsChoice)
    @SlashOption({
      description: "Equipe casa",
      name: "home_team",
      required: true,
      type: ApplicationCommandOptionType.String,
    }) homeTeamName: string,
    @SlashOption({
      description: "Pontos equipe casa",
      name: "home_team_score",
      required: true,
      type: ApplicationCommandOptionType.Number,
    }) homeTeamScore: number,
    @SlashChoice(...teamsChoice)
    @SlashOption({
      description: "Equipe fora",
      name: "away_team",
      required: true,
      type: ApplicationCommandOptionType.String,
    }) awayTeamName: string,
    @SlashOption({
      description: "Pontos equipe fora",
      name: "away_team_score",
      required: true,
      type: ApplicationCommandOptionType.Number,
    }) awayTeamScore: number,
    @SlashOption({
      description: "POTG",
      name: "potg",
      required: true,
      type: ApplicationCommandOptionType.User,
    }) potg: User,
    @SlashOption({
      description: "Árbitro",
      name: "ref",
      required: true,
      type: ApplicationCommandOptionType.User,
    }) ref: User,
    @SlashOption({
      description: "Placar",
      name: "scorer",
      required: true,
      type: ApplicationCommandOptionType.User,
    }) scorer: User,
    @SlashOption({
      description: "Recorder",
      name: "recorder",
      type: ApplicationCommandOptionType.User,
    }) recorder: User,
    @SlashOption({
      description: "VAR",
      name: "var",
      type: ApplicationCommandOptionType.User,
    }) video: User,
    interaction: CommandInteraction,
  ): void {
    const homeTeam = teams.find(team => team.name === homeTeamName);
    if (!homeTeam) {
      interaction.reply("Time da casa inválido");
      return;
    }

    const awayTeam = teams.find(team => team.name === awayTeamName);
    if (!awayTeam) {
      interaction.reply("Time de fora inválido");
      return;
    }

    if (homeTeam.name === awayTeam.name) {
      interaction.reply("Os times não podem ser os mesmos");
      return;
    }

    if (homeTeamScore == awayTeamScore) {
      interaction.reply("A partida deve ter algum vencedor");
      return;
    }

    onSendResult({
      homeTeam,
      homeTeamScore,
      awayTeam,
      awayTeamScore,
    });

    console.log("✅ Result stored successfully");

    interaction.reply(`
${bot.emojis.cache.find(emoji => emoji.name === awayTeam.emoji) ?? ''} ${awayTeam.name} ${awayTeamScore} @ ${homeTeamScore} ${homeTeam.name} ${bot.emojis.cache.find(emoji => emoji.name === homeTeam.emoji) ?? ''}

🔥 ⛹️  Cole.Wolforg Player of the Game: ${potg.toString()} 
Árbitro: ${ref.toString()}
Placar: ${scorer.toString()}
${recorder ? `Recorder: ${recorder.toString()}` : ''}
${video ? `VAR: ${video.toString()}` : ''}
`);
  }
}

