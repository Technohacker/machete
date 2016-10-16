export class Machete {
    public static stage: Element;

    private static stageCallbacks: Function[] = [];

    public static extend(pluginName: string, plugin: Object): void {
        Machete[pluginName] = plugin;
    }

    public static init(stage: Element): void {
        if (stage.className.indexOf("machete-stage") === -1) {
            throw Error("Stage does not have the 'machete-stage' class!");
        }
        Machete.stage = stage;
        Machete.stageCallbacks.forEach(cb => cb());
    };
    public static onStageReady(callback: Function): void {
        Machete.stageCallbacks.push(callback);
    }
};
