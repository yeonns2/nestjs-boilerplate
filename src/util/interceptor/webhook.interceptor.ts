import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { IncomingWebhook } from '@slack/client';
import * as Sentry from '@sentry/minimal';
import { slackConfig } from 'src/config/slack.config';

@Injectable()
export class WebhookInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler) /** : Observable<any>*/ {
    return next.handle().pipe(
      catchError((error) => {
        Sentry.captureException(error);
        const webhook = new IncomingWebhook(slackConfig.webhook);
        webhook.send({
          attachments: [
            {
              color: 'danger',
              text: '🚨test-api-server 버그 발생🚨',
              fields: [
                {
                  title: `Request Message: ${error.message}`,
                  value: error.stack,
                  short: false,
                },
              ],
              ts: Math.floor(new Date().getTime() / 1000).toString(),
            },
          ],
        });
        return null;
      }),
    );
  }
}
