interface StatLineProps {
  title: string;
}

function StatLine(props: StatLineProps): JSX.Element {
  return <div className="text-center flex-grow w-20">{props.title}</div>;
}

export function StatsHeader(): JSX.Element {
  return (
    <div className="flex font-mono text-white select-none">
      <StatLine title="PTS" />
      <StatLine title="AST" />
      <StatLine title="REB" />
      <StatLine title="STL" />
      <StatLine title="BLK" />
      <StatLine title="TO" />
      <StatLine title="F" />
    </div>
  );
}
