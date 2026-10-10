import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import talentRoutes from './talentRoutes';
import programRoutes from './programRoutes';
import applicationRoutes from './applicationRoutes';
import certificationRoutes from './certificationRoutes';
import partnerRoutes from './partnerRoutes';
import opportunityRoutes from './opportunityRoutes';
import resourceRoutes from './resourceRoutes';
import mediaRoutes from './mediaRoutes';
import impactRoutes from './impactRoutes';
import wikiJobRoutes from './wikiJobRoutes';
import adminRoutes from './adminRoutes';
import healthRoutes from './healthRoutes';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/talents', talentRoutes);
apiRouter.use('/programs', programRoutes);
apiRouter.use('/applications', applicationRoutes);
apiRouter.use('/certifications', certificationRoutes);
apiRouter.use('/partners', partnerRoutes);
apiRouter.use('/opportunities', opportunityRoutes);
apiRouter.use('/resources', resourceRoutes);
apiRouter.use('/media', mediaRoutes);
apiRouter.use('/impact', impactRoutes);
apiRouter.use('/wikijob', wikiJobRoutes);
apiRouter.use('/admin', adminRoutes);
apiRouter.use('/health', healthRoutes);

export default apiRouter;
