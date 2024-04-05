import Subscription from '../models/SubscribeModel';
import * as handler from '../utils/handleControllers';
export default class SubscribeController {
   public createSubscription = handler.createOne(Subscription);
}
