import { Request, Response, NextFunction } from 'express';
import { UsersModel, UsersModel_type } from '../models';
import { getEvents } from '../scraper/scraper';
// export interface TicketsHandler_type {
// 	tm: TicketsModel_type;
// 	QRCode: any;
// 	md5: any;
// 	all(req: Request, res: Response): any;
// 	create(req: Request, res: Response): any;
// 	create_many(req: Request, res: Response): any;
// }

class EventsHandler {
	public um: UsersModel_type;
	constructor() {
		this.um = UsersModel;
	}
	events(req: Request, res: Response) {
		getEvents((data: any) => {
			console.log(data);
			res.status(200).send(data);
		});
	}
}
export const Events = new EventsHandler();
