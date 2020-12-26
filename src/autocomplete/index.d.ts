import {ComponentEvent} from '../common/component'

interface AutocompleteOption {
    element: string;
    options: any[];
    valueDefault?: any[];

    onChange(e: ComponentEvent): void;
}

interface ComponentInit {
    _init(): void;
}

interface Autocomplete extends ComponentInit{
    readonly node: HTMLDivElement,
    readonly input: Input,
    readonly menu: Menu,

    value: any[];

    _createItem(t: string): void;

    handleSelected(e: ComponentEvent): void;

    handleUnselected(e: ComponentEvent): void;

    handleInput(e: ComponentEvent): void;

    triggerFocus(): void;
}

interface Item extends ComponentInit {
    (text: string): Item;

    readonly node: HTMLSpanElement;

    triggerUnselected(): void;

    remove(e: ComponentEvent): void;
}


interface Input extends ComponentInit{
    readonly container: HTMLSpanElement;
    readonly node: HTMLInputElement;

    _refreshWidth(): void;

    handleSelected(): void;

    focus(): void;

    input(): void;
}

interface Menu extends ComponentInit{
    readonly node: HTMLDivElement;

    handleRefreshMenu(): void;

    appendItem(item: Item): void;

    show(): void;

    hide(): void;

    handleInput(e: ComponentEvent): void;
}

interface MenuItem extends ComponentInit{
    readonly node: HTMLDivElement;
    isSelected: boolean;

    toggle(): void;

    handleSelected(e: ComponentEvent): void;

    handleUnselected(e: ComponentEvent): void;
}
