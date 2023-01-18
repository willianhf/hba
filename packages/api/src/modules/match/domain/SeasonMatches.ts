import { stripIndents } from 'common-tags';
import { DiscordEmojiFacade } from '~/modules/discord/facades';
import { Conference } from '~/modules/team/domain';
import { Helpers } from '~/shared/core';
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

  get playoffs(): Record<string, Match[]> {
    return Helpers.groupBy(
      this.remaining.filter(match => match.kind === MatchKind.PLAYOFF),
      match => match.toPlayoffsHeader()
    );
  }

  get finals(): Match[] {
    return this.remaining.filter(match => match.kind === MatchKind.FINAL);
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

  public getRegularSeason(): string | null {
    if (this.regular.length === 0) {
      return null;
    }

    return stripIndents(`
      \`\`\`JOGOS RESTANTES\`\`\`
      \`\`\`ts
      EASTERN CONFERENCE\`\`\`
      ${this.east.map(match => match.toStandings()).join('\n')}
      
      \`\`\`prolog
      WESTERN CONFERENCE\`\`\`
      ${this.west.map(match => match.toStandings()).join('\n')}
      
      \`\`\`BETWEEN CONFERENCES\`\`\`
      ${this.betweenConferences.map(match => match.toStandings()).join('\n')}
    `);
  }

  public getPlayoffsBracket(): string | null {
    const playoffs = Object.entries(this.playoffs);
    if (playoffs.length === 0 && this.finals.length === 0) {
      return null;
    }

    return stripIndents(`
      \`\`\`fix
      PLAYOFFS BRACKET\`\`\`
      ${playoffs
        .map(([header, matches]) => `${header}\n${matches.map(match => match.toStandings()).join('\n')}`)
        .join('\n')}
      
      \`\`\`prolog
      ${DiscordEmojiFacade.getEmojiByName('trofeu')} THE FINALS\`\`\` 
      ${this.finals.map(match => match.toStandings()).join('\n')}
    `);
  }
}
