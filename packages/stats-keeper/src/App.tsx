import { CopyStats } from "./components/CopyStats";
import { Score } from "./components/Score";
import { Team } from "./components/Team";

export default function App(): JSX.Element {
  return (
    <div className="px-4 py-2 min-h-full flex flex-col">
      <Score />
      <div className="flex-1 mb-2">
        <Team homeOrAway="home" />
      </div>
      <div className="flex-1">
        <Team homeOrAway="away" />
      </div>
      <div className="self-end">
        <CopyStats />
      </div>
    </div>
  );
}
