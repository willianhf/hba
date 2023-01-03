import { isToday, isValid, parse } from "date-fns";
// @ts-ignore
import { utcToZonedTime } from "date-fns-tz/esm";
import { ApplicationCommandOptionType, CommandInteraction, GuildMember } from "discord.js";
import { Discord, Slash, SlashChoice, SlashGroup, SlashOption } from "discordx";
import { announceScheduledGames } from "../actions/schedule.js";
import { isGameScheduled, removeScheduledGame, saveScheduleGame } from "../services/schedule.js";
import { seasonTeams } from "../services/teams.js";
import { canExecute } from "../utils/command.js";
import { CAPTAIN_ROLE_ID, isPortuguese, MOD_ROLE_ID } from "../utils/roles.js";

const teamsChoice = seasonTeams.map(team => team.name);

@Discord()
@SlashGroup({
  name: "schedule",
  description: "Gerencia o agendamento de jogos para a temporada",
})
export class ResultsCommands {
  @Slash({ description: "Agenda um jogo para a temporada" })
  @SlashGroup("schedule")
  async add(
    @SlashChoice(...teamsChoice)
    @SlashOption({
      description: "Equipe casa",
      name: "home_team",
      required: true,
      type: ApplicationCommandOptionType.String
    }) homeTeamName: string,
    @SlashChoice(...teamsChoice)
    @SlashOption({
      description: "Equipe fora",
      name: "away_team",
      required: true,
      type: ApplicationCommandOptionType.String
    }) awayTeamName: string,
    @SlashOption({
      description: "Data do jogo (ex: 04/01/2023)",
      name: "date",
      required: true,
      type: ApplicationCommandOptionType.String
    }) date: string,
    @SlashOption({
      description: "Horário do jogo (ex: 20:30)",
      name: "time",
      required: true,
      type: ApplicationCommandOptionType.String
    }) time: string,
    interaction: CommandInteraction,
  ): Promise<void> {
    if (!canExecute(interaction.member as GuildMember, [MOD_ROLE_ID, CAPTAIN_ROLE_ID])) {
      interaction.reply({ content: "Você não possui permissão para executar esse comando", ephemeral: true });
      return;
    }

    const homeTeam = seasonTeams.find(team => team.name === homeTeamName);
    if (!homeTeam) {
      interaction.reply({ content: "Time da casa inválido", ephemeral: true });
      return;
    }

    const awayTeam = seasonTeams.find(team => team.name === awayTeamName);
    if (!awayTeam) {
      interaction.reply({ content: "Time de fora inválido", ephemeral: true });
      return;
    }

    if (homeTeam.name === awayTeam.name) {
      interaction.reply({ content: "Os times não podem ser os mesmos", ephemeral: true });
      return;
    }

    let dateTime = parse(`${date} ${time}`, "dd/MM/yyyy HH:mm", new Date());
    if (!isValid(dateTime)) {
      interaction.reply({ content: "A data ou horário informado é inválido", ephemeral: true });
      return;
    }

    const scheduledGame = await isGameScheduled(homeTeam, awayTeam);
    if (scheduledGame) {
      interaction.reply({ content: "Esse jogo já está agendado", ephemeral: true });
      return;
    }

    if (!isPortuguese(interaction.member as GuildMember)) {
      dateTime = utcToZonedTime(dateTime, "America/Sao_Paulo");  
    }

    await saveScheduleGame({
      home: homeTeam,
      away: awayTeam,
      dateTime: dateTime.toISOString()
    });

    if (isToday(dateTime)) {
      await announceScheduledGames();
    }

    console.log("✅ Game scheduled successfully");
    interaction.reply({ content: "✅ Jogo agendado com sucesso", ephemeral: true });
  }

  @Slash({ description: "Remove agendamento de um jogo para a temporada" })
  @SlashGroup("schedule")
  async remove(
    @SlashChoice(...teamsChoice)
    @SlashOption({
      description: "Equipe casa",
      name: "home_team",
      required: true,
      type: ApplicationCommandOptionType.String
    }) homeTeamName: string,
    @SlashChoice(...teamsChoice)
    @SlashOption({
      description: "Equipe fora",
      name: "away_team",
      required: true,
      type: ApplicationCommandOptionType.String
    }) awayTeamName: string,
    interaction: CommandInteraction,
  ): Promise<void> {
    if (!canExecute(interaction.member as GuildMember, [MOD_ROLE_ID, CAPTAIN_ROLE_ID])) {
      interaction.reply({ content: "Você não possui permissão para executar esse comando", ephemeral: true });
      return;
    }

    const homeTeam = seasonTeams.find(team => team.name === homeTeamName);
    if (!homeTeam) {
      interaction.reply({ content: "Time da casa inválido", ephemeral: true });
      return;
    }

    const awayTeam = seasonTeams.find(team => team.name === awayTeamName);
    if (!awayTeam) {
      interaction.reply({ content: "Time de fora inválido", ephemeral: true });
      return;
    }

    if (homeTeam.name === awayTeam.name) {
      interaction.reply({ content: "Os times não podem ser os mesmos", ephemeral: true });
      return;
    }

    const scheduledGame = await isGameScheduled(homeTeam, awayTeam);
    if (!scheduledGame) {
      interaction.reply({ content: "Esse jogo não está agendado", ephemeral: true });
      return;
    }

    await removeScheduledGame(homeTeam, awayTeam);

    if (isToday(new Date(scheduledGame.dateTime))) {
      await announceScheduledGames();
    }

    console.log("✅ Removed scheduled game successfully");
    interaction.reply({ content: "✅ Removido o jogo agendado com sucesso", ephemeral: true });
  }

  @Slash({ description: "Publica os jogos agendados do dia" })
  @SlashGroup("schedule")
  async publish(
    interaction: CommandInteraction,
  ): Promise<void> {
    if (!canExecute(interaction.member as GuildMember, [MOD_ROLE_ID, CAPTAIN_ROLE_ID])) {
      interaction.reply({ content: "Você não possui permissão para executar esse comando", ephemeral: true });
      return;
    }

    await announceScheduledGames();
    interaction.reply({ content: "✅ Publica os jogos agendados do dia", ephemeral: true });
  }
}


