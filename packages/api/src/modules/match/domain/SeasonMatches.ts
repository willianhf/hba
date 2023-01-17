import { stripIndent } from 'common-tags';
import { Conference } from '~/modules/team/domain';
import { ValueObject } from '~/shared/domain';
import { Match } from './Match';
import { MatchKind } from './MatchKind';

interface SeasonMatchesProps {
  remainingMatches: Match[];
}

export class SeasonMatches extends ValueObject<SeasonMatchesProps> {
  get remaining(): Match[] {
    return this.props.remainingMatches;
  }

  get regular(): Match[] {
    return this.remaining.filter(match => match.kind === MatchKind.REGULAR);
  }

  get sameConference(): Match[] {
    return this.regular.filter(match => match.homeTeam.nbaTeam.conference === match.awayTeam.nbaTeam.conference);
  }

  get betweenConferences(): Match[] {
    return this.regular.filter(match => match.homeTeam.nbaTeam.conference !== match.awayTeam.nbaTeam.conference);
  }

  get east(): Match[] {
    return this.sameConference.filter(match => match.homeTeam.nbaTeam.conference === Conference.EAST);
  }

  get west(): Match[] {
    return this.sameConference.filter(match => match.homeTeam.nbaTeam.conference === Conference.WEST);
  }

  public getTable(): string {
    return stripIndent(`
      \`\`\`JOGOS RESTANTES\`\`\`
      \`\`\`ts
      EASTERN CONFERENCE\`\`\`
      ${this.east.map(match => match.toTableRow())}
      
      \`\`\`prolog
      WESTERN CONFERENCE\`\`\`
      ${this.west.map(match => match.toTableRow())}
      
      \`\`\`BETWEEN CONFERENCES\`\`\`
      ${this.betweenConferences.map(match => match.toTableRow())}
    `);
  }
}
