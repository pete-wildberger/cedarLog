import { Request, Response, NextFunction } from 'express';
import { UsersModel, EventsModel, UsersModel_type } from '../models';
import { getEvents } from '../scraper/scraper';
// export interface TicketsHandler_type {
// 	tm: TicketsModel_type;
// 	QRCode: any;
// 	md5: any;
// 	all(req: Request, res: Response): any;
// 	create(req: Request, res: Response): any;
// 	create_many(req: Request, res: Response): any;
// }

export class Events {
	static events(req: Request, res: Response) {
		getEvents((data: any) => {
			EventsModel.upsert(data);
			console.log(data);
			res.status(200).send(data);
		});
	}
}
