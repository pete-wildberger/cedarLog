import { pool } from '../models/connection';
import { Request, Response } from 'express';
import { TicketsModel, TicketsModel_type } from '../models';
import * as QRCode from 'qrcode';
import { Md5 } from 'ts-md5';

export interface TicketsHandler_type {
	tm: TicketsModel_type;
	QRCode: any;
	md5: any;
	all(req: Request, res: Response): any;
	create(req: Request, res: Response): any;
	create_many(req: Request, res: Response): any;
}

class TicketsHandler {
	public tm: TicketsModel_type;
	public QRCode = QRCode;
	public md5 = Md5;
	constructor() {
		this.tm = TicketsModel;
	}

	all = (req: Request, res: Response): any => {
		const makeTicket = (seat: any, cb: Function) => {
			const hash: string = this.md5.hashStr(JSON.stringify(seat)) as string;
			this.QRCode.toDataURL(hash, (err, url) => {
				if (err) {
					console.log(err);
				}
				const ticket = {
					num: seat.id,
					row: seat.aisle,
					seat: seat.seat,
					code: url
				};
				cb(ticket);
			});
		};
		this.tm.find_all().then((data: any[]) => {
			const requests = data.map(item => {
				return new Promise(resolve => {
					makeTicket(item, resolve);
				});
			});
			Promise.all(requests).then(reqs => res.send(reqs));
		});
	};
	// get_by_id(req: Request, res: Response) {}
	create = (req: Request, res: Response): any => {
		this.tm.newObj().then((data: any) => {
			res.send('woohoo');
		});
	};
	create_many = (req: Request, res: Response): any => {
		console.log('many');
		this.tm.newObjs().then((data: any) => {
			res.send('woohoo');
		});
	};
}
export const Tickets = new TicketsHandler();
