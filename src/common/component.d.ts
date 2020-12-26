interface Component {
    readonly listener: EventTarget;
    readonly callbackMap: object,

    on(eventType: string, callback: ComponentEventCallback): void;

    trigger(eventType: string, value: any): void;

    off(eventType: string): void;
}

export interface ComponentEvent {
    readonly detail: ComponentEventDetail;
}

interface ComponentEventDetail {
    readonly value: any;
}

export interface ComponentEventCallback extends EventListener {
    (e: ComponentEvent): void;
}

export default interface ComponentFunc {
    (): Component;
}
