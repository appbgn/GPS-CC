export interface WhatsAppConnectionStatus {
  status: 'disconnected' | 'connecting' | 'connected' | 'qr_ready' | 'pairing_ready';
  qrCodeUrl?: string;
  qrCodeRaw?: string;
  pairingCode?: string;
  lastSync?: Date;
  phoneNumber?: string;
  activeSince?: string;
  userJid?: string;
  pushName?: string;
  baileysVersion?: string;
  sessionPath?: string;
  pingMs?: number;
}

export interface WhatsAppMessage {
  id: string;
  sender: 'user' | 'bot' | 'operator';
  senderName?: string;
  text: string;
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'pdf' | 'doc' | 'location';
    url: string;
    name?: string;
  }[];
}

export interface WhatsAppConversation {
  id: string;
  contactName: string;
  contactNumber: string;
  location?: string;
  avatarUrl?: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  status: 'active' | 'resolved' | 'bot_handling' | 'pending';
  category?: 'PBG' | 'SLF' | 'KRK' | 'Pengaduan' | 'Informasi' | 'General';
  joinedDate?: string;
  totalChatCount?: number;
  messages: WhatsAppMessage[];
  aiSuggestedReply?: {
    text: string;
    confidence: number;
    source: string;
  };
  notes?: string[];
  tags?: string[];
}

export interface OperatorStatus {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'busy' | 'offline';
  activeTask?: string;
}

export interface WhatsAppBotLog {
  id: string;
  timestamp: Date;
  event: string;
  details: string;
  level: 'info' | 'warn' | 'error';
}

