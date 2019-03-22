import { Request, Response, NextFunction } from 'express';
import { UsersModel, EventsModel, UsersModel_type } from '../models';
import { scrapeEvents } from '../scraper/scraper';
// export interface TicketsHandler_type {
// 	tm: TicketsModel_type;
// 	QRCode: any;
// 	md5: any;
// 	all(req: Request, res: Response): any;
// 	create(req: Request, res: Response): any;
// 	create_many(req: Request, res: Response): any;
// }

export class Events {
	static getEvents(req: Request, res: Response) {
		EventsModel.find_all().then((events: any[]) => {
			if (events.length > 0) {
				res.status(200).send(events);
			} else {
				res.sendStatus(418);
			}
		});
	}
	static addEvents(req: Request, res: Response) {
		scrapeEvents((data: any) => {
			EventsModel.upsert(data);
			res.status(200).send('data');
		});
	}
}
