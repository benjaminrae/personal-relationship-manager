export class RelationshipCouldNotBeCreatedResponse extends Error {
    public static withError(error: Error) {
        return new RelationshipCouldNotBeCreatedResponse(error.message);
    }
}
