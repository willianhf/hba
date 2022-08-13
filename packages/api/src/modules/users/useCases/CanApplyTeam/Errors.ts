import { ApplicationError } from '~/shared/core';

export class MissingAcceptedPlayerError extends ApplicationError {
  constructor() {
    super('MISSING_ACCEPTED_PLAYER_ERROR', 'Missing accepted player', 'Você não possui um jogador inscrito para essa temporada');
  }
}

export class AlreadyInTeamRosterError extends ApplicationError {
  constructor() {
    super('ALREADY_IN_TEAM_ROSTER_ERROR', 'Already in a team roster', 'Você já possui um time para essa temporada');
  }
}
