import { Duration } from './duration';
import { Region } from './region';

export interface GameConfigResponse {
  regions: Region[];
  durations: Duration[];
}
