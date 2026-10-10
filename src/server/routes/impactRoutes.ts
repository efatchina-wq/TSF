import { Router, Request, Response } from 'express';
import { db } from '../db/database';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const metrics = db.find('impact_metrics');
  const certifiedCount = db.find('certifications', c => c.status === 'VALID').length;
  const oppsCount = db.find('opportunities').length;
  const verifiedSourcesCount = db.find('sources', s => s.active).length;

  res.json({
    metrics,
    realtime: {
      active_certified_talents: certifiedCount,
      indexed_opportunities: oppsCount,
      active_official_sources: verifiedSourcesCount
    }
  });
});

export default router;
