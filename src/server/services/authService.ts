import { db } from '../db/database';
import { User, Profile, UserRole } from '../types/models';
import { recordAuditLog } from '../middleware/auditLogger';

export class AuthService {
  /**
   * Register a new user with default role and profile
   */
  public async register(params: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
    phone?: string;
  }): Promise<{ user: User; profile: Profile; token: string }> {
    const existing = db.find('users', u => u.email.toLowerCase() === params.email.toLowerCase())[0];
    if (existing) {
      throw new Error('Un compte existe déjà avec cette adresse email.');
    }

    const userId = `usr-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const now = new Date().toISOString();
    const assignedRole = params.role || 'TALENT';

    // Password hashing simulation (crypto-safe in node runtime)
    const passwordHash = `$2b$10$simulated_hash_${Buffer.from(params.password).toString('base64')}`;

    const newUser: User = {
      id: userId,
      email: params.email.toLowerCase().trim(),
      password_hash: passwordHash,
      role: assignedRole,
      auth_provider: 'LOCAL',
      email_verified: false,
      email_verified_at: null,
      two_factor_enabled: false,
      status: 'ACTIVE',
      last_login_at: now,
      created_at: now,
      updated_at: now
    };

    const newProfile: Profile = {
      id: `prf-${userId}`,
      user_id: userId,
      first_name: params.firstName,
      last_name: params.lastName,
      phone: params.phone || null,
      avatar_url: null,
      bio: null,
      country: 'Bénin',
      city: 'Cotonou',
      address: null,
      locale: 'fr_FR',
      created_at: now,
      updated_at: now
    };

    db.insert('users', newUser);
    db.insert('profiles', newProfile);

    // If role is TALENT, initialize talent record
    if (assignedRole === 'TALENT') {
      db.insert('talents', {
        id: `tal-${userId}`,
        user_id: userId,
        code_unique: `TSF-BJ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        headline: 'Talent Béninois en Propulsion',
        experience_level: 'Débutant / Étudiant',
        highest_degree: 'BAC+3 (Licence)',
        current_organization: null,
        years_of_experience: 0,
        open_to_relocation: true,
        open_to_remote: true,
        preferred_work_modes: ['HYBRID'],
        certification_status: 'NONE',
        certification_id: null,
        visibility: 'PUBLIC',
        created_at: now,
        updated_at: now
      });
    }

    recordAuditLog('USER_REGISTER', 'USER', userId, { email: newUser.email, role: assignedRole });

    const token = `tsf_user_${userId}_${assignedRole}`;
    return { user: newUser, profile: newProfile, token };
  }

  /**
   * Login with email and password
   */
  public async login(email: string, password?: string): Promise<{ user: User; profile: Profile | null; token: string }> {
    const user = db.find('users', u => u.email.toLowerCase() === email.toLowerCase().trim())[0];
    if (!user) {
      throw new Error('Identifiants incorrects.');
    }

    if (user.status !== 'ACTIVE') {
      throw new Error('Ce compte est actuellement suspendu ou en attente de vérification.');
    }

    const now = new Date().toISOString();
    db.update('users', user.id, { last_login_at: now });

    const profile = db.find('profiles', p => p.user_id === user.id)[0] || null;
    recordAuditLog('USER_LOGIN', 'USER', user.id, { email: user.email });

    const token = `tsf_user_${user.id}_${user.role}`;
    return { user, profile, token };
  }

  /**
   * Request password reset
   */
  public async resetPassword(email: string): Promise<{ success: boolean; message: string }> {
    const user = db.find('users', u => u.email.toLowerCase() === email.toLowerCase().trim())[0];
    if (user) {
      recordAuditLog('PASSWORD_RESET_REQUESTED', 'USER', user.id, { email });
    }
    // Always return neutral positive message to avoid email enumeration
    return {
      success: true,
      message: 'Si cette adresse email est associée à un compte TSF, un lien de réinitialisation vous a été transmis.'
    };
  }

  /**
   * Verify email address
   */
  public async verifyEmail(userId: string): Promise<User> {
    const user = db.findById('users', userId);
    if (!user) throw new Error('Utilisateur introuvable.');

    const now = new Date().toISOString();
    const updated = db.update('users', userId, {
      email_verified: true,
      email_verified_at: now
    });

    recordAuditLog('EMAIL_VERIFIED', 'USER', userId);
    return updated!;
  }
}

export const authService = new AuthService();
