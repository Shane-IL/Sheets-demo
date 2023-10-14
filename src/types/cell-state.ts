export interface CellState {
    value: string;
    formula: string;
    dependencies: string[];
    error?: string;
}