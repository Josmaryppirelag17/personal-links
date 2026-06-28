import { Resend } from 'resend';
import { getErrorMessage } from '@/utils/errors';
import { escapeHtml } from '@/utils/escape';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  fax?: string;
  website?: string;
  formTimestamp: number;
}

export interface ContactResult {
  email: boolean;
  telegram: boolean;
  warnings: string[];
}

async function sendEmail(
  name: string,
  email: string,
  message: string,
  errorLog: string[],
): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    errorLog.push('EMAIL_ERR: RESEND_API_KEY not configured');
    return false;
  }

  try {
    const resend = new Resend(resendApiKey);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replaceAll('\n', '<br>');

    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'Josmary Pirela <hola@josmarypirela.dev>',
      to: process.env.EMAIL_TO ?? 'josmaryppirelag17@gmail.com',
      subject: `Nuevo mensaje de contacto de ${safeName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #111232; border-radius: 8px;">
          <h2 style="color: #FD1EB1; border-bottom: 2px solid #18BEC7; padding-bottom: 8px;">Mensaje de Contacto (Linktree Personal)</h2>
          <p><strong>Nombre:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="background-color: #111232; color: #DBEAEC; padding: 15px; border-radius: 6px; border-left: 4px solid #18BEC7; font-family: monospace;">
            ${safeMessage}
          </div>
          <p style="font-size: 11px; color: #888; margin-top: 20px;">Este correo fue generado automáticamente desde tu linktree en linktree.josmarypirela.dev</p>
        </div>
      `,
    });

    if (emailResult.error) {
      throw new Error(emailResult.error.message);
    }
    return true;
  } catch (err) {
    const msg = getErrorMessage(err, String(err));
    errorLog.push(`EMAIL_ERR: ${msg}`);
    return false;
  }
}

async function sendTelegram(
  name: string,
  email: string,
  message: string,
  errorLog: string[],
): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    errorLog.push('TELEGRAM_ERR: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured');
    return false;
  }

  try {
    const escapeMarkdown = (text: string) =>
      text
        .replaceAll('_', '\\_')
        .replaceAll('*', '\\*')
        .replaceAll('[', '\\[')
        .replaceAll(']', '\\]')
        .replaceAll('(', '\\(')
        .replaceAll(')', '\\)')
        .replaceAll('~', '\\~')
        .replaceAll('`', '\\`')
        .replaceAll('>', '\\>')
        .replaceAll('#', '\\#')
        .replaceAll('+', '\\+')
        .replaceAll('=', '\\=')
        .replaceAll('|', '\\|')
        .replaceAll('{', '\\{')
        .replaceAll('}', '\\}')
        .replaceAll('.', '\\.')
        .replaceAll('!', '\\!')
        .replaceAll('-', '\\-');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10_000);

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text:
            `*Nuevo mensaje de contacto en linktree\\.josmarypirela\\.dev*\n\n` +
            `*Nombre:* ${escapeMarkdown(name)}\n` +
            `*Email:* ${escapeMarkdown(email)}\n\n` +
            `*Mensaje:*\n` +
            `> ${escapeMarkdown(message)}`,
          parse_mode: 'MarkdownV2',
        }),
        signal: controller.signal,
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const tgErrData = (await response.json()) as { description?: string };
      throw new Error(tgErrData.description || 'Telegram API error');
    }
    return true;
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      errorLog.push('TELEGRAM_ERR: Request timed out after 10s');
    } else {
      const msg = getErrorMessage(err, String(err));
      errorLog.push(`TELEGRAM_ERR: ${msg}`);
    }
    return false;
  }
}

export async function processContactForm(data: ContactFormData): Promise<ContactResult> {
  const { name, email, message } = data;
  const errorLog: string[] = [];

  const emailSuccess = await sendEmail(name, email, message, errorLog);
  const telegramSuccess = await sendTelegram(name, email, message, errorLog);

  return { email: emailSuccess, telegram: telegramSuccess, warnings: errorLog };
}
