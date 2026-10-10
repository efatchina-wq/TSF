import { Router, Response } from 'express';
import { db } from '../db/database';
import { AuthenticatedRequest, requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/rbac';
import { recordAuditLog } from '../middleware/auditLogger';

const router = Router();

// Public talents directory (with privacy filters)
router.get('/', (req, res) => {
  const talents = db.find('talents', t => t.visibility === 'PUBLIC');
  res.json(talents);
});

// Single talent public profile
router.get('/:id', (req, res) => {
  const talent = db.findById('talents', req.params.id);
  if (!talent) return res.status(404).json({ error: 'NOT_FOUND', message: 'Talent introuvable.' });

  const skills = db.find('talent_skills', s => s.talent_id === talent.id);
  const projects = db.find('talent_projects', p => p.talent_id === talent.id);
  const profile = db.find('profiles', p => p.user_id === talent.user_id)[0] || null;

  res.json({ talent, profile, skills, projects });
});

// Authenticated talent dashboard: my profile, my applications, my skills, my certification
router.get('/me/dashboard', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const profile = db.find('profiles', p => p.user_id === user.id)[0] || null;
  const talent = db.find('talents', t => t.user_id === user.id)[0] || null;
  const skills = talent ? db.find('talent_skills', s => s.talent_id === talent.id) : [];
  const projects = talent ? db.find('talent_projects', p => p.talent_id === talent.id) : [];
  const applications = db.find('opportunity_applications', a => a.user_id === user.id);
  const programApplications = db.find('program_applications', a => a.user_id === user.id);
  const certifications = db.find('certifications', c => c.user_id === user.id);
  const notifications = db.find('notifications', n => n.user_id === user.id);

  res.json({
    user,
    profile,
    talent,
    skills,
    projects,
    applications,
    programApplications,
    certifications,
    notifications
  });
});

// Update talent profile
router.put('/me/profile', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  let talent = db.find('talents', t => t.user_id === user.id)[0];

  if (!talent) {
    talent = db.insert('talents', {
      id: `tal-${user.id}`,
      user_id: user.id,
      code_unique: `TSF-BJ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      headline: req.body.headline || 'Talent TSF',
      experience_level: req.body.experience_level || 'Junior (1-3 ans)',
      highest_degree: req.body.highest_degree || 'BAC+3 (Licence)',
      current_organization: req.body.current_organization || null,
      years_of_experience: req.body.years_of_experience || 0,
      open_to_relocation: !!req.body.open_to_relocation,
      open_to_remote: !!req.body.open_to_remote,
      preferred_work_modes: req.body.preferred_work_modes || ['HYBRID'],
      certification_status: 'NONE',
      certification_id: null,
      visibility: req.body.visibility || 'PUBLIC',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  } else {
    talent = db.update('talents', talent.id, req.body)!;
  }

  recordAuditLog('TALENT_PROFILE_UPDATED', 'TALENT', talent.id, {}, req);
  res.json(talent);
});

// Add skill to talent profile
router.post('/me/skills', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const talent = db.find('talents', t => t.user_id === user.id)[0];
  if (!talent) return res.status(400).json({ error: 'TALENT_NOT_FOUND', message: 'Profil talent requis.' });

  const skill = db.insert('talent_skills', {
    id: `tsk-${Date.now()}`,
    talent_id: talent.id,
    skill_name: req.body.skill_name,
    category: req.body.category || 'HARD',
    level: req.body.level || 'INTERMEDIATE',
    verified_by_tsf: false
  });

  res.status(201).json(skill);
});

// Add project to talent portfolio
router.post('/me/projects', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const talent = db.find('talents', t => t.user_id === user.id)[0];
  if (!talent) return res.status(400).json({ error: 'TALENT_NOT_FOUND', message: 'Profil talent requis.' });

  const project = db.insert('talent_projects', {
    id: `tp-${Date.now()}`,
    talent_id: talent.id,
    title: req.body.title,
    description: req.body.description,
    role: req.body.role,
    project_url: req.body.project_url || null,
    media_url: req.body.media_url || null,
    start_date: req.body.start_date || new Date().toISOString().split('T')[0],
    end_date: req.body.end_date || null
  });

  res.status(201).json(project);
});

export default router;
