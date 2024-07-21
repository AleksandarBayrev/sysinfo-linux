import { enhanceClass } from "../base";
import { IFormPageObserverStorage } from "../interfaces";
import { ObserverStorage } from "./ObserverStorage";

export class FormPageObserverStorage extends ObserverStorage implements IFormPageObserverStorage {}

enhanceClass(FormPageObserverStorage, "FormPageObserverStorage");