import { ValueObject } from '~/shared/domain';
import { Match } from './Match';
import { MatchSeries } from './MatchSeries';

interface GroupedMatchesProps {
  matches: Match[];
}

export class GroupedMatches extends ValueObject<GroupedMatchesProps> {
  public readonly matches = new Map<MatchSeries, Match[]>();

  public constructor(props: GroupedMatchesProps) {
    super(props);

    props.matches.forEach(match => {
      if (match.series) {
        const matches = this.matches.get(match.series) ?? [];
        matches.push(match);

        this.matches.set(match.series, matches);
      }
    });
  }
}
