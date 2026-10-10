import { NormalizedOpportunity, OpportunityLifecycleStatus } from '../../../types/aggregation';

/**
 * Calculates current lifecycle status for an opportunity based on deadline
 */
export function calculateLifecycleStatus(deadline: string | null): {
  status: OpportunityLifecycleStatus;
  daysRemaining: number | null;
  isExpired: boolean;
} {
  if (!deadline) {
    return {
      status: 'ACTIVE',
      daysRemaining: null,
      isExpired: false
    };
  }

  // Parse deadline (format: YYYY-MM-DD or ISO string)
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(23, 59, 59, 999);

    if (isNaN(deadlineDate.getTime())) {
      return {
        status: 'ACTIVE',
        daysRemaining: null,
        isExpired: false
      };
    }

    const diffMs = deadlineDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (daysRemaining < 0) {
      return {
        status: 'EXPIRED',
        daysRemaining,
        isExpired: true
      };
    } else if (daysRemaining <= 7) {
      return {
        status: 'EXPIRING_SOON',
        daysRemaining,
        isExpired: false
      };
    } else {
      return {
        status: 'ACTIVE',
        daysRemaining,
        isExpired: false
      };
    }
  } catch {
    return {
      status: 'ACTIVE',
      daysRemaining: null,
      isExpired: false
    };
  }
}

/**
 * Updates an opportunity's status and expiration lifecycle
 */
export function updateOpportunityExpiration(opp: NormalizedOpportunity): {
  updated: boolean;
  opportunity: NormalizedOpportunity;
} {
  const { status, isExpired } = calculateLifecycleStatus(opp.deadline);

  if (opp.status !== status) {
    return {
      updated: true,
      opportunity: {
        ...opp,
        status,
        verification_status: isExpired ? 'EXPIRED' : opp.verification_status,
        updated_at: new Date().toISOString()
      }
    };
  }

  return {
    updated: false,
    opportunity: opp
  };
}

/**
 * Batch update all opportunities in registry
 */
export function processAllExpirations(opportunities: NormalizedOpportunity[]): {
  updatedCount: number;
  opportunities: NormalizedOpportunity[];
} {
  let updatedCount = 0;
  const updatedList = opportunities.map(opp => {
    const res = updateOpportunityExpiration(opp);
    if (res.updated) updatedCount++;
    return res.opportunity;
  });

  return {
    updatedCount,
    opportunities: updatedList
  };
}
