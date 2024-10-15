import { Table, Title } from '@mantine/core';

interface LeaderboardEntry {
  rank: number;
  name: string;
  contribution: number;
}

interface LeaderboardProps {
  title: string;
  entries: LeaderboardEntry[];
}

export function Leaderboard({ title, entries }: LeaderboardProps) {
  return (
    <>
      <Title order={3} align="center" mb="md">{title}</Title>
      <Table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Contribution</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.rank}>
              <td>{entry.rank}</td>
              <td>{entry.name}</td>
              <td>{entry.contribution}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}