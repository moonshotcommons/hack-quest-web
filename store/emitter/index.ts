import mitt, { EventType, type Emitter } from 'mitt';

let emitter;
if (!emitter) {
  emitter = mitt();
}

export default emitter as Emitter<Record<EventType, unknown>>;
