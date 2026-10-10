import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { externalIntegrationService } from '../services/externalIntegrationService';
import { jobRunnerService } from '../services/jobRunnerService';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const mem = process.memoryUsage();
  const uptime = process.uptime();
  const integrations = externalIntegrationService.getIntegrationsStatus();
  const dbTelemetry = db.getTelemetry();
  const jobs = jobRunnerService.getAllJobs();

  const allConnected = integrations.every(i => i.status === 'CONNECTED' || i.status === 'UNCONFIGURED');

  res.json({
    status: allConnected ? 'HEALTHY' : 'DEGRADED',
    timestamp: new Date().toISOString(),
    uptime_seconds: Math.floor(uptime),
    environment: process.env.NODE_ENV || 'development',
    system: {
      memory_rss_mb: Math.round(mem.rss / 1024 / 1024),
      memory_heap_used_mb: Math.round(mem.heapUsed / 1024 / 1024),
      node_version: process.version
    },
    database: {
      status: 'OPERATIONAL',
      tables_count: dbTelemetry.total_tables,
      records: dbTelemetry.counts
    },
    integrations,
    background_jobs_count: jobs.length
  });
});

export default router;
