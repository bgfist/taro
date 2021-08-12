import { initNativeApi } from './apis';
export { initNativeApi };
export * from './components';
export declare const hostConfig: {
    initNativeApi: typeof initNativeApi;
    isBubbleEvent(eventName: string, _tagName: string): boolean;
    getPathIndex(indexOfNode: any): string;
    modifyBindEventName(eventName: string): string;
};
