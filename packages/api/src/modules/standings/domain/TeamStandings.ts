import { oneLineTrim } from 'common-tags';
import { Match, MatchKind, MatchResult } from '~/modules/match/domain';
import { Conference, Team } from '~/modules/team/domain';
import { ValueObject } from '~/shared/domain';
import { Standings } from './Standings';

interface TeamStandingsProps {
  team: Team;
  results: MatchResult[];
  standings: Standings;
}

const REGULAR_GAMES_AMOUNT = 5;

export class TeamStandings extends ValueObject<TeamStandingsProps> {
  public constructor(props: TeamStandingsProps) {
    super(props);
  }

  get results(): MatchResult[] {
    return this.props.results
      .filter(result => result.match.homeTeam.equals(this.team) || result.match.awayTeam.equals(this.team))
      .filter(result => result.match.kind === MatchKind.REGULAR);
  }

  get team(): Team {
    return this.props.team;
  }

  get standings(): TeamStandings[] {
    return this.team.nbaTeam.conference === Conference.EAST ? this.props.standings.east : this.props.standings.west;
  }

  get opponents(): TeamStandings[] {
    return this.standings.filter(standing => !standing.team.equals(this.team));
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

  public isWinner(result: MatchResult): boolean {
    return result.winner.equals(this.team);
  }

  get wins(): number {
    return this.results.filter(result => this.isWinner(result)).reduce(acc => acc + 1, 0);
  }

  get losses(): number {
    return this.results.filter(result => !this.isWinner(result)).reduce(acc => acc + 1, 0);
  }

  get games(): number {
    return this.wins + this.losses;
  }

  get conferenceWins(): number {
    return this.results
      .filter(result => this.isBetweenConferences(result.match))
      .filter(result => this.isWinner(result))
      .reduce(acc => acc + 1, 0);
  }

  get conferenceLosses(): number {
    return this.results
      .filter(result => this.isBetweenConferences(result.match))
      .filter(result => !this.isWinner(result))
      .reduce(acc => acc + 1, 0);
  }

  get lastThree(): string {
    const orderedResults = [...this.results].sort((a, b) => b.releseadAt.getTime() - a.releseadAt.getTime());

    return orderedResults
      .slice(-3)
      .map(result => (this.isWinner(result) ? 'W' : 'L'))
      .join('')
      .padEnd(3, '-');
  }

  get winPercentage(): number {
    return this.wins / this.games;
  }

  get position(): number {
    return this.standings.findIndex(standing => standing.team.equals(this.team)) + 1;
  }

  get isLeader(): boolean {
    return this.position === 1;
  }

  get isLast(): boolean {
    return this.position === this.standings.length;
  }

  get clinchedPlayoffs(): boolean {
    if (this.games < REGULAR_GAMES_AMOUNT) {
      if (!this.canClinchPlayoffs) {
        return false;
      }

      return false;
    }

    return !this.isLast;
  }

  get canClinchPlayoffs(): boolean {
    return this.opponents
      .filter(opponent => opponent.position < this.position)
      .reduce((acc, opponent) => {
        if (acc) {
          return acc;
        }

        return (
          // a = opponent | b = this
          // (G + 1) - Wa - Lb
          REGULAR_GAMES_AMOUNT + 1 - opponent.wins - this.losses > 0 ||
          // (CG + 1) - CWa - CLb
          this.standings.length - opponent.conferenceWins - this.conferenceLosses > 0
        );
      }, false);
  }

  public wonAgainst(opponent: Team): 0 | 1 | -1 {
    const result = this.opponents
      .filter(o => opponent.equals(o.team))
      .flatMap(standings => standings.results)
      .find(standings => standings.match.homeTeam.equals(this.team) || standings.match.awayTeam.equals(this.team));

    if (!result) {
      return 0;
    }

    return result.loser.equals(opponent) ? 1 : -1;
  }

  public toTableRow(): string {
    const teamName = this.team.nbaTeam.name.padEnd(23, ' ');

    return oneLineTrim(`
      | ${this.position} 
      | ${teamName} 
      | ${this.games}  
      | ${this.wins}  
      | ${this.losses}  
      | ${this.conferenceWins}-${this.conferenceLosses}  
      | ${this.formatWinPercent(this.winPercentage)} 
      |  ${this.lastThree}    
      | ${this.clinchedPlayoffs ? 'P' : ' '} |
    `);
  }
}
