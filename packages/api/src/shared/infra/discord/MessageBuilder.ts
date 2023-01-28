import { codeBlock, inlineCode, InteractionReplyOptions } from 'discord.js';

const MESSAGE_KIND = {
  SUCCESS: '✅',
  ERROR: '❌'
} as const;

type MessageKind = keyof typeof MESSAGE_KIND;

export class MessageBuilder {
  private parts: string[] = [];
  private ephemeral: boolean = true;

  constructor(content?: string) {
    if (content) {
      this.parts.push(content);
    }
  }

  public append(content: string): this {
    this.parts.push(content);

    return this;
  }

  public codeBlock(content: string | string[], language: string = ''): this {
    if (Array.isArray(content)) {
      const block = content.join('\n');
      this.append(codeBlock(language, block));
    } else {
      this.append(codeBlock(language, content));
    }

    return this;
  }

  public inlineCode(content: string): this {
    this.append(inlineCode(content));

    return this;
  }

  public kind(k: MessageKind): this {
    this.parts.unshift(`${MESSAGE_KIND[k]} `);

    return this;
  }

  public visible(): this {
    this.ephemeral = false;

    return this;
  }

  public newLine(): this {
    return this.append('\n');
  }

  public build(): InteractionReplyOptions & { content: string } {
    return {
      content: this.parts.join(''),
      ephemeral: this.ephemeral
    };
  }
}
