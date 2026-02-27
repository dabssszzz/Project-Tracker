import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../api/analytics';

export function useAnalyticsDashboard() {
    return useQuery({
        queryKey: ['analytics', 'dashboard'],
        queryFn: analyticsApi.getDashboard,
    });
}
