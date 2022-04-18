import { InheritableElementProps } from '@/types/helpers';
import * as RadixTooltip from '@radix-ui/react-tooltip';

interface Props {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: RadixTooltip.TooltipContentProps['side'];
  sideOffSet?: RadixTooltip.TooltipContentProps['sideOffset'];
}

type TooltipProps = InheritableElementProps<'div', Props>;

export function Tooltip(props: TooltipProps) {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger tabIndex={props.tabIndex}>{props.children}</RadixTooltip.Trigger>
        <RadixTooltip.Content
          side={props.side}
          sideOffset={props.sideOffSet}
          className="max-w-[260px] rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white px-3 py-2"
        >
          {props.content}
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
