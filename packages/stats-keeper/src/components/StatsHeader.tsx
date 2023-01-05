interface StatLineProps {
  title: string;
}

function StatLine(props: StatLineProps): JSX.Element {
  return <div className="text-center">{props.title}</div>;
}

export function StatsHeader(): JSX.Element {
  return (
    <div className="grid grid-flow-col font-mono text-white select-none">
      <StatLine title="PTS" />
      <StatLine title="ASTS" />
      <StatLine title="REBS" />
      <StatLine title="STLS" />
      <StatLine title="BLKS" />
      <StatLine title="TOS" />
      <StatLine title="FS" />
    </div>
  );
}
