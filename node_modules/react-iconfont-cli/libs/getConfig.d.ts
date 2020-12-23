export interface Config {
    symbol_url: string;
    use_typescript: boolean;
    save_dir: string;
    trim_icon_prefix: string;
    unit: string;
    default_icon_size: number;
}
export declare const getConfig: () => Config;
