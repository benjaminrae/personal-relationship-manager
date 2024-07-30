import { ID } from './id';

export interface UUIDGenerator {
    generate(): ID;
}
