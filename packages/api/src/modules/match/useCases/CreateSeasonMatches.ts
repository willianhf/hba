import { SeasonRepository } from '~/modules/season/repos';
import { ApprovalStatus } from '~/modules/team/domain';
import { TeamRepository } from '~/modules/team/repos';
import { IUseCase } from '~/shared/core';
import { Match, MatchKind } from '../domain';
import { MatchRepository } from '../repos';

type CreateSeasonMatchesDTO = undefined;

type CreateSeasonMatchesResult = Match[];

export class CreateSeasonMatchesUseCase implements IUseCase<CreateSeasonMatchesDTO, CreateSeasonMatchesResult> {
  public constructor(
    private readonly seasonRepository: SeasonRepository,
    private readonly teamRepository: TeamRepository,
    private readonly matchRepository: MatchRepository
  ) {}

  public async execute(): Promise<CreateSeasonMatchesResult> {
    const currentSeason = await this.seasonRepository.findCurrent();
    const seasonMatches = await this.matchRepository.findBySeason(currentSeason.id);
    if (seasonMatches.length > 0) {
      return seasonMatches;
    }

    const teams = await this.teamRepository.findByStatus(currentSeason.id, ApprovalStatus.ACCEPTED);
    const matches = teams.reduce((acc, team) => {
      const opponents = teams
        .filter(opponent => opponent.nbaTeam.conference === team.nbaTeam.conference)
        .filter(opponent => !opponent.id.equals(team.id))
        .filter(opponent => !acc.some(match => match.homeTeam.equals(opponent)));

      const teamMatches = opponents.map(
        opponent =>
          new Match({
            homeTeam: team,
            awayTeam: opponent,
            matchKind: MatchKind.REGULAR,
            seasonId: currentSeason.id
          })
      );

      acc.push(...teamMatches);

      return acc;
    }, [] as Match[]);

    await this.matchRepository.createMany(matches);

    return matches;
  }
}
