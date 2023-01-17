import { oneLineTrim } from 'common-tags';
import { Match, MatchResult } from '~/modules/match/domain';
import { Team } from '~/modules/team/domain';
import { ValueObject } from '~/shared/domain';

interface TeamStandingsProps {
  team: Team;
  results: MatchResult[];
}

export class TeamStandings extends ValueObject<TeamStandingsProps> {
  get team(): Team {
    return this.props.team;
  }

  get results(): MatchResult[] {
    return this.props.results;
  }

  private isWinner(result: MatchResult): boolean {
    const winner = result.homeScore > result.awayScore ? result.match.homeTeam : result.match.awayTeam;
    return winner.equals(this.team);
  }

  private isBetweenConferences(match: Match): boolean {
    return match.homeTeam.nbaTeam.conference === match.awayTeam.nbaTeam.conference;
  }

  private formatWinPercent(number: number): string {
    if (isNaN(number)) {
      return '.000';
    }

    const characters = number.toFixed(3).split('');

    if (characters.at(0) === '1') {
      characters.pop();
    } else {
      characters.shift();
    }

    return characters.join('');
  }

  get wins(): number {
    return this.props.results.filter(this.isWinner).reduce(acc => acc + 1, 0);
  }

  get losses(): number {
    return this.props.results.filter(result => !this.isWinner(result)).reduce(acc => acc + 1, 0);
  }

  get games(): number {
    return this.wins + this.losses;
  }

  get conferenceWins(): number {
    return this.props.results
      .filter(result => this.isBetweenConferences(result.match))
      .filter(this.isWinner)
      .reduce(acc => acc + 1, 0);
  }

  get conferenceLosses(): number {
    return this.props.results
      .filter(result => this.isBetweenConferences(result.match))
      .filter(result => !this.isWinner(result))
      .reduce(acc => acc + 1, 0);
  }

  get lastThree(): string {
    return this.props.results
      .slice(-3)
      .map(result => (this.isWinner(result) ? 'W' : 'L'))
      .join()
      .padEnd(3, '-');
  }

  get winPercentage(): string {
    return this.formatWinPercent(this.wins / this.games);
  }

  get clinchedPlayoffs(): boolean {
    return this.wins > 4;
  }

  public toTableRow(index: number): string {
    const position = index + 1;
    const teamName = this.team.nbaTeam.name.padEnd(23, ' ');

    return oneLineTrim(`
      | ${position} 
      | ${teamName} 
      | ${this.games}  
      | ${this.wins}  
      | ${this.losses}  
      | ${this.conferenceWins}-${this.conferenceLosses}  
      | ${this.winPercentage} 
      |  ${this.lastThree}    
      | ${this.clinchedPlayoffs ? 'P' : ' '} |
    `);
  }
}
