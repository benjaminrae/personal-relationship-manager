export interface UseCase<UseCaseInput, UseCaseResult> {
    execute(input: UseCaseInput): Promise<UseCaseResult>;
}
