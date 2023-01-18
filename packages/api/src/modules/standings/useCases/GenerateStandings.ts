import { MatchResultRepository } from '~/modules/match/repos';
import { Season } from '~/modules/season/domain';
import { ApprovalStatus } from '~/modules/team/domain';
import { TeamRepository } from '~/modules/team/repos';
import { IUseCase } from '~/shared/core';
import { Standings, TeamStandings } from '../domain';

interface GenerateStandingsDTO {
  season: Season;
}

type GenerateStandingsResult = Standings;

export class GenerateStandingsUseCase implements IUseCase<GenerateStandingsDTO, GenerateStandingsResult> {
  public constructor(
    private readonly teamRepository: TeamRepository,
    private readonly matchResultRepository: MatchResultRepository
  ) {}

  public async execute(dto: GenerateStandingsDTO): Promise<GenerateStandingsResult> {
    const teams = await this.teamRepository.findByStatus(dto.season.id, ApprovalStatus.ACCEPTED);
    const results = await this.matchResultRepository.findBySeason(dto.season.id);

    const standings = new Standings({ teamsStandings: [] });

    const teamsStandings = teams.map(team => {
      const teamResults = results.filter(
        result => result.match.homeTeam.equals(team) || result.match.awayTeam.equals(team)
      );
      return new TeamStandings({ team, results: teamResults, standings });
    });

    standings.setTeamStandings(teamsStandings);

    return standings;
  }
}
