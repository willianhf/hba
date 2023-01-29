import { Entity, UniqueIdentifier } from '~/shared/domain';

interface PositionProps {
  name: string;
}

const IMAGES: Record<string, string> = {
  PG: 'https://cdn.discordapp.com/attachments/1055959433362014258/1055959624064454756/pointguard.png',
  SG: 'https://media.discordapp.net/attachments/1055959433362014258/1055959698098102323/shootingguard.png',
  SF: 'https://media.discordapp.net/attachments/1055959433362014258/1055959750426251334/smallforward.png',
  PF: 'https://media.discordapp.net/attachments/1055959433362014258/1055959798950133800/powerforward.png',
  C: 'https://media.discordapp.net/attachments/1055959433362014258/1055959877689815133/center.png'
};

export class Position extends Entity<PositionProps> {
  public constructor(props: PositionProps, id?: UniqueIdentifier) {
    super(props, id ?? new UniqueIdentifier());
  }

  public get name(): string {
    return this.props.name;
  }

  public get image(): string {
    return IMAGES[this.id.toValue()];
  }
}
