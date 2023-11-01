import serverContext from '@/components/context/server-only-context';

export const [getTeamId, setTeamId] = serverContext<number | null>(null);
