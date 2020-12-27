interface ComponentEvent extends CustomEvent{
    readonly detail: ComponentEventDetail;
}

interface ComponentEventDetail {
    readonly value: any;
}

interface ComponentEventCallback extends EventListener {
    (e: ComponentEvent): void;
}

interface QuerySelectorOption {
    className: string;
    textContent?: string;
    index?: number;
}
