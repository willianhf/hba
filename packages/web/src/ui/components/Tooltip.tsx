import * as RadixTooltip from '@radix-ui/react-tooltip';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export function Tooltip(props: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={300}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger>{props.children}</RadixTooltip.Trigger>
        <RadixTooltip.Content className="max-w-[260px] rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white px-3 py-2">
          {props.content}
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
