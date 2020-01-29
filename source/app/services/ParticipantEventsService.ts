import IResponse, {InternalServerErrorResponse, NotFoundResponse, SuccessResponse} from '../utils/response';
import {Types} from "mongoose";
import ParticipantEventModel from "../model/participantEvent/model.js";
import IParticipantEvent from "../model/participantEvent/Interface";
import ObjectId = Types.ObjectId;


export default class ParticipantEventsService {
  static async start(participantEvent: IParticipantEvent): Promise<IResponse> {
    try {
      await participantEvent.save();
      return new SuccessResponse(participantEvent);
    } catch (e) {
      throw new InternalServerErrorResponse(e);
    }
  }

  static async existEvent(participant: string, eventId: string): Promise<IResponse> {
    let participantEventResult;
    try {
      participantEventResult = await ParticipantEventModel.exist(new ObjectId(participant), new ObjectId(eventId));
    } catch (e) {
      throw new InternalServerErrorResponse();
    }

    if (participantEventResult) {
      return new SuccessResponse(participantEventResult);
    } else {
      throw new NotFoundResponse({message: "ParticipantEvent not found"})
    }
  }

  static async cancelFollowUp(id: string): Promise<IResponse> {
    let updateResult;
    let followUp;
    try {
      followUp = await ParticipantEventModel.findOne({"_id": new ObjectId(id)});
      if (followUp) {
        if (followUp.objectType == "FollowUp") {
          updateResult = await ParticipantEventModel.updateOne({"_id": followUp._id}, {"$set": {status: "CANCELED"}});
        }
      }
    } catch (e) {
      throw new InternalServerErrorResponse();
    }

    if (updateResult.n) {
      return new SuccessResponse();
    } else {
      throw new NotFoundResponse({message: "ParticipantEvent not found"})
    }
  }

  static async accomplishedEvent(id: ObjectId): Promise<IResponse> {
    let updateResult;
    try {
      updateResult = await ParticipantEventModel.updateOne({"eventId": id}, {"$set": {status: "ACCOMPLISHED"}});
    } catch (e) {
      throw new InternalServerErrorResponse(e);
    }

    if (updateResult.n) {
      return new SuccessResponse();
    } else {
      throw new NotFoundResponse({message: "ParticipantEvent not found"})
    }
  }

  static async listAll(id: ObjectId): Promise<IResponse> {
    let resultList;
    try {
      resultList = await ParticipantEventModel.listAll(id);
    } catch (e) {
      throw new InternalServerErrorResponse(e);
    }

    if (resultList.length) {
      return new SuccessResponse(resultList);
    } else {
      throw new NotFoundResponse({message: "ParticipantEvents not found"})
    }
  }

};