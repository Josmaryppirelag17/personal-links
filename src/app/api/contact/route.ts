import { NextRequest, NextResponse } from 'next/server';
import { contactSchema, isFormTimestampValid, formatZodErrors } from '@/lib/validation';
import { processContactForm } from '@/lib/services/ContactService';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 10;
const WINDOW_MS = 3_600_000;

function getClientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count++;
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(ip);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many requests', retryAfter: rateCheck.retryAfter },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } },
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: formatZodErrors(parsed.error) },
        { status: 400 },
      );
    }

    const { fax, website, formTimestamp } = parsed.data;

    if (fax || website) {
      return NextResponse.json({ success: true, data: { email: false, telegram: false } });
    }

    if (!isFormTimestampValid(formTimestamp)) {
      return NextResponse.json(
        { error: 'Invalid form submission' },
        { status: 400 },
      );
    }

    const result = await processContactForm(parsed.data);

    console.log('[CONTACT] Result:', result);

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error('[CONTACT] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
