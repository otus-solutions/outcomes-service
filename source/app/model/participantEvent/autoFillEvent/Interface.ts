import {Types} from 'mongoose';
import IParticipantEvent from "../Interface";
import ObjectId = Types.ObjectId;

export default interface IAutoFillEvent extends IParticipantEvent, Document {
  activityId: ObjectId;
}
