import * as SelectPrimitive from '@radix-ui/react-select';
import { AiOutlineCheck } from 'react-icons/ai';
import { inputStyles } from '../Input/styles';

type Props = {};

const fruits = ['apple', 'mange', 'pineapple'];

const Select = (props: Props) => {
  return (
    <SelectPrimitive.Root open={true}>
      <SelectPrimitive.Trigger
        className={inputStyles({
          class: 'mt-4 flex items-center justify-between space-x-2 text-left',
        })}
      >
        <SelectPrimitive.Value></SelectPrimitive.Value>
        <SelectPrimitive.Icon></SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="bg-blackish rounded-lg border border-card p-4 text-white text-sm">
          <SelectPrimitive.Viewport>
            <SelectPrimitive.Group>
              <SelectPrimitive.Label>Fruits</SelectPrimitive.Label>
              {fruits.map((f) => (
                <SelectPrimitive.Item
                  value={f}
                  key={f}
                  className="focus:outline-none flex items-center justify-between space-x-3 px-4 py-1 hover:bg-primary rounded-md"
                >
                  <SelectPrimitive.ItemText>{f}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator>
                    <AiOutlineCheck size={16} />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Group>
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export default Select;
