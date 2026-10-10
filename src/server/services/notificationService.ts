import { db } from '../db/database';
import { Notification } from '../types/models';
import { recordAuditLog } from '../middleware/auditLogger';

export type NotificationType =
  | 'NEW_OPPORTUNITY'
  | 'DEADLINE_WARNING'
  | 'APPLICATION_UPDATE'
  | 'CERTIFICATION_ISSUED'
  | 'MESSAGE_RECEIVED'
  | 'PROGRAM_ALERT'
  | 'SYNC_STATUS';

export class NotificationService {
  /**
   * Dispatch notification via in-app channel and/or email queue
   */
  public async dispatch(params: {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    data?: Record<string, any>;
    channel?: 'IN_APP' | 'EMAIL' | 'BOTH';
  }): Promise<Notification> {
    const channel = params.channel || 'IN_APP';
    const notif: Notification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      user_id: params.userId,
      type: params.type,
      title: params.title,
      message: params.message,
      data: params.data || {},
      read: false,
      read_at: null,
      channel,
      created_at: new Date().toISOString()
    };

    db.insert('notifications', notif);

    if (channel === 'EMAIL' || channel === 'BOTH') {
      this.sendEmailNotification(notif);
    }

    return notif;
  }

  /**
   * Simulated secure email dispatcher (integrates with SMTP in production)
   */
  private sendEmailNotification(notif: Notification) {
    const user = db.findById('users', notif.user_id);
    if (!user) return;

    // Log the email queue action for observability
    recordAuditLog('EMAIL_DISPATCHED', 'NOTIFICATION', notif.id, {
      recipient: user.email,
      type: notif.type,
      subject: notif.title
    });
  }

  // Pre-configured notification helper templates
  public async notifyNewOpportunity(userId: string, oppTitle: string, oppId: string) {
    return this.dispatch({
      userId,
      type: 'NEW_OPPORTUNITY',
      title: 'Nouvelle opportunité correspondante',
      message: `L’opportunité « ${oppTitle} » correspond à vos compétences et critères de veille.`,
      data: { opportunity_id: oppId },
      channel: 'BOTH'
    });
  }

  public async notifyDeadlineWarning(userId: string, oppTitle: string, daysLeft: number) {
    return this.dispatch({
      userId,
      type: 'DEADLINE_WARNING',
      title: `Clôture imminente (${daysLeft} jours restants)`,
      message: `La date limite pour postuler à « ${oppTitle} » arrive à expiration.`,
      channel: 'IN_APP'
    });
  }

  public async notifyApplicationUpdate(userId: string, programOrOppTitle: string, newStatus: string) {
    return this.dispatch({
      userId,
      type: 'APPLICATION_UPDATE',
      title: 'Mise à jour de votre candidature',
      message: `Votre statut pour « ${programOrOppTitle} » est désormais : ${newStatus}.`,
      channel: 'BOTH'
    });
  }

  public async notifyCertificationIssued(userId: string, level: string, serialNumber: string) {
    return this.dispatch({
      userId,
      type: 'CERTIFICATION_ISSUED',
      title: `Félicitations ! Label TSF ${level} délivré`,
      message: `Votre certificat officiel d’excellence (N° ${serialNumber}) est vérifié et téléchargeable.`,
      data: { serial_number: serialNumber },
      channel: 'BOTH'
    });
  }

  public async notifySyncStatus(userId: string, message: string) {
    return this.dispatch({
      userId,
      type: 'SYNC_STATUS',
      title: 'Statut de la synchronisation WikiJob',
      message,
      channel: 'IN_APP'
    });
  }
}

export const notificationService = new NotificationService();
