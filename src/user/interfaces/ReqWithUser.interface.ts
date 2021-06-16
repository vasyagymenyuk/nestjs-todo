import { IReqUser } from './ReqUser.interface';

export interface IReqWithUser extends Request {
  user?: IReqUser;
}
