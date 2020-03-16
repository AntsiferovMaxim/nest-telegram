import { Injectable, Inject } from '@nestjs/common'
const Telegram = require('telegraf/telegram')

import { TokenInjectionToken } from './TokenInjectionToken'
import { TelegramModuleOptionsFactory } from './TelegramModuleOptionsFactory'

@Injectable()
export class TelegramClient {
  private telegram: any

  public constructor(
    @Inject(TokenInjectionToken) factory: TelegramModuleOptionsFactory,
  ) {
    const { token } = factory.createOptions()

    this.telegram = new Telegram(token)
  }

  public async sendMessage(
    chatId: string | number,
    text: string,
  ): Promise<void> {
    await this.telegram.sendMessage(chatId, text)
  }

  public async sendMarkdown(
    chatId: string | number,
    markdown: string,
  ): Promise<void> {
    await this.telegram.sendMessage(chatId, markdown, {
      parse_mode: 'Markdown',
    })
  }
  
  public async getChat(
    chatId: string | number,
  ): Promise<any> {
    return await this.telegram.getChat(chatId)
  }
}
