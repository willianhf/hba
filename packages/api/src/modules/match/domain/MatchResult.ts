import { stripIndent } from 'common-tags';
import { Actor } from '~/modules/auth/domain';
import { Player } from '~/modules/player/domain';
import { Team } from '~/modules/team/domain';
import { AggregateRoot, UniqueIdentifier } from '~/shared/domain';
import { Match } from './Match';

export class MatchResultId extends UniqueIdentifier {}

interface MatchResultProps {
  match: Match;
  homeScore: number;
  awayScore: number;
  isWalkover?: boolean;
  releasedAt: Date;
  playerOfTheMatch: Player;
  referee: Actor;
  scorer: Actor;
  recorder?: Actor;
  videoReferee?: Actor;
  statsKeeper?: Actor;
}

export class MatchResult extends AggregateRoot<MatchResultProps, MatchResultId> {
  public constructor(props: MatchResultProps, id?: MatchResultId) {
    super({ ...props, isWalkover: props.isWalkover ?? false }, id ?? new MatchResultId());
  }

  get match(): Match {
    return this.props.match;
  }

  get homeScore(): number {
    return this.props.homeScore;
  }

  get awayScore(): number {
    return this.props.awayScore;
  }

  get isWalkover(): boolean {
    return this.props.isWalkover!;
  }

  get releseadAt(): Date {
    return this.props.releasedAt;
  }

  get playerOfTheMatch(): Player {
    return this.props.playerOfTheMatch;
  }

  get referee(): Actor {
    return this.props.referee;
  }

  get scorer(): Actor {
    return this.props.scorer;
  }

  get videoReferee(): Actor | undefined {
    return this.props.videoReferee;
  }

  get recorder(): Actor | undefined {
    return this.props.recorder;
  }

  get statsKeeper(): Actor | undefined {
    return this.props.statsKeeper;
  }

  get winner(): Team {
    return this.homeScore > this.awayScore ? this.match.homeTeam : this.match.awayTeam;
  }

  get loser(): Team {
    return this.homeScore > this.awayScore ? this.match.awayTeam : this.match.homeTeam;
  }

  public toDiscordMessage(): string {
    return stripIndent(`
      ${this.match.series ? `${this.match.seriesName}\n` : ''}
      ${this.match.awayTeam.nbaTeam.emoji} ${this.match.awayTeam.nbaTeam.name} ${this.awayScore} @ ${this.homeScore} ${
      this.match.homeTeam.nbaTeam.name
    } ${this.match.homeTeam.nbaTeam.emoji}

      🔥 ⛹️  Cole.Wolforg Player of the Game: ${this.playerOfTheMatch.actor.habboUsername} 
      Árbitro: ${this.referee.habboUsername}
      Placar: ${this.scorer.habboUsername}
      ${this.recorder ? `Recorder: ${this.recorder.habboUsername}` : ''}
      ${this.videoReferee ? `VAR: ${this.videoReferee.habboUsername}` : ''}
    `);
  }
}
