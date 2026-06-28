export interface CyberMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  secured: boolean;
}

const STORAGE_KEY = 'cyber_messages_v1';

export function appendCyberMessage(msg: Omit<CyberMessage, 'id' | 'timestamp' | 'secured'>) {
  const messages = loadCyberMessages();
  messages.unshift({
    ...msg,
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    secured: true,
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(0, 50)));
}

export function loadCyberMessages(): CyberMessage[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function clearUserCyberMessages() {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasUserCyberMessages(): boolean {
  return loadCyberMessages().length > 0;
}
